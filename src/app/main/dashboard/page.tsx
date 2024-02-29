import SignOutButton from '@/components/auth/sign-out-button'

import { auth } from '../../../../auth'

export default async function DashboardPage() {
  const session = await auth()

  return (
    <article className="p-3 flex flex-col gap-3">
      <h2>Dashboard Page</h2>
      <div>
        <p>email: {session?.user?.email}</p>
        <p>name : {session?.user?.name}</p>
      </div>
      <SignOutButton />
    </article>
  )
}
