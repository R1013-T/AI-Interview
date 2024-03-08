import { ScrollArea } from '@/components/ui/scroll-area'

export default function NewInterviewPage() {
  return (
    <article className="h-full w-full flex flex-col gap-3">
      <ScrollArea className="h-full w-full max-w-2xl mx-auto relative">
        <div className="px-3 min-h-dvh w-full flex flex-col gap-2">
          <p>new interview page</p>
        </div>
      </ScrollArea>
    </article>
  )
}
