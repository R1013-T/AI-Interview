import LoadBounce from '@/components/main/interview/load-bounce'
import StartInfo from '@/components/main/interview/start-info'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function InterviewPage() {
  return (
    <article className="h-full w-full flex flex-col gap-3">
      <ScrollArea className="h-ful">
        <div className="pt-12 md:pt-3 pb-6 min-h-dvh w-full max-w-2xl mx-auto flex flex-col gap-2">
          <StartInfo />
          <p>
            ああああ
            <LoadBounce />
          </p>
        </div>
      </ScrollArea>
    </article>
  )
}
