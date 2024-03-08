'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useChat } from 'ai/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiMiniArrowUpCircle, HiMiniPlusCircle } from 'react-icons/hi2'
import type * as z from 'zod'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { interviewInputSchema } from '@/lib/schemas/interview'

import LoadBounce from '../load-bounce'
import StartInfo from '../start-info'
import InterviewMessageItem from './messageItem'

export default function InterviewChat() {
  const searchParams = useSearchParams()
  const occupation = searchParams.get('occupation')
  const employmentType = searchParams.get('employmentType')

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat()

  const form = useForm<z.infer<typeof interviewInputSchema>>({
    resolver: zodResolver(interviewInputSchema),
    defaultValues: {
      message: '',
    },
  })

  const onHandleChatSubmit = async (
    values: z.infer<typeof interviewInputSchema>,
    event: any,
  ) => {
    messages.unshift(
      {
        id: '1',
        role: 'system',
        content: 'これから就職活動における、面接を行ってください。',
      },
      { id: '2', role: 'system', content: '職種は、エンジニアです。' },
      {
        id: '3',
        role: 'system',
        content: 'まず、最初の挨拶と、質問をしてください。',
      },
    )

    handleSubmit(event)
  }

  useEffect(() => {
    console.log('messages', messages)
  }, [messages])

  useEffect(() => {
    console.log('test')
  }, [])

  return (
    <div className="pt-14 md:pt-3 pb-24 flex flex-col w-full mx-auto">
      <StartInfo />

      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'system' ? (
            <div className="text-white/10">{m.content}</div>
            ) : (
              <InterviewMessageItem {...m} />
          )}
        </div>
      ))}

      {isLoading && <LoadBounce />}

      <div className="absolute bottom-6 left-3 right-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onHandleChatSubmit)}
            className="flex gap-1.5 w-full"
          >
            <Link href="/interview/new"
              className={`${buttonVariants({ variant: 'outline' })} h-11 py-1 px-1 aspect-square`}
            >
              <HiMiniPlusCircle className="w-8 h-8" />
            </Link>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl onChange={handleInputChange}>
                    <Input
                      className="w-full h-[2.8rem] placeholder:text-foreground/10"
                      placeholder="メッセージを入力してください"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="border h-11 aspect-square p-0 rounded-md"
              disabled={isLoading}
            >
              <HiMiniArrowUpCircle className="w-8 h-8" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
