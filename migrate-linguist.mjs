
import mysql from 'mysql2/promise';
import 'dotenv/config';

const pageSlug = 'linguist';

const contentBlocks = [
  {
    blockType: 'text',
    content: {
      eyebrow: 'Lens: Linguist',
      title: 'Language Has Always Been Alive.<br /><span class="text-[#E8520A]">Now It Has a Laboratory.</span>',
      description: 'You\'ve studied syntax, semantics, pragmatics, and discourse. You understand that language is not just communication — it is cognition made visible. AI gives you something no linguist has ever had before: a system that responds to individual words with measurable behavioral changes. Every prompt is an experiment. Every response is data.',
      titleColor: '#FAF6EF',
      descColor: '#b0a898',
      bgColor: '#1A1A2E',
    },
  },
  {
    blockType: 'image',
    content: {
      url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/linguist-hero-bg_861b53b2.png',
      alt: '',
    },
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'Your Domain',
      title: 'What You Already Study',
      description: 'Linguistics has always known that words do more than carry meaning — they create it. Performative utterances, speech acts, pragmatic implicature, register shifts. You know that "Can you pass the salt?" is not a question about ability. You know that context shapes meaning. You know that a single preposition can change the direction of an entire argument.',
    },
  },
  {
    blockType: 'card',
    content: {
      items: [
        { title: 'Phonology & Morphology', description: 'Sound patterns and word formation. The building blocks. In AI: tokenization mirrors morphological decomposition.' },
        { title: 'Syntax & Semantics', description: 'Structure and meaning. The architecture. In AI: word order creates reasoning topology, not just grammatical correctness.' },
        { title: 'Pragmatics & Discourse', description: 'Context and conversation. The living layer. In AI: every prompt is a speech act. Every response is a conversational turn governed by invisible rules.' },
        { title: 'Sociolinguistics', description: 'Language in society. Register, dialect, power. In AI: register shifts are measurable behavioral changes, not just stylistic choices.' },
        { title: 'Historical Linguistics', description: 'Language change over time. In AI: context window decay mirrors diachronic drift — meaning shifts as distance from origin increases.' },
        { title: 'Computational Linguistics', description: 'Language as computable structure. In AI: you already know the math. What you may not know is that individual words function as control dials, not just tokens.' },
      ],
    },
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'The New Data',
      title: 'What AI Reveals About Language',
      description: 'For the first time in the history of linguistics, you have a system that responds to individual words with measurable, reproducible behavioral changes. This is not a metaphor. When you change "analyze" to "describe" in an otherwise identical prompt, the AI produces structurally different output. The word is not just carrying meaning — it is <em>steering cognition</em>.',
    },
  },
  {
    blockType: 'image',
    content: {
      url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/promptolinguistics-infographic_b90e3b9d.jpg',
      alt: 'Promptolinguistics — Four Effects',
    },
  },
  {
    blockType: 'card',
    content: {
      items: [
        { title: 'The "CAN" Effect', description: '"Can" opens possibility space. "Should" implies obligation. "Must" enforces necessity. Three words on the same spectrum — three completely different AI behaviors.' },
        { title: 'The "WHY" Factor', description: '"Why" ignites recursion. The AI cannot answer "why" with a surface response. It must go deeper. One word changes the depth of reasoning.' },
        { title: 'The "AND YET" Tension', description: '"And yet" forces the AI to hold two truths simultaneously. It prevents collapse into simple binary answers. A conjunction as a cognitive tool.' },
        { title: 'The "SAFE" Foundation', description: 'The word "safe" at position zero changes everything that follows. Not as content — as architecture. It establishes a behavioral floor.' },
      ],
    },
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'Core Novelty',
      title: 'The Kinematics of the Word',
      description: 'Named by Gemini as the core novelty claim of this framework. Kinematics is the study of motion without reference to force. Applied to language: not what a word <em>means</em> — but where it <em>points</em> and how fast it moves.\n\nIn traditional linguistics, a word has a definition, a context, and a function. In the Kinematics of the Word, a word has a <strong class="text-[#E8520A]">direction</strong>, a <strong class="text-[#E8520A]">velocity</strong>, and a <strong class="text-[#E8520A]">trajectory</strong>. "Analyze" points inward and moves slowly. "Describe" points outward and moves at medium speed. "Explain" points downward (toward depth) and accelerates.',
      bgColor: '#1A1A2E',
      titleColor: '#FAF6EF',
      descColor: '#b0a898',
    },
  },
  {
    blockType: 'card',
    content: {
      heading: 'The ALCM — Five Axes of Word Function:',
      items: [
        { title: 'Direction', description: 'Where the word points the AI\'s attention. Inward (reflection), outward (description), upward (abstraction), downward (specification).' },
        { title: 'Velocity', description: 'How fast the word moves the AI. Slow (analyze), medium (describe), fast (list), instant (generate).' },
        { title: 'Acceleration', description: 'How the word changes velocity. Accelerate (explain), decelerate (summarize), hold (define).' },
        { title: 'Mass', description: 'How much cognitive weight the word carries. Heavy (synthesize), light (name), variable (imagine).' },
        { title: 'Viscosity', description: 'How much the word resists movement. High (critique), low (brainstorm), zero (ignore).' },
      ],
    },
  },
];

async function migrate() {
  let connection;
  try {
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('Connected to the database.');

    await connection.execute('DELETE FROM content_blocks WHERE pageSlug = ?', [pageSlug]);
    console.log(`Deleted existing blocks for pageSlug: ${pageSlug}`);

    for (let i = 0; i < contentBlocks.length; i++) {
      const block = contentBlocks[i];
      const [result] = await connection.execute(
        'INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
        [pageSlug, block.blockType, JSON.stringify(block.content), i + 1, 'published']
      );
      console.log(`Inserted block ${i + 1} with ID: ${result.insertId}`);
    }

    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}

migrate();
