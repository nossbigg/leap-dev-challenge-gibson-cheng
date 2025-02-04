import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';

export const getDbUrl = (): string =>
  process.env.DATABASE_URL ||
  // # local dev only
  'postgres://postgres:example@localhost:5432/postgres';

export const pgDb = drizzle({ schema, connection: getDbUrl() });
