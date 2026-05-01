'use client'

const templates = [
  {
    id: 'business',
    name: 'Бизнес',
    description: 'Классический шаблон для компаний',
    icon: '🏢',
  },
  {
    id: 'portfolio',
    name: 'Портфолио',
    description: 'Для фрилансеров и творческих профессий',
    icon: '🎨',
  },
  {
    id: 'restaurant',
    name: 'Ресторан',
    description: 'Специально для кафе и ресторанов',
    icon: '🍽️',
  },
]

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelect: (templateId: string) => void
}

export default function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
            selectedTemplate === template.id
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
          }`}
          onClick={() => onSelect(template.id)}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
              {template.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm sm:text-base">{template.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 truncate sm:whitespace-normal">{template.description}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            }`}>
              {selectedTemplate === template.id && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
