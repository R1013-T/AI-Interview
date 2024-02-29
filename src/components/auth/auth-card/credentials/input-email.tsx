'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { TbLoader } from 'react-icons/tb'
import { toast } from 'sonner'
import type * as z from 'zod'

import { confirmEmail } from '@/actions/auth'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { emailSchema } from '@/lib/schemas/auth'

import { FormError } from '../../form-error'

export default function Credentials() {
  const router = useRouter()

  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof emailSchema>) => {
    setError('')

    startTransition(async () => {
      const result = await confirmEmail(values)
      if (!result.actionResult.isSuccess) {
        setError(result.actionResult.error.message)
        return
      }

      if (result.emailExists) {
        toast.success('メールアドレスを確認しました。')
        router.push(`/auth/sign-in?email=${values.email}`)
      } else {
        toast.success('メールアドレスを確認しました。')
        // toast.success('確認メールを送信しました。メールのリンクから登録を完了してください。')
        router.push(`/auth/sign-up?email=${values.email}`)
      }
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
          className="bg-primary w-full py-2 rounded-md border border-secondary flex items-center justify-center gap-2 text-foreground disabled:opacity-50"
          type="submit"
          disabled={isPending}
        >
          {isPending && <TbLoader className="-ml-6 w-6 h-6 animate-spin" />}
          つぎへ
        </button>
      </form>
    </Form>
  )
}
