import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db, schema, ensureSchema } from '@/lib/db/client'
import { authConfig } from '@/lib/auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(creds) {
        const email = String(creds?.email || '').trim().toLowerCase()
        const password = String(creds?.password || '')
        if (!email || !password) return null

        await ensureSchema()
        const rows = await db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1)
        const user = rows[0]
        if (!user) return null

        const ok = await bcrypt.compare(password, user.password_hash)
        if (!ok) return null

        return { id: user.id, email: user.email, name: user.name ?? undefined }
      },
    }),
  ],
})
