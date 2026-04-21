import 'dotenv/config';
import mysql from 'mysql2/promise';
import fs from 'fs/promises';

const pageSlug = 'cognitive-science';

async function main() {
  let db;
  try {
    db = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('Connected to the database.');

    await db.execute('DELETE FROM content_blocks WHERE pageSlug = ?', [pageSlug]);
    console.log(`Deleted existing blocks for pageSlug: ${pageSlug}`);

    const content = await fs.readFile('/home/ubuntu/gallantryai/cognitive-science-content.json', 'utf-8');
    const blocks = JSON.parse(content);

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      await db.execute(
        'INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
        [pageSlug, block.blockType, JSON.stringify(block.content), i + 1, 'published']
      );
    }

    console.log(`Inserted ${blocks.length} content blocks for pageSlug: ${pageSlug}`);

  } catch (error) {
    console.error('Error migrating content:', error);
  } finally {
    if (db) {
      await db.end();
      console.log('Database connection closed.');
    }
  }
}

main();
