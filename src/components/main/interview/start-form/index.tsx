'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { HiArrowRight } from 'react-icons/hi2'
import { TbLoader } from 'react-icons/tb'
import { v4 as uuidv4 } from 'uuid'
import type * as z from 'zod'

import { createInterviewAction } from '@/actions/interview'
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
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof startFormSchema>>({
    resolver: zodResolver(startFormSchema),
    defaultValues: {
      model: '35-turbo',
      employmentType: 'newGraduate',
      occupation: '',
    },
  })

  const onSubmit = (values: z.infer<typeof startFormSchema>) => {
    startTransition(async () => {
      const validateFields = startFormSchema.safeParse(values)
      if (!validateFields.success) return

      const { employmentType, occupation } = validateFields.data
      const id = uuidv4()

      const result = await createInterviewAction({
        id: id!,
        occupation: occupation!,
        employmentType: employmentType! as 'newGraduate' | 'midCareer',
        questionsAndAnswers: JSON.stringify(onmessage),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '',
      })

      if (!result.isSuccess) {
        return
      }

      router.push(`/interview/${id}`)
    })
  }

  return (
    <div className="w-full mx-3 pr-6">
      <h3 className="mb-2">AI模擬面接を始める</h3>
      <div className="w-full text-card-foreground p-5 px-3.5 bg-card rounded-md border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
            {/* <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="ml-1">
                  <FormLabel className="font-semibold">モデル</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="35-turbo" />
                        </FormControl>
                        <FormLabel className="text-base font-semibold">
                          時間が掛かるが、精度が高い
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="4" />
                        </FormControl>
                        <FormLabel className="text-base font-semibold">
                          速いが、精度が低い
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem className="ml-1">
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
            <Button
              className="bg-primary w-full py-2 rounded-md border border-secondary group flex items-center justify-center gap-2 text-foreground disabled:opacity-50"
              type="submit"
              disabled={isPending}
            >
              {isPending && <TbLoader className="w-5 h-5 animate-spin" />}
              AI模擬面接を始める
              <HiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
