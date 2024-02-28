import { OAuthButtonItemProps } from '@/types/auth'
import { FaGoogle, FaMicrosoft, FaGithub } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi2'

const providers = [
  {
    provider: 'microsoft',
    displayName: 'Microsoft',
    Icon: FaMicrosoft,
  },
  {
    provider: 'google',
    displayName: 'Google',
    Icon: FaGoogle,
  },
  {
    provider: 'github',
    displayName: 'GitHub',
    Icon: FaGithub,
  },
]

const OAuthButtonItem = ({
  provider,
  displayName,
  Icon,
}: OAuthButtonItemProps) => {
  return (
    <button className="flex justify-between w-full text-white border rounded-md py-2 px-3 group">
      <Icon className="w-6 h-6" />
      <p>{displayName}</p>
      <HiArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  )
}

export default function OAuthButtons() {
  return (
    <div className="flex flex-col gap-2">
      {providers.map((provider) => (
        <OAuthButtonItem key={provider.provider} {...provider} />
      ))}
    </div>
  )
}
