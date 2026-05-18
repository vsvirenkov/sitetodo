import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db, schema, ensureSchema } from '@/lib/db/client'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body?.email || '').trim().toLowerCase()
    const password = String(body?.password || '')
    const name = body?.name ? String(body.name).trim() : null

    if (!email || !password) {
      return NextResponse.json({ error: 'Укажите email и пароль' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Пароль должен быть не короче 6 символов' }, { status: 400 })
    }

    await ensureSchema()
    const existing = await db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1)
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Пользователь с таким email уже существует' }, { status: 409 })
    }

    const password_hash = await bcrypt.hash(password, 10)
    await db.insert(schema.users).values({ email, password_hash, name })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
