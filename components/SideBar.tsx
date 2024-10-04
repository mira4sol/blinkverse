'use client'

import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BrushIcon from './svg/BrushIcon'
import MoneyBagIcon from './svg/MoneyBagIcon'

const SideBar = () => {
  const pathname = usePathname()

  console.log('pathname', pathname)

  const menu = [
    { label: 'Create', url: '/editor', icon: BrushIcon },
    { label: 'All', url: '/hub', icon: MoneyBagIcon },
    { label: 'Donate', url: '/hub/donations', icon: MoneyBagIcon },
    { label: 'NFT', url: '/hub/nft', icon: ImageIcon },
    // { label: 'Swap', url: '/hub', icon: CoinsSwapIcon },
  ]

  return (
    // <section className='bg-gradient-to-b from-[#3B2655] to-[#B28AE4] flex flex-col pt-[48px]'>
    <section className='hidden lg:flex bg-[#191A1F] sticky top-0 flex-col justify-between max-h-screen w-[295px] pt-[48px] pl-[48px]'>
      <div>
        <Link href={'/hub'}>
          <Image
            src={'/images/new_logo.png'}
            height={100}
            width={100}
            alt='logo'
            className='mb-[44px]'
          />
        </Link>

        <div className='flex flex-col items-start gap-[12px]'>
          {menu?.map((item) => (
            <Link key={item?.label} href={item?.url} className={``}>
              <button
                // px-[16px]
                className={`rounded-[4px] py-[4px] flex items-center gap-[8px] text-[#B7B7B7] text-[16px] font-medium font-[family-name:var(--font-poppins)] ${
                  pathname === item.url &&
                  'border-l-2 px-[16px] border-l-[#B28AE4] !text-[#B28AE4]'
                }`}
              >
                <item.icon
                  color={pathname === item.url ? '#B28AE4' : '#B7B7B7'}
                />
                {item?.label}
              </button>
            </Link>
          ))}
        </div>
      </div>

      <div></div>
    </section>
  )
}

export default SideBar
