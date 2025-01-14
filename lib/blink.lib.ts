import { ActionGetResponse, ACTIONS_CORS_HEADERS } from '@solana/actions'
import { PublicKey } from '@solana/web3.js'

export const blinkError = (errorMessage: string) => {
  const action: ActionGetResponse = {
    title: 'An error occur',
    // icon: ``,
    icon: `https://www.blinkverse.fun/images/blink_img.png`,
    description: ``,
    label: '',
    type: 'action',
    disabled: true,
    error: { message: errorMessage },
  }
  return Response.json(action, { headers: ACTIONS_CORS_HEADERS })
}

export const generatePaymentBlink = (
  headers: Record<string, string>,
  {
    title,
    description,
    icon,
    label,
    baseURL,
    isProfile,
  }: {
    title: string
    icon: string
    description: string
    label: string
    baseURL: string
    isProfile: boolean
  }
) => {
  const payload: ActionGetResponse = {
    title,
    // icon: icon || ``,
    icon: icon || `https://www.blinkverse.fun/images/blink_img.png`,
    description,
    label,
    type: 'action',
    links: {
      actions: [
        {
          label: label || `Send 😉`,
          href: `${baseURL}&amount={amount}&token={token}&isProfile=${isProfile}`,
          parameters: [
            {
              type: 'radio',
              label: 'Token',
              name: 'token',
              options: [
                { label: 'Sol', value: 'sol', selected: true },
                { label: 'Send', value: 'send' },
                { label: 'USDC', value: 'usdc' },
              ],
            },
            {
              name: 'amount',
              required: true,
              label: 'Send a custom amount',
            },
          ],
        },
      ],
    },
  }

  return Response.json(payload, {
    headers,
  })
}

export const generateSwapBlink = (
  headers: Record<string, string>,
  {
    title,
    description,
    icon,
    label,
    baseURL,
  }: {
    title: string
    icon: string
    description: string
    label: string
    baseURL: string
  }
) => {
  const payload: ActionGetResponse = {
    title,
    icon: icon || `https://www.blinkverse.fun/images/blink_img.png`,
    description,
    label,
    type: 'action',
    links: {
      actions: [
        {
          label: '0.05 SOL', // button text
          href: `${baseURL}&amount=0.01&type=swap`,
        },
        {
          label: '0.1 SOL', // button text
          href: `${baseURL}&amount=0.05&type=swap`,
        },
        {
          label: '0.50 SOL', // button text
          href: `${baseURL}&amount=0.1&type=swap`,
        },
        {
          label: '1 SOL', // button text
          href: `${baseURL}&amount=1&type=swap`,
        },
        {
          label: 'Buy', // button text
          href: `${baseURL}&amount={amount}`,
          parameters: [
            {
              name: 'amount', // field name
              label: 'Buy a custom amount in SOL', // text input placeholder
            },
          ],
        },
      ],
    },
  }

  return Response.json(payload, {
    headers,
  })
}

export const validatedQueryParams = (requestUrl: URL) => {
  let amount: number = 0
  let token: string = ''
  let isProfile: boolean = false
  let type: string = ''

  let toPubkey: PublicKey = new PublicKey(
    '5QDwYS1CtHzN1oJ2eij8Crka4D2eJcUavMcyuvwNRM9'
  )

  try {
    if (requestUrl.searchParams.get('to')) {
      console.log('to', requestUrl.searchParams.get('to'))
      toPubkey = new PublicKey(requestUrl.searchParams.get('to')!)
    }
  } catch (err) {
    throw 'Invalid input query parameter: to'
  }

  try {
    console.log('amount', requestUrl.searchParams.get('amount'))
    if (requestUrl.searchParams.get('amount')) {
      amount = parseFloat(requestUrl.searchParams.get('amount')!)
    }

    if (amount <= 0) throw 'amount is too small'
  } catch (err) {
    throw 'Invalid input query parameter: amount'
  }

  try {
    if (requestUrl.searchParams.get('isProfile')) {
      isProfile = requestUrl.searchParams.get('isProfile')! === 'true'
    }
  } catch (err) {
    throw 'Invalid input query parameter: isProfile'
  }

  try {
    if (requestUrl.searchParams.get('token')) {
      token = requestUrl.searchParams.get('token')!
    }
  } catch (err) {
    throw 'Invalid input query parameter: to'
  }

  try {
    if (requestUrl.searchParams.get('type')) {
      type = requestUrl.searchParams.get('type')!
    }
  } catch (err) {
    throw 'Invalid input query parameter: type'
  }

  return {
    amount,
    toPubkey,
    token,
    isProfile,
    type,
  }
}
