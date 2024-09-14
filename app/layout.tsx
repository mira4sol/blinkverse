import { Toaster } from '@/components/ui/toaster'
import AuthContextProvider from '@/contexts/AuthContext'
import { WalletAdapterProvider } from '@/contexts/WalletProvider'
import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'BlinkVerse',
  description: 'Powering Blink Creation',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
