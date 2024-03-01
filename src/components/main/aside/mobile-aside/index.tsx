import Link from 'next/link'

import Logo from '@/components/common/logo'

import MobileAsideLeft from './left'
import MobileAsideRight from './right'

export default function MobileAside() {
  return (
    <aside className="fixed z-20 md:hidden w-full text-card-foreground py-2 px-3 flex justify-between items-center backdrop-blur border-b">
      <MobileAsideLeft />
      <Link href="/dashboard">
        <Logo />
      </Link>
      <MobileAsideRight />
    </aside>
  )
}
