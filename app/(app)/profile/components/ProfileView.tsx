'use client'

import AppLayout from '@/components/AppLayout'
import ProfileBlinksLists from './ProfileBlinkLists'

const ProfileView = () => {
  return (
    <AppLayout className='flex gap-10'>
      <div className='flex-[0.2] bg-blue-main text-white px-5'>Profile</div>

      <div className='flex'>
        <ProfileBlinksLists />
      </div>
    </AppLayout>
  )
}

export default ProfileView
