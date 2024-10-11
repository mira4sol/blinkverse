'use client'

import { Button } from '@/components/ui/button'
import LoadingIcon from '@/components/ui/LoadingIcon'
import PlaceHolder from '@/components/ui/PlaceHolder'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { BlinkInterface } from '@/interfaces/models.interface'
import { BlinkService } from '@/lib/services/blink.service'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ProfileBlinkCard from './ProfileBlinkCard'

const ProfileBlinksLists = () => {
  const [blinks, setBlinks] = useState<BlinkInterface[]>([])
  const [blinkLoading, setBlinksLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchBlinks = async () => {
    setBlinksLoading(true)
    const { message, success, data } = await BlinkService.fetchBlinks(
      0,
      user?.id
    )
    if (!success)
      return toast({
        title: 'Error while fetching blink',
        variant: 'destructive',
        description: message,
      })

    setBlinks(data)
  }

  const deleteBlink = (blink_id: string) => {
    setBlinks(blinks.filter((blink) => blink.id !== blink_id))
  }

  useEffect(() => {
    if (user) fetchBlinks().finally(() => setBlinksLoading(false))
  }, [user])

  return (
    <section className='w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Blinks</h2>

        <Link href={'/editor'}>
          <Button className='bg-purple-600 hover:bg-purple-700'>
            <Plus className='w-5 h-5 mr-2' />
            Create New Blink
          </Button>
        </Link>
      </div>

      <div>
        {blinkLoading && (
          <div className='flex items-center justify-center w-full'>
            <LoadingIcon className='mt-10 !w-8 !h-8' />
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {blinks.map((blink) => (
            <ProfileBlinkCard
              key={blink.id}
              blink={blink}
              deleteBlink={deleteBlink}
            />
          ))}
        </div>

        {!blinkLoading && !blinks?.length && (
          <PlaceHolder title='No blink found' />
        )}
      </div>
    </section>
  )
}

export default ProfileBlinksLists
