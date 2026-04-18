/**
 * seed-media-library.mjs
 * Registers all existing CDN assets from the site codebase into the media_library table.
 * Additive only — never deletes existing records.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { createConnection } from 'mysql2/promise';
import 'dotenv/config';

const CDN_BASE = 'https://d2xsxph8kpxj0f.cloudfront.net';

function getAllFiles(dir, ext = ['.tsx', '.ts']) {
  const files = [];
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (statSync(full).isDirectory()) {
      files.push(...getAllFiles(full, ext));
    } else if (ext.some(e => f.endsWith(e))) {
      files.push(full);
    }
  }
  return files;
}

function extractUrls(content) {
  const regex = /https:\/\/d2xsxph8kpxj0f\.cloudfront\.net\/[^\s"'`<>)]+/g;
  return [...new Set(content.match(regex) || [])];
}

function getMediaType(url) {
  const lower = url.toLowerCase();
  if (lower.endsWith('.pdf') || lower.endsWith('.doc') || lower.endsWith('.docx')) return 'doc';
  // enum only supports image|doc — mp4/webm treated as image (stored by URL)
  return 'image';
}

function getMimeType(url) {
  const lower = url.toLowerCase();
  if (lower.endsWith('.pdf')) return 'application/pdf';
  if (lower.endsWith('.mp4')) return 'video/mp4';
  if (lower.endsWith('.webm')) return 'video/webm';
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.gif')) return 'image/gif';
  return 'image/jpeg';
}

function getFilename(url) {
  const parts = url.split('/');
  return parts[parts.length - 1].split('?')[0];
}

async function main() {
  const pagesDir = '/home/ubuntu/gallantryai/client/src/pages';
  const componentsDir = '/home/ubuntu/gallantryai/client/src/components';

  const files = [
    ...getAllFiles(pagesDir),
    ...getAllFiles(componentsDir),
  ];

  const allUrls = new Set();
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    for (const url of extractUrls(content)) {
      allUrls.add(url);
    }
  }

  console.log(`Found ${allUrls.size} unique CDN assets across all page and component files.`);

  const conn = await createConnection(process.env.DATABASE_URL);

  // Get existing URLs to avoid duplicates
  const [existing] = await conn.execute('SELECT url FROM media_library');
  const existingUrls = new Set(existing.map(r => r.url));
  console.log(`Already in library: ${existingUrls.size}`);

  let added = 0;
  let skipped = 0;

  for (const url of allUrls) {
    if (existingUrls.has(url)) {
      skipped++;
      continue;
    }

    const filename = getFilename(url);
    const mediaType = getMediaType(url);
    const mimeType = getMimeType(url);
    const fileKey = url.replace(CDN_BASE + '/', '');

    await conn.execute(
      `INSERT INTO media_library (filename, url, fileKey, mimeType, mediaType, fileSize, createdAt)
       VALUES (?, ?, ?, ?, ?, 0, NOW())`,
      [filename, url, fileKey, mimeType, mediaType]
    );
    added++;
  }

  console.log(`Done. Added: ${added}, Skipped (already existed): ${skipped}`);
  await conn.end();
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
