import * as z from 'zod'

export const emailSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスの形式が正しくありません',
  }),
})

export const signInSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスの形式が正しくありません',
  }),
  password: z.string().min(8, {
    message: 'パスワードは8文字以上で入力してください',
  }),
})

export const signUpSchema = z
  .object({
    email: z.string().email({
      message: 'メールアドレスの形式が正しくありません',
    }),
    password: z.string().min(8, {
      message: 'パスワードは8文字以上で入力してください',
    }),
    confirm_password: z.string().min(8, {
      message: 'パスワードは8文字以上で入力してください',
    }),
    name: z.string().min(1, {
      message: '名前を入力してください',
    }),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        path: ['confirm_password'],
        code: 'custom',
        message: 'パスワードが一致しません',
      });
    }
  });

