import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

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

export const createUser = async (
  email: string,
  password: string,
  name: string,
) => {
  try {
    await db.insert(users).values({
      id: uuidv4(),
      email,
      password,
      name,
    })
    return true
  } catch (error) {
    console.error(error)
    return null
  }
}
