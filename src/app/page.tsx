import AuthLink from '@/components/common/buttons/auth-link'
import TopHeader from '@/components/header'

export default function Home() {
  return (
    <main className="flex flex-col h-screen top-bg">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <TopHeader is_link={true} />

      <article className="flex flex-col gap-8 justify-center items-center p-3 h-full">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60  text-center font-sans font-bold tracking-wide">
          AI模擬面接
        </h1>
        <div className="text-card-foreground">
          <p>AIによるチャット形式の模擬面接</p>
          <p>あなたの面接力をAIが評価します</p>
        </div>
        <AuthLink />
      </article>
    </main>
  )
}
