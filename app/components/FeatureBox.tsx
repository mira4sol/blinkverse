import { ReactNode } from 'react'

export const FeatureBox = ({
  icon,
  text,
}: {
  icon: ReactNode
  text: string
}) => (
  <div className='flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-3'>
    <div className='text-blue-300'>{icon}</div>
    <span className='text-white font-medium'>{text}</span>
  </div>
)
