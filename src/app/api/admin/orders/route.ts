import { NextResponse } from 'next/server'
import { desc, eq, sql } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db, schema, ensureSchema } from '@/lib/db/client'

function isAdmin(role?: string | null) {
  return role === 'admin'
}

export async function GET() {
  try {
    const session = await auth()
    if (!isAdmin(session?.user?.role)) {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 })
    }

    await ensureSchema()
    const orders = await db
      .select()
      .from(schema.orders)
      .orderBy(desc(schema.orders.created_at))

    return NextResponse.json({ orders })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth()
    if (!isAdmin(session?.user?.role)) {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 })
    }

    const body = await request.json()
    const { orderId, status } = body

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Укажите orderId и status' }, { status: 400 })
    }

    const validStatuses = ['new', 'in_progress', 'review', 'completed', 'cancelled']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Недопустимый статус' }, { status: 400 })
    }

    await ensureSchema()
    const updated = await db
      .update(schema.orders)
      .set({ status, updated_at: sql`CURRENT_TIMESTAMP` })
      .where(eq(schema.orders.id, orderId))
      .returning()

    if (updated.length === 0) {
      return NextResponse.json({ error: 'Заказ не найден' }, { status: 404 })
    }

    return NextResponse.json({ order: updated[0] })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
