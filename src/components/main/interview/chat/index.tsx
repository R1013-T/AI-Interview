'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useChat } from 'ai/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import type { User } from 'next-auth'
import { useEffect, useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { HiMiniArrowUpCircle, HiMiniPlusCircle } from 'react-icons/hi2'
import { TbLoader } from 'react-icons/tb'
import { toast } from 'sonner'
import type * as z from 'zod'

import {
  getInterviewByIdAction,
  updateInterviewMessageAction,
  updateInterviewResultAction,
} from '@/actions/interview'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { interviewInputSchema } from '@/lib/schemas/interview'
import type { Interview, InterviewResult } from '@/types/interview'

import LoadBounce from '../load-bounce'
import StartInfo from '../start-info'
import FinishButton from './finish-button'
import InterviewMessageItem from './messageItem'
import ResultCard from './resultCard'

export default function InterviewChat() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [user, setUser] = useState<User>()
  const [interviewData, setInterviewData] = useState<Interview>()
  const [isResultLoading, setIsResultLoading] = useState(false)
  const [interviewResult, setInterviewResult] = useState<InterviewResult>()

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat()

  const form = useForm<z.infer<typeof interviewInputSchema>>({
    resolver: zodResolver(interviewInputSchema),
    defaultValues: {
      message: '',
    },
  })

  const onHandleChatSubmit = (
    values: z.infer<typeof interviewInputSchema>,
    event: any,
  ) => {
    setInput(values.message)
    handleSubmit(event)

    startTransition(async () => {
      await updateInterviewMessageAction({
        id: interviewData?.id!,
        messages,
      })
    })
  }

  useEffect(() => {
    form.reset()
    scrollRef?.current?.scrollIntoView()
  }, [messages])

  useEffect(() => {
    setMessages(JSON.parse(interviewData?.questionsAndAnswers || '[]'))
    setInterviewResult({
      score: interviewData?.score || 0,
      advice: interviewData?.feedBack || '',
    })
  }, [interviewData])

  useEffect(() => {
    if (!interviewResult?.advice) return

    startTransition(async () => {
      if (!id) {
        router.push('/interview/new')
        return
      }

      const updateRes = await updateInterviewResultAction({
        id,
        messages,
        score: interviewResult.score,
        advice: interviewResult.advice,
      })
      if (!updateRes.isSuccess) {
        router.push('/interview/new')
        return
      }

      const interviewData = await getInterviewByIdAction(id)
      if (!interviewData.isSuccess) {
        router.push('/interview/new')
        return
      }

      if (!interviewData.data) {
        router.push('/interview/new')
        return
      }
      const { interview } = interviewData.data
      setInterviewData(interview as Interview)
    })
  }, [interviewResult])

  useEffect(() => {
    if (!id) {
      router.push('/interview/new')
      return
    }

    startTransition(async () => {
      const interviewData = await getInterviewByIdAction(id)
      if (!interviewData.isSuccess) {
        router.push('/interview/new')
        return
      }

      if (!interviewData.data) {
        router.push('/interview/new')
        return
      }
      const { interview, user } = interviewData.data
      setInterviewData(interview as Interview)
      setUser(user as User)
    })
  }, [])

  return (
    <div className="pt-14 md:pt-3 pb-24 flex flex-col w-full mx-auto">
      <StartInfo interview={interviewData as Interview} />

      <div className="mt-3 px-1">
        {messages.map((m, index) => (
          <div key={m.id} className="whitespace-pre-wrap flex flex-col gap-3">
            {m.role === 'system' ? null : (
              <InterviewMessageItem
                message={m}
                user={user as User}
                isLoading={isLoading}
                isLast={messages.length === index + 1}
              />
            )}
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="ml-10">
          <LoadBounce />
        </div>
      )}

      {messages.length >= 6 && (
        <div
          ref={scrollRef}
          className="mx-auto mt-3 opacity-0 animate-show-up delay-200"
        >
          {!interviewResult?.advice && (
            <FinishButton
              messages={messages}
              disabled={isLoading || messages.length <= 5 || isResultLoading}
              setInterviewResult={setInterviewResult}
              setIsResultLoading={setIsResultLoading}
            />
          )}
        </div>
      )}

      {interviewResult?.advice && (
        <div className="w-full flex flex-col items-center animate-show-up">
          <ResultCard
            score={interviewResult.score}
            advice={interviewResult.advice}
          />
          <Button
            onClick={() => {
              toast(
                '面接を再開する機能はまだ実装されていません。アップデートをお待ち下さい。',
              )
            }}
          >
            面接を再開する
          </Button>
        </div>
      )}

      <div className="absolute bottom-4 left-3 right-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onHandleChatSubmit)}
            className="flex items-end gap-1.5 w-full"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href="/interview/new"
                    className="h-11 p-1 border aspect-square block rounded-md bg-black hover:bg-white/10 hover:cursor-pointer"
                  >
                    <HiMiniPlusCircle className="w-8 h-8" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm text-muted-foreground">
                    <p>新しい面接</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {isLoading ? (
              <Input
                className="border h-[2.8rem] w-full rounded-md"
                disabled
                value="AIが考え中です…"
              />
            ) : (
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl onChange={handleInputChange}>
                      <Textarea
                        className="border pt-2.5 h-auto overflow-hidden w-full placeholder:text-foreground/10 bg-card focus-visible:ring-0 focus-visible:ring-offset-0 text-base resize-none"
                        rows={1}
                        onInput={(e) => {
                          e.currentTarget.style.height = 'auto'
                          e.currentTarget.style.height =
                            e.currentTarget.scrollHeight + 'px'
                        }}
                        placeholder="メッセージを入力してください"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                          }
                          if (e.key === 'Enter' && e.metaKey) {
                            form.handleSubmit(onHandleChatSubmit)(e)
                          }
                          if (e.key === 'Enter' && e.shiftKey) {
                            form.setValue('message', `${field.value}\n`)
                          }
                        }}
                        disabled={
                          !!(
                            isLoading ||
                            isResultLoading ||
                            interviewResult?.advice
                          )
                        }
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="submit"
                    className="border h-11 aspect-square p-0 rounded-md"
                    disabled={
                      !!(
                        isLoading ||
                        isResultLoading ||
                        interviewResult?.advice
                      )
                    }
                  >
                    {isLoading ? (
                      <TbLoader className="w-6 h-6 animate-spin" />
                    ) : (
                      <HiMiniArrowUpCircle className="w-8 h-8" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm text-muted-foreground flex gap-1">
                    <p>送信</p>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-muted-foreground opacity-100">
                      ⌘ <span className="text-xs">Enter</span>
                    </kbd>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </form>
        </Form>
      </div>
    </div>
  )
}
