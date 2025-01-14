import { validatedQueryParams } from '@/lib/blink.lib'

export const POST = async (
  req: Request,
  { params }: { params: { blink_id: string } }
) => {
  console.log('I ran', new Date(Date.now()).toLocaleTimeString())
  const requestUrl = new URL(req.url)
  const blink_id = params.blink_id.split('&')[0]

  const { amount, toPubkey, token, isProfile } =
    validatedQueryParams(requestUrl)

  try {
  } catch {}
}
