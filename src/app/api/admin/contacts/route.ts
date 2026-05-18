import { NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db, schema, ensureSchema } from '@/lib/db/client'

export async function GET() {
  try {
    const session = await auth()
    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 })
    }

    await ensureSchema()
    const contacts = await db
      .select()
      .from(schema.contacts)
      .orderBy(desc(schema.contacts.created_at))

    return NextResponse.json({ contacts })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
