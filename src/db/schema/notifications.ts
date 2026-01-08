import { boolean, sqliteTable, text, text } from "drizzle-orm/sqlite-core"

import { generateId } from "@/lib/id"

import { lifecycleDates } from "./utils"

export const notifications = sqliteTable("notifications", {
  id: text("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  userId: text("user_id", { length: 36 }), // uuid v4
  email: text("email").notNull().unique(),
  token: text("token").notNull().unique(),
  referredBy: text("referred_by"),
  communication: boolean("communication").default(false).notNull(),
  newsletter: boolean("newsletter").default(false).notNull(),
  marketing: boolean("marketing").default(false).notNull(),
  ...lifecycleDates,
})

export type Notification = typeof notifications.$inferSelect
export type NewNotification = typeof notifications.$inferInsert
