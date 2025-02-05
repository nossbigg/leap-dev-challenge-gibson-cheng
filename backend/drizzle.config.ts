import { defineConfig } from 'drizzle-kit';
import { getDbUrl } from './src/db/constants';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/schema.ts',
  dbCredentials: {
    url: getDbUrl(),
  },
  out: './drizzle', // ref: https://github.com/drizzle-team/drizzle-orm/issues/3226
});
