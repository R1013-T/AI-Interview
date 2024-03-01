'use client'

import Link from 'next/link'
import { useTransition } from 'react'
import { HiMiniArrowLeftOnRectangle } from 'react-icons/hi2'

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
      className="flex items-center gap-2"
    >
      <HiMiniArrowLeftOnRectangle className="w-7 h-7" />
      <p>サインアウト</p>
    </Link>
  )
}
