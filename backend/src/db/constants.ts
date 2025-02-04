import { drizzle } from 'drizzle-orm/node-postgres';

export const getDbUrl = (): string =>
  process.env.DATABASE_URL ||
  // # local dev only
  'postgres://postgres:example@localhost:5432/postgres';

export const pgDb = drizzle(getDbUrl());
