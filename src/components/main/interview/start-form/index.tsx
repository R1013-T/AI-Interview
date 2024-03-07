'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { TbLoader } from 'react-icons/tb'
import { toast } from 'sonner'
import type * as z from 'zod'

import { FormError } from '@/components/auth/form-error'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { startFormSchema } from '@/lib/schemas/interview'

export default function StartForm() {
  const router = useRouter()

  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof startFormSchema>>({
    resolver: zodResolver(startFormSchema),
    defaultValues: {
      employmentType: 'newGraduate',
      occupation: '',
    },
  })

  const onSubmit = (values: z.infer<typeof startFormSchema>) => {
    setError('')

    startTransition(async () => {
      // const result = await confirmEmail(startFormSchema)
      // if (!result.actionResult.isSuccess) {
      //   setError(result.actionResult.error.message)
      //   return
      // }

      // if (result.emailExists) {
      //   toast.success('メールアドレスを確認しました。')
      //   router.push(`/auth/sign-in?email=${values.email}`)
      // } else {
      //   toast.success('メールアドレスを確認しました。')
      //   // toast.success('確認メールを送信しました。メールのリンクから登録を完了してください。')
      //   router.push(`/auth/sign-up?email=${values.email}`)
      // }
      toast.success(`${values.employmentType}, ${values.occupation}`)
    })
  }

  return (
    <div className="w-full mx-3 pr-6">
      <h3 className="mb-2">AI模擬面接を始める</h3>
      <div className="w-full text-card-foreground p-5 px-3.5 bg-card rounded-md border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">入社形態</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="newGraduate" />
                        </FormControl>
                        <FormLabel className="text-base font-semibold">
                          新卒
                          <span className="text-xs text-foreground/40">
                            （大学生、大学院生、専門学校生）
                          </span>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="midCareer" />
                        </FormControl>
                        <FormLabel className="text-base font-semibold">
                          中途
                          <span className="text-xs text-foreground/40">
                            （社会人、転職者）
                          </span>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">職業</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base placeholder:text-foreground/10"
                      placeholder="エンジニア、デザイナー、営業など"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <Button
              className="bg-primary w-full py-2 rounded-md border border-secondary flex items-center justify-center gap-2 text-foreground disabled:opacity-50"
              type="submit"
              disabled={isPending}
            >
              {isPending && <TbLoader className="-ml-6 w-6 h-6 animate-spin" />}
              AI模擬面接を始める
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
