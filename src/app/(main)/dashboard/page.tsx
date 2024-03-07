import OccupationGraph from '@/components/main/dashboard/occupation-graph'
import ScoreGraph from '@/components/main/dashboard/score-graph'
import StartForm from '@/components/main/interview/start-form'
import { ScrollArea } from '@/components/ui/scroll-area'

import { auth } from '../../../../auth'

export default async function DashboardPage() {
  const session = await auth()

  return (
    <article className="h-full w-full flex flex-col gap-3">
      <ScrollArea className="h-ful">
        <div className="pt-12 md:pt-3 pb-6 min-h-dvh w-full max-w-2xl mx-auto flex flex-col justify-between gap-2">
          <div>
            <h2 className="w-full text-center p-3 text-xl md:text-left text-card-foreground">
              ダッシュボード
            </h2>
            <div className="w-full flex flex-col">
              <ScoreGraph />
              <div className="w-full pr-6 flex">
                <OccupationGraph />
                <div className="w-full"></div>
              </div>
            </div>
          </div>
          <StartForm />
        </div>
      </ScrollArea>
    </article>
  )
}
