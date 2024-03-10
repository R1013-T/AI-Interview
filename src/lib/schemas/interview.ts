import * as z from 'zod'

export const startFormSchema = z.object({
  model: z.union([z.literal('35-turbo'), z.literal('4')], {
    required_error: 'モデルを選択してください',
    invalid_type_error: 'モデルを選択してください',
  }),
  employmentType: z.union([z.literal('newGraduate'), z.literal('midCareer')], {
    required_error: '入社形態を選択してください',
    invalid_type_error: '入社形態を選択してください',
  }),
  occupation: z.string().min(1, { message: '職業を入力してください' }),
})

export const interviewInputSchema = z.object({
  message: z.string().min(1, { message: 'メッセージを入力してください' }),
})

export const createInterviewSchema = z.object({
  id: z.string(),
  occupation: z.string(),
  employmentType: z.union([z.literal('newGraduate'), z.literal('midCareer')], {
    required_error: '入社形態を選択してください',
    invalid_type_error: '入社形態を選択してください',
  }),
  questionsAndAnswers: z.string(),
  score: z.number().optional(),
  feedBack: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export const updateInterviewMessageSchema = z.object({
  id: z.string(),
  message: z.string(),
})
