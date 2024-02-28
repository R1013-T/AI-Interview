import Link from 'next/link'
import { buttonVariants } from '../../ui/button'

export default function AuthLink() {
  return (
    <Link href="/auth" className={`${buttonVariants({ variant: 'default' })}`}>
      AI面接を始める
    </Link>
  )
}
