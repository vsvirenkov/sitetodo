import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const rawDatabaseUrl = process.env.DATABASE_URL || 'file:./data/app.db'
const databaseUrl = prepareDatabaseUrl(rawDatabaseUrl)

const client = createClient({ url: databaseUrl })

let initPromise: Promise<void> | null = null

function prepareDatabaseUrl(rawUrl: string): string {
  if (!rawUrl.startsWith('file:')) {
    return rawUrl
  }

  const filePart = rawUrl.slice(5).split('?')[0]
  const dbPath = path.isAbsolute(filePart)
    ? filePart
    : path.resolve(process.cwd(), filePart)

  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '')
  }

  return rawUrl
}

export function ensureSchema(): Promise<void> {
  if (initPromise) return initPromise
  initPromise = (async () => {
    await client.batch(
      [
        `CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          name TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS orders (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          company_name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NOT NULL,
          website TEXT,
          colors TEXT,
          package TEXT NOT NULL,
          template TEXT NOT NULL,
          comments TEXT,
          status TEXT NOT NULL DEFAULT 'new',
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id)`,
        `CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`,
        `CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC)`,
        `CREATE TABLE IF NOT EXISTS contacts (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
      ],
      'write'
    )
  })()
  return initPromise
}

export const db = drizzle(client, { schema })
export { schema }
