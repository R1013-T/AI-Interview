import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'

import { db } from '@/lib/database'

import authConfig from './auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      return session
    },
    async jwt({ token }) {
      return token
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
})
