import { Toaster } from '@/components/ui/toaster'
import AuthContextProvider from '@/contexts/AuthContext'
import { WalletAdapterProvider } from '@/contexts/WalletProvider'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
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
  subsets: ['latin-ext'],
  style: 'normal',
})

export const metadata: Metadata = {
  title: 'BlinkVerse',
  description: 'Powering Blink Creation',
  openGraph: {
    locale: 'locale',
    siteName: 'BlinkVerse',
    type: 'website',
    images: { url: `https://www.blinkverse.fun/images/blink_img.png` },
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@send_blink',
    site: '@send_blink',
    title: 'BlinkVerse',
    description: 'Powering Solana Social Interactions',
    images: `https://www.blinkverse.fun/images/logo.png`,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${monda.variable} ${p.className} dark antialiased`}
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
