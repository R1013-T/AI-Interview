'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useChat } from 'ai/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiMiniArrowUpCircle, HiMiniPlusCircle } from 'react-icons/hi2'
import { TbLoader } from 'react-icons/tb'
import type * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { interviewInputSchema } from '@/lib/schemas/interview'

import LoadBounce from '../load-bounce'
import StartInfo from '../start-info'
import InterviewMessageItem from './messageItem'

export default function InterviewChat() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const occupation = searchParams.get('occupation')
  const employmentType = searchParams.get('employmentType')

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
    console.log('values', values)
  }

  useEffect(() => {
    console.log('messages', messages)
    form.reset()
  }, [messages])

  useEffect(() => {
    if (!occupation || !employmentType) router.push('/interview/new')

    setMessages([
      {
        id: '1',
        role: 'system',
        content: `これからに${employmentType === 'newGraduate' ? '新卒' : '中途'}採用おける、面接を行ってください。`,
      },
      { id: '2', role: 'system', content: `職種は、${occupation}です。` },
      {
        id: '3',
        role: 'system',
        content: 'まず、最初の挨拶と、最初の質問をしてください。',
      },
      {
        id: '4',
        role: 'system',
        content: 'HTMLタグは使用せず、改行コードのみを使用してください。',
      },
      {
        id: '5',
        role: 'assistant',
        content: `こんにちは。\n${occupation}の${employmentType === 'newGraduate' ? '新卒' : '中途'}採用面接を行います。よろしくお願いします。\n最初に、自己紹介をお願いします。`,
      },
    ])
  }, [])

  return (
    <div className="pt-14 md:pt-3 pb-24 flex flex-col w-full mx-auto">
      <StartInfo />

      <div className="opacity-0 animate-show-up delay-200">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'system' ? (
              <div className="text-white/10">{m.content}</div>
            ) : (
              <InterviewMessageItem {...m} />
            )}
          </div>
        ))}
      </div>

      {isLoading && <LoadBounce />}

      <div className="absolute bottom-6 left-3 right-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onHandleChatSubmit)}
            className="flex items-end gap-1.5 w-full"
          >
            <Link
              href="/interview/new"
              className="h-11 p-1 border aspect-square rounded-md hover:bg-white/10 hover:cursor-pointer"
            >
              <HiMiniPlusCircle className="w-8 h-8" />
            </Link>
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
                    <FormControl>
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
                          if (e.key === 'Enter') e.preventDefault()
                          if (e.key === 'Enter' && e.metaKey) {
                            console.log('metaKey')
                            form.handleSubmit(onHandleChatSubmit)(e)
                          }
                          if (e.key === 'Enter' && e.shiftKey) {
                            form.setValue('message', `${field.value}\n`)
                          }
                        }}
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <Button
              type="submit"
              className="border h-11 aspect-square p-0 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <TbLoader className="w-6 h-6 animate-spin" />
              ) : (
                <HiMiniArrowUpCircle className="w-8 h-8" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
