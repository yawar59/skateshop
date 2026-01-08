import { relations } from "drizzle-orm"
import { sqliteTable, text, text } from "drizzle-orm/sqlite-core"

import { generateId } from "@/lib/id"

import { products } from "./products"
import { subcategories } from "./subcategories"
import { lifecycleDates } from "./utils"

export const categories = sqliteTable("categories", {
  id: text("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  image: text("image"),
  description: text("description"),
  ...lifecycleDates,
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
  subcategories: many(subcategories),
}))

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
