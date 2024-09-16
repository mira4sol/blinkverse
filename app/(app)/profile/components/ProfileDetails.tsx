'use client'

import { Pen } from 'lucide-react'
import { useState } from 'react'

const ProfileDetails = () => {
  const [isEditing, setIsEditing] = useState(false)

  // const { user } = useAuth()

  return (
    <div className='w-full'>
      <div className='rounded-lg p-5'>
        <div className='flex justify-between items-start mb-6'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>{'Mira'}</h1>
            {/* <p className='text-indigo-300'>{userProfile.email}</p> */}
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300'
          >
            <Pen className='w-4 h-4 mr-2' />
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
        {isEditing ? (
          <div className='space-y-4'>
            <input
              type='text'
              value={'Ahmad Muhammad'}
              className='w-full bg-indigo-700/50 border border-indigo-500 rounded-lg px-4 py-2 text-white'
            />
            <textarea
              value={
                'Passionate about creating innovative blinks in the Solana ecosystem.'
              }
              className='w-full bg-indigo-700/50 border border-indigo-500 rounded-lg px-4 py-2 text-white'
              rows={3}
            />
          </div>
        ) : (
          <p className='text-indigo-200'>
            {
              'Passionate about creating innovative blinks in the Solana ecosystem.'
            }
          </p>
        )}
      </div>
    </div>
  )
}

export default ProfileDetails
