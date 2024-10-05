import { Toaster } from '@/components/ui/toaster'
import AuthContextProvider from '@/contexts/AuthContext'
import { WalletAdapterProvider } from '@/contexts/WalletProvider'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Monda, Poppins } from 'next/font/google'
import localFont from 'next/font/local'

import { ENV } from '@/lib/constants/env.constant'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const monda = localFont({
  src: './fonts/monda/Monda-Regular.ttf',
  variable: '--font-monda',
  weight: '400',
})

const poppins = localFont({
  src: [
    {
      path: './fonts/poppins/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/poppins/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/poppins/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    // Add more weights and styles as needed
  ],
  variable: '--font-poppins',
})

const p = Poppins({
  weight: ['100', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: 'normal',
})

const m = Monda({
  weight: ['400', '700'],
  subsets: ['latin'],
  style: 'normal',
})

export const metadata: Metadata = {
  title: 'BlinkVerse',
  description: 'Powering Onchain Social Interactions',
  openGraph: {
    locale: 'locale',
    siteName: 'BlinkVerse',
    type: 'website',
    images: { url: `https://www.blinkverse.fun/images/bg_logo.png` },
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@send_blink',
    site: '@send_blink',
    title: 'BlinkVerse',
    description: 'Powering Solana Social Interactions',
    images: `https://www.blinkverse.fun/images/bg_logo.png`,
  },
  keywords: [
    'solana',
    'blink',
    'defi',
    'nft',
    'tip',
    'donation',
    'crowdfunding',
    'web3',
    'blockchain',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <GoogleTagManager gtmId={ENV.GOOGLE_ANALYTICS || ''} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${m.className} ${p.className} dark antialiased`}
        suppressHydrationWarning
        suppressContentEditableWarning
      >
        <WalletAdapterProvider>
          <AuthContextProvider>
            <Toaster />
            <main>{children}</main>
          </AuthContextProvider>
        </WalletAdapterProvider>
      </body>
    </html>
  )
}
