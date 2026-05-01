'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Order {
  id: string
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

const statusLabels: Record<string, { label: string; color: string }> = {
  new: { label: 'Новый', color: 'bg-blue-100 text-blue-800' },
  in_progress: { label: 'В работе', color: 'bg-yellow-100 text-yellow-800' },
  review: { label: 'На проверке', color: 'bg-purple-100 text-purple-800' },
  completed: { label: 'Завершён', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Отменён', color: 'bg-red-100 text-red-800' },
}

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

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders')
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

    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
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
        <button
          onClick={() => window.location.reload()}
          className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          Попробовать снова
        </button>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="text-lg font-semibold text-gray-900">Заказов пока нет</h3>
        <p className="mt-2 text-gray-500">
          Перейдите в личный кабинет, чтобы создать свой первый заказ
        </p>
        <Link
          href="/dashboard"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Создать заказ
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const status = statusLabels[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-800' }
        const date = new Date(order.created_at).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })

        return (
          <div key={order.id} className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{order.company_name}</h3>
                <p className="text-sm text-gray-500">{date}</p>
              </div>
              <span className={`mt-2 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                {status.label}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Пакет:</span>
                <span className="ml-1 font-medium text-gray-900">
                  {packageLabels[order.package] || order.package}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Шаблон:</span>
                <span className="ml-1 font-medium text-gray-900">
                  {templateLabels[order.template] || order.template}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <span className="ml-1 font-medium text-gray-900">{order.email}</span>
              </div>
              <div>
                <span className="text-gray-500">Телефон:</span>
                <span className="ml-1 font-medium text-gray-900">{order.phone}</span>
              </div>
            </div>

            {order.comments && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Комментарий:</span> {order.comments}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
