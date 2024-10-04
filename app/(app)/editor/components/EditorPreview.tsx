import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Props {
  title: string
  image_url?: string
  description: string
  label: string
}

const EditorPreview = ({ title, description, image_url, label }: Props) => {
  return (
    <Card className='flex-1'>
      <CardHeader>
        <img
          src={image_url || '/images/blink_img.png'}
          // height={500}
          // width={500}
          className='w-full h-full'
          alt='blink icon'
        />
      </CardHeader>

      <CardContent>
        <p className='font-semibold leading-none tracking-tight'>{title}</p>
        <p className='mt-1 whitespace-pre-wrap text-muted-foreground] text-sm text-slate-600'>
          {description}
        </p>
      </CardContent>

      <CardFooter>
        <div className='flex w-full items-center space-x-2'>
          <Input
            type='number'
            placeholder='Enter custom amount'
            className='w-full'
          />
          <Button>{label}</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default EditorPreview
