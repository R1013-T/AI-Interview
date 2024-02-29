'use client'

import Link from 'next/link'
import { useTransition } from 'react'

import { handleSignOut } from '@/actions/auth'

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <Link
      href="/"
      onClick={() => {
        startTransition(async () => {
          await handleSignOut()
        })
      }}
      className=""
    >
      サインアウト
    </Link>
  )
}
