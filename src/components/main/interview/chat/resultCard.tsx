'use client'
import Circle from 'react-circle'

import { Card } from '@/components/ui/card'

export default function ResultCard({
  score,
  advice,
}: {
  score: number
  advice: string
}) {
  return (
    <div className="w-full my-3 p-1">
      <p className="mb-1 ml-0.5">面接結果</p>
      <Card className="w-full flex p-4 gap-3">
        <div className="relative w-28 flex justify-center items-center">
          <Circle
            animate={true}
            roundedStroke={true}
            lineWidth="35"
            progress={score}
            bgColor="#d2d6db"
            progressColor="#3ecf8e"
            textStyle={{
              fontSize: '0px',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-2xl text-primary">{score}</p>
          </div>
        </div>
        <div className="">
          <p className="text-xs mb-1">AI面接官からのアドバイス</p>
          <p className="text-foreground">{advice}</p>
        </div>
      </Card>
    </div>
  )
}
