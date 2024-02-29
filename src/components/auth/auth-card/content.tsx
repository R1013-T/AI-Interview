import OrHorizontal from '@/components/common/or-horizontal'

import Credentials from './credentials/input-email'
import GuestStart from './guest-start'
import OAuthButtons from './oauth-buttons'

export default function AuthCardContent() {
  return (
    <div>
      <OAuthButtons />
      <OrHorizontal />
      <Credentials />
      <GuestStart />
    </div>
  )
}
