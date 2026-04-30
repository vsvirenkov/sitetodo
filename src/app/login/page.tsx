'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

export default function Login() {
  const supabase = createBrowserSupabaseClient()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Войти в личный кабинет
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Создайте аккаунт или войдите, чтобы заказать сайт
          </p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={[]}
          redirectTo="http://localhost:3000/dashboard"
        />
      </div>
    </div>
  )
}