'use client'

import AppLayout from '@/components/AppLayout'
import { BlinkLoader } from '@/components/BlinkLoader'
import LoadingIcon from '@/components/ui/LoadingIcon'
import { BlinkInterface } from '@/interfaces/models.interface'
import { BlinkService } from '@/lib/services/blink.service'
import { useActionsRegistryInterval } from '@dialectlabs/blinks'
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana'
import { clusterApiUrl } from '@solana/web3.js'
import { useEffect, useState } from 'react'

interface Props {
  blink_id: string
}

const VerseView = ({ blink_id }: Props) => {
  const [blink, setBlink] = useState<BlinkInterface>()

  const fetchBlink = async () => {
    const blinkRes = await BlinkService.getOneBlink(blink_id)
    if (blinkRes?.success) {
      setBlink(blinkRes?.data)
    }

    setBlink(blinkRes?.data)
  }

  const { isRegistryLoaded } = useActionsRegistryInterval()
  const { adapter } = useActionSolanaWalletAdapter(
    clusterApiUrl('mainnet-beta')
  )

  const computeUrl = (id: string) => {
    return typeof window !== undefined
      ? `solana-action:${window?.location?.origin}/api/actions/verse/${id}`
      : ''
  }

  useEffect(() => {
    fetchBlink()
  }, [blink_id])

  return (
    <AppLayout className='flex items-center justify-center'>
      {isRegistryLoaded ? (
        <div className='w-96'>
          <BlinkLoader url={computeUrl(blink_id)} adapter={adapter} />
        </div>
      ) : (
        <div className='w-full flex items-center justify-center'>
          <LoadingIcon className='mt-10 !w-8 !h-8' />
        </div>
      )}
    </AppLayout>
  )
}

export default VerseView
