'use client'

import AppLayout from '@/components/AppLayout'
import AllBlinksTab from './AllBlinksTab'

const HubView = () => {
  return (
    <AppLayout>
      {/* <Tabs defaultValue="all" className=" w-full overflow-x">
        <TabsList
          aria-label="tabs categories"
          className="mx-auto mb-6 flex w-full items-center md:max-w-screen-md xl:mb-10"
        >
          <TabsTrigger value="all">
            <Globe className="w-4 h-4 mr-1" /> All
          </TabsTrigger>
          <TabsTrigger value="nft">
            <Sparkles className="w-4 h-4 mr-1" /> NFT
          </TabsTrigger>
          <TabsTrigger value="swap">
            <Shuffle className="w-4 h-4 mr-1" /> Swap
          </TabsTrigger>
          <TabsTrigger value="donations">
            <Gift className="w-4 h-4 mr-1" /> Donations
          </TabsTrigger>
          <TabsTrigger value="crowdfunding">
            <Zap className="w-4 h-4 mr-1" /> Crowdfunding
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="">
          <AllBlinksTab />
        </TabsContent>
        <TabsContent value="nft">
          <NFTTab />
        </TabsContent>
        <TabsContent value="swap">
          <NFTTab />
        </TabsContent>
        <TabsContent value="donations" className="">
          <DonationTab />
        </TabsContent>
        <TabsContent value="crowdfunding" className="">
          <NFTTab />
        </TabsContent>
      </Tabs> */}

      <AllBlinksTab />
    </AppLayout>
  )
}

export default HubView
