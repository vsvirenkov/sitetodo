import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import TemplateSelector from '@/components/TemplateSelector'
import OrderForm from '@/components/OrderForm'

export default async function Dashboard() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
          <p className="mt-2 text-sm text-gray-600">
            Выберите шаблон и настройте ваш сайт
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Выберите шаблон</h2>
            <TemplateSelector />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Настройки и заказ</h2>
            <OrderForm />
          </div>
        </div>
      </div>
    </div>
  )
}