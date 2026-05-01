'use client'

import { useState } from 'react'
import TemplateSelector from '@/components/TemplateSelector'
import OrderForm from '@/components/OrderForm'

export default function DashboardContent() {
  const [selectedTemplate, setSelectedTemplate] = useState('')

  return (
    <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
          1. Выберите шаблон
        </h2>
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelect={setSelectedTemplate}
        />
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
          2. Заполните данные
        </h2>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <OrderForm selectedTemplate={selectedTemplate} />
        </div>
      </div>
    </div>
  )
}
