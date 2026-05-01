-- =============================================
-- SiteForU — SQL-схема для Supabase
-- Запустите этот скрипт в Supabase SQL Editor
-- =============================================

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  colors TEXT,
  package TEXT NOT NULL CHECK (package IN ('basic', 'standard', 'premium')),
  template TEXT NOT NULL CHECK (template IN ('business', 'portfolio', 'restaurant')),
  comments TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'review', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица контактных сообщений
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- =============================================
-- RLS (Row Level Security) для таблицы orders
-- =============================================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Пользователь может видеть только свои заказы
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Пользователь может создавать заказы только от своего имени
CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =============================================
-- Админ-политики для orders
-- ВАЖНО: замените 'admin@example.com' на реальный email админа
-- =============================================

-- Админ может видеть все заказы
CREATE POLICY "Admin can view all orders"
  ON orders FOR SELECT
  USING (
    auth.jwt() ->> 'email' IN ('v.svirenkov@gmail.com')
  );

-- Админ может обновлять все заказы (менять статус)
CREATE POLICY "Admin can update all orders"
  ON orders FOR UPDATE
  USING (
    auth.jwt() ->> 'email' IN ('v.svirenkov@gmail.com')
  )
  WITH CHECK (
    auth.jwt() ->> 'email' IN ('v.svirenkov@gmail.com')
  );

-- =============================================
-- RLS для таблицы contacts
-- =============================================
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Любой пользователь (даже неавторизованный) может отправить сообщение
CREATE POLICY "Anyone can insert contacts"
  ON contacts FOR INSERT
  WITH CHECK (true);

-- Админ может просматривать все сообщения
CREATE POLICY "Admin can view all contacts"
  ON contacts FOR SELECT
  USING (
    auth.jwt() ->> 'email' IN ('v.svirenkov@gmail.com')
  );

-- =============================================
-- Автоматическое обновление updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
