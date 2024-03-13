import Image from 'next/image'

import AuthLink from '@/components/common/buttons/auth-link'
import TopHeader from '@/components/header'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Home() {
  return (
    <main className="flex flex-col h-screen top-bg">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <TopHeader is_link={true} />
      <ScrollArea className="h-full">
        <article className="flex z-20 my-24 flex-col gap-8 justify-center items-center p-3">
          <h1 className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60  text-center font-sans font-bold tracking-wide">
            AI模擬面接
          </h1>
          <h2>
            AIがチャット形式で面接を行い、
            <br />
            面接の結果を分析します。
          </h2>
          <AuthLink />
          <Image src="/mock.png" alt="hero" width={1034} height={658} />
          <AuthLink />
        </article>
      </ScrollArea>
    </main>
  )
}
