import { sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  name: text('name'),
  created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  user_id: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  company_name: text('company_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  website: text('website'),
  colors: text('colors'),
  package: text('package').notNull(),
  template: text('template').notNull(),
  comments: text('comments'),
  status: text('status').notNull().default('new'),
  created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const contacts = sqliteTable('contacts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export type User = typeof users.$inferSelect
export type Order = typeof orders.$inferSelect
export type Contact = typeof contacts.$inferSelect
