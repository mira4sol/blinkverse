'use client'

import AppLayout from '@/components/AppLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DonationTab from './DonationTab'
import NFTTab from './NftTab'

const AppView = () => {
  return (
    <AppLayout>
      <Tabs defaultValue='donation' className='w-full'>
        <TabsList
          aria-label='tabs categories'
          className='mx-auto mb-6 flex w-full items-center md:max-w-screen-md xl:mb-10'
        >
          <TabsTrigger value='donation'>Donation</TabsTrigger>
          <TabsTrigger value='nft'>NFT</TabsTrigger>
        </TabsList>

        <TabsContent value='donation' className=''>
          <DonationTab />
        </TabsContent>
        <TabsContent value='nft'>
          <NFTTab />
        </TabsContent>
      </Tabs>
    </AppLayout>
  )
}

export default AppView
