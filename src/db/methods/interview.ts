import type { Message } from 'ai/react'
import { eq } from 'drizzle-orm'

import { db } from '@/lib/database'
import type { Interview } from '@/types/interview'

import { interviews } from '../schema'

export const getInterviewById = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(interviews)
      .where(eq(interviews.id, id))
    return result[0]
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createInterview = async (interview: Interview) => {
  try {
    await db.insert(interviews).values({
      ...interview,
      questionsAndAnswers: JSON.stringify([
        {
          id: '1',
          role: 'system',
          content: `これからに${interview.employmentType === 'newGraduate' ? '新卒' : '中途'}採用おける、面接を行ってください。`,
        },
        {
          id: '2',
          role: 'system',
          content: `職種は、${interview.occupation}です。`,
        },
        {
          id: '3',
          role: 'system',
          content: 'まず、最初の挨拶と、最初の質問をしてください。',
        },
        {
          id: '4',
          role: 'system',
          content:
            'HTMLタグは使用せず、改行コードのみを使用してください。また、ユーザーから面接に関係ない返答が来た際には、「面接に関係ないことには返答出来ません。」と返答してください。',
        },
        {
          id: '5',
          role: 'assistant',
          content: `こんにちは。\n${interview.occupation}の${interview.employmentType === 'newGraduate' ? '新卒' : '中途'}採用面接を行います。よろしくお願いします。\n最初に、自己紹介をお願いします。`,
        },
      ]),
    })
    return true
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateInterviewMessage = async ({
  id,
  messages,
}: {
  id: string
  messages: Message[]
}) => {
  try {
    await db
      .update(interviews)
      .set({ questionsAndAnswers: JSON.stringify(messages) })
      .where(eq(interviews.id, id))
    return true
  } catch (error) {
    console.error(error)
    return null
  }
}
