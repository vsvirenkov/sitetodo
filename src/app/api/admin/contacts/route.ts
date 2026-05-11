import { createAdminSupabaseClient, createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean)

async function isAdmin(supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  return ADMIN_EMAILS.includes(user.email || '')
}

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()

    if (!(await isAdmin(supabase))) {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 })
    }

    const adminSupabase = createAdminSupabaseClient()
    const { data, error } = await adminSupabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Ошибка при получении сообщений' }, { status: 500 })
    }

    return NextResponse.json({ contacts: data })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
