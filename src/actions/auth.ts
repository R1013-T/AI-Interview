'use server'

import type * as z from 'zod'

import { getUserByEmail } from '@/db/methods/user'
import { emailSchema } from '@/lib/schemas/auth'
import type { ConfirmEmailActionResult } from '@/types/action'

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

  const user = await getUserByEmail(email)

  if (!user) {
    return {
      actionResult: {
        isSuccess: true,
      },
      emailExists: false,
    }
  }

  return {
    actionResult: {
      isSuccess: true,
    },
    emailExists: true,
  }
}
