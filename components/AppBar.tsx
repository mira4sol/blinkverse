'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Edit, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { WalletMultiButton } from './dynamic/WalletAdapters'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const AppBar = () => {
  const { isLoggedIn } = useAuth()

  return (
    <header className='bg-blue-main px-10 py-1.5'>
      <nav className='flex flex-1 items-center justify-between'>
        <Link href={'/hub'}>
          <p className='text-white font-[family-name:var(--font-geist-mono)]'>
            BlinkVerse
          </p>
        </Link>

        <div className='flex items-center gap-3'>
          <WalletMultiButton />

          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={'/profile'}>
                    <DropdownMenuItem>
                      <User className='mr-2 h-4 w-4' />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={'/editor'}>
                    <DropdownMenuItem>
                      <Edit className='mr-2 h-4 w-4' />
                      <span>Create Blink</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  )
}

export default AppBar
