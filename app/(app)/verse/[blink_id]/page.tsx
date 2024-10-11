import { ImageResponse } from 'next/og'
import VerseView from './components/VerseView'

export async function GET({ params }: { params: { blink_id: string } }) {
  try {
    console.log('params', params)
    return new ImageResponse(<div>Hello World</div>)
  } catch (e: any) {
    return new Response('Failed to generate OG image', { status: 500 })
  }
}

const VersePage = ({ params }: { params: { blink_id: string } }) => {
  return <VerseView blink_id={params?.blink_id} />
}

export default VersePage
