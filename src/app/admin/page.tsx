import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import AdminPanel from '@/components/AdminPanel'

export default async function AdminPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (session.user.role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔧</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Админ-панель</h1>
              <p className="mt-1 text-sm text-gray-600">
                Управление заказами и сообщениями
              </p>
            </div>
          </div>
        </div>

        <AdminPanel />
      </div>
    </div>
  )
}
