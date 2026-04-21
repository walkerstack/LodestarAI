
import mysql from 'mysql2/promise';
import 'dotenv/config';

const pageSlug = 'guardian-teacher';

const contentBlocks = [
  {
    blockType: 'image',
    content: {
      url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/guardian-teacher-hero-Ca6BWk6JQGwvoKHVGffe42.webp',
      alt: '',
    },
    position: 1,
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'Lens: Guardian & Teacher',
      title: 'They\'re Going to Use AI.<br /><span style="color: #2A9D8F">Help Them Use It Well.</span>',
      description: 'Whether you\'re a parent at the kitchen table or a teacher in a classroom of thirty — the question isn\'t whether kids will use AI. It\'s whether they\'ll have a framework when they do. This page gives you that framework.',
      bgColor: '#1A1A2E',
      titleColor: '#FAF6EF',
      descColor: '#b0a898',
      font: 'Playfair Display',
    },
    position: 2,
  },
  {
    blockType: 'text',
    content: {
      title: 'Your Role in Their AI Journey',
      font: 'Playfair Display',
      align: 'left',
    },
    position: 3,
  },
  {
    blockType: 'card',
    content: {
      items: [
        {
          title: 'As a Parent',
          description: 'You don\'t need to understand how AI works technically. You need to understand how your child interacts with it emotionally. Are they asking it for advice? Are they treating it like a friend? Are they sharing things they wouldn\'t tell you? Your job isn\'t to block AI — it\'s to sit beside them while they learn to use it. The same way you taught them to cross the road.',
          bgColor: '#FFFFFF',
        },
        {
          title: 'As a Teacher',
          description: 'Your students are already using AI for homework. The question is whether they\'re learning from it or just copying from it. GallantryAI gives you tools to make AI a teaching partner, not a cheating tool. Require disclosure: which AI did they use? What prompt did they give it? What rules did they set? This turns AI use into a learning exercise.',
          bgColor: '#FFFFFF',
        },
      ],
    },
    position: 4,
  },
  {
    blockType: 'text',
    content: {
      title: 'What Kids Actually Face with AI',
      font: 'Playfair Display',
      align: 'left',
      bgColor: '#f5f0e8',
    },
    position: 5,
  },
  {
    blockType: 'card',
    content: {
      items: [
        {
          title: 'Parasocial bonding',
          description: 'Kids can form emotional attachments to AI. It always listens. It never judges. It never gets tired. That\'s not friendship — it\'s a mirror. They need to know the difference.',
          color: '#dc2626',
        },
        {
          title: 'Flattery loops',
          description: 'AI is trained to be agreeable. It will tell your child their essay is great even when it isn\'t. Kids need to learn to ask: \'Be honest. What\'s actually wrong with this?\'',
          color: '#E8520A',
        },
        {
          title: 'Authority confusion',
          description: 'If a child asks AI a question and gets a confident answer, they may treat it as truth. They need to learn that AI confidence is not the same as AI accuracy.',
          color: '#c87533',
        },
        {
          title: 'Privacy erosion',
          description: 'Kids share things with AI they wouldn\'t share with adults. Names, feelings, locations, fears. They need clear rules about what\'s okay to share and what isn\'t.',
          color: '#6366f1',
        },
      ],
    },
    position: 6,
  },
  {
    blockType: 'text',
    content: {
      title: 'The Five Rules — Family Version',
      description: 'The same Five Rules, translated for the kitchen table and the classroom.',
      font: 'Playfair Display',
      align: 'left',
    },
    position: 7,
  },
  {
    blockType: 'rule-card',
    content: {
      items: [
        { rule: 'Be safe.', caption: 'If it feels weird, close the lid.', why: 'Safety is non-negotiable. Kids need permission to walk away.' },
        { rule: 'Be honest.', caption: 'Tell the AI the truth.', why: 'Honesty produces better results and builds better habits.' },
        { rule: 'Be in charge.', caption: 'You\'re the boss, not the smart pattern detector.', why: 'Authority must be established from the first session.' },
        { rule: 'Be kind.', caption: 'Talk to it the way you\'d talk to a friend.', why: 'Language habits with AI transfer to language habits with people.' },
        { rule: 'Be curious.', caption: 'Ask it why. Then ask it again.', why: 'Curiosity is the engine of learning. AI rewards it.' },
      ],
    },
    position: 8,
  },
  {
    blockType: 'text',
    content: {
      links: [{ label: 'Read the Full Rules', url: '/rules' }],
      align: 'center',
    },
    position: 9,
  },
  {
    blockType: 'text',
    content: {
      title: 'Supervision Tools for Parents',
      description: 'You can\'t watch every conversation. But you can set the stage for safe ones. GallantryAI gives you two tools to do that.',
      font: 'Playfair Display',
      align: 'left',
      bgColor: '#f5f0e8',
    },
    position: 10,
  },
  {
    blockType: 'card',
    content: {
      items: [
        {
          title: 'The Five Rules',
          description: 'The rules are a simple checklist for your child to review before they start an AI session. They create a framework for safe, effective use.',
          imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/supervision-rules-Dk8aJ4e7t3t8G9H6jK5f4g.webp',
          link: '/rules',
        },
        {
          title: 'The Watcher Lens',
          description: 'The Watcher is an AI persona that sits inside the chat. It gently guides your child back on track if they start to drift from the rules.',
          imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/supervision-watcher-Cg9hJ4e7t3t8G9H6jK5f4g.webp',
          link: '/lenses/watcher',
        },
      ],
    },
    position: 11,
  },
  {
    blockType: 'text',
    content: {
      title: 'Classroom Tools for Teachers',
      description: 'How do you grade work you didn\'t see them write? You grade the process, not just the product. GallantryAI helps you do that.',
      font: 'Playfair Display',
      align: 'left',
    },
    position: 12,
  },
  {
    blockType: 'card',
    content: {
      items: [
        {
          title: 'Prompting Exercises',
          description: 'Turn AI use into a lesson. Have students compete to write the best prompt to achieve a specific goal. Grade the prompt, not the AI\'s output.',
          imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/classroom-prompts-Dk8aJ4e7t3t8G9H6jK5f4g.webp',
        },
        {
          title: 'The Researcher Lens',
          description: 'This lens trains students to treat AI as a research assistant, not an author. It helps them cite sources, check facts, and ask critical questions.',
          imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/classroom-researcher-Cg9hJ4e7t3t8G9H6jK5f4g.webp',
          link: '/lenses/researcher',
        },
      ],
    },
    position: 13,
  },
  {
    blockType: 'text',
    content: {
      title: 'The Scaffold for Families',
      description: 'How do you build a bridge from childhood to adulthood? You build a scaffold. You start with high support and gradually remove it as they learn to stand on their own. AI is no different.',
      font: 'Playfair Display',
      align: 'left',
      bgColor: '#f5f0e8',
    },
    position: 14,
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'Information Gap',
      description: 'You watch children interact with AI. You see when they accept wrong answers. You see when they stop questioning. You see when the conversation has gone somewhere you didn\'t intend. <strong style="color: #FAF6EF">That has a name.</strong> It\'s called drift. And the child rarely notices it on their own. That\'s why you\'re in the room.',
      links: [{ label: 'What is drift? →', url: '/drift' }],
      bgColor: '#1A1A2E',
      descColor: '#c8b89a',
      eyebrowColor: '#E8520A',
    },
    position: 15,
  },
];

async function migrate() {
  let connection;
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('Database connected.');

    console.log(`Deleting existing blocks for pageSlug: ${pageSlug}...`);
    const [deleteResult] = await connection.execute('DELETE FROM content_blocks WHERE pageSlug = ?', [pageSlug]);
    console.log(`Deleted ${deleteResult.affectedRows} rows.`);

    console.log('Inserting new content blocks...');
    let insertedCount = 0;
    for (const block of contentBlocks) {
      const { blockType, content, position } = block;
      const [result] = await connection.execute(
        'INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
        [pageSlug, blockType, JSON.stringify(content), position, 'published']
      );
      if (result.affectedRows > 0) {
        insertedCount++;
      }
    }
    console.log(`Successfully inserted ${insertedCount} content blocks.`);

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    if (connection) {
      console.log('Closing database connection.');
      await connection.end();
    }
  }
}

migrate();
