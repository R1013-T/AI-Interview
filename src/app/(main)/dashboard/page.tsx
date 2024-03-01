import SignOutButton from '@/components/auth/sign-out-button'
import { ScrollArea } from '@/components/ui/scroll-area'

import { auth } from '../../../../auth'

export default async function DashboardPage() {
  const session = await auth()

  return (
    <article className="h-full w-full flex flex-col gap-3">
      <ScrollArea className="h-full">
        <div className="pt-12 md:pt-0">
          <h2 className="w-full text-center md:text-left text-card-foreground">
            Dashboard Page
          </h2>
          <div>
            <p>email: {session?.user?.email}</p>
            <p>name : {session?.user?.name}</p>
          </div>
          <SignOutButton />
          <div className="h-screen"></div>
          <div className="h-screen"></div>
        </div>
      </ScrollArea>
    </article>
  )
}
