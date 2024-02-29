'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { TbLoader } from 'react-icons/tb'
import { toast } from 'sonner'
import type * as z from 'zod'

import { signUpByEmail } from '@/actions/auth'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUpSchema } from '@/lib/schemas/auth'

import { FormError } from '../../form-error'

export default function SignUp() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: email!,
      password: '',
      confirm_password: '',
      name: '',
    },
  })

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    setError('')

    startTransition(async () => {
      const result = await signUpByEmail(values)
      if (!result.isSuccess) {
        setError(result.error.message)
        toast.error(result.error.message)
        return
      } else {
        toast.success('サインアップに成功しました。')
      }
    })
  }

  return (
    <Suspense>
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
                    disabled={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">パスワード</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-foreground/10"
                    type="password"
                    placeholder="password"
                    {...field}
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  パスワード（確認）
                </FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-foreground/10"
                    type="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">名前</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-foreground/10"
                    placeholder="名前"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <button
            className="bg-primary w-full py-2 rounded-md border border-secondary flex items-center justify-center gap-2 text-foreground disabled:opacity-50"
            type="submit"
            disabled={isPending}
          >
            {isPending && <TbLoader className="-ml-6 w-6 h-6 animate-spin" />}
            サインアップ
          </button>
        </form>
      </Form>
    </Suspense>
  )
}
