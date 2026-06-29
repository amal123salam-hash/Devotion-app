import { BibleVerse } from "../types";

export interface CounselQuote {
  id: string;
  text: string;
  reference: string;
  keywords: string[];
}

export const counselQuotes: CounselQuote[] = [
  {
    id: "q1",
    text: "Come to me, all who labor and are heavy laden, and I will give you rest.",
    reference: "Matthew 11:28",
    keywords: ["tired", "weary", "burdened", "exhausted", "overwhelmed", "rest", "heavy", "labor", "stress", "anxious"]
  },
  {
    id: "q2",
    text: "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you. Let not your hearts be troubled, neither let them be afraid.",
    reference: "John 14:27",
    keywords: ["anxious", "worried", "fear", "peace", "troubled", "afraid", "anxiety", "nervous", "scared", "panic"]
  },
  {
    id: "q3",
    text: "The Lord is near to the brokenhearted and saves the crushed in spirit.",
    reference: "Psalm 34:18",
    keywords: ["sad", "grief", "heartbroken", "crushed", "broken", "loss", "death", "mourning", "sorrow", "pain"]
  },
  {
    id: "q4",
    text: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
    reference: "Isaiah 41:10",
    keywords: ["fear", "afraid", "weak", "strength", "help", "alone", "abandoned", "dismayed", "courage", "strong"]
  },
  {
    id: "q5",
    text: "Cast all your anxieties on him, because he cares for you.",
    reference: "1 Peter 5:7",
    keywords: ["anxiety", "worry", "care", "burden", "anxious", "concerned", "troubled", "stress", "overwhelmed"]
  },
  {
    id: "q6",
    text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
    reference: "Jeremiah 29:11",
    keywords: ["future", "hope", "plan", "purpose", "lost", "direction", "uncertain", "confused", "meaning", "destiny"]
  },
  {
    id: "q7",
    text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.",
    reference: "Psalm 23:1-3",
    keywords: ["lost", "guidance", "shepherd", "want", "need", "provision", "restore", "soul", "empty", "direction"]
  },
  {
    id: "q8",
    text: "I can do all things through him who strengthens me.",
    reference: "Philippians 4:13",
    keywords: ["weak", "strength", "impossible", "difficult", "challenge", "overcome", "power", "ability", "can't", "unable"]
  },
  {
    id: "q9",
    text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
    reference: "Romans 8:28",
    keywords: ["bad", "wrong", "suffering", "pain", "why", "purpose", "good", "trust", "sovereign", "control"]
  },
  {
    id: "q10",
    text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
    reference: "Matthew 6:33",
    keywords: ["priority", "worry", "money", "provision", "needs", "seek", "kingdom", "first", "anxious", "trust"]
  },
  {
    id: "q11",
    text: "Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.",
    reference: "Joshua 1:9",
    keywords: ["courage", "brave", "fear", "new", "beginning", "change", "step", "forward", "scared", "alone"]
  },
  {
    id: "q12",
    text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.",
    reference: "Lamentations 3:22-23",
    keywords: ["mercy", "forgiveness", "new", "morning", "fresh", "start", "love", "faithfulness", "grace", "second chance"]
  },
  {
    id: "q13",
    text: "He heals the brokenhearted and binds up their wounds.",
    reference: "Psalm 147:3",
    keywords: ["heal", "wound", "hurt", "pain", "injury", "broken", "restore", "recovery", "mend", "wholeness"]
  },
  {
    id: "q14",
    text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
    reference: "Proverbs 3:5-6",
    keywords: ["trust", "understanding", "confused", "decision", "path", "direction", "wisdom", "lean", "own", "guide"]
  },
  {
    id: "q15",
    text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
    reference: "Psalm 23:4",
    keywords: ["death", "valley", "dark", "shadow", "evil", "fear", "comfort", "rod", "staff", "walk", "through"]
  }
];

export function findMatchingQuote(input: string): CounselQuote {
  const lowerInput = input.toLowerCase();

  // Find all quotes with matching keywords
  const matches = counselQuotes.filter(quote =>
    quote.keywords.some(keyword => lowerInput.includes(keyword.toLowerCase()))
  );

  if (matches.length > 0) {
    // Pick randomly from matches
    return matches[Math.floor(Math.random() * matches.length)];
  }

  // Fallback: pick randomly from all quotes
  return counselQuotes[Math.floor(Math.random() * counselQuotes.length)];
}

export function getPersonaResponse(quote: CounselQuote, userInput: string): { comfort: string; verses: BibleVerse[]; prayer: string } {
  const intros = [
    "My precious child, hear My heart for you today...",
    "Beloved, listen closely to what the Spirit whispers to your soul...",
    "My dear one, I see your heart and I draw near...",
    "Child of Mine, let these words settle deep within you...",
    "My beloved, you are not forgotten — hear My promise...",
    "Precious one, I speak life into your situation...",
    "My child, My eyes are upon you and My ears are open to your cry...",
    "Beloved daughter, precious son — receive this word from Me..."
  ];

  const outros = [
    "Rest in this truth, for I am with you always, even to the end of the age.",
    "Hold fast to this promise — I will never leave you nor forsake you.",
    "Let your heart be at peace, for I have overcome the world.",
    "Walk in this confidence: My grace is sufficient for you.",
    "Remember, I am the Good Shepherd — I know My sheep and they follow Me.",
    "Abide in My love, and you will bear much fruit.",
    "Fear not, little one, for it is your Father's good pleasure to give you the kingdom.",
    "My peace I leave with you — not as the world gives, but as only I can give."
  ];

  const randomIntro = intros[Math.floor(Math.random() * intros.length)];
  const randomOutro = outros[Math.floor(Math.random() * outros.length)];

  const comfort = `${randomIntro} "${quote.text}" (${quote.reference}) This is My living word for you right now. ${randomOutro} Don't fear, I am with you.`;

  const verses: BibleVerse[] = [
    { reference: quote.reference, text: quote.text }
  ];

  // Generate a personalized prayer based on the quote theme
  const prayer = generatePersonalizedPrayer(quote, userInput);

  return { comfort, verses, prayer };
}

