import './globals.scss'

import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'
import { LINESeedJP } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'AI模擬面接',
  description: 'AIとチャット型式で模擬面接を出来ます。',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${LINESeedJP.className} h-d-screen font-bold overflow-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
