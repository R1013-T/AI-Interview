'use client'
import type { Message } from 'ai/react'
import axios from 'axios'
import { toast } from 'sonner'
import useSWR from 'swr'

import { Button } from '@/components/ui/button'

export default function FinishButton({
  disabled,
  messages,
}: {
  disabled: boolean
  messages: Message[]
}) {
  return (
    <Button
      className=""
      disabled={disabled}
      onClick={async () => {
        const requestMessages = messages.map(
          ({ id, createdAt, ...rest }) => rest,
        )

        requestMessages.push({
          role: 'system',
          content: `
          これで面接は終了です。質問は終わりの旨を伝え、最後の挨拶とアドバイスを出力してください。\n
          出力形式はJSONで、以下の形式で出力してください。\n
          "advice": 面接官からアドバイスを出力してください。
          "score": 面接を総合的に判定し、100点満点で点数をつけてください。
        `,
        })

        console.log('requestMessages: ', requestMessages)

        await axios
          .post('/api/score', {
            messages: requestMessages,
          })
          .then((res) => {
            console.log(res.data)
            const content = res.data[0].message.content
            console.log(JSON.parse(content))
          })
          .catch((error) => {
            console.error('Error: ', error)
          })
      }}
    >
      面接を終了し、結果を採点する。
    </Button>
  )
}
