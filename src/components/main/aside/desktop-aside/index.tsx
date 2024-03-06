import Link from 'next/link'

import Logo from '@/components/common/logo'
import { ScrollArea } from '@/components/ui/scroll-area'

import Contact from '../contact'
import BottomNav from '../nav/bottom-nav'
import TopNav from '../nav/top-nav'

export default function DesktopAside() {
  return (
    <aside className="hidden md:block p-3 pr-0 h-full w-60 overflow-hidden border-r text-card-foreground">
      <nav className="h-full flex flex-col justify-between relative">
        <div className="h-full">
          <Link
            href="/dashboard"
            className="mb-3 border-b inline-block absolute top-0 left-0 right-0 backdrop-blur z-20"
          >
            <Logo />
          </Link>
          <ScrollArea className="h-full">
            <TopNav />
          </ScrollArea>
        </div>
        <BottomNav />
      </nav>
      <div className="fixed z-20 top-3 right-3.5">
        <Contact />
      </div>
    </aside>
  )
}
