import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

import { auth } from '../../../auth'

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (!session) {
    return (
      <main className="h-d-screen w-full flex flex-col gap-5 justify-center items-center">
        <p>セッションが無効です。再度サインインしてください。</p>
        <Link
          href="/auth"
          className={`${buttonVariants({ variant: 'default' })}`}
        >
          サインイン画面に戻る
        </Link>
      </main>
    )
  }

  return (
    <>
      <main>{children}</main>
    </>
  )
}
