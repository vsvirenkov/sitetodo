import type { NextAuthConfig } from 'next-auth'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean)

export const authConfig: NextAuthConfig = {
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      if (token.email) {
        token.role = ADMIN_EMAILS.includes(token.email) ? 'admin' : 'user'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = (token.role as string) ?? 'user'
      }
      return session
    },
    authorized({ auth, request }) {
      const protectedRoutes = ['/dashboard', '/orders', '/admin']
      const isProtected = protectedRoutes.some(r => request.nextUrl.pathname.startsWith(r))
      if (!isProtected) return true
      return !!auth?.user
    },
  },
}
