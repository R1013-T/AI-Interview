import type { Message } from "ai/react";

export default function InterviewMessageItem(
  message: Message,
) {

  return (
    <div>
      <p>{message.content}</p>
    </div>
  )
}
