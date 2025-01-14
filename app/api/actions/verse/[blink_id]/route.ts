import { BlinkInterface, UserInterface } from '@/interfaces/models.interface'
import {
  blinkError,
  generatePaymentBlink,
  generateSwapBlink,
  validatedQueryParams,
} from '@/lib/blink.lib'
import { swapSol } from '@/lib/jupiter.lib'
import { BlinkService } from '@/lib/services/blink.service'
import { UserService } from '@/lib/services/user.service'
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
  VersionedTransaction,
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
  const isProfile = requestUrl.searchParams.get('profile') === 'true'

  const { blink_id } = params

  console.log('isProfile', isProfile)

  if (!blink_id) {
    return blinkError("'blink' url param not found")
  }

  let toPubkey: PublicKey
  let blink_data: BlinkInterface | undefined
  let user_data: UserInterface | undefined

  // "1ydnsKJhktH6ipyUJWKg"
  if (isProfile) {
    const user = await UserService.getUser(blink_id)
    console.log('user', user)

    if (!user.data) {
      return blinkError('User Not Found')
    }

    user_data = user.data as UserInterface
    toPubkey = new PublicKey(user_data?.pub_key)
  } else {
    const blink = await BlinkService.getOneBlink(blink_id)
    // console.log('blink', blink)

    if (!blink.data) {
      return blinkError('Blink Not Found')
    }

    blink_data = blink.data as BlinkInterface
    toPubkey = new PublicKey(blink_data?.pub_key)
  }

  let baseHref = ''
  if (blink_data?.category_id === 'AdFdU2MRsUWdMDUk9xc2S')
    baseHref = new URL(
      `/api/actions/verse/${blink_id}?to=${blink_data?.token_mint}`,
      requestUrl.origin
    ).toString()
  else
    baseHref = new URL(
      `/api/actions/verse/${blink_id}?to=${toPubkey.toBase58()}`,
      requestUrl.origin
    ).toString()

  console.log('baseHREF', baseHref)

  // Add click count update
  if (!isProfile) {
    await BlinkService.incrementBlinkOpenedCount(blink_id)
  }

  // swap
  if (blink_data?.category_id === 'AdFdU2MRsUWdMDUk9xc2S')
    return generateSwapBlink(headers, {
      title: blink_data?.title || user_data?.name || '',
      description: isProfile
        ? user_data?.description || 'No description'
        : blink_data?.description || 'No description',
      icon: blink_data?.image_url || '',
      label: blink_data?.label || '',
      baseURL: baseHref,
    })

  console.log('blink_data', blink_data)

  return generatePaymentBlink(headers, {
    title: blink_data?.title || user_data?.name || '',
    description: isProfile
      ? user_data?.description || 'No description'
      : blink_data?.description || 'No description',
    icon: blink_data?.image_url || '',
    label: blink_data?.label || '',
    baseURL: baseHref,
    isProfile,
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

  const { amount, toPubkey, token, isProfile, type } =
    validatedQueryParams(requestUrl)

  console.log('amount', amount, 'toPubkey', toPubkey.toBase58(), 'token', token)

  // increment btn clicked
  if (!isProfile) await BlinkService.incrementBlinkClickedCount(blink_id)

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

    let transaction: Transaction | VersionedTransaction = new Transaction()

    console.log('type', type)

    if (type === 'swap') {
      const swapTransaction = await swapSol(connection, {
        amount: amount * LAMPORTS_PER_SOL,
        token_mint: toPubkey,
        account,
      })
      const { blockhash } = await connection.getLatestBlockhash()
      swapTransaction.message.recentBlockhash = blockhash

      // if (swapTransaction instanceof VersionedTransaction) {
      //   if (!swapTransaction.message.recentBlockhash) {
      //     swapTransaction.message.recentBlockhash = blockhash
      //   }
      // }

      const payload: ActionPostResponse = await createPostResponse({
        fields: {
          transaction: swapTransaction,
          message: `Swapped successfully`,
        },
      })

      return Response.json(payload, {
        headers,
      })
    } else {
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
    }

    if (!isProfile) await BlinkService.incrementBlinkTxSuccessfulCount(blink_id)

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
    return Response.json(
      {
        error: error.message || 'An unknown error occurred',
      },
      { status: 400 }
    )
  }
}

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const OPTIONS = async (req: Request) => {
  return new Response(null, { headers })
}
// export const OPTIONS = GET
