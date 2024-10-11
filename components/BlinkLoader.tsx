import { ActionAdapter, Blink, useAction } from '@dialectlabs/blinks'

import '@dialectlabs/blinks/index.css'
import { Skeleton } from './ui/skeleton'

interface Props {
  url: string
  adapter: ActionAdapter
}

export const BlinkLoader = ({ url, adapter }: Props) => {
  const { action } = useAction({ url: url, adapter })

  return (
    <div className='w-full mb-4'>
      {action ? (
        <Blink
          action={action}
          stylePreset='x-dark'
          websiteText={'BlinkVerse 👁️👁️'}
          websiteUrl={new URL(url).hostname}
        />
      ) : (
        <Skeleton className='h-full w-full rounded-xl' />
      )}
    </div>
  )
}
