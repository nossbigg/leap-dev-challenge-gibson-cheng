import { pgTable, text, integer, uuid } from 'drizzle-orm/pg-core';
import { promptsTable } from './prompts';
import { relations } from 'drizzle-orm';

export const promptResponsesTable = pgTable('promptResponses', {
  id: uuid().primaryKey(),
  content: text().notNull(),
  displayOrder: integer('display_order').notNull(),
  promptId: uuid('prompt_id')
    .notNull()
    .references(() => promptsTable.id),
});

export const promptResponsesRelations = relations(
  promptResponsesTable,
  ({ one }) => ({
    prompt: one(promptsTable, {
      fields: [promptResponsesTable.promptId],
      references: [promptsTable.id],
    }),
  }),
);
