import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import OrdersList from '@/components/OrdersList'

export default async function OrdersPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Мои заказы</h1>
          <p className="mt-1 sm:mt-2 text-sm text-gray-600">
            Здесь вы можете отслеживать статус ваших заказов
          </p>
        </div>

        <OrdersList />
      </div>
    </div>
  )
}
