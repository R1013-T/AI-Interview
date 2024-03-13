import Link from 'next/link'

export default function GuestStart() {
  return (
    <Link
      href="/guest"
      className="mt-5 text-center block cursor-pointer underline-offset-4 hover:underline"
    >
      {/* <p className="text-xs text-white/40">ゲストユーザーで試す</p> */}
    </Link>
  )
}
