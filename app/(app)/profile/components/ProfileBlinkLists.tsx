import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

const ProfileBlinksLists = () => {
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
    </section>
  )
}

export default ProfileBlinksLists
