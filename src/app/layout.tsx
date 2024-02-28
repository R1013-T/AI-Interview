import './globals.css'

import type { Metadata } from 'next'

import { LINESeedJP } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'AI模擬面接',
  description: 'AIとチャット型式で模擬面接を出来ます。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${LINESeedJP.className} font-bold`} >{children}</body>
    </html>
  )
}
