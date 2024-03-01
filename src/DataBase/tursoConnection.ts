import * as dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@libsql/client';

const db = createClient({
  url: 'libsql://absolute-kid-colt-gabibastias.turso.io',
  authToken: process.env.DB_TOKEN,
});

const initializeDatabase = async () => {
  try {
    const app = await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            password TEXT
        );
    `);

    console.log(app);

    // await db.execute(`
    //     DELETE FROM users;
    // `);
  } catch (error) {
    console.error({ error: error });
  }
};

initializeDatabase();

export default db;
