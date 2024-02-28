import Link from 'next/link'
import { HiChevronLeft } from 'react-icons/hi2'

export default function BackButton({ href }: { href: string }) {
  return (
    <Link href={href} className="flex gap-1 items-center cursor-pointer">
      <HiChevronLeft className="w-5 h-5" />
      <p className="pt-0.5">もどる</p>
    </Link>
  )
}
