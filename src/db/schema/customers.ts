import { relations } from "drizzle-orm"
import { index, sqliteTable, text, text } from "drizzle-orm/sqlite-core"

import { generateId } from "@/lib/id"

import { stores } from "./stores"
import { lifecycleDates } from "./utils"

export const customers = sqliteTable(
  "customers",
  {
    id: text("id", { length: 30 })
      .$defaultFn(() => generateId())
      .primaryKey(), // prefix_ + nanoid (12)
    name: text("name"),
    email: text("email"),
    storeConnectId: text("store_connect_id").unique(), // stripe connect
    stripeCustomerId: text("stripe_customer_id").unique().notNull(),
    storeId: text("store_id", { length: 30 })
      .references(() => stores.id, { onDelete: "cascade" })
      .notNull(),
    ...lifecycleDates,
  },
  (table) => ({
    storeIdIdx: index("customers_store_id_idx").on(table.storeId),
    stripeCustomerIdIdx: index("customers_stripe_customer_id_idx").on(
      table.stripeCustomerId
    ),
  })
)

export const customersRelations = relations(customers, ({ one }) => ({
  store: one(stores, {
    fields: [customers.storeId],
    references: [stores.id],
  }),
}))

export type Customer = typeof customers.$inferSelect
export type NewCustomer = typeof customers.$inferInsert
