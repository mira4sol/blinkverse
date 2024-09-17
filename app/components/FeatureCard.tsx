import { ReactNode } from 'react'

export const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) => {
  return (
    <div className='bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-500 p-6 rounded-lg'>
      <div className='text-purple-400 mb-4'>{icon}</div>
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-gray-300'>{description}</p>
    </div>
  )
}
