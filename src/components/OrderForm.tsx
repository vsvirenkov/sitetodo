'use client'

import { useState } from 'react'

export default function OrderForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    email: '',
    website: '',
    colors: '',
    package: 'basic'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки заказа
    console.log('Order submitted:', formData)
    alert('Заказ отправлен! Мы свяжемся с вами в ближайшее время.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
          Название компании
        </label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          required
          value={formData.companyName}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Телефон
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
          Текущий сайт (если есть)
        </label>
        <input
          type="url"
          name="website"
          id="website"
          value={formData.website}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="colors" className="block text-sm font-medium text-gray-700">
          Предпочитаемые цвета
        </label>
        <input
          type="text"
          name="colors"
          id="colors"
          placeholder="например: синий, белый, серый"
          value={formData.colors}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="package" className="block text-sm font-medium text-gray-700">
          Пакет услуг
        </label>
        <select
          name="package"
          id="package"
          value={formData.package}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="basic">Базовый (10 000 ₽)</option>
          <option value="standard">Стандарт (20 000 ₽)</option>
          <option value="premium">Премиум (30 000 ₽)</option>
        </select>
      </div>

      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
          Дополнительные пожелания
        </label>
        <textarea
          name="comments"
          id="comments"
          rows={4}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Опишите, что хотите видеть на сайте..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Отправить заказ
      </button>
    </form>
  )
}