import { ReactChildrenProps } from '@/interfaces'
import AppBar from './AppBar'

interface Props extends ReactChildrenProps {
  className?: string
}

const AppLayout = ({ children, className }: Props) => {
  return (
    <div className='bg-[#141414]'>
      <AppBar />

      <section className={`mt-10 px-10 ${className}`}>{children}</section>
    </div>
  )
}

export default AppLayout
