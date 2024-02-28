import Logo from '../common/logo'
import AuthLink from '../common/buttons/auth-link'
import Link from 'next/link'

export default function TopHeader({ is_link }: { is_link?: boolean }) {
  return (
    <header className="fixed w-full z-10 p-3 flex items-center justify-between border-b bg-black/10 backdrop-blur">
      <Link href="/">
        <Logo />
      </Link>
      {is_link && <AuthLink />}
    </header>
  )
}
