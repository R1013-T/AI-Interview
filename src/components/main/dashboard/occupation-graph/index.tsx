'use client'

import { DonutChart } from '@tremor/react'

const occupationData = [
  {
    occupation: 'Software Engineer',
    value: 7,
  },
  {
    occupation: 'Sales',
    value: 5,
  },
  {
    occupation: 'Marketing',
    value: 4,
  },
  {
    occupation: 'Customer Support',
    value: 2,
  },
  {
    occupation: 'HR',
    value: 2,
  },
  {
    occupation: 'Finance',
    value: 1,
  },
]

export default function OccupationGraph() {
  const customTooltip = (props: any) => {
    const { payload, active } = props
    if (!active || !payload) return null

    return (
      <div className="bg-popover text-foreground border p-2 rounded-md shadow-md">
        <p className="text-sm font-bold">{payload[0].payload.occupation}</p>
        <p className="text-sm">{payload[0].payload.value}</p>
      </div>
    )
  }

  if (!occupationData.length) return null

  return (
    <div className="m-3 mt-1 w-full">
      <h3 className="mb-2">職種</h3>
      <div className="h-36 md:h-48 text-card-foreground flex justify-center items-center bg-card rounded-md border">
        <DonutChart
          data={occupationData}
          variant="donut"
          colors={[
            '#3ecf8e',
            'green-400',
            'green-300',
            'green-200',
            'green-100',
            'green-50',
          ]}
          showLabel={false}
          showAnimation={true}
          animationDuration={600}
          className="h-full p-5"
          customTooltip={customTooltip}
        />
      </div>
    </div>
  )
}
