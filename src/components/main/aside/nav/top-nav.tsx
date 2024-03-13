import Link from 'next/link'

import { getInterviewByUserId } from '@/db/methods/interview'

import { auth } from '../../../../../auth'

type NavItem = {
  id: string
  occupation: string
  score: number | string
}

export default async function TopNav() {
  const session = await auth()
  const interviews = await getInterviewByUserId(session?.user?.id as string)

  if (!interviews) return null
  let navItems: NavItem[] = interviews.map((interview) => ({
    id: interview.id,
    occupation: interview.occupation,
    score: interview.score || '-',
  }))
  navItems.reverse()

  const NavItem = ({
    id,
    occupation,
    score,
  }: {
    id: string
    occupation: string
    score: number | string
  }) => {
    return (
      <Link
        href={`/interview/${id}`}
        className="flex justify-between items-center gap-2 hover:bg-white/25 py-2 px-2.5 mr-3 rounded-md"
      >
        <p className="text-sm">{occupation}</p>
        <p className="text-base">{score}</p>
      </Link>
    )
  }

  return (
    <div className="text-foreground pt-10 pb-56 flex gap-1 flex-col">
      {navItems.map((navItem) => (
        <NavItem
          key={navItem.id}
          id={navItem.id}
          occupation={navItem.occupation}
          score={navItem.score}
        />
      ))}
    </div>
  )
}
