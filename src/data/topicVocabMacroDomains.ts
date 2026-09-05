import { TopicWord, topicVocabData } from "./topicVocabData";

export interface MacroDomain {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  color: string;
  accentColor: string;
  bgLight: string;
  textColor: string;
  borderColor: string;
  description: string;
  categories: string[];
}

export const MACRO_DOMAINS: MacroDomain[] = [
  {
    id: "macro-society-edu",
    name: "Xã Hội, Giáo Dục & Nhân Văn",
    nameEn: "Society, Education & Humanities",
    emoji: "🏛️",
    color: "#2563EB", // Blue
    accentColor: "#3B82F6",
    bgLight: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    description: "Hệ thống giáo dục, trường đại học, nghiên cứu học thuật, phương pháp luận, chính sách phúc lợi xã hội và di sản lịch sử văn hóa.",
    categories: [
      "Society & Culture",
      "Education Systems & Pedagogies",
      "Academic Performance & Feedback",
      "Course Selection & Curriculum",
      "Assignments & Coursework",
      "University Facilities & Services",
      "Library",
      "Presentation & Public Speaking",
      "Time Management & Study Skills",
      "History & Heritage",
      "History, Anthropology & Archaeology",
      "Exhibitions & Museums",
      "Volunteering & Community Projects",
      "Public Policy & Welfare",
      "Society, Culture & Media"
    ]
  },
  {
    id: "macro-economy-biz",
    name: "Kinh Tế, Tài Chính & Doanh Nghiệp",
    nameEn: "Economy, Finance & Business",
    emoji: "💼",
    color: "#059669", // Emerald
    accentColor: "#10B981",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    description: "Thị trường tài chính, ngân hàng, công nghiệp, việc làm, định hướng nghề nghiệp, bán lẻ và hành vi tiêu dùng hiện đại.",
    categories: [
      "Business, Economics & Industry",
      "Banking & Finance",
      "Work & Employment",
      "Workplace, Employment & Careers",
      "Workplace Orientation",
      "Consumer Behavior & Retail",
      "Advertising, Marketing & Consumerism",
      "Shopping, Goods & Services",
      "CreditCard"
    ]
  },
  {
    id: "macro-tech-science",
    name: "Khoa Học, Công Nghệ & Trí Tuệ Nhân Tạo",
    nameEn: "Science, AI & Technology",
    emoji: "🔬",
    color: "#7C3AED", // Violet
    accentColor: "#8B5CF6",
    bgLight: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    description: "Trí tuệ nhân tạo (AI), khoa học vật liệu, nghiên cứu thực địa, sinh học, văn phòng số hóa và các đề tài liên ngành.",
    categories: [
      "Technology, AI & Materials Science",
      "Science, Research & Academic Inquiry",
      "Research & Methodology",
      "Scientific Studies & Fieldwork",
      "Biology, Zoology & Botany",
      "Office & Digital Workplace",
      "Interdisciplinary Topics"
    ]
  },
  {
    id: "macro-environment",
    name: "Môi Trường, Sinh Thái & Địa Lý",
    nameEn: "Environment, Climate & Ecology",
    emoji: "🌿",
    color: "#0D9488", // Teal
    accentColor: "#14B8A6",
    bgLight: "bg-teal-50",
    textColor: "text-teal-700",
    borderColor: "border-teal-200",
    description: "Biến đổi khí hậu, thảm họa thiên nhiên, hệ sinh thái, địa chất, bảo tồn thiên nhiên và các dự án sinh thái xanh.",
    categories: [
      "Environmental Science & Ecosystems",
      "Environmental Projects",
      "Weather & Natural Disasters",
      "Geography, Geology & Meteorology",
      "Balcony & Outdoor Ecosystem",
      "Outdoor Expeditions"
    ]
  },
  {
    id: "macro-law-governance",
    name: "Chính Trị, Pháp Luật & Quan Hệ Quốc Tế",
    nameEn: "Law, Justice & Global Affairs",
    emoji: "⚖️",
    color: "#DC2626", // Red
    accentColor: "#EF4444",
    bgLight: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
    description: "Thể chế chính trị, hệ thống pháp luật, tội phạm và hình phạt, quan hệ ngoại giao toàn cầu, hiệp ước và an toàn trật tự.",
    categories: [
      "Politics, Law & Government",
      "Crime, Punishment & Justice",
      "International Relations & Global Issues",
      "Safety & Rules"
    ]
  },
  {
    id: "macro-health-psych",
    name: "Tâm Lý Học, Y Tế & Sức Khỏe",
    nameEn: "Psychology, Health & Well-being",
    emoji: "🧠",
    color: "#D97706", // Amber
    accentColor: "#F59E0B",
    bgLight: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    description: "Sức khỏe thể chất, y khoa, dinh dưỡng, tâm lý học hành vi, cảm xúc và chăm sóc tinh thần toàn diện.",
    categories: [
      "Health, Medicine & Nutrition",
      "Health & Well-being",
      "Health & Medical Care",
      "Mental Health & Wellness",
      "Psychology & Emotions",
      "Psychology & Human Behavior"
    ]
  },
  {
    id: "macro-lifestyle-urban",
    name: "Đời Sống, Đô Thị, Du Lịch & Nghệ Thuật",
    nameEn: "Lifestyle, Urban, Culture & Travel",
    emoji: "🏙️",
    color: "#DB2777", // Pink
    accentColor: "#EC4899",
    bgLight: "bg-pink-50",
    textColor: "text-pink-700",
    borderColor: "border-pink-200",
    description: "Kiến trúc quy hoạch đô thị, nhà ở, giao thông vận tải, ẩm thực, du lịch nghỉ dưỡng, thể thao, nghệ thuật và giải trí.",
    categories: [
      "Architecture, Urban Planning & Engineering",
      "Urbanization & Architecture",
      "Housing & Accommodation",
      "Travel, Tourism & Heritage",
      "Travel, Tourism & Transport",
      "Leisure, Sports & Fitness",
      "Kitchen & Dining",
      "Food & Dining",
      "Food",
      "Cafe & Specialty",
      "Bedroom",
      "Bathroom & Laundry",
      "Local Facilities & Venues",
      "Maps & Directions",
      "Events & Entertainment",
      "Entertainment & Media",
      "Art, Literature & Aesthetics",
      "Radio Broadcasts & Announcements"
    ]
  },
  {
    id: "macro-academic-core",
    name: "Từ Vựng IELTS Học Thuật Chuyên Sâu",
    nameEn: "Advanced IELTS Academic Lexicon",
    emoji: "🎯",
    color: "#4F46E5", // Indigo
    accentColor: "#6366F1",
    bgLight: "bg-indigo-50",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-200",
    description: "Kho thuật ngữ học thuật điểm cao (Band 7.5 - 9.0), phục vụ trực tiếp cho IELTS Reading Task & Writing luận văn chuyên sâu.",
    categories: [
      "Advanced IELTS Academic Vocabulary"
    ]
  },
  {
    id: "macro-ielts-listening",
    name: "Từ Vựng IELTS Listening 4 Parts",
    nameEn: "IELTS Listening 40 Core Topics",
    emoji: "🎧",
    color: "#0284C7", // Vibrant Sky Blue
    accentColor: "#38BDF8",
    bgLight: "bg-sky-50",
    textColor: "text-sky-800",
    borderColor: "border-sky-300",
    description: "Kho 400 từ vựng cốt lõi & Collocations đắt giá bao quát toàn diện 4 Phần thi IELTS Listening (Part 1: Giao dịch đời sống, Part 2: Bản đồ chỉ đường, Part 3: Thảo luận học thuật, Part 4: Bài giảng chuyên sâu).",
    categories: [
      "Personal Information & Registration",
      "1. Personal Information & Registration",
      "2. Housing & Accommodation",
      "3. Travel, Tourism & Transport",
      "4. Leisure, Sports & Fitness",
      "5. Work & Employment",
      "6. Shopping, Goods & Services",
      "7. Health & Medical Care",
      "8. Events & Entertainment",
      "9. Banking & Finance",
      "10. Food & Dining",
      "11. Local Facilities & Venues",
      "12. Maps & Directions",
      "13. Volunteering & Community Projects",
      "14. Safety & Rules",
      "15. History & Heritage",
      "16. Environmental Projects",
      "17. Radio Broadcasts & Announcements",
      "18. Workplace Orientation",
      "19. Exhibitions & Museums",
      "20. Outdoor Expeditions",
      "21. Assignments & Coursework",
      "22. Research & Methodology",
      "23. Course Selection & Curriculum",
      "24. Academic Performance & Feedback",
      "25. Presentation & Public Speaking",
      "26. University Facilities & Services",
      "27. Education Systems & Pedagogies",
      "28. Scientific Studies & Fieldwork",
      "29. Time Management & Study Skills",
      "30. Interdisciplinary Topics",
      "31. Business, Economics & Industry",
      "32. Environmental Science & Ecosystems",
      "33. History, Anthropology & Archaeology",
      "34. Biology, Zoology & Botany",
      "35. Psychology & Human Behavior",
      "36. Architecture, Urban Planning & Engineering",
      "37. Geography, Geology & Meteorology",
      "38. Health, Medicine & Nutrition",
      "39. Technology, AI & Materials Science",
      "40. Society, Culture & Media"
    ]
  }
];