function generatePersonalizedPrayer(quote: CounselQuote, _userInput: string): string {
  const prayers: Record<string, string[]> = {
    "Matthew 11:28": [
      "Lord Jesus, I come to You weary and heavy-laden. Teach me to rest in Your yoke, for Your burden is light. Give me the deep, abiding rest that only You can provide. Amen.",
      "Savior, I lay down my burdens at Your feet. Help me to trust that You carry what I cannot. Renew my strength as I wait upon You. In Your gentle name, Amen."
    ],
    "John 14:27": [
      "Prince of Peace, calm the storm within my heart. Let Your peace — not the world's fleeting calm — guard my mind and spirit. I receive Your peace right now. Amen.",
      "Jesus, still my anxious thoughts. Replace my fear with Your perfect peace that surpasses all understanding. Be the anchor of my soul. Amen."
    ],
    "Psalm 34:18": [
      "Father of Mercies, draw near to my broken heart. Bind up my wounds and heal my crushed spirit. Thank You that You are closest when I hurt the most. Amen.",
      "Lord, You collect my tears in Your bottle. Meet me in this grief and be my comfort. Restore the joy of Your salvation to me. Amen."
    ],
    "Isaiah 41:10": [
      "Almighty God, when fear rises, remind me of Your righteous right hand upholding me. Strengthen me, help me, hold me. I trust in Your presence. Amen.",
      "My Fortress, I need not fear — You are with me. Be my strength where I am weak, my help where I am helpless. I rest in Your promise. Amen."
    ],
    "1 Peter 5:7": [
      "Gracious Father, I cast every care upon You, knowing You care for me more deeply than I can imagine. Take what I cannot carry. Amen.",
      "Lord, teach me to release my anxieties into Your capable hands. You care for the sparrows — how much more for me? I trust You. Amen."
    ],
    "Jeremiah 29:11": [
      "God of Hope, when my future feels uncertain, remind me that Your plans for me are good. Give me eyes to see Your hand at work. Amen.",
      "Father, I surrender my need to control. Your thoughts toward me are thoughts of peace and a future. I walk forward in faith. Amen."
    ],
    "Psalm 23:1-3": [
      "Good Shepherd, lead me beside still waters today. Restore my soul and guide me in paths of righteousness. I shall not want — You are enough. Amen.",
      "Lord, be my Shepherd in this season. Provide, protect, and restore. Make me lie down in green pastures of Your peace. Amen."
    ],
    "Philippians 4:13": [
      "Christ my Strength, in my weakness You are made strong. Whatever faces me today, I face it through You. Empower me for Your glory. Amen.",
      "Jesus, I cannot, but You can. Strengthen me with might in my inner man. Let me live from Your power, not my own. Amen."
    ],
    "Romans 8:28": [
      "Sovereign Lord, weave even this difficulty into Your good purpose. Help me trust that You work all things — even this — for my good. Amen.",
      "Father, I may not understand, but I trust Your heart. Bring beauty from ashes, good from grief. Your purpose prevails. Amen."
    ],
    "Matthew 6:33": [
      "King of Kings, teach me to seek Your kingdom first. Align my heart with Your priorities. As I pursue You, provide all I need. Amen.",
      "Lord, reorder my desires. Let me hunger for Your righteousness above all else. Be my portion and my provider. Amen."
    ],
    "Joshua 1:9": [
      "Commander of Heaven's Armies, go before me. Be my courage when I tremble. I step forward because You are already there. Amen.",
      "God of Joshua, the same yesterday, today, forever — be with me wherever I go. Strengthen my heart to be brave. Amen."
    ],
    "Lamentations 3:22-23": [
      "Faithful One, Your mercies are new this morning. Meet me in this fresh start. Let me live today as a recipient of Your unending love. Amen.",
      "Father, great is Your faithfulness. Though I have failed, Your compassions never fail. Renew me by Your tender mercy. Amen."
    ],
    "Psalm 147:3": [
      "Great Physician, heal my broken heart. Bind up every wound, seen and unseen. You are the God who restores. Make me whole. Amen.",
      "Jesus, touch the places in me that hurt. Where I am wounded, pour in Your oil and wine. Heal me, and I shall be healed. Amen."
    ],
    "Proverbs 3:5-6": [
      "All-Wise God, I trust You with all my heart. I lay down my limited understanding. Direct my paths — make them straight. Amen.",
      "Lord, I acknowledge You in all my ways. Be my Guide, my Wisdom, my True North. Lead me in the way I should go. Amen."
    ],
    "Psalm 23:4": [
      "Shepherd of my soul, though I walk through the darkest valley, You are with me. Your rod and staff comfort me. I will fear no evil. Amen.",
      "Lord, be my comfort in the shadow. Your presence transforms the valley of death into a pathway of life. Walk with me. Amen."
    ]
  };

  const quotePrayers = prayers[quote.reference] || [
    "Lord, hear my prayer. Let Your word take root in my heart and bear fruit in my life. In Jesus' name, Amen.",
    "Father, speak to me through Your living word. May it comfort, guide, and transform me. Amen."
  ];

  return quotePrayers[Math.floor(Math.random() * quotePrayers.length)];
}