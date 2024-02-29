'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { TbLoader } from 'react-icons/tb'
import { toast } from 'sonner'
import type * as z from 'zod'

import { signInByEmail } from '@/actions/auth'
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

import { FormError } from '../../form-error'

export default function SignIn() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: email!,
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    setError('')

    startTransition(async () => {
      const result = await signInByEmail(values)
      if (!result.isSuccess) {
        setError(result.error.message)
        toast.error(result.error.message)
        return
      } else {
        toast.success('サインインに成功しました。')
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">メールアドレス</FormLabel>
                <FormControl>
                  <Input {...field} disabled={true} />
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
          <FormError message={error} />
          <button
            className="bg-primary w-full py-2 rounded-md border border-secondary flex items-center justify-center gap-2 text-foreground disabled:opacity-50"
            type="submit"
            disabled={isPending}
          >
            {isPending && <TbLoader className="-ml-6 w-6 h-6 animate-spin" />}
            サインイン
          </button>
        </form>
      </Form>
      <Link
        href={`/auth/password-reset?email=${email}`}
        className="mt-5 text-center block cursor-pointer underline-offset-4 hover:underline"
      >
        <p className="text-xs text-white/40">パスワードを変更する</p>
      </Link>
    </>
  )
}
