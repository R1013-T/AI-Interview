import * as z from 'zod'

export const startFormSchema = z.object({
  employmentType: z.union([z.literal('newGraduate'), z.literal('midCareer')], {
    required_error: '入社形態を選択してください',
    invalid_type_error: '入社形態を選択してください',
  }),
  occupation: z.string().min(1, { message: '職業を入力してください' }),
})
