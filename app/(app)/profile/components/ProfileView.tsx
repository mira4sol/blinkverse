'use client'

import AppLayout from '@/components/AppLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, ShapesIcon } from 'lucide-react'
import ProfileBlinksLists from './ProfileBlinkLists'
import ProfileDetails from './ProfileDetails'
import ProfileNFTTab from './ProfileNFTTab'

const ProfileView = () => {
  return (
    <AppLayout className='flex flex-col lg:flex-row gap-10'>
      <div className='flex-[0.3] bg-gradient-to-br from-purple-900 to-indigo-900 text-white h-fit'>
        <ProfileDetails />
      </div>

      <Tabs defaultValue='all' className='flex-1'>
        <TabsList
          aria-label='tabs categories'
          className='mx-auto mb-6 flex w-full items-center md:max-w-screen-md xl:mb-10'
        >
          <TabsTrigger value='all'>
            <Eye className='w-4 h-4 mr-1' /> Blinks
          </TabsTrigger>
          <TabsTrigger value='nft'>
            <ShapesIcon className='w-4 h-4 mr-1' /> NFT
          </TabsTrigger>
        </TabsList>

        <TabsContent value='all' className=''>
          <ProfileBlinksLists />
        </TabsContent>
        <TabsContent value='nft'>
          <ProfileNFTTab />
        </TabsContent>
      </Tabs>
    </AppLayout>
  )
}

export default ProfileView
