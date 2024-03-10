import React from 'react'
import type { IconType } from 'react-icons/lib'

export default function MessageItemButton({
  Icon,
  text,
  handleClick,
}: {
  Icon: IconType
  text: string
  handleClick: () => void
}) {
  return (
    <div
      className="text-white/50 flex items-center gap-1 hover:cursor-pointer hover:text-white/70"
      onClick={handleClick}
    >
      <Icon className="w-5 h-5 " />
      <p className="text-sm font-medium">{text}</p>
    </div>
  )
}
