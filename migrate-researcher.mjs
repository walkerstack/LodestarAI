import mysql from 'mysql2/promise';
import 'dotenv/config';

async function migrate() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const pageSlug = 'researcher';

  try {
    console.log(`Starting migration for ${pageSlug}...`);
    
    await connection.execute('DELETE FROM content_blocks WHERE pageSlug = ?', [pageSlug]);
    console.log(`Deleted existing blocks for ${pageSlug}`);

    const blocks = [
      {
        blockType: 'text',
        content: {
          title: "This Is Not Peer-Reviewed. It's Peer-Offered.",
          description: "GallantryAI is citizen research — observed, documented, and shared openly. No institutional backing. No funding. No lab. Just a person who noticed patterns, wrote them down, and tested them across nine AI platforms. This page explains the methodology, the limitations, and the honest disclaimers.",
          eyebrow: "Lens: Researcher",
          titleColor: "#FAF6EF",
          descColor: "#b0a898",
          bgColor: "transparent",
          align: "left",
          font: "'Playfair Display', serif"
        }
      },
      {
        blockType: 'image',
        content: {
          url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/researcher-lens-hero-nvkgzBVAA5XoQv2apr4SJt.webp",
          alt: "",
          eyebrow: "",
          caption: ""
        }
      },
      {
        blockType: 'text',
        content: {
          title: "What Is Citizen Research?",
          description: "Citizen research means regular people doing real research — not in a lab, but in their lives. Birdwatchers have been citizen scientists for centuries. Galaxy Zoo lets anyone classify galaxies. GallantryAI applies the same idea to AI interaction: you don't need a PhD to notice patterns and write them down.\n\nIf you've ever noticed that changing one word in a prompt completely changed the AI's response — you've already started doing citizen research.",
          eyebrow: "Everyday",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "transparent",
          align: "left",
          font: "'Playfair Display', serif",
          links: [{ label: "Start with The Five Rules →", url: "/rules" }]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "What Is Citizen Research?",
          description: "Citizen science has a long history of producing valid observations that later receive institutional validation. Darwin was a citizen scientist. The question is not whether citizen research can produce valid findings — it's whether the methodology is transparent enough for others to evaluate. That's what this page provides.",
          eyebrow: "Watcher",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "transparent",
          align: "left",
          font: "'Playfair Display', serif",
          links: [{ label: "Citizen Researcher Page →", url: "/citizen-researcher" }]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "What Is Citizen Research?",
          description: "The academic context: AI interaction research is a new field. Most existing literature focuses on model behavior, not user behavior. GallantryAI's contribution is user-side: how does the human's language affect the model's output? The ALCM, the scaffold, the Watcher variable — these are all user-side constructs.",
          eyebrow: "Professional",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "transparent",
          align: "left",
          font: "'Playfair Display', serif",
          links: [
            { label: "Promptolinguistics →", url: "/promptolinguistics" },
            { label: "Cognitive Science Lens →", url: "/for/cognitive-science" }
          ]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "Methodology",
          description: "The method is simple: try something, write down what happens, try it again, see if it happens again. If it does, you might have found a pattern. If it doesn't, you learned something too. That's research.\n\nThe Field Papers section shows real examples of this process — actual sessions, actual observations, actual conclusions (and actual mistakes).",
          eyebrow: "Everyday",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "#f5f0e8",
          align: "left",
          font: "'Playfair Display', serif",
          links: [{ label: "Field Papers →", url: "/field-papers" }]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "Methodology",
          description: "The methodology is phenomenological: observe the interaction, document the observation, test the pattern across platforms, document the results. The key limitation: single observer. The key strength: cross-platform testing (nine AI platforms). The key question: does the pattern hold when someone else tries it?",
          eyebrow: "Watcher",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "#f5f0e8",
          align: "left",
          font: "'Playfair Display', serif",
          links: [{ label: "Field Papers →", url: "/field-papers" }]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "Methodology",
          description: "The research follows an iterative observational methodology: (1) Observe a behavioral pattern in AI output. (2) Hypothesize the linguistic cause. (3) Test across multiple platforms. (4) Document results including failures. (5) Refine the model. This is closer to grounded theory than experimental design.\n\nPlatforms tested: ChatGPT, Claude, Gemini, Copilot, DeepSeek, Llama, Mistral, Grok, Perplexity",
          eyebrow: "Professional",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "#f5f0e8",
          align: "left",
          font: "'Playfair Display', serif",
          links: [{ label: "AI Family Taxonomy →", url: "/taxonomy" }]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "Documentation as Research Artifact",
          description: "Every AI session can be a research session if you write down what happened. What did you ask? What did you get back? What surprised you? What didn't work? That's a field note. Enough field notes become a field paper. Enough field papers become a framework.",
          eyebrow: "Everyday",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "transparent",
          align: "left",
          font: "'Playfair Display', serif",
          links: [{ label: "Living Lexicon →", url: "/lexicon" }]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "Documentation as Research Artifact",
          description: "The documentation itself is the primary research artifact. The Living Lexicon is a growing vocabulary. The Field Papers are session reports. The Framework Families are visual models. Together, they form a corpus that can be evaluated, critiqued, and extended by others. That's the point — it's open.",
          eyebrow: "Watcher",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "transparent",
          align: "left",
          font: "'Playfair Display', serif",
          links: [
            { label: "Living Lexicon →", url: "/lexicon" },
            { label: "Framework Families →", url: "/frameworks" }
          ]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "Documentation as Research Artifact",
          description: "The documentation serves as both the dataset and the analysis. The lexicon operationalizes the variables. The field papers provide the raw qualitative data. The frameworks provide the theoretical synthesis. The open nature of the site allows for continuous peer review by the user base.",
          eyebrow: "Professional",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "transparent",
          align: "left",
          font: "'Playfair Display', serif",
          links: [
            { label: "Living Lexicon →", url: "/lexicon" },
            { label: "Framework Families →", url: "/frameworks" }
          ]
        }
      },
      {
        blockType: 'card',
        content: {
          items: [
            {
              title: "No Institutional Backing",
              description: "This isn't from a university or a company. It's from one person's observations.",
              color: "#E8520A",
              bgColor: "rgba(255,255,255,0.05)"
            },
            {
              title: "Single Observer",
              description: "One person noticed these patterns. Other people might notice different things.",
              color: "#E8520A",
              bgColor: "rgba(255,255,255,0.05)"
            },
            {
              title: "Not Therapy",
              description: "This site talks about emotions and AI, but it's not a replacement for talking to a real person. If you need help, the crisis page has real resources.",
              color: "#E8520A",
              bgColor: "rgba(255,255,255,0.05)"
            },
            {
              title: "Models Change",
              description: "AI updates constantly. What works today might not work tomorrow. That's why the site keeps updating too.",
              color: "#E8520A",
              bgColor: "rgba(255,255,255,0.05)"
            }
          ]
        }
      },
      {
        blockType: 'card',
        content: {
          items: [
            {
              title: "No Institutional Backing",
              description: "The absence of institutional backing means no IRB oversight, no peer review process, and no funding bias. It also means no institutional credibility. Both are true.",
              color: "#E8520A",
              bgColor: "rgba(255,255,255,0.05)"
            },
            {
              title: "Single Observer",
              description: "Single-observer research has well-documented limitations: confirmation bias, selection bias, and observer effect. The cross-platform testing partially mitigates but does not eliminate these.",
              color: "#E8520A",
              bgColor: "rgba(255,255,255,0.05)"
            },
            {
              title: "Not Therapy",
              description: "The psychological frameworks referenced here are applied to AI interaction, not to clinical treatment. The Flower Presets are accessibility tools, not therapeutic interventions.",
              color: "#E8520A",
              bgColor: "rgba(255,255,255,0.05)"
            },
            {
              title: "Models Change",
              description: "The observations are time-bound. Model updates can invalidate specific findings while leaving the underlying patterns intact. The ALCM is designed to be model-agnostic, but this has not been formally verified.",
              color: "#E8520A",
              bgColor: "rgba(255,255,255,0.05)"
            }
          ]
        }
      },
      {
        blockType: 'card',
        content: {
          items: [
            {
              title: "No Institutional Backing",
              description: "The work exists outside institutional frameworks. This limits access to controlled experimental conditions but eliminates institutional bias and publication pressure.",
              color: "#E8520A",
              bgColor: "rgba(255,255,255,0.05)"
            },
            {
              title: "Single Observer",
              description: "N=1 observational research. The findings are hypotheses, not conclusions. Replication by independent observers is needed.",
              color: "#E8520A",
              bgColor: "rgba(255,255,255,0.05)"
            },
            {
              title: "Not Therapy",
              description: "No clinical claims are made. The psychological models are applied to human-AI interaction patterns, not to mental health treatment.",
              color: "#E8520A",
              bgColor: "rgba(255,255,255,0.05)"
            },
            {
              title: "Models Change",
              description: "Findings are version-dependent. The ALCM aims for model-agnostic applicability, but longitudinal validation across model versions is ongoing.",
              color: "#E8520A",
              bgColor: "rgba(255,255,255,0.05)"
            }
          ]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "The Watcher Variable",
          description: "The Watcher is the part of you that steps back and watches the conversation. In research terms, it's the ability to observe yourself while you're doing something. It's what makes the difference between using AI and understanding how you use AI.",
          eyebrow: "Everyday",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "transparent",
          align: "left",
          font: "'Playfair Display', serif",
          links: [{ label: "The Five Rules →", url: "/rules" }]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "The Watcher Variable",
          description: "The Watcher variable is the central theoretical contribution: the user's capacity for metacognitive monitoring during AI interaction. It is both the research instrument (the observer) and the research subject (the thing being developed). This recursive quality is the most interesting — and most difficult to study — aspect of the entire framework.",
          eyebrow: "Watcher",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "transparent",
          align: "left",
          font: "'Playfair Display', serif",
          links: [{ label: "Citizen Researcher →", url: "/citizen-researcher" }]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "The Watcher Variable",
          description: "The Watcher variable maps to metacognitive monitoring (Flavell, 1979), observing ego (Sterba, 1934), and mindful awareness (Kabat-Zinn, 1990). It is operationalized through the scaffold: the user develops increasing capacity for real-time self-observation during AI interaction.",
          eyebrow: "Professional",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "transparent",
          align: "left",
          font: "'Playfair Display', serif",
          links: [
            { label: "Psychology Lens →", url: "/for/psychology" },
            { label: "Cognitive Science Lens →", url: "/for/cognitive-science" }
          ]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "Peer Review Status",
          description: "Status: The Marketing Prompt Field Report has been submitted to SSCI-indexed journals for peer review. This is the first formal submission from the GallantryAI project.\n\nHonest note: Submission does not mean acceptance. The paper may be rejected. If it is, the rejection and the reasons will be documented publicly on this site. That's what honest research looks like.\n\nEverything else on this site remains citizen research — observed, documented, and shared openly. It has not been peer-reviewed. Use it, test it, challenge it, improve it.",
          eyebrow: "",
          titleColor: "#1A1A2E",
          descColor: "#555",
          bgColor: "#f5f0e8",
          align: "left",
          font: "'Playfair Display', serif"
        }
      },
      {
        blockType: 'card',
        content: {
          items: [
            { title: "Citizen Researcher", description: "The full research identity page.", url: "/citizen-researcher", color: "#059669" },
            { title: "Field Papers", description: "The raw research documents.", url: "/field-papers", color: "#059669" },
            { title: "Cognitive Science Lens", description: "The neuroscience foundations.", url: "/for/cognitive-science", color: "#2A9D8F" },
            { title: "Psychology Lens", description: "The emotional layer of the research.", url: "/for/psychology", color: "#e11d48" },
            { title: "Mathematician Lens", description: "The structural models.", url: "/for/mathematician", color: "#6366f1" },
            { title: "Prompt Engineer Lens", description: "The technical applications.", url: "/for/prompt-engineer", color: "#E8520A" },
            { title: "Living Lexicon", description: "The growing vocabulary.", url: "/lexicon", color: "#c87533" },
            { title: "Everyday Person Lens", description: "Where most people should start.", url: "/for/everyday", color: "#E8520A" }
          ]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "The Watcher Notes",
          description: "\"The researcher's job is not to be right. It's to be honest about what was observed, transparent about how it was observed, and open about what might be wrong. Everything on this site is an invitation to test, not a command to believe.\"",
          eyebrow: "The Watcher Notes",
          titleColor: "#FAF6EF",
          descColor: "#b0a898",
          bgColor: "#1A1A2E",
          align: "center",
          font: "'Playfair Display', serif"
        }
      },
      {
        blockType: 'text',
        content: {
          title: "Information Gap",
          description: "You document variables. You control for confounds. You know that unobserved variables corrupt data. Here is the variable most AI research papers don't log: the researcher's own drift inside the session. The watcher variable is the dataset you forgot to collect. It's yourself.",
          eyebrow: "Information Gap",
          titleColor: "#E8520A",
          descColor: "#c8b89a",
          bgColor: "#1a1208",
          align: "left",
          font: "'DM Sans', sans-serif",
          links: [{ label: "What is drift? →", url: "/drift" }]
        }
      },
      {
        blockType: 'text',
        content: {
          title: "Information Gap",
          description: "You document variables. You control for confounds. Here is the confound most AI research papers don't control for: the researcher's own anthropomorphism inside the session. When you treat the model as a collaborator, you change how you prompt it. When you treat it as a tool, you change what you accept from it. The confound is you.",
          eyebrow: "Information Gap",
          titleColor: "#6366f1",
          descColor: "#c8b89a",
          bgColor: "#100c18",
          align: "left",
          font: "'DM Sans', sans-serif",
          links: [{ label: "What is anthropomorphism? →", url: "/anthropomorphism" }]
        }
      }
    ];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      await connection.execute(
        'INSERT INTO content_blocks (pageSlug, blockType, content, position, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
        [pageSlug, block.blockType, JSON.stringify(block.content), i + 1, 'published']
      );
    }

    console.log(`Successfully inserted ${blocks.length} blocks for ${pageSlug}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await connection.end();
  }
}

migrate();
