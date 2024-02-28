import * as z from 'zod'

export const signInSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスの形式が正しくありません',
  }),
})