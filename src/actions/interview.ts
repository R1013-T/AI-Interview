'use server'

import type { Message } from 'ai/react'
import type * as z from 'zod'

import {
  createInterview,
  getInterviewById,
  updateInterviewMessage,
} from '@/db/methods/interview'
import { getUserByEmail } from '@/db/methods/user'
import {
  createInterviewSchema,
  updateInterviewMessageSchema,
} from '@/lib/schemas/interview'
import type { ActionsResult } from '@/types/action'

import { auth } from '../../auth'

export const getInterviewByIdAction = async (id: string) => {
  const session = await auth()

  try {
    const interview = await getInterviewById(id)
    const user = await getUserByEmail(session?.user?.email as string)

    if (session?.user?.id != user?.id) {
      return {
        isSuccess: false,
        error: {
          message: 'Invalid user id',
        },
      }
    }

    return {
      isSuccess: true,
      data: {
        interview,
        user,
      },
    }
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        message: 'Failed to get interview',
      },
    }
  }
}

export const createInterviewAction = async (
  values: z.infer<typeof createInterviewSchema>,
): Promise<ActionsResult> => {
  const validateFields = createInterviewSchema.safeParse(values)

  const session = await auth()
  const userId = session?.user?.id

  if (userId === undefined) {
    return {
      isSuccess: false,
      error: {
        message: 'Invalid user id',
      },
    }
  }

  if (!validateFields.success) {
    return {
      isSuccess: false,
      error: {
        message: 'Invalid sign in data',
      },
    }
  }

  try {
    await createInterview({
      ...validateFields.data,
      userId,
    })

    return {
      isSuccess: true,
    }
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        message: 'Failed to create interview',
      },
    }
  }
}

export const updateInterviewMessageAction = async (values: {
  id: string
  messages: Message[]
}): Promise<ActionsResult> => {
  try {
    await updateInterviewMessage({
      id: values.id,
      messages: values.messages,
    })

    return {
      isSuccess: true,
    }
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        message: 'Failed to update interview message',
      },
    }
  }
}
