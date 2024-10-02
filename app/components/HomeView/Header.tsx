'use client'

import Logo from '@/public/images/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

import { Sun } from 'lucide-react'
import { useState } from 'react'

const navList: ('home' | 'about' | 'reviews')[] = ['home', 'about', 'reviews'];

const Header = () => {
    const [activeNav, setActiveNav] = useState<'home' | 'about' | 'reviews'>('home')


    return (
        <header className='px-5 pb-10 flex items-center justify-between text-white'>
                <Image src={Logo} alt='BlinkVerse Logo' height={100} width={100}/>
            <nav>
                <ul className='flex items-center gap-4'>
                    {navList.map(item => 
                    <Link 
                    href={`#${item}`} 
                    className={`${activeNav === item ? 'text-primary-color' : 'text-white'}`}
                    onClick={() => setActiveNav(item)}
                    key={item}>{capitalizeFirst(item)}</Link>)}
                    <li>Create</li>
                </ul>
            </nav>
            <section className='flex items-center gap-6'>
                <button className='bg-secondary-color p-2 rounded-full'><Sun color='#B073FF'/></button>
                <div className='rounded-lg bg-gradient-to-b p-px from-primary-color to-[#2c1d3e]'>
                <button 
                className='rounded-md px-4 py-2 text-primary-color bg-secondary-color'>
                        Launch App
                        </button>
                </div>
            </section>
        </header>
    )

}



function capitalizeFirst(string: string) {
    if (string.length === 0) {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export default Header