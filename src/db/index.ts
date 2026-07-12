import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

export const db = drizzle(
	"postgresql://neondb_owner:npg_4a8qosvyDfJR@ep-ancient-king-ai5xb1oc-pooler.c-4.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require", {
		schema
	}
)