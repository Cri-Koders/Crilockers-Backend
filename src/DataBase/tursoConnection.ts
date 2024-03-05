import * as dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@libsql/client';

// const db = createClient({
//   url: process.env.DB_URL,
//   authToken: process.env.DB_TOKEN,
// });

// const initializeDatabase = async () => {
//   try {
//     await db.execute(`
//         CREATE TABLE IF NOT EXISTS users (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             content TEXT
//         );
//     `);

//     await db.execute(`
//         DELETE FROM users;
//     `);
//   } catch (error) {
//     console.error({ error: error });
//   }
// };

// initializeDatabase();

// export default db;
