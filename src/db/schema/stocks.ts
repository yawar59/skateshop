import { relations } from "drizzle-orm"
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { generateId } from "@/lib/id"

import { lifecycleDates } from "./utils"
import { productVariants, productVariantValues } from "./variants"

export const stocks = sqliteTable(
  "stocks",
  {
    id: text("id", { length: 30 })
      .$defaultFn(() => generateId())
      .primaryKey(),
    productVariantId: text("product_variant_id", { length: 30 })
      .references(() => productVariants.id, { onDelete: "cascade" })
      .notNull(),
    quantity: integer("quantity").notNull().default(0),
    ...lifecycleDates,
  },
  (table) => ({
    productVariantIdIdx: index("stocks_product_variant_id_idx").on(
      table.productVariantId
    ),
  })
)

export const stocksRelations = relations(stocks, ({ one }) => ({
  productVariant: one(productVariants, {
    fields: [stocks.productVariantId],
    references: [productVariants.id],
  }),
  productVariantValues: one(productVariantValues, {
    fields: [stocks.productVariantId],
    references: [productVariantValues.productVariantId],
  }),
}))

export type Stock = typeof stocks.$inferSelect
export type NewStock = typeof stocks.$inferInsert
