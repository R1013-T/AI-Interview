import InterviewChat from '@/components/main/interview/chat'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function InterviewPage({
  params,
}: {
  params: { interview_id: string }
}) {
  return (
    <article className="h-full w-full flex flex-col gap-3">
      <ScrollArea className="h-full w-full max-w-2xl mx-auto relative">
        <div className="px-3 min-h-dvh w-full flex flex-col gap-2">
          <InterviewChat id={params.interview_id} />
        </div>
      </ScrollArea>
    </article>
  )
}
