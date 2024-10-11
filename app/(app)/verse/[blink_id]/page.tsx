import VerseView from './components/VerseView'

const VersePage = ({ params }: { params: { blink_id: string } }) => {
  return <VerseView blink_id={params?.blink_id} />
}

export default VersePage
