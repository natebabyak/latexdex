import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "$app/env/private";
import { authRelations } from "./auth.schema";
import { relations } from "./schema";

export const db = drizzle(DATABASE_URL, {
  relations: { ...relations, ...authRelations },
});
