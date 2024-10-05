'use client'

import Logo from '@/public/images/new_logo.png'
import Image from 'next/image'

import Link from 'next/link'
import Nav from './Nav'

const Header = () => {
  return (
    <header className='sm:px-10 px-5 sm:pb-[24px] sm:pt-[48px] pt-[24px] pb-[24px] flex items-center justify-between text-white bg-[#141414]'>
      <div className='relative'>
        <Image src={Logo} alt='BlinkVerse Logo' height={32} width={102} />
      </div>
      <span className='sm:block hidden'>
        <Nav />
      </span>

      <section className='flex items-center gap-6'>
        {/* <button className="bg-secondary-color p-2 rounded-full">
          <Sun color="#B073FF" />
        </button> */}
        {/* <div className='rounded-lg bg-gradient-to-b p-px from-primary-color to-[#2c1d3e]'> */}
        <Link href={'/hub'}>
          <button className='rounded-md px-4 py-2 border border-[#B073FF] text-[#B073FF] bg-[#191A1F] sm:text-base text-xs'>
            Launch App
          </button>
        </Link>
        {/* </div> */}
      </section>
    </header>
  )
}

export default Header
