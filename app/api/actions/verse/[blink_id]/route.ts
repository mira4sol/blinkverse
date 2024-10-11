import { BlinkInterface } from '@/interfaces/models.interface'
import {
  blinkError,
  generatePaymentBlink,
  validatedQueryParams,
} from '@/lib/blink.lib'
import { BlinkService } from '@/lib/services/blink.service'
import { sendNativeSol } from '@/lib/solana.lib'
import { getSplTokenAddress, SendSplToken } from '@/lib/spl.helpers'
import {
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  BLOCKCHAIN_IDS,
  createActionHeaders,
  createPostResponse,
} from '@solana/actions'
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from '@solana/web3.js'

const headers = createActionHeaders({
  headers: { ...ACTIONS_CORS_HEADERS },
  chainId: BLOCKCHAIN_IDS.mainnet,
  actionVersion: '2.1.3',
})

export const GET = async (
  req: Request,
  { params }: { params: { blink_id: string } }
) => {
  const requestUrl = new URL(req.url)
  // const blink_id = requestUrl.searchParams.get('blink')
  const { blink_id } = params

  if (!blink_id) {
    return blinkError("'blink' url param not found")
  }

  // "1ydnsKJhktH6ipyUJWKg"
  const blink = await BlinkService.getOneBlink(blink_id)
  // console.log('blink', blink)

  if (!blink.data) {
    return blinkError('Blink Not Found')
  }

  const data = blink.data as BlinkInterface

  const toPubkey = new PublicKey(data?.pub_key)

  const baseHref = new URL(
    `/api/actions/verse/${blink_id}&to=${toPubkey.toBase58()}`,
    requestUrl.origin
  ).toString()

  console.log('baseHREF', baseHref)

  // Add click count update
  await BlinkService.incrementBlinkOpenedCount(blink_id)

  return generatePaymentBlink(headers, {
    title: data.title,
    description: data.description || '',
    icon: data.image_url || '',
    label: data.image_url || '',
    baseURL: baseHref,
  })
}

// export const OPTIONS = GET

export const POST = async (
  req: Request,
  { params }: { params: { blink_id: string } }
) => {
  console.log('I ran', new Date(Date.now()).toLocaleTimeString())
  const requestUrl = new URL(req.url)
  const blink_id = params.blink_id.split('&')[0]

  // console.log('blink_id', blink_id)

  const { amount, toPubkey, token } = validatedQueryParams(requestUrl)

  console.log('amount', amount, 'toPubkey', toPubkey.toBase58(), 'token', token)

  // increment btn clicked
  await BlinkService.incrementBlinkClickedCount(blink_id)

  try {
    const body: ActionPostRequest = await req.json()

    // validate the client provided input
    let account: PublicKey
    try {
      account = new PublicKey(body.account)
    } catch (err) {
      return new Response('Invalid "account" provided', {
        status: 400,
        headers,
      })
    }

    const connection = new Connection(
      clusterApiUrl('mainnet-beta'),
      'confirmed'
    )

    let transaction: Transaction = new Transaction()

    if (token === 'sol') {
      transaction = await sendNativeSol(connection, {
        amount: amount * LAMPORTS_PER_SOL,
        toPubkey,
        fromPubkey: account,
      })
    } else {
      console.log('spl token', token)
      transaction = await SendSplToken(connection, {
        amount,
        fromPubKey: account,
        toPubKey: toPubkey,
        mintAddress: new PublicKey(getSplTokenAddress(token) || ''),
      })
    }

    await BlinkService.incrementBlinkTxSuccessfulCount(blink_id)

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction: transaction,
        message: `Sent ${amount} SOL to: ${toPubkey.toBase58()}`,
      },
    })

    return Response.json(payload, {
      headers,
    })
  } catch (error: any) {
    console.log(error)
    // Add transaction failure tracking
    await BlinkService.incrementBlinkTxFailedCount(blink_id)
    return Response.json({
      error: error.message || 'An unknown error occurred',
    })
  }
}

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const OPTIONS = async (req: Request) => {
  return new Response(null, { headers })
}
// export const OPTIONS = GET
