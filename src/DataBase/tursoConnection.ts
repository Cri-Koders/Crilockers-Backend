import * as dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN,
});

const adapter = new PrismaLibSQL(db);
const prisma = new PrismaClient({ adapter });

export { db, prisma };
