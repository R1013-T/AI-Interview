'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { FaGithub, FaGoogle, FaMicrosoft } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi2'
import { TbLoader } from 'react-icons/tb'

import type { OAuthButtonItemProps } from '@/types/auth'

import { DEFAULT_LOGIN_REDIRECT } from '../../../../routes'

const oauthButtonItems = [
  // {
  //   provider: 'microsoft',
  //   displayName: 'Microsoft',
  //   Icon: FaMicrosoft,
  // },
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

export default function OAuthButtons() {
  const [currentProvider, setCurrentProvider] = useState('')

  function handleOAuthSignIn(provider: string) {
    setCurrentProvider(provider)
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  const OAuthButtonItem = ({
    provider,
    displayName,
    Icon,
  }: OAuthButtonItemProps) => {
    return (
      <button
        onClick={() => handleOAuthSignIn(provider)}
        className={`flex justify-between items-center w-full text-white border rounded-md py-2 px-3 ${currentProvider ? 'cursor-not-allowed opacity-50' : 'cursor-pointer group'}`}
      >
        <Icon className="w-7 h-7" />
        <div className="flex items-center justify-center gap-2">
          {currentProvider === provider && (
            <TbLoader className="-ml-6 w-6 h-6 animate-spin" />
          )}
          <p>{displayName}</p>
        </div>
        <HiArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {oauthButtonItems.map((button) => (
        <OAuthButtonItem key={button.provider} {...button} />
      ))}
    </div>
  )
}
