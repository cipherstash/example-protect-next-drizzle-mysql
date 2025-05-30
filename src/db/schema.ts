import { mysqlTable, int, json, text, uniqueIndex } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: int().primaryKey().autoincrement(),
  name: text().notNull(),
  email: text().notNull(),
  nameEncrypted: json(),
  emailEncrypted: json(),
})
