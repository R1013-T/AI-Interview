import Link from 'next/link'

import Logo from '@/components/common/logo'

import Contact from '../contact'
import BottomNav from '../nav/bottom.nav'
import TopNav from '../nav/top-nav'

export default function DesktopAside() {
  return (
    <aside className="hidden md:block p-3 h-full w-48 overflow-hidden border-r text-card-foreground">
      <nav className="h-full flex flex-col justify-between">
        <div>
          <Link href="/dashboard" className="mb-3 inline-block">
            <Logo />
          </Link>
          <TopNav />
        </div>
        <BottomNav />
      </nav>
      <div className="fixed z-20 top-3 right-3.5">
        <Contact />
      </div>
    </aside>
  )
}
