import SignOutButton from '@/components/auth/sign-out-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

import { auth } from '../../../../../auth'

export default async function BottomNav() {
  const session = await auth()

  return (
    <div>
      <div className="mb-4 flex flex-col items-center gap-3">
        <Avatar>
          <AvatarImage src={session?.user?.image || ''} />
          <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
        </Avatar>
        <p>{session?.user?.name}</p>
      </div>
      <SignOutButton />
    </div>
  )
}
