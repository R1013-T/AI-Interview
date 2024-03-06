'use client'

import { AreaChart } from '@tremor/react'

const chartdata = [
  {
    date: '2023/01/01',
    score: 70,
  },
  {
    date: '2023/01/02',
    score: 60,
  },
  {
    date: '2023/01/03',
    score: 65,
  },
  {
    date: '2023/01/04',
    score: 70,
  },
  {
    date: '2023/01/05',
    score: 80,
  },
  {
    date: '2023/01/06',
    score: 90,
  },
  {
    date: '2023/01/07',
    score: 85,
  },
  {
    date: '2023/01/08',
    score: 80,
  },
  {
    date: '2023/01/09',
    score: 90,
  },
]

export default function ScoreGraph() {
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

  return (
    <div className="m-3 w-full pr-6">
      <h3 className="mb-2">スコア</h3>
      <div className="h-56 w-full text-card-foreground p-5 px-3.5 bg-card rounded-md border flex gap-1">
        <div className="h-full flex flex-col justify-between text-xs">
          <p>100</p>
          <p>50</p>
          <p>0</p>
        </div>
        <AreaChart
          className="h-full"
          data={chartdata}
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
