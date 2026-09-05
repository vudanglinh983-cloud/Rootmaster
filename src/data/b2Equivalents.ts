import { TopicWord } from "../types";

// Curated high-yield B2 synonyms & frequent equivalents for IELTS vocabulary
export const B2_EQUIVALENTS_MAP: Record<string, string> = {
  // Academic & Core IELTS
  "ubiquitous": "common, widespread, everywhere",
  "alleviate": "ease, relieve, reduce, lessen",
  "deteriorate": "worsen, decline, get worse",
  "exacerbate": "worsen, aggravate, make worse",
  "mitigate": "reduce, lessen, minimize",
  "unprecedented": "never seen before, unique, brand new",
  "profound": "deep, great, intense",
  "prerequisite": "requirement, condition, must-have",
  "quintessential": "typical, classic, ideal example",
  "meticulous": "careful, thorough, detailed",
  "scrutinize": "examine, check carefully, inspect",
  "facilitate": "help, support, make easier",
  "disseminate": "spread, share, distribute (info)",
  "advocate": "support, recommend, speak for",
  "substantiate": "prove, confirm, back up",
  "ambiguous": "unclear, confusing, doubtful",
  "comprehensive": "complete, thorough, full",
  "predominant": "main, principal, major",
  "feasible": "possible, practical, doable",
  "indispensable": "essential, necessary, vital",
  "redundant": "unnecessary, extra, no longer needed",
  "imperative": "urgent, very important, essential",
  "lucrative": "profitable, money-making",
  "versatile": "flexible, all-round, adaptable",
  "sustainable": "eco-friendly, long-lasting, green",
  "paramount": "top, most important, supreme",
  "adversary": "opponent, rival, enemy",
  "resilient": "tough, strong, quick to recover",
  "paradigm": "model, pattern, standard example",
  "stigma": "bad reputation, shame, disgrace",
  "consensus": "agreement, general opinion",
  "incentive": "motivation, reward, encouragement",
  "counterpart": "equivalent, peer, partner",
  "hierarchy": "ranking, grading system, levels",
  "manifest": "show clearly, display, appear",

  // Environment & Ecology
  "biodiversity": "variety of wildlife, animal/plant variety",
  "deforestation": "cutting down forests, logging",
  "renewable": "clean (energy), sustainable, inexhaustible",
  "contamination": "pollution, poisoning, dirtying",
  "greenhouse effect": "global warming mechanism",
  "ecosystem": "natural environment, habitat network",
  "conservation": "protection, preservation of nature",
  "catastrophe": "disaster, tragedy, severe damage",
  "depletion": "reduction, running out, using up",
  "emissions": "exhaust fumes, gases released",

  // Economy & Business
  "revenue": "income, total earnings",
  "expenditure": "spending, expenses, costs",
  "monopoly": "single seller, complete control of market",
  "entrepreneur": "business owner, founder, startup creator",
  "deficit": "shortage, loss of money, debt balance",
  "inflation": "price rise, cost-of-living increase",
  "currency": "money, cash in circulation",
  "fluctuation": "change, variation, ups and downs",
  "merger": "business combination, company joining",
  "dividend": "profit share, shareholder payout",

  // Society, Education & Law
  "curriculum": "syllabus, course program, subjects taught",
  "pedagogy": "teaching method, educational approach",
  "tuition fee": "school cost, study payment",
  "scholarship": "financial grant, study prize",
  "legislation": "law, act, legal rules",
  "jurisdiction": "legal power, official authority, district",
  "judiciary": "court system, judges, legal branch",
  "litigation": "lawsuit, court trial, legal action",
  "inequality": "unfairness, gap (rich & poor)",
  "demographic": "population group, age/gender group",

  // Science, AI & Tech
  "artificial intelligence": "smart computer system, AI",
  "automation": "machine work, computer control",
  "algorithm": "computer formula, step-by-step calculation",
  "breakthrough": "major discovery, big step forward",
  "cybersecurity": "internet safety, data protection",
  "telecommunications": "phone & internet network",
  "virtual reality": "digital simulation, 3D headset world",

  // Health, Mind & Medicine
  "sedentary": "inactive, sitting a lot, lazy lifestyle",
  "obesity": "overweight condition, severe fatness",
  "malnutrition": "poor diet, lack of healthy food",
  "chronic": "long-lasting, ongoing (illness)",
  "epidemic": "outbreak of disease, spreading sickness",
  "cognitive": "mental, thinking-related, brain-related",
  "well-being": "health and happiness, life quality",
  "rehabilitation": "recovery training, physical therapy",

  // Daily Life, Urban & Travel
  "infrastructure": "roads, bridges & public services",
  "accommodation": "housing, living place, lodging",
  "metropolis": "huge city, mega city, urban center",
  "amenities": "facilities, comforts (gym, pool, park)",
  "commute": "travel to work, daily trip",
  "pedestrian": "walker, person on foot",
  "congestion": "traffic jam, overcrowding",
  "itinerary": "travel schedule, trip route plan",
  "heritage": "tradition, historic culture, legacy",
  "suburb": "residential area outside city center",

  // IELTS Listening Core Topics (Part 1 - 4)
  "surname": "last name, family name",
  "marital status": "relationship status (single/married)",
  "postcode": "zip code, postal number",
  "enrolment": "registration, sign-up for course",
  "deposit": "down payment, security fee",
  "refund": "money back, repayment",
  "vegetarian": "plant eater, no-meat diet",
  "appliance": "home device (fridge, washing machine)",
  "amenity": "useful facility, extra comfort",
  "brochure": "pamphlet, information leaflet",
  "itinerary (listening)": "tour schedule, timetable",
  "preservation": "keeping safe, protecting",
  "dormitory": "student hostel, campus room",
  "canteen": "cafeteria, school dining hall",
  "tutor": "teacher, personal trainer, guide",
  "dissertation": "thesis, final research paper",
  "laboratory": "science lab, test room",
  "methodology": "research method, procedure",
  "seminar": "discussion class, group workshop",
  "orientation": "welcome briefing, introduction day"
};

/**
 * Resolves or extracts a high-yield B2 synonym / equivalent for any TopicWord
 */
export function resolveB2Equivalent(word: TopicWord): string {
  // 1. Direct word match in curated map
  const cleanWord = word.word.toLowerCase().trim();
  if (B2_EQUIVALENTS_MAP[cleanWord]) {
    return B2_EQUIVALENTS_MAP[cleanWord];
  }

  // 2. Check if word object already has b2Equivalent
  if (word.b2Equivalent && word.b2Equivalent.trim()) {
    return word.b2Equivalent;
  }

  // 3. Check for partial keyword match
  for (const [key, b2Val] of Object.entries(B2_EQUIVALENTS_MAP)) {
    if (cleanWord.includes(key) || key.includes(cleanWord)) {
      return b2Val;
    }
  }

  // 4. If word has synonyms field, format as B2 equivalents
  if (word.synonyms && word.synonyms.trim()) {
    return word.synonyms;
  }

  // 5. Intelligent heuristics based on English definition or Vietnamese meaning
  // Extract key verbs / adjectives from simple definitions
  const def = word.definition || "";
  const match = def.match(/(?:such as|meaning|similar to|type of|used to)\s+([^,.;]+)/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  // Fallback: simplified everyday description
  return word.vietnamese;
}
