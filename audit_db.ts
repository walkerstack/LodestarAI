import { getDb } from './server/db';
import { sql } from 'drizzle-orm';

async function main() {
  const db = await getDb();
  const rows = await db.execute(
    sql`SELECT page_slug, COUNT(*) as cnt FROM content_blocks GROUP BY page_slug ORDER BY page_slug`
  );
  for (const r of (rows as any[])) {
    console.log(`${r.page_slug}|${r.cnt}`);
  }
  process.exit(0);
}

main().catch(e => { console.error(e.message); process.exit(1); });
