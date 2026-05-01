'use client'

import { useState } from 'react'

interface OrderFormProps {
  selectedTemplate: string
}

export default function OrderForm({ selectedTemplate }: OrderFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    email: '',
    website: '',
    colors: '',
    packageType: 'basic',
    comments: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!selectedTemplate) {
      setError('Пожалуйста, выберите шаблон')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          template: selectedTemplate,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Произошла ошибка при отправке заказа')
        return
      }

      setSuccess(true)
      setFormData({
        companyName: '',
        phone: '',
        email: '',
        website: '',
        colors: '',
        packageType: 'basic',
        comments: '',
      })
    } catch {
      setError('Ошибка сети. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 text-center">
        <div className="text-3xl sm:text-4xl mb-3">✅</div>
        <h3 className="text-base sm:text-lg font-semibold text-green-800">Заказ отправлен!</h3>
        <p className="mt-2 text-sm text-green-600">
          Мы свяжемся с вами в ближайшее время для обсуждения деталей.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Создать ещё заказ
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!selectedTemplate && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-700">
          ↑ Сначала выберите шаблон выше
        </div>
      )}

      {/* Группа: название + телефон */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Название компании *
          </label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            required
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Телефон *
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Группа: email + сайт */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Текущий сайт
          </label>
          <input
            type="url"
            name="website"
            id="website"
            placeholder="https://..."
            value={formData.website}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Группа: цвета + пакет */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="colors" className="block text-sm font-medium text-gray-700">
            Предпочитаемые цвета
          </label>
          <input
            type="text"
            name="colors"
            id="colors"
            placeholder="синий, белый, серый"
            value={formData.colors}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="packageType" className="block text-sm font-medium text-gray-700">
            Пакет услуг *
          </label>
          <select
            name="packageType"
            id="packageType"
            value={formData.packageType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="basic">Базовый (10 000 ₽)</option>
            <option value="standard">Стандарт (20 000 ₽)</option>
            <option value="premium">Премиум (30 000 ₽)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
          Дополнительные пожелания
        </label>
        <textarea
          name="comments"
          id="comments"
          rows={3}
          value={formData.comments}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Опишите, что хотите видеть на сайте..."
        />
      </div>

      <button
        type="submit"
        disabled={loading || !selectedTemplate}
        className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Отправка...
          </span>
        ) : (
          'Отправить заказ'
        )}
      </button>
    </form>
  )
}
