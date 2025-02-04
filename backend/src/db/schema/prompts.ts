import { pgTable, text, varchar, uuid } from 'drizzle-orm/pg-core';

export const promptsTable = pgTable('prompts', {
  id: uuid().primaryKey(),
  title: varchar().notNull(),
  content: text().notNull(),
});
