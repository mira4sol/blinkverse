import {
  ACTIONS_CORS_HEADERS,
  createActionHeaders,
  type ActionsJson,
} from '@solana/actions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const payload: ActionsJson = {
    rules: [
      // map all root level routes to an action
      {
        pathPattern: '/verse/*',
        apiPath: '/api/actions/verse/*',
      },
      // idempotent rule as the fallback
      {
        pathPattern: '/api/actions/**',
        apiPath: '/api/actions/verse/**',
      },
    ],
  }

  return Response.json(payload, {
    headers: createActionHeaders({ headers: ACTIONS_CORS_HEADERS }),
  })
}

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET
