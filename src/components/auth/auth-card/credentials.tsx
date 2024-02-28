'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInSchema } from '@/lib/schemas/auth'

import { FormError } from '../form-error'

export default function Credentials() {
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    setError('')

    startTransition(async () => {
      // const result = await signIn(values)
      // if (!result.isSuccess) {
      //   setError(result.error.message)
      //   return
      // }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">メールアドレス</FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-foreground/10"
                  placeholder="you@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <button
          className="bg-primary w-full py-2 rounded-md border border-secondary text-foreground"
          type="submit"
          disabled={isPending}
        >
          ログイン
        </button>
      </form>
    </Form>
  )
}
