'use client'

import { useEffect, useState } from 'react'

interface Contact {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/admin/contacts')
        const data = await res.json()

        if (!res.ok) {
          setError(data.error || 'Ошибка при загрузке сообщений')
          return
        }

        setContacts(data.contacts)
      } catch {
        setError('Ошибка сети. Попробуйте позже.')
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="ml-2 text-gray-600">Загрузка сообщений...</span>
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

  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-lg font-semibold text-gray-900">Сообщений пока нет</h3>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-2">Всего сообщений: {contacts.length}</p>

      {contacts.map((contact) => {
        const date = new Date(contact.created_at).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })

        return (
          <div key={contact.id} className="bg-white rounded-lg shadow p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-medium text-gray-900 truncate">{contact.name}</span>
                <a href={`mailto:${contact.email}`} className="text-sm text-blue-600 hover:underline truncate">
                  {contact.email}
                </a>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{date}</span>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</p>
          </div>
        )
      })}
    </div>
  )
}
