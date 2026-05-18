import { NextResponse } from 'next/server'
import { db, schema, ensureSchema } from '@/lib/db/client'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 })
    }

    await ensureSchema()
    await db.insert(schema.contacts).values({ name, email, message })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
