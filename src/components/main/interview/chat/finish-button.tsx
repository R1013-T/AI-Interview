'use client'
import type { Message } from 'ai/react'
import axios from 'axios'
import { TbLoader } from 'react-icons/tb'

import { Button } from '@/components/ui/button'
import type { InterviewResult } from '@/types/interview'

export default function FinishButton({
  disabled,
  messages,
  setInterviewResult,
  setIsResultLoading,
}: {
  disabled: boolean
  messages: Message[]
  setInterviewResult: (result: InterviewResult) => void
  setIsResultLoading: (isLoading: boolean) => void
}) {
  return (
    <Button
      className=""
      disabled={disabled}
      onClick={async () => {
        setIsResultLoading(true)

        const requestMessages = messages.map(
          ({ id, createdAt, ...rest }) => rest,
        )

        requestMessages.pop()

        requestMessages.push({
          role: 'system',
          content: `
          これで面接は終了です。質問は終わりの旨を伝え、最後の挨拶とアドバイスを出力してください。\n
          出力形式はJSONで、以下の形式で出力してください。\n
          "advice": 面接官からアドバイスを出力してください。評価が良かった場合でも、改善点を出力してください。\n
          "score": 面接を総合的に判定し、100点満点で点数をつけてください。点数は厳しくつけてください。挨拶だけの場合や、面接に関係ない返答の場合の点数は0としてください。点数は加点方式で、良い部分があれば加点していってください。\n
        `,
        })

        await axios
          .post('/api/score', {
            messages: requestMessages,
          })
          .then((res) => {
            const content = JSON.parse(res.data[0].message.content)
            const { score, advice } = content

            setInterviewResult({ score, advice })
            setIsResultLoading(false)
          })
          .catch((error) => {
            console.error('Error: ', error)
          })
      }}
    >
      {disabled && <TbLoader className="w-6 h-6 mr-2 animate-spin" />}
      <p>面接を終了し、結果を採点する。</p>
    </Button>
  )
}
