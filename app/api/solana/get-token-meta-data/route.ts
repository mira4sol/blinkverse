// import { getTokenMetadata } from '@solana/spl-token'
import { getTokenMetadata } from '@/lib/spl.helpers'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'

export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url)
    const token_mint = requestUrl.searchParams.get('token_mint')

    if (!token_mint) {
      return new Response(
        JSON.stringify({ message: 'Token mint address is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    const connection = new Connection(
      clusterApiUrl('mainnet-beta'),
      'confirmed'
    )

    const tokenInfo = await getTokenMetadata(
      connection,
      new PublicKey(token_mint)
    )

    return new Response(JSON.stringify(tokenInfo), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error: any) {
    return Response.json({
      error: error.message || 'An unknown error occurred',
    })
  }
}
