import "dotenv/config";
import { createConnection } from "mysql2/promise";

const conn = await createConnection(process.env.DATABASE_URL);

const [rows] = await conn.execute(
  "SELECT page_slug, COUNT(*) as count FROM content_blocks GROUP BY page_slug ORDER BY count DESC LIMIT 20"
);

console.log("Blocks per page:");
console.table(rows);

const [sample] = await conn.execute(
  "SELECT page_slug, block_type, LEFT(content, 100) as content_preview FROM content_blocks WHERE page_slug = 'field-papers' LIMIT 5"
);
console.log("\nField Papers blocks sample:");
console.table(sample);

await conn.end();
