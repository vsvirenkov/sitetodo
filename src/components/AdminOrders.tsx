'use client'

import { useEffect, useState } from 'react'

interface Order {
  id: string
  user_id: string
  company_name: string
  phone: string
  email: string
  website: string | null
  colors: string | null
  package: string
  template: string
  comments: string | null
  status: string
  created_at: string
}

const statusOptions = [
  { value: 'new', label: 'Новый', color: 'bg-blue-100 text-blue-800' },
  { value: 'in_progress', label: 'В работе', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'review', label: 'На проверке', color: 'bg-purple-100 text-purple-800' },
  { value: 'completed', label: 'Завершён', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Отменён', color: 'bg-red-100 text-red-800' },
]

const packageLabels: Record<string, string> = {
  basic: 'Базовый',
  standard: 'Стандарт',
  premium: 'Премиум',
}

const templateLabels: Record<string, string> = {
  business: 'Бизнес',
  portfolio: 'Портфолио',
  restaurant: 'Ресторан',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Ошибка при загрузке заказов')
        return
      }

      setOrders(data.orders)
    } catch {
      setError('Ошибка сети. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId)
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Ошибка при обновлении статуса')
        return
      }

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } catch {
      alert('Ошибка сети')
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="ml-2 text-gray-600">Загрузка заказов...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700">{error}</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-lg font-semibold text-gray-900">Заказов пока нет</h3>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Счётчик */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        {statusOptions.map(s => {
          const count = orders.filter(o => o.status === s.value).length
          return (
            <span key={s.value} className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${s.color}`}>
              {s.label}: {count}
            </span>
          )
        })}
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Всего: {orders.length}
        </span>
      </div>

      {orders.map((order) => {
        const currentStatus = statusOptions.find(s => s.value === order.status)
        const date = new Date(order.created_at).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })

        return (
          <div key={order.id} className="bg-white rounded-lg shadow p-4 sm:p-6">
            {/* Заголовок */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                  {order.company_name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">{date}</p>
                <p className="text-xs text-gray-400 mt-1 font-mono truncate">ID: {order.id.slice(0, 8)}...</p>
              </div>

              {/* Смена статуса */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${currentStatus?.color || 'bg-gray-100 text-gray-800'}`}>
                  {currentStatus?.label || order.status}
                </span>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  disabled={updatingId === order.id}
                  className="text-xs sm:text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                >
                  {statusOptions.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                {updatingId === order.id && (
                  <svg className="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
              </div>
            </div>

            {/* Детали */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 text-sm">
              <div>
                <span className="text-gray-500">Пакет: </span>
                <span className="font-medium text-gray-900">{packageLabels[order.package] || order.package}</span>
              </div>
              <div>
                <span className="text-gray-500">Шаблон: </span>
                <span className="font-medium text-gray-900">{templateLabels[order.template] || order.template}</span>
              </div>
              <div>
                <span className="text-gray-500">Email: </span>
                <span className="font-medium text-gray-900 break-all">{order.email}</span>
              </div>
              <div>
                <span className="text-gray-500">Телефон: </span>
                <span className="font-medium text-gray-900">{order.phone}</span>
              </div>
              {order.website && (
                <div>
                  <span className="text-gray-500">Сайт: </span>
                  <a href={order.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline break-all">
                    {order.website}
                  </a>
                </div>
              )}
              {order.colors && (
                <div>
                  <span className="text-gray-500">Цвета: </span>
                  <span className="font-medium text-gray-900">{order.colors}</span>
                </div>
              )}
            </div>

            {order.comments && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Комментарий:</span> {order.comments}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
