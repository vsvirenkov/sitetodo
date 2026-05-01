import { createAdminSupabaseClient, createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean)

async function isAdmin(supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  return ADMIN_EMAILS.includes(user.email || '')
}

// GET all orders (admin only)
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()

    if (!(await isAdmin(supabase))) {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 })
    }

    const adminSupabase = createAdminSupabaseClient()
    const { data, error } = await adminSupabase
      .from('orders')
      .select('*')
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

// PATCH — update order status (admin only)
export async function PATCH(request: Request) {
  try {
    const supabase = await createServerSupabaseClient()

    if (!(await isAdmin(supabase))) {
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

    const adminSupabase = createAdminSupabaseClient()
    const { data, error } = await adminSupabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Ошибка при обновлении заказа' }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Заказ не найден или нет прав для обновления. Убедитесь, что RLS-политика "Admin can update all orders" создана в Supabase.' }, { status: 404 })
    }

    return NextResponse.json({ order: data[0] })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
