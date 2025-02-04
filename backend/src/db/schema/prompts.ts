import { pgTable, text, varchar, uuid } from 'drizzle-orm/pg-core';
import { promptResponsesTable } from './promptResponses';
import { relations } from 'drizzle-orm';

export const promptsTable = pgTable('prompts', {
  id: uuid().primaryKey(),
  title: varchar().notNull(),
  content: text().notNull(),
});

export const promptsRelations = relations(promptsTable, ({ many }) => ({
  promptResponses: many(promptResponsesTable),
}));
