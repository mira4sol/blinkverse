'use client'

import { CaretDownIcon } from '@radix-ui/react-icons'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { CopyIcon, Edit, LogOut, User, Wallet } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
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
  const { connected, publicKey, disconnect, wallet } = useWallet()
  const { setVisible } = useWalletModal()
  const [slicedPublicKey, setSlicedPublicKey] = useState('')

  useEffect(() => {
    if (!publicKey) return setSlicedPublicKey('')

    const base58 = publicKey.toBase58()
    setSlicedPublicKey(base58.slice(0, 4) + '..' + base58.slice(-4))
  }, [publicKey])

  return (
    <header className='pt-[48px] pb-[24px]'>
      <nav className='flex flex-1 items-center justify-between'>
        <div></div>

        <div className='flex items-center gap-3'>
          {/* <WalletMultiButton style={{ background: '#B073FF', height: 40 }} /> */}

          {!connected && (
            <Button
              className='bg-[#B073FF] hover:bg-[#B073FF] hover:bg-opacity-50 text-white font-bold text-[16px] h-[40px]'
              onClick={() => setVisible(true)}
            >
              Connect Wallet
            </Button>
          )}

          {connected && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='bg-[#B073FF] hover:bg-[#B073FF] hover:bg-opacity-50 text-white font-bold text-[16px] h-[40px] gap-[8px]'>
                  <Image
                    src={wallet?.adapter.icon || ''}
                    height={24}
                    width={24}
                    alt='wallet icon'
                  />
                  {slicedPublicKey}
                  <CaretDownIcon className='h-[16px] w-[16px]' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-48 mt-1 bg-[#2c2d30]'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                <DropdownMenuSeparator className='bg-neutral-600' />

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

                  <DropdownMenuSeparator className='bg-neutral-600' />

                  <DropdownMenuItem
                    onClick={() => {
                      navigator.clipboard.writeText(publicKey?.toBase58() || '')
                    }}
                  >
                    <CopyIcon className='mr-2 h-4 w-4' />
                    <span>Copy Address</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setVisible(true)}>
                    <Wallet className='mr-2 h-4 w-4' />
                    <span>Change Wallet</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => disconnect()}>
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
