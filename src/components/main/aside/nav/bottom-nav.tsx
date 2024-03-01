import SignOutButton from '@/components/auth/sign-out-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { auth } from '../../../../../auth'

export default async function BottomNav() {
  const session = await auth()

  return (
    <div className="h-28 md:h-auto md:max-h-40 overflow-hidden">
      <div className="mb-4 flex md:flex-col items-center gap-3">
        <Avatar className="">
          <AvatarImage src={session?.user?.image || ''} />
          <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
        </Avatar>
        <p className="md:max-h-14 overflow-hidden">{session?.user?.name}</p>
      </div>
      <SignOutButton />
    </div>
  )
}
