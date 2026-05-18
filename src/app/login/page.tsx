'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

export default function Login() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      router.push('/dashboard')
    }
  }, [session, status, router])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'register') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || 'Ошибка регистрации')
          return
        }
      }
      const result = await signIn('credentials', { email, password, redirect: false })
      if (result?.error) {
        setError('Неверный email или пароль')
        return
      }
      router.push('/dashboard')
    } catch {
      setError('Ошибка сети')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {mode === 'login' ? 'Войти в личный кабинет' : 'Регистрация'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === 'login'
              ? 'Введите email и пароль'
              : 'Создайте аккаунт, чтобы заказать сайт'}
          </p>
        </div>

        <div className="flex border rounded-md overflow-hidden">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-sm font-medium ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
          >
            Вход
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-sm font-medium ${mode === 'register' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Пароль</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Подождите...' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>
      </div>
    </div>
  )
}
