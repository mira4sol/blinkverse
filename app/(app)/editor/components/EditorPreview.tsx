import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface Props {
  title: string
  image_url?: string
  description: string
  label: string
}

const EditorPreview = ({ title, description, image_url }: Props) => {
  return (
    <Card className='flex-1'>
      <CardHeader>
        <img
          src={
            image_url ||
            'https:/ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/'
          }
          alt='blink icon'
        />
      </CardHeader>

      <CardContent>
        <p className='font-semibold leading-none tracking-tight'>{title}</p>
        <p className='whitespace-pre-wrap text-muted-foreground] text-sm text-slate-600'>
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export default EditorPreview
