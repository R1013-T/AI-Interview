import { HiOutlineQueueList } from 'react-icons/hi2'

import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'

import BottomNav from '../nav/bottom-nav'
import TopNav from '../nav/top-nav'

export default function MobileAsideLeft() {
  return (
    <Sheet>
      <SheetTrigger>
        <HiOutlineQueueList className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetDescription className="h-full flex flex-col justify-between">
          <ScrollArea className="h-nav pt-3">
            <TopNav />
          </ScrollArea>
          <BottomNav />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}
