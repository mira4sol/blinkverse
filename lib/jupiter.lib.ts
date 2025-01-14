import { QuoteResponse, SwapResponse } from '@jup-ag/api'
import { Connection, PublicKey, VersionedTransaction } from '@solana/web3.js'

export const swapSol = async (
  connection: Connection,
  {
    amount,
    token_mint,
    account,
  }: {
    amount: number
    token_mint: PublicKey
    account: PublicKey
  }
) => {
  try {
    // const jupiterApi = createJupiterApiClient()
    // SOL mint address (Wrapped SOL)
    const SOL_MINT = 'So11111111111111111111111111111111111111112'

    // Jupiter V6 API endpoint
    const JUPITER_V6_API = 'https://quote-api.jup.ag/v6'

    // const quote = await jupiterApi.quoteGet({
    //   amount: amount,
    //   inputMint: NATIVE_MINT.toBase58(),
    //   outputMint: token_mint.toBase58(),
    // })

    const quoteResponse = await fetch(
      `${JUPITER_V6_API}/quote?inputMint=${SOL_MINT}&outputMint=${token_mint.toBase58()}&amount=${amount}&slippageBps=50`
    )
    const quote: QuoteResponse = await quoteResponse.json()

    if (!quote || (quote as any)?.error) {
      throw new Error((quote as any)?.error || 'No quote data available')
    }

    // const swap = await jupiterApi.swapPost({
    //   swapRequest: {
    //     quoteResponse: quote,
    //     userPublicKey: account.toBase58(),
    //     wrapAndUnwrapSol: true, // Automatically wrap/unwrap SOL
    //   },
    // })

    // 2. Get swap transaction
    const swapRequestBody = {
      quoteResponse: quote,
      userPublicKey: account.toString(),
      wrapAndUnwrapSol: true,
    }

    const swapResponse = await fetch(`${JUPITER_V6_API}/swap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(swapRequestBody),
    })

    const swap: SwapResponse = await swapResponse.json()

    console.log('swap', swap)

    const swapTransactionBuf = Buffer.from(swap.swapTransaction, 'base64')
    return VersionedTransaction.deserialize(swapTransactionBuf)
    // return swap.swapTransaction
  } catch (error) {
    console.error('Error in swapSol:', error)
    throw error
  }
}
