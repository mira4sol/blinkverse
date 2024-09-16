'use client'

import AppLayout from '@/components/AppLayout'
import ProfileBlinksLists from './ProfileBlinkLists'
import ProfileDetails from './ProfileDetails'

const ProfileView = () => {
  return (
    <AppLayout className='flex flex-col lg:flex-row gap-10'>
      <div className='flex-[0.3] bg-gradient-to-br from-purple-900 to-indigo-900 text-white'>
        <ProfileDetails />
      </div>

      <div className='flex-1'>
        <ProfileBlinksLists />
      </div>
    </AppLayout>
  )
}

export default ProfileView
