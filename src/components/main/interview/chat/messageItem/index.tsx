import type { Message } from 'ai/react'
import type { User } from 'next-auth'
import { HiMiniPencilSquare, HiOutlineArrowPath } from 'react-icons/hi2'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import MessageItemButton from './item-button'

export default function InterviewMessageItem({
  message,
  user,
  isLoading,
  isLast,
}: {
  message: Message
  user: User
  isLoading: boolean
  isLast: boolean
}) {
  const roleData: Omit<User, 'id' | 'email'> =
    message.role === 'user'
      ? {
          name: user.name || '',
          image: user.image || '',
        }
      : { name: '面接官', image: '/openai.svg' }

  return (
    <div className="flex gap-2 py-3 opacity-0 animate-show-up delay-200">
      <div className="mr-0.5">
        <Avatar className="w-7 h-7">
          <AvatarImage src={roleData.image || ''} />
          <AvatarFallback>{roleData.name?.[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full">
        <p
          className={`text-sm mb-1 ${roleData.name === '面接官' ? 'text-primary' : 'text-card-foreground'}`}
        >
          {roleData.name}
        </p>
        <p>{message.content}</p>
        {isLast && isLoading ? null : (
          <div className="mt-2">
            {roleData.name === '面接官' ? (
              <div className="">
                <MessageItemButton
                  Icon={HiOutlineArrowPath}
                  text="再生成"
                  handleClick={() =>
                    toast.info(
                      '再生成機能はまだ実装されていません。アップデートをお待ち下さい。',
                    )
                  }
                />
              </div>
            ) : (
              <div className="">
                <MessageItemButton
                  Icon={HiMiniPencilSquare}
                  text="編集"
                  handleClick={() =>
                    toast.info(
                      '編集機能はまだ実装されていません。アップデートをお待ち下さい。',
                    )
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
