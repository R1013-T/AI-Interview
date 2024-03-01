import Link from 'next/link'

import Logo from '@/components/common/logo'

import BottomNav from '../nav/bottom.nav'
import TopNav from '../nav/top-nav'

export default function DesktopAside() {
  return (
    <aside className="hidden md:block p-3 h-full border border-blue-300">
      <nav className="h-full flex flex-col justify-between">
        <div>
          <Link href="/dashboard" className="mb-3 inline-block">
            <Logo />
          </Link>
          <TopNav />
        </div>
        <BottomNav />
      </nav>
    </aside>
  )
}
