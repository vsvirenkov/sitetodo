import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient()
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 })
    }

    const { error } = await supabase
      .from('contacts')
      .insert({
        name,
        email,
        message,
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Ошибка при отправке сообщения' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
