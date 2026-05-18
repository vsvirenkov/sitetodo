import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import DashboardContent from '@/components/DashboardContent'
import Link from 'next/link'

export default async function Dashboard() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Личный кабинет</h1>
              <p className="mt-1 sm:mt-2 text-sm text-gray-600">
                Выберите шаблон и настройте ваш сайт
              </p>
            </div>
            <Link
              href="/orders"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors self-start sm:self-auto"
            >
              📋 Мои заказы
            </Link>
          </div>
        </div>

        <DashboardContent />
      </div>
    </div>
  )
}
