'use client'

import { AreaChart } from '@tremor/react'
import { useEffect, useState, useTransition } from 'react'

import { getInterviewByUserIdAction } from '@/actions/interview'

export default function ScoreGraph() {
  const [isPending, startTransition] = useTransition()

  const [chartData, setChartData] =
    useState<{ score: number; date: string }[]>()

  const customTooltip = (props: any) => {
    const { payload, active } = props
    if (!active || !payload) return null

    return (
      <div className="bg-popover text-foreground border p-2 rounded-md shadow-md">
        <p className="text-sm font-bold">{payload[0].payload.date}</p>
        <p className="text-sm">{payload[0].payload.score}</p>
      </div>
    )
  }

  const formatData = (data: Date): string => {
    const dateString = data.toString()
    const splitDate = dateString.split(' ')
    const formattedDate = `${splitDate[1]} ${splitDate[2]} ${splitDate[4]}`
    return formattedDate
  }

  useEffect(() => {
    startTransition(async () => {
      const response = await getInterviewByUserIdAction()
      if (!response.isSuccess) {
        return
      }

      const data = response.data
      if (!data) return

      const scores = data.map((item) => {
        return {
          score: item.score || 0,
          date: formatData(item.createdAt),
        }
      })
      setChartData(scores)
    })
  }, [])

  if (!chartData?.length) return null

  return (
    <div className="m-3 w-full pr-6">
      <h3 className="mb-2">スコア</h3>
      <div className="h-36 md:h-48 w-full text-card-foreground p-5 px-3.5 bg-card rounded-md border flex gap-1">
        <div className="h-full flex flex-col justify-between text-xs">
          <p>100</p>
          <p>50</p>
          <p>0</p>
        </div>
        <AreaChart
          className="h-full"
          data={chartData as any[]}
          index="date"
          categories={['score']}
          colors={['#3ecf8e']}
          showAnimation={true}
          showXAxis={false}
          showYAxis={false}
          animationDuration={600}
          showLegend={false}
          curveType="natural"
          customTooltip={customTooltip}
        />
      </div>
    </div>
  )
}
