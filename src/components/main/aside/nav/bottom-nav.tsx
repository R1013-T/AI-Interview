import SignOutButton from '@/components/auth/sign-out-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { auth } from '../../../../../auth'

export default async function BottomNav() {
  const session = await auth()

  return (
    <div className="absolute bottom-0 right-2.5 left-0 p-3 py-3.5 backdrop-blur rounded-md border overflow-hidden flex flex-col items-start md:items-center gap-3">
      <div className="flex items-center gap-3 md:flex-col">
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
