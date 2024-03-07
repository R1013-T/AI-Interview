'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { HiArrowRight } from 'react-icons/hi2'
import { toast } from 'sonner'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { startFormSchema } from '@/lib/schemas/interview'

export default function StartForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof startFormSchema>>({
    resolver: zodResolver(startFormSchema),
    defaultValues: {
      employmentType: 'newGraduate',
      occupation: '',
    },
  })

  const onSubmit = (values: z.infer<typeof startFormSchema>) => {
    const validateFields = startFormSchema.safeParse(values)
    if (!validateFields.success) return

    const { employmentType, occupation } = validateFields.data

    const japaneseEmploymentType =
      employmentType === 'newGraduate' ? '新卒' : '中途'

    router.push(
      `interview?employmentType=${employmentType}&occupation=${occupation}`,
    )
    toast.info(
      `入社形態「${japaneseEmploymentType}」、職業「 ${values.occupation}」で面接を始めます。`,
    )
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
            >
              AI模擬面接を始める
              <HiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />{' '}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
