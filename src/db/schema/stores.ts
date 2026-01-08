import { relations } from "drizzle-orm"
import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core"

import { generateId } from "@/lib/id"

import { customers } from "./customers"
import { payments } from "./payments"
import { products } from "./products"
import { tags } from "./tags"
import { lifecycleDates } from "./utils"
import { variants } from "./variants"

export const stores = sqliteTable("stores", {
  id: text("id")
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  userId: text("user_id").notNull(), // uuid v4
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  description: text("description"),

  plan: text("plan").notNull().default("free"), // "free" | "standard" | "pro"
  planEndsAt: integer("plan_ends_at", { mode: "timestamp" }),
  cancelPlanAtEnd: integer("cancel_plan_at_end", { mode: "boolean" }).default(false),
  stripeAccountId: text("stripe_account_id").unique(), // stripe connect
  stripeCustomerId: text("stripe_customer_id").unique(),
  productLimit: integer("product_limit").notNull().default(10),
  tagLimit: integer("tag_limit").notNull().default(5),
  variantLimit: integer("variant_limit").notNull().default(5),
  ...lifecycleDates,
})

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products, { relationName: "storeProducts" }),
  payments: many(payments, { relationName: "storePayments" }),
  customers: many(customers, { relationName: "storeCustomers" }),
  tags: many(tags, { relationName: "storeTags" }),
  variants: many(variants, { relationName: "storeVariants" }),
}))

export type Store = typeof stores.$inferSelect
export type NewStore = typeof stores.$inferInsert
