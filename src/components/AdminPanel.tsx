'use client'

import { useState } from 'react'
import AdminOrders from '@/components/AdminOrders'
import AdminContacts from '@/components/AdminContacts'

const tabs = [
  { id: 'orders', label: '📋 Заказы' },
  { id: 'contacts', label: '✉️ Сообщения' },
]

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('orders')

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-1 sm:gap-2 -mb-px overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'orders' && <AdminOrders />}
      {activeTab === 'contacts' && <AdminContacts />}
    </div>
  )
}