// Helper: normalize category string for matching
function normalizeCat(cat: string): string {
  return cat.replace(/^\d+\.\s*/, "").toLowerCase().trim();
}

// Map for non-listening domains
const nonListeningCatMap = new Map<string, MacroDomain>();
for (const domain of MACRO_DOMAINS) {
  if (domain.id !== "macro-ielts-listening") {
    for (const cat of domain.categories) {
      nonListeningCatMap.set(cat.toLowerCase().trim(), domain);
    }
  }
}

export function getMacroDomainForCategory(category: string, wordId?: string): MacroDomain {
  // If word belongs to listening data or has numbered category 1-40
  if (wordId?.startsWith("list-") || /^\d+\.\s/.test(category)) {
    return MACRO_DOMAINS.find((d) => d.id === "macro-ielts-listening") || MACRO_DOMAINS[8];
  }
  const exact = nonListeningCatMap.get(category.toLowerCase().trim());
  if (exact) return exact;
  const normalized = nonListeningCatMap.get(normalizeCat(category));
  if (normalized) return normalized;
  // Fallback to Society or Academic
  return MACRO_DOMAINS[0];
}

export interface GroupedMacroDomain {
  domain: MacroDomain;
  words: TopicWord[];
  subcategories: {
    category: string;
    words: TopicWord[];
  }[];
}

export function getGroupedMacroDomains(words: TopicWord[] = topicVocabData): GroupedMacroDomain[] {
  // First, map every word to its domain
  const domainWordMap = new Map<string, TopicWord[]>();
  for (const domain of MACRO_DOMAINS) {
    domainWordMap.set(domain.id, []);
  }

  for (const w of words) {
    const domain = getMacroDomainForCategory(w.category, w.id);
    domainWordMap.get(domain.id)!.push(w);
  }

  return MACRO_DOMAINS.map((domain) => {
    const domainWords = domainWordMap.get(domain.id) || [];

    // Group by subcategory
    const subcatMap = new Map<string, TopicWord[]>();
    for (const w of domainWords) {
      const existing = subcatMap.get(w.category) || [];
      existing.push(w);
      subcatMap.set(w.category, existing);
    }

    const subcategories = Array.from(subcatMap.entries()).map(([category, catWords]) => ({
      category,
      words: catWords,
    }));

    return {
      domain,
      words: domainWords,
      subcategories,
    };
  });
}
