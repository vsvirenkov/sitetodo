import { NextResponse } from 'next/server'
import { desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db, schema, ensureSchema } from '@/lib/db/client'

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо авторизоваться' }, { status: 401 })
    }

    const body = await request.json()
    const { companyName, phone, email, website, colors, packageType, template, comments } = body

    if (!companyName || !phone || !email || !template || !packageType) {
      return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 })
    }

    const validPackages = ['basic', 'standard', 'premium']
    const validTemplates = ['business', 'portfolio', 'restaurant']
    if (!validPackages.includes(packageType) || !validTemplates.includes(template)) {
      return NextResponse.json({ error: 'Недопустимый пакет или шаблон' }, { status: 400 })
    }

    await ensureSchema()
    const [order] = await db
      .insert(schema.orders)
      .values({
        user_id: session.user.id,
        company_name: companyName,
        phone,
        email,
        website: website || null,
        colors: colors || null,
        package: packageType,
        template,
        comments: comments || null,
        status: 'new',
      })
      .returning()

    return NextResponse.json({ order }, { status: 201 })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо авторизоваться' }, { status: 401 })
    }

    await ensureSchema()
    const orders = await db
      .select()
      .from(schema.orders)
      .where(eq(schema.orders.user_id, session.user.id))
      .orderBy(desc(schema.orders.created_at))

    return NextResponse.json({ orders })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
