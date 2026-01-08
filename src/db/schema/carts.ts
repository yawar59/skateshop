import { boolean, json, sqliteTable, text, text } from "drizzle-orm/sqlite-core"

import { generateId } from "@/lib/id"
import { type CartItemSchema } from "@/lib/validations/cart"

import { lifecycleDates } from "./utils"

// @see: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const carts = sqliteTable("carts", {
  id: text("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  paymentIntentId: text("payment_intent_id", { length: 256 }),
  clientSecret: text("client_secret"),
  items: json("items").$type<CartItemSchema[] | null>().default(null),
  closed: boolean("closed").notNull().default(false),
  ...lifecycleDates,
})

export type Cart = typeof carts.$inferSelect
export type NewCart = typeof carts.$inferInsert
