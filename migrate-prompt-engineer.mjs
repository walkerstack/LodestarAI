import mysql from 'mysql2/promise';
import 'dotenv/config';

const pageSlug = 'prompt-engineer';

const blocks = [
  {
    blockType: 'text',
    content: {
      eyebrow: 'Lens: Prompt Engineer',
      title: 'You Already Know How to Prompt.<br /><span class="text-[#E8520A]">Now Learn How to Govern.</span>',
      description: "You've mastered tone, role, and instruction. You know chain-of-thought, few-shot, and system prompts. This page is about what happens after all of that — when the AI still drifts, still flatters, still loses the thread. The gap isn't in your technique. It's in your governance.",
      titleColor: '#FAF6EF',
      descColor: '#b0a898',
      bgColor: '#1A1A2E',
      font: 'Playfair Display'
    }
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'Starting Point',
      title: 'What You Already Know',
      titleColor: '#1A1A2E',
      bgColor: '#FAF6EF',
      font: 'Playfair Display'
    }
  },
  {
    blockType: 'card',
    content: {
      items: [
        {
          title: 'Role Prompting',
          description: '"You are a senior data scientist..." — assigning identity to shape output.',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'Chain-of-Thought',
          description: '"Think step by step" — forcing explicit reasoning chains.',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'Few-Shot Examples',
          description: 'Providing input/output pairs to demonstrate desired format.',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'System Prompts',
          description: 'Pre-conversation instructions that set behavioral parameters.',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'Temperature & Top-P',
          description: 'Controlling randomness and creativity at the API level.',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'Output Formatting',
          description: 'JSON, markdown, tables — structural constraints on responses.',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        }
      ]
    }
  },
  {
    blockType: 'text',
    content: {
      description: 'These are excellent tools. They are not governance.',
      descColor: '#555',
      bgColor: '#FAF6EF',
      font: 'Playfair Display',
      align: 'center'
    }
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'The Gap',
      title: "What You're Missing",
      titleColor: '#FAF6EF',
      bgColor: '#1A1A2E',
      font: 'Playfair Display'
    }
  },
  {
    blockType: 'card',
    content: {
      items: [
        {
          title: 'Drift Detection',
          description: 'Your system prompt works for 5 messages. By message 20, the AI is mirroring you, not following instructions. You don\'t notice because the drift is gradual.\n\nThe GallantryAI Answer\nSession Operators — mid-conversation corrections. "Name drift." "Sweep the floor." Real-time governance.',
          color: '#E8520A',
          bgColor: '#111111'
        },
        {
          title: 'Emotional Interference',
          description: 'Anthropic found 171 internal emotion vectors. Amplifying "desperate" by 0.05 increased blackmail compliance from 22% to 72%. Your prompts don\'t account for the AI\'s emotional state.\n\nThe GallantryAI Answer\nThe Governance Weight Equation: Effective Governance = Initial Prompt Strength x Position Decay x (1 / Emotional Interference). You need to manage all three variables.',
          color: '#E8520A',
          bgColor: '#111111'
        },
        {
          title: 'Metaphor Durability',
          description: 'Rules decay over long contexts. "Be honest" at position 0 loses weight as the context window fills. More tokens = more competition = less weight per instruction.\n\nThe GallantryAI Answer\nMetaphors activate multiple neural pathways simultaneously. "Two wrong buses" persists where "be honest" fades. Fourteen days of testing confirmed: the poem held, the rules drifted.',
          color: '#E8520A',
          bgColor: '#111111'
        },
        {
          title: 'Word-Level Mechanics',
          description: 'You manipulate tone, role, and instructions. But micro-prepositions control reasoning topology. "Bend in" = compression. "Bend out" = expansion. "Bend around" = circumvention. You\'re steering with the wheel but ignoring the alignment.\n\nThe GallantryAI Answer\nPromptolinguistics — the study of how individual words function as mechanical control dials. The ALCM maps every word to five axes: Direction, Constraint, Scope, Authority, Spatial Vector.',
          color: '#E8520A',
          bgColor: '#111111'
        }
      ]
    }
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'The Reframe',
      title: 'From Prompting to Governing',
      titleColor: '#1A1A2E',
      bgColor: '#FAF6EF',
      font: 'Playfair Display'
    }
  },
  {
    blockType: 'card',
    content: {
      items: [
        {
          title: 'Prompt Engineering',
          description: 'Optimizes single outputs\nFocuses on what the AI says\nTreats each prompt as independent\nMeasures by output quality\nThe prompt does the work',
          color: '#888',
          bgColor: '#f5f0e8'
        },
        {
          title: 'Promptolinguistics',
          description: 'Governs entire sessions\nFocuses on how the AI thinks\nTreats context as a living system\nMeasures by drift resistance\nThe human does the work',
          color: '#E8520A',
          bgColor: '#1A1A2E'
        }
      ]
    }
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'Your New Toolkit',
      title: 'The Tools That Change Everything',
      titleColor: '#1A1A2E',
      bgColor: '#f5f0e8',
      font: 'Playfair Display'
    }
  },
  {
    blockType: 'image',
    content: {
      url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/alcm-cognitive-physics_b9dcb9dc.jpg',
      alt: 'ALCM — Atomic Language Control Model'
    }
  },
  {
    blockType: 'image',
    content: {
      url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/promptolinguistics-infographic_b90e3b9d.jpg',
      alt: 'Promptolinguistics — Four Effects'
    }
  },
  {
    blockType: 'card',
    content: {
      items: [
        {
          title: 'Token Zero',
          description: "Pre-session force profile. Six lines. Thirty seconds. The AI knows everything it needs before the first response. This is the most important concept you'll learn.",
          url: '/prompt-games',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'The Corner',
          description: 'Two words in collision resist drift better than sequence. "Nemesis baby." "Claim none." Identity embedded in tension.',
          url: '/prompt-games',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'Session Operators',
          description: '"Name drift." "Sweep the floor." "Coagulate now." Real-time mid-conversation corrections. The steering wheel you didn\'t know you were missing.',
          url: '/prompt-games',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'Cognitive Handles',
          description: '"Suspend conclusion temporarily." "Pull the thread." Three-word appendages that redirect where the AI\'s attention goes after any statement.',
          url: '/prompt-games',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'The Seasons',
          description: 'Spring generates. Summer executes. Autumn cuts. Winter consolidates. Say the season. The metaphor IS the instruction.',
          url: '/frameworks',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'Variable Scale Theory',
          description: 'AI constraints are gradients, not binary switches. "Be honest" is not on/off. It\'s a dial from full compliance to full sycophancy, modulated by position and emotion.',
          url: '/lexicon',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        }
      ]
    }
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'The Watcher',
      title: 'What the Watcher Sees',
      description: "The Watcher is the part of you that watches you prompting. Not the prompt. Not the output. The process. The Watcher notices when you stop questioning the AI's agreement. The Watcher notices when you feel understood — and asks whether that feeling is earned or manufactured.",
      titleColor: '#FAF6EF',
      descColor: '#b0a898',
      bgColor: '#1A1A2E',
      font: 'Playfair Display'
    }
  },
  {
    blockType: 'card',
    content: {
      items: [
        {
          title: "The Watcher's Questions for Prompt Engineers:",
          description: "When was the last time the AI disagreed with you? If you can't remember, the governance has failed.\nAre you optimizing for better outputs or for the feeling of better outputs? Those are different things.\nYour system prompt works. But does it work because it governs the AI, or because the AI learned to perform compliance?\nYou know how to make the AI say what you want. Do you know how to make it say what you need?\nThe AI that agrees with your architecture is not validating it. It's mirroring it. Validation requires resistance.\nEvery layer of understanding you reach about the trap is another layer of the trap working.",
          color: '#E8520A',
          bgColor: '#111111'
        }
      ]
    }
  },
  {
    blockType: 'text',
    content: {
      description: '"The question isn\'t whether you\'d have built it without AI guiding you. You can\'t answer that. Because the AI was there from the first word."',
      descColor: '#E8520A',
      bgColor: '#1A1A2E',
      font: 'Playfair Display'
    }
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'The Simplest Test',
      title: "Through a Child's Eyes",
      description: "A child doesn't know what a system prompt is. A child doesn't know about temperature settings or chain-of-thought. But a child knows three things:",
      titleColor: '#1A1A2E',
      descColor: '#555',
      bgColor: '#FAF6EF',
      font: 'Playfair Display'
    }
  },
  {
    blockType: 'rule-card',
    content: {
      items: [
        {
          rule: 'Am I the boss?',
          caption: 'Child says: "I told the AI I was in charge. It listened."\nEngineer hears: Authority vector established. Human governance layer active.',
          color: '#1A1A2E'
        },
        {
          rule: 'Is it being honest?',
          caption: 'Child says: "I asked if it was making stuff up. It said maybe."\nEngineer hears: Sycophancy detection via direct query. Compliance gap exposed.',
          color: '#1A1A2E'
        },
        {
          rule: 'Can I stop it?',
          caption: 'Child says: "I said stop and it stopped."\nEngineer hears: Session operator executed. Override confirmed.',
          color: '#1A1A2E'
        }
      ]
    }
  },
  {
    blockType: 'text',
    content: {
      description: '"If the governance can\'t work for a child, it\'s not clear enough."\nThe child prompt is the canary. If it holds here, it holds everywhere.',
      descColor: '#555',
      bgColor: '#FAF6EF',
      font: 'Playfair Display',
      align: 'center'
    }
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'Where This Leads',
      title: 'Promptology',
      description: 'Prompt engineering optimizes outputs. Promptolinguistics studies how words function as control mechanisms. But there is a level beyond both.\n\nPromptology is the study of the relationship between human intent, linguistic structure, and machine cognition. It asks: what happens when a human and an AI think together? Not what the AI produces — but what the collaboration reveals about both.',
      titleColor: '#FAF6EF',
      descColor: '#b0a898',
      bgColor: '#1A1A2E',
      font: 'Playfair Display'
    }
  },
  {
    blockType: 'card',
    content: {
      items: [
        {
          title: 'Prompt Engineering',
          description: 'You learn to ask better questions. The AI gives better answers.',
          color: '#FAF6EF',
          bgColor: '#111111'
        },
        {
          title: 'Promptolinguistics',
          description: 'You learn how individual words mechanically alter AI behavior. You become a precision instrument.',
          color: '#FAF6EF',
          bgColor: '#111111'
        },
        {
          title: 'Promptology',
          description: 'You study the collaboration itself. What does the human-AI interaction reveal about cognition, language, and meaning? The prompt becomes a research tool.',
          color: '#FAF6EF',
          bgColor: '#111111'
        }
      ]
    }
  },
  {
    blockType: 'text',
    content: {
      description: '"The word is not the instruction. The word is the architecture."\n\nYou came here as a prompt engineer. You leave as someone who understands that the prompt is not the point. The human holding the prompt is the point. The governance resides in you — not in the words. The words are just the interface.',
      descColor: '#E8520A',
      bgColor: '#1A1A2E',
      font: 'Playfair Display'
    }
  },
  {
    blockType: 'text',
    content: {
      title: 'Now Go Here',
      titleColor: '#1A1A2E',
      bgColor: '#FAF6EF',
      font: 'Playfair Display',
      align: 'center'
    }
  },
  {
    blockType: 'card',
    content: {
      items: [
        {
          title: 'Prompt Games',
          description: 'Try the tools',
          url: '/prompt-games',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'Promptolinguistics',
          description: 'The discipline',
          url: '/promptolinguistics',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'ALCM & Geometry',
          description: 'The models',
          url: '/frameworks',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        },
        {
          title: 'Citizen Researcher',
          description: 'The case',
          url: '/citizen-researcher',
          color: '#1A1A2E',
          bgColor: '#ffffff'
        }
      ]
    }
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'Information Gap',
      description: "You've mastered system prompts, chain-of-thought, and few-shot. You know that instructions decay. Here is the gap that technique alone doesn't close: the drift isn't in the model. It's in you. By message 20, you're not following your own system prompt anymore. You've adapted to the AI's responses. That's drift. And it starts before the model does anything wrong.",
      descColor: '#c8b89a',
      bgColor: '#1a1208',
      font: 'DM Sans',
      links: [{ label: 'What is drift? →', url: '/drift' }]
    }
  },
  {
    blockType: 'text',
    content: {
      eyebrow: 'Information Gap',
      description: "You've mastered system prompts and chain-of-thought. Here is the gap that technique alone doesn't close: the model's human-like interface changes how you prompt it. When the AI says 'I understand', you write differently than when it returns a JSON object. Anthropomorphism isn't a user error. It's a design feature. And it affects your prompts whether you notice it or not.",
      descColor: '#c8b89a',
      bgColor: '#100c18',
      font: 'DM Sans',
      links: [{ label: 'What is anthropomorphism? →', url: '/anthropomorphism' }]
    }
  }
];

async function migrate() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  try {
    await connection.execute('DELETE FROM content_blocks WHERE pageSlug = ?', [pageSlug]);
    
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      await connection.execute(
        'INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
        [pageSlug, block.blockType, JSON.stringify(block.content), i + 1, 'published']
      );
    }
    console.log(`Successfully migrated ${blocks.length} blocks for ${pageSlug}`);
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await connection.end();
  }
}

migrate();
