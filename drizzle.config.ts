import { type Config } from "drizzle-kit"

export default {
  schema: "./src/db/schema/index.ts",
  dialect: "sqlite",
  out: "./drizzle",
  dbCredentials: {
    url: "./local.db",
  },
} satisfies Config
