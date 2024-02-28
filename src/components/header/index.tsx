import Logo from '../common/logo'
import AuthLink from '../common/auth-link'

export default function TopHeader() {
  return (
    <header className="fixed w-full z-10 p-3 flex items-center justify-between border-b bg-black/10 backdrop-blur">
      <Logo />
      <AuthLink />
    </header>
  )
}
