'use server'

import { genSaltSync, hashSync } from 'bcrypt-ts'
import { AuthError } from 'next-auth'
import type * as z from 'zod'

import { createUser, getUserByEmail } from '@/db/methods/user'
import { emailSchema, signInSchema, signUpSchema } from '@/lib/schemas/auth'
import type { ActionsResult, ConfirmEmailActionResult } from '@/types/action'

import { auth, signIn, signOut } from '../../auth'
import { DEFAULT_LOGIN_REDIRECT } from '../../routes'

export const confirmEmail = async (
  values: z.infer<typeof emailSchema>,
): Promise<ConfirmEmailActionResult> => {
  const validateFields = emailSchema.safeParse(values)

  if (!validateFields.success) {
    return {
      actionResult: {
        isSuccess: false,
        error: {
          message: 'Invalid email',
        },
      },
      emailExists: false,
    }
  }

  const { email } = validateFields.data

  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return {
        actionResult: {
          isSuccess: true,
        },
        emailExists: false,
      }
    } else {
      if (!user.password) {
        return {
          actionResult: {
            isSuccess: false,
            error: {
              message:
                'このメールアドレスは既にソーシャルログインで登録されています。',
            },
          },
          emailExists: true,
        }
      }
      return {
        actionResult: {
          isSuccess: true,
        },
        emailExists: true,
      }
    }
  } catch (error) {
    console.error(error)
    return {
      actionResult: {
        isSuccess: false,
        error: {
          message: 'Failed to confirm email',
        },
      },
      emailExists: false,
    }
  }
}

export const signInByEmail = async (
  values: z.infer<typeof signInSchema>,
): Promise<ActionsResult> => {
  const validateFields = signInSchema.safeParse(values)

  if (!validateFields.success) {
    return {
      isSuccess: false,
      error: {
        message: 'Invalid sign in data',
      },
    }
  }

  const { email, password } = validateFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return {
      isSuccess: true,
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            isSuccess: false,
            error: {
              message: 'メールアドレスまたはパスワードが違います。',
            },
          }
        default:
          return {
            isSuccess: false,
            error: {
              message: 'サインインに失敗しました。',
            },
          }
      }
    }
    throw error
  }
}

export const signUpByEmail = async (
  values: z.infer<typeof signUpSchema>,
): Promise<ActionsResult> => {
  const validateFields = signUpSchema.safeParse(values)

  if (!validateFields.success) {
    return {
      isSuccess: false,
      error: {
        message: 'Invalid sign up data',
      },
    }
  }

  const { email, password, name } = validateFields.data

  try {
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return {
        isSuccess: false,
        error: {
          message: 'このメールアドレスは既に登録されています。',
        },
      }
    }

    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt)

    await createUser(email, hashedPassword, name)

    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return {
      isSuccess: true,
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            isSuccess: false,
            error: {
              message: 'メールアドレスまたはパスワードが違います。',
            },
          }
        default:
          return {
            isSuccess: false,
            error: {
              message: 'サインインに失敗しました。',
            },
          }
      }
    }
    throw error
  }
}

export const handleSignOut = async (): Promise<void> => {
  await signOut()
}
