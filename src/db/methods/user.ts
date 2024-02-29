import { eq } from 'drizzle-orm'

import { db } from '@/lib/database'

import { users } from '../schema'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email))
    return user[0]
  } catch (error) {
    console.error(error)
    return null
  }
}
