'use client'

import { useState } from 'react'

const templates = [
  {
    id: 'business',
    name: 'Бизнес',
    description: 'Классический шаблон для компаний',
    preview: '/templates/business.png'
  },
  {
    id: 'portfolio',
    name: 'Портфолио',
    description: 'Для фрилансеров и творческих профессий',
    preview: '/templates/portfolio.png'
  },
  {
    id: 'restaurant',
    name: 'Ресторан',
    description: 'Специально для кафе и ресторанов',
    preview: '/templates/restaurant.png'
  }
]

export default function TemplateSelector() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')

  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            selectedTemplate === template.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedTemplate(template.id)}
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 text-sm">Preview</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
            <input
              type="radio"
              name="template"
              value={template.id}
              checked={selectedTemplate === template.id}
              onChange={() => setSelectedTemplate(template.id)}
              className="ml-auto"
            />
          </div>
        </div>
      ))}
    </div>
  )
}