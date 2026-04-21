import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();
const mysql = require('mysql2/promise');

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const [rows] = await conn.execute('SELECT pageSlug, COUNT(*) as cnt FROM content_blocks GROUP BY pageSlug ORDER BY pageSlug');
for (const r of rows) {
  console.log(`${r.pageSlug}|${r.cnt}`);
}
await conn.end();
