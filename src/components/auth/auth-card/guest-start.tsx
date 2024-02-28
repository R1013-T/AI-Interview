import Link from 'next/link'

export default function GuestStart() {
  return (
    <Link href="/guest" className="mt-5 text-center block cursor-pointer">
      <p className="text-xs text-white/40">ゲストユーザーで試す</p>
    </Link>
  )
}
