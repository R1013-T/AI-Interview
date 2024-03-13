import './globals.scss'

import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'
import { LINESeedJP } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'AI模擬面接',
  description: 'AIとチャット型式で模擬面接を出来ます。',
  keywords: ['就職活動', '面接', 'AI', 'チャット'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://ai-interview-ten.vercel.app/',
    title: 'AI模擬面接',
    description: 'AIとチャット型式で模擬面接を出来ます。',
    images: [
      {
        url: 'https://raw.githubusercontent.com/R1013-T/AI-Interview/main/public/ai_interview.png',
        width: 256,
        height: 256,
        alt: 'AI模擬面接',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI模擬面接',
    description: 'AIとチャット型式で模擬面接を出来ます。',
    site: '@rtjob2023',
    creator: '@rtjob2023',
    images: [
      'https://raw.githubusercontent.com/R1013-T/AI-Interview/main/public/ai_interview.png',
    ],
  },
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
