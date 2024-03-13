import StartForm from '@/components/main/interview/start-form'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function NewInterviewPage() {
  return (
    <article className="h-full w-full flex flex-col gap-3">
      <ScrollArea className="h-full w-full max-w-2xl mx-auto relative">
        <div className="px-3 pb-6 min-h-dvh w-full flex flex-col justify-end gap-2">
          <StartForm />
        </div>
      </ScrollArea>
    </article>
  )
}
