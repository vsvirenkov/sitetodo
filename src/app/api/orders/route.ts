import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Необходимо авторизоваться' }, { status: 401 })
    }

    const body = await request.json()
    const { companyName, phone, email, website, colors, packageType, template, comments } = body

    if (!companyName || !phone || !email || !template || !packageType) {
      return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
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
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Ошибка при создании заказа' }, { status: 500 })
    }

    return NextResponse.json({ order: data }, { status: 201 })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Необходимо авторизоваться' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Ошибка при получении заказов' }, { status: 500 })
    }

    return NextResponse.json({ orders: data })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
