import React, { useState, useMemo, useEffect } from "react";
import { topicVocabData, TopicWord } from "../data/topicVocabData";
import { 
  BookOpen, 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Coffee, 
  Briefcase, 
  Utensils, 
  Bed, 
  Bath, 
  Volume2, 
  HelpCircle, 
  Trophy, 
  RotateCcw,
  Check,
  Eye,
  Smile,
  Zap,
  Gamepad2,
  BookMarked,
  CloudRain,
  Soup,
  Users,
  HeartPulse,
  Film,
  Landmark,
  Brain,
  Compass,
  Globe,
  Megaphone,
  Building2,
  Scale,
  Microscope,
  Palette,
  Shield,
  ShoppingBag,
  GraduationCap,
  UserCheck,
  Home,
  Plane,
  Dumbbell,
  ShoppingCart,
  Stethoscope,
  Ticket,
  CreditCard,
  MapPin,
  HeartHandshake,
  ShieldAlert,
  History,
  Leaf,
  Radio,
  UserPlus,
  Mountain,
  FileText,
  FlaskConical,
  Award,
  Mic,
  School,
  Clock,
  Network,
  Library,
  Dna,
  Cpu,
  Activity
} from "lucide-react";

export const TopicVocabArena: React.FC = () => {
  // Mode: "flashcard" | "game"
  const [activeSubTab, setActiveSubTab] = useState<"flashcard" | "game">("flashcard");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [knownWords, setKnownWords] = useState<string[]>(() => {
    const stored = localStorage.getItem("topic_vocab_known_v1");
    return stored ? JSON.parse(stored) : [];
  });

  const [hideKnown, setHideKnown] = useState<boolean>(() => {
    const stored = localStorage.getItem("topic_vocab_hide_known");
    return stored === "false" ? false : true; // default to true
  });

  const handleToggleHideKnown = (checked: boolean) => {
    setHideKnown(checked);
    localStorage.setItem("topic_vocab_hide_known", String(checked));
  };

  // Filtered list based on category selection & hideKnown setting
  const filteredWords = useMemo(() => {
    let list = topicVocabData;
    if (selectedCategory !== "All") {
      list = list.filter(w => w.category === selectedCategory);
    }
    if (hideKnown) {
      list = list.filter(w => !knownWords.includes(w.id));
    }
    return list;
  }, [selectedCategory, hideKnown, knownWords]);

  // Categories list
  const categories = useMemo(() => {
    const list = new Set(topicVocabData.map(w => w.category));
    return ["All", ...Array.from(list)];
  }, []);

  // Category Icons & colors dictionary
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case "Kitchen & Dining":
        return { icon: <Utensils className="w-4 h-4" />, color: "bg-orange-50 text-orange-700 border-orange-200", badgeColor: "bg-orange-100 text-orange-800" };
      case "Bedroom":
        return { icon: <Bed className="w-4 h-4" />, color: "bg-indigo-50 text-indigo-700 border-indigo-200", badgeColor: "bg-indigo-100 text-indigo-800" };
      case "Bathroom & Laundry":
        return { icon: <Bath className="w-4 h-4" />, color: "bg-cyan-50 text-cyan-700 border-cyan-200", badgeColor: "bg-cyan-100 text-cyan-800" };
      case "Balcony & Outdoor Ecosystem":
        return { icon: <Sparkles className="w-4 h-4" />, color: "bg-emerald-50 text-emerald-700 border-emerald-200", badgeColor: "bg-emerald-100 text-emerald-800" };
      case "Office & Digital Workplace":
        return { icon: <Briefcase className="w-4 h-4" />, color: "bg-blue-50 text-blue-700 border-blue-200", badgeColor: "bg-blue-100 text-blue-800" };
      case "Cafe & Specialty":
        return { icon: <Coffee className="w-4 h-4" />, color: "bg-amber-50 text-amber-700 border-amber-200", badgeColor: "bg-amber-100 text-amber-800" };
      case "Weather & Natural Disasters":
        return { icon: <CloudRain className="w-4 h-4" />, color: "bg-sky-50 text-sky-700 border-sky-200", badgeColor: "bg-sky-100 text-sky-800" };
      case "Food":
        return { icon: <Soup className="w-4 h-4" />, color: "bg-rose-50 text-rose-700 border-rose-200", badgeColor: "bg-rose-100 text-rose-800" };
      case "Society & Culture":
        return { icon: <Users className="w-4 h-4" />, color: "bg-purple-50 text-purple-700 border-purple-200", badgeColor: "bg-purple-100 text-purple-800" };
      case "Health & Well-being":
        return { icon: <HeartPulse className="w-4 h-4" />, color: "bg-teal-50 text-teal-700 border-teal-200", badgeColor: "bg-teal-100 text-teal-800" };
      case "Entertainment & Media":
        return { icon: <Film className="w-4 h-4" />, color: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200", badgeColor: "bg-fuchsia-100 text-fuchsia-800" };
      case "Politics, Law & Government":
        return { icon: <Landmark className="w-4 h-4" />, color: "bg-slate-50 text-slate-700 border-slate-200", badgeColor: "bg-slate-100 text-slate-800" };
      case "Psychology & Emotions":
        return { icon: <Brain className="w-4 h-4" />, color: "bg-pink-50 text-pink-700 border-pink-200", badgeColor: "bg-pink-100 text-pink-800" };
      case "Travel, Tourism & Heritage":
        return { icon: <Compass className="w-4 h-4" />, color: "bg-cyan-50 text-cyan-700 border-cyan-200", badgeColor: "bg-cyan-100 text-cyan-800" };
      case "International Relations & Global Issues":
        return { icon: <Globe className="w-4 h-4" />, color: "bg-blue-50 text-blue-700 border-blue-200", badgeColor: "bg-blue-100 text-blue-800" };
      case "Advertising, Marketing & Consumerism":
        return { icon: <Megaphone className="w-4 h-4" />, color: "bg-violet-50 text-violet-700 border-violet-200", badgeColor: "bg-violet-100 text-violet-800" };
      case "Urbanization & Architecture":
        return { icon: <Building2 className="w-4 h-4" />, color: "bg-amber-50 text-amber-700 border-amber-200", badgeColor: "bg-amber-100 text-amber-800" };
      case "Crime, Punishment & Justice":
        return { icon: <Scale className="w-4 h-4" />, color: "bg-red-50 text-red-700 border-red-200", badgeColor: "bg-red-100 text-red-800" };
      case "Mental Health & Wellness":
        return { icon: <HeartPulse className="w-4 h-4" />, color: "bg-emerald-50 text-emerald-700 border-emerald-200", badgeColor: "bg-emerald-100 text-emerald-800" };
      case "Science, Research & Academic Inquiry":
        return { icon: <Microscope className="w-4 h-4" />, color: "bg-indigo-50 text-indigo-700 border-indigo-200", badgeColor: "bg-indigo-100 text-indigo-800" };
      case "Art, Literature & Aesthetics":
        return { icon: <Palette className="w-4 h-4" />, color: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200", badgeColor: "bg-fuchsia-100 text-fuchsia-800" };
      case "Workplace, Employment & Careers":
        return { icon: <Briefcase className="w-4 h-4" />, color: "bg-blue-50 text-blue-700 border-blue-200", badgeColor: "bg-blue-100 text-blue-800" };
      case "Public Policy & Welfare":
        return { icon: <Shield className="w-4 h-4" />, color: "bg-teal-50 text-teal-700 border-teal-200", badgeColor: "bg-teal-100 text-teal-800" };
      case "Consumer Behavior & Retail":
        return { icon: <ShoppingBag className="w-4 h-4" />, color: "bg-orange-50 text-orange-700 border-orange-200", badgeColor: "bg-orange-100 text-orange-800" };
      case "Advanced IELTS Academic Vocabulary":
        return { icon: <GraduationCap className="w-4 h-4" />, color: "bg-yellow-50 text-yellow-700 border-yellow-200", badgeColor: "bg-yellow-100 text-yellow-800" };
      case "Personal Information & Registration":
        return { icon: <UserCheck className="w-4 h-4" />, color: "bg-sky-50 text-sky-700 border-sky-200", badgeColor: "bg-sky-100 text-sky-800" };
      case "Housing & Accommodation":
        return { icon: <Home className="w-4 h-4" />, color: "bg-indigo-50 text-indigo-700 border-indigo-200", badgeColor: "bg-indigo-100 text-indigo-800" };
      case "Travel, Tourism & Transport":
        return { icon: <Plane className="w-4 h-4" />, color: "bg-teal-50 text-teal-700 border-teal-200", badgeColor: "bg-teal-100 text-teal-800" };
      case "Leisure, Sports & Fitness":
        return { icon: <Dumbbell className="w-4 h-4" />, color: "bg-emerald-50 text-emerald-700 border-emerald-200", badgeColor: "bg-emerald-100 text-emerald-800" };
      case "Work & Employment":
        return { icon: <Briefcase className="w-4 h-4" />, color: "bg-blue-50 text-blue-700 border-blue-200", badgeColor: "bg-blue-100 text-blue-800" };
      case "Shopping, Goods & Services":
        return { icon: <ShoppingCart className="w-4 h-4" />, color: "bg-amber-50 text-amber-700 border-amber-200", badgeColor: "bg-amber-100 text-amber-800" };
      case "Health & Medical Care":
        return { icon: <Stethoscope className="w-4 h-4" />, color: "bg-rose-50 text-rose-700 border-rose-200", badgeColor: "bg-rose-100 text-rose-800" };
      case "Events & Entertainment":
        return { icon: <Ticket className="w-4 h-4" />, color: "bg-purple-50 text-purple-700 border-purple-200", badgeColor: "bg-purple-100 text-purple-800" };
      case "Banking & Finance":
        return { icon: <CreditCard className="w-4 h-4" />, color: "bg-slate-50 text-slate-700 border-slate-200", badgeColor: "bg-slate-100 text-slate-800" };
      case "Food & Dining":
        return { icon: <Utensils className="w-4 h-4" />, color: "bg-orange-50 text-orange-700 border-orange-200", badgeColor: "bg-orange-100 text-orange-800" };
      case "Local Facilities & Venues":
        return { icon: <Landmark className="w-4 h-4" />, color: "bg-slate-50 text-slate-700 border-slate-200", badgeColor: "bg-slate-100 text-slate-800" };
      case "Maps & Directions":
        return { icon: <MapPin className="w-4 h-4" />, color: "bg-emerald-50 text-emerald-700 border-emerald-200", badgeColor: "bg-emerald-100 text-emerald-800" };
      case "Volunteering & Community Projects":
        return { icon: <HeartHandshake className="w-4 h-4" />, color: "bg-rose-50 text-rose-700 border-rose-200", badgeColor: "bg-rose-100 text-rose-800" };
      case "Safety & Rules":
        return { icon: <ShieldAlert className="w-4 h-4" />, color: "bg-amber-50 text-amber-700 border-amber-200", badgeColor: "bg-amber-100 text-amber-800" };
      case "History & Heritage":
        return { icon: <History className="w-4 h-4" />, color: "bg-stone-50 text-stone-700 border-stone-200", badgeColor: "bg-stone-100 text-stone-800" };
      case "Environmental Projects":
        return { icon: <Leaf className="w-4 h-4" />, color: "bg-green-50 text-green-700 border-green-200", badgeColor: "bg-green-100 text-green-800" };
      case "Radio Broadcasts & Announcements":
        return { icon: <Radio className="w-4 h-4" />, color: "bg-violet-50 text-violet-700 border-violet-200", badgeColor: "bg-violet-100 text-violet-800" };
      case "Workplace Orientation":
        return { icon: <UserPlus className="w-4 h-4" />, color: "bg-cyan-50 text-cyan-700 border-cyan-200", badgeColor: "bg-cyan-100 text-cyan-800" };
      case "Exhibitions & Museums":
        return { icon: <Palette className="w-4 h-4" />, color: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200", badgeColor: "bg-fuchsia-100 text-fuchsia-800" };
      case "Outdoor Expeditions":
        return { icon: <Mountain className="w-4 h-4" />, color: "bg-teal-50 text-teal-700 border-teal-200", badgeColor: "bg-teal-100 text-teal-800" };
      case "Assignments & Coursework":
        return { icon: <FileText className="w-4 h-4" />, color: "bg-blue-50 text-blue-700 border-blue-200", badgeColor: "bg-blue-100 text-blue-800" };
      case "Research & Methodology":
        return { icon: <FlaskConical className="w-4 h-4" />, color: "bg-purple-50 text-purple-700 border-purple-200", badgeColor: "bg-purple-100 text-purple-800" };
      case "Course Selection & Curriculum":
        return { icon: <BookOpen className="w-4 h-4" />, color: "bg-indigo-50 text-indigo-700 border-indigo-200", badgeColor: "bg-indigo-100 text-indigo-800" };
      case "Academic Performance & Feedback":
        return { icon: <Award className="w-4 h-4" />, color: "bg-emerald-50 text-emerald-700 border-emerald-200", badgeColor: "bg-emerald-100 text-emerald-800" };
      case "Presentation & Public Speaking":
        return { icon: <Mic className="w-4 h-4" />, color: "bg-rose-50 text-rose-700 border-rose-200", badgeColor: "bg-rose-100 text-rose-800" };
      case "University Facilities & Services":
        return { icon: <Library className="w-4 h-4" />, color: "bg-sky-50 text-sky-700 border-sky-200", badgeColor: "bg-sky-100 text-sky-800" };
      case "Education Systems & Pedagogies":
        return { icon: <School className="w-4 h-4" />, color: "bg-amber-50 text-amber-700 border-amber-200", badgeColor: "bg-amber-100 text-amber-800" };
      case "Scientific Studies & Fieldwork":
        return { icon: <Microscope className="w-4 h-4" />, color: "bg-teal-50 text-teal-700 border-teal-200", badgeColor: "bg-teal-100 text-teal-800" };
      case "Time Management & Study Skills":
        return { icon: <Clock className="w-4 h-4" />, color: "bg-orange-50 text-orange-700 border-orange-200", badgeColor: "bg-orange-100 text-orange-800" };
      case "Interdisciplinary Topics":
        return { icon: <Network className="w-4 h-4" />, color: "bg-cyan-50 text-cyan-700 border-cyan-200", badgeColor: "bg-cyan-100 text-cyan-800" };
      case "Business, Economics & Industry":
        return { icon: <Briefcase className="w-4 h-4" />, color: "bg-blue-50 text-blue-700 border-blue-200", badgeColor: "bg-blue-100 text-blue-800" };
      case "Environmental Science & Ecosystems":
        return { icon: <Globe className="w-4 h-4" />, color: "bg-emerald-50 text-emerald-700 border-emerald-200", badgeColor: "bg-emerald-100 text-emerald-800" };
      case "History, Anthropology & Archaeology":
        return { icon: <Landmark className="w-4 h-4" />, color: "bg-amber-50 text-amber-700 border-amber-200", badgeColor: "bg-amber-100 text-amber-800" };
      case "Biology, Zoology & Botany":
        return { icon: <Dna className="w-4 h-4" />, color: "bg-teal-50 text-teal-700 border-teal-200", badgeColor: "bg-teal-100 text-teal-800" };
      case "Psychology & Human Behavior":
        return { icon: <Brain className="w-4 h-4" />, color: "bg-purple-50 text-purple-700 border-purple-200", badgeColor: "bg-purple-100 text-purple-800" };
      case "Architecture, Urban Planning & Engineering":
        return { icon: <Building2 className="w-4 h-4" />, color: "bg-slate-50 text-slate-700 border-slate-200", badgeColor: "bg-slate-100 text-slate-800" };
      case "Geography, Geology & Meteorology":
        return { icon: <Compass className="w-4 h-4" />, color: "bg-sky-50 text-sky-700 border-sky-200", badgeColor: "bg-sky-100 text-sky-800" };
      case "Health, Medicine & Nutrition":
        return { icon: <Activity className="w-4 h-4" />, color: "bg-rose-50 text-rose-700 border-rose-200", badgeColor: "bg-rose-100 text-rose-800" };
      case "Technology, AI & Materials Science":
        return { icon: <Cpu className="w-4 h-4" />, color: "bg-indigo-50 text-indigo-700 border-indigo-200", badgeColor: "bg-indigo-100 text-indigo-800" };
      case "Society, Culture & Media":
        return { icon: <Users className="w-4 h-4" />, color: "bg-violet-50 text-violet-700 border-violet-200", badgeColor: "bg-violet-100 text-violet-800" };
      default:
        return { icon: <BookOpen className="w-4 h-4" />, color: "bg-slate-50 text-slate-700 border-slate-200", badgeColor: "bg-slate-100 text-slate-800" };
    }
  };

  // --- FLASHCARD STATE & LOGIC ---
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Keep index within bounds if active category changes
  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [selectedCategory]);

  // Keep index within bounds if filteredWords shrinks
  useEffect(() => {
    if (currentCardIndex >= filteredWords.length && filteredWords.length > 0) {
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  }, [filteredWords.length, currentCardIndex]);

  const currentCard = filteredWords[currentCardIndex];

  // Reset card flipped state whenever the active card changes
  const activeCardId = currentCard?.id;
  useEffect(() => {
    setIsFlipped(false);
  }, [activeCardId]);

  const toggleKnownStatus = (wordId: string) => {
    const updated = knownWords.includes(wordId)
      ? knownWords.filter(id => id !== wordId)
      : [...knownWords, wordId];
    setKnownWords(updated);
    localStorage.setItem("topic_vocab_known_v1", JSON.stringify(updated));
  };

  const handleNextCard = () => {
    if (filteredWords.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex(prev => (prev + 1) % filteredWords.length);
    }, 150);
  };

  const handlePrevCard = () => {
    if (filteredWords.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex(prev => (prev - 1 + filteredWords.length) % filteredWords.length);
    }, 150);
  };

  // TTS helper
  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent flipping card when clicking speaker
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        // cancel previous speech
        window.speechSynthesis.cancel();
        const cleanText = text.replace(/\(.*\)/, ""); // remove content in bracket like (Fridge) for cleaner pronouncing
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = "en-US";
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.warn("Speech synthesis is restricted or not supported in this frame context:", error);
    }
  };

  // --- GAME STATE & LOGIC ---
  interface GameCard {
    id: string; // matches vocab item ID
    text: string;
    type: "english" | "vietnamese";
    isMatched: boolean;
    uniqueId: string; // key for render
  }

  const [gameCards, setGameCards] = useState<GameCard[]>([]);
  const [selectedLeftCard, setSelectedLeftCard] = useState<GameCard | null>(null);
  const [selectedRightCard, setSelectedRightCard] = useState<GameCard | null>(null);
  const [wrongAnimationItemIds, setWrongAnimationItemIds] = useState<string[]>([]);
  const [matchTally, setMatchTally] = useState({ score: 0, turns: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const initGame = () => {
    // Pick 5 random words from the selected category pool
    const pool = filteredWords.length >= 5 ? filteredWords : topicVocabData;
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    const selectedBatch = shuffledPool.slice(0, 6); // standard 6 pairs is optimal for grid

    const englishCards: GameCard[] = selectedBatch.map(w => ({
      id: w.id,
      text: w.word,
      type: "english",
      isMatched: false,
      uniqueId: `${w.id}-en`
    }));

    const vietnameseCards: GameCard[] = selectedBatch.map(w => ({
      id: w.id,
      text: w.vietnamese,
      type: "vietnamese",
      isMatched: false,
      uniqueId: `${w.id}-vi`
    }));

    // Shuffle separately
    const finalLeft = englishCards.sort(() => Math.random() - 0.5);
    const finalRight = vietnameseCards.sort(() => Math.random() - 0.5);

    setGameCards([...finalLeft, ...finalRight]);
    setSelectedLeftCard(null);
    setSelectedRightCard(null);
    setWrongAnimationItemIds([]);
    setMatchTally({ score: 0, turns: 0 });
    setGameStarted(true);
    setGameCompleted(false);
  };

  const handleGameCardClick = (card: GameCard) => {
    if (card.isMatched) return;

    if (card.type === "english") {
      if (selectedLeftCard?.uniqueId === card.uniqueId) {
        setSelectedLeftCard(null); // Deselect
      } else {
        setSelectedLeftCard(card);
        checkMatchResult(card, selectedRightCard);
      }
    } else {
      if (selectedRightCard?.uniqueId === card.uniqueId) {
        setSelectedRightCard(null); // Deselect
      } else {
        setSelectedRightCard(card);
        checkMatchResult(selectedLeftCard, card);
      }
    }
  };

  const checkMatchResult = (enCard: GameCard | null, viCard: GameCard | null) => {
    if (!enCard || !viCard) return;

    // Both cards selected, count turn
    setMatchTally(prev => ({ ...prev, turns: prev.turns + 1 }));

    if (enCard.id === viCard.id) {
      // Corresponds - MATCH
      setTimeout(() => {
        setGameCards(prev => prev.map(c => {
          if (c.id === enCard.id) {
            return { ...c, isMatched: true };
          }
          return c;
        }));
        setSelectedLeftCard(null);
        setSelectedRightCard(null);

        setMatchTally(prev => {
          const nextScore = prev.score + 10;
          // check victory
          const totalPairsCount = gameCards.length / 2;
          const currentMatches = gameCards.filter(c => c.isMatched).length / 2 + 1; // including current match
          if (currentMatches === totalPairsCount) {
            setGameCompleted(true);
          }
          return { ...prev, score: nextScore };
        });
      }, 200);

    } else {
      // MISMATCH
      setWrongAnimationItemIds([enCard.uniqueId, viCard.uniqueId]);
      
      setTimeout(() => {
        setWrongAnimationItemIds([]);
        setSelectedLeftCard(null);
        setSelectedRightCard(null);
      }, 800);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Visual Section Intro Title */}
      <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#0F172A] relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#2563EB]/10 text-[#2563EB] font-serif italic text-xs px-2.5 py-0.5 rounded-full border border-[#2563EB]/20 font-bold uppercase tracking-wider">
                Học phần nâng cao
              </span>
              <span className="bg-emerald-50 text-emerald-700 font-mono text-[10px] px-2 py-0.5 rounded-md border border-emerald-100 font-semibold">
                {topicVocabData.length} Từ Đời Sống, Quầy Bar & Thiên Tai 💡
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mt-2 tracking-tight">
              VŨ TRỤ TỪ VỰNG CHỦ ĐỀ
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-2xl">
              Học nhanh {topicVocabData.length} từ vựng vàng về Đồ dùng Nhà bếp, Thiết bị Phòng ngủ, Đồ dùng Giặt giũ, Sân vườn, quầy pha chế Cà phê và Thời tiết & Thiên tai thông qua Flashcard gợi nhớ và mini-game ghép thẻ kịch tính.
            </p>
          </div>
          
          <div className="flex bg-gray-100 p-1 rounded-xl shrink-0 border border-gray-200">
            <button
              onClick={() => setActiveSubTab("flashcard")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                activeSubTab === "flashcard"
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white"
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              THẺ GỢI NHỚ
            </button>
            <button
              onClick={() => {
                setActiveSubTab("game");
                initGame();
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                activeSubTab === "game"
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              GAME GHÉP THẺ
            </button>
          </div>
        </div>

        {/* Global category scroll bar */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-gray-200">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">Chủ đề:</span>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            const theme = getCategoryTheme(cat);
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#0F172A] text-white border-[#0F172A] shadow-sm transform translate-y-[-1px]"
                    : "bg-white text-gray-600 hover:text-[#0F172A] hover:bg-gray-50 border-gray-200"
                }`}
              >
                {theme.icon}
                <span className="whitespace-nowrap">{cat === "All" ? "Tất Cả" : cat}</span>
              </button>
            );
          })}
        </div>

        {/* Toggle Hide Known Words */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <label className="relative flex items-center gap-2.5 font-extrabold text-gray-700 cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={hideKnown}
                onChange={(e) => handleToggleHideKnown(e.target.checked)}
                className="w-4.5 h-4.5 text-[#2563EB] bg-gray-100 border-gray-300 rounded focus:ring-[#2563EB] focus:ring-2 cursor-pointer transition-all accent-[#2563EB]"
              />
              <span className="flex items-center gap-1.5">
                <span>Ẩn những từ đã thuộc</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold">
                  {knownWords.length} từ đã tích
                </span>
              </span>
            </label>
          </div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            💡 Tích dấu [✓] trên mỗi thẻ để ẩn và không nhắc lại từ đó nữa
          </div>
        </div>
      </div>

      {/* IELTS C1-C2 collocations block for Weather */}
      {selectedCategory === "Weather & Natural Disasters" && (
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white border-2 border-[#0F172A] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#0F172A] space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-400 text-slate-900 font-mono text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                IELTS Band 7.5+ High-Scoring
              </span>
              <h4 className="text-sm font-black uppercase tracking-wider font-sans">
                Cụm từ C1–C2 Thời tiết & Thiên tai
              </h4>
            </div>
            <span className="text-[10px] font-mono text-slate-400 font-semibold">
              8 collocations đắt giá nhất cho bài thi Writing/Speaking Task 2
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all">
              <strong className="text-yellow-400 font-mono text-sm block">extreme weather events</strong>
              <span className="text-slate-300 block mt-0.5">các hiện tượng thời tiết cực đoan</span>
            </div>
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all">
              <strong className="text-yellow-400 font-mono text-sm block">climate-related disasters</strong>
              <span className="text-slate-300 block mt-0.5">thiên tai liên quan đến khí hậu</span>
            </div>
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all">
              <strong className="text-yellow-400 font-mono text-sm block">unpredictable weather patterns</strong>
              <span className="text-slate-300 block mt-0.5">mô hình thời tiết khó dự đoán</span>
            </div>
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all">
              <strong className="text-yellow-400 font-mono text-sm block">severe climatic conditions</strong>
              <span className="text-slate-300 block mt-0.5">điều kiện khí hậu khắc nghiệt</span>
            </div>
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all">
              <strong className="text-yellow-400 font-mono text-sm block">disaster preparedness</strong>
              <span className="text-slate-300 block mt-0.5">sự chuẩn bị ứng phó thiên tai</span>
            </div>
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all">
              <strong className="text-yellow-400 font-mono text-sm block">climate adaptation strategies</strong>
              <span className="text-slate-300 block mt-0.5">chiến lược thích ứng khí hậu</span>
            </div>
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all">
              <strong className="text-yellow-400 font-mono text-sm block">mitigate the impact of disasters</strong>
              <span className="text-slate-300 block mt-0.5">giảm thiểu tác động của thiên tai</span>
            </div>
            <div className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all">
              <strong className="text-yellow-400 font-mono text-sm block">increase the frequency and intensity of...</strong>
              <span className="text-slate-300 block mt-0.5">gia tăng tần suất và mức độ của bão lũ</span>
            </div>
          </div>
        </div>
      )}

      {/* --- SUBTAB 1: DOCK FLASHCARDS --- */}
      {activeSubTab === "flashcard" && (
        <div id="flashcard-deck-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main big interactive Flashcard (interactive flip) */}
          <div className="lg:col-span-2 space-y-4">
            {filteredWords.length > 0 ? (
              <div className="space-y-4">
                {/* Simulated Card container */}
                <div 
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`w-full min-h-[300px] md:min-h-[340px] bg-white border-2 border-[#0F172A] rounded-2xl shadow-[6px_6px_0px_0px_#0F172A] hover:shadow-[8px_8px_0px_0px_#0F172A] p-6 focus:outline-none transition-all duration-300 transform hover:translate-y-[-2px] cursor-pointer flex flex-col justify-between relative select-none ${
                    isFlipped ? "bg-blue-50/20 border-[#2563EB] shadow-[6px_6px_0px_0px_#2563EB]" : ""
                  }`}
                >
                  
                  {/* Top card metadata info */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 ${getCategoryTheme(currentCard.category).color}`}>
                      {getCategoryTheme(currentCard.category).icon}
                      {currentCard.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-400 font-mono">
                        {currentCardIndex + 1} / {filteredWords.length}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleKnownStatus(currentCard.id);
                        }}
                        className={`p-1.5 rounded-lg border transition-all hover:bg-gray-50 ${
                          knownWords.includes(currentCard.id)
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
                            : "bg-white text-gray-400 border-gray-200"
                        }`}
                        title={knownWords.includes(currentCard.id) ? "Bỏ đánh dấu thuộc" : "Đã thuộc từ này"}
                      >
                        <Check className="w-4 h-4 stroke-[3px]" />
                      </button>
                    </div>
                  </div>

                  {/* Middle core central words */}
                  <div className="py-6 text-center space-y-4">
                    {!isFlipped ? (
                      // FRONT SIDE (English Term & Audio Speaker)
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-3">
                          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 font-sans">
                            {currentCard.word}
                          </h3>
                          <button
                            onClick={(e) => handleSpeak(currentCard.word, e)}
                            className="p-2 rounded-full bg-blue-50 text-[#2563EB] hover:bg-blue-100 border border-blue-100 active:scale-90 transition-all cursor-pointer"
                            title="Nghe phát âm chuẩn"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                        {currentCard.pronunciation && (
                          <div className="text-sm text-blue-600 bg-blue-50/50 border border-blue-100 px-3 py-1 rounded-full inline-block font-mono font-bold tracking-wide">
                            {currentCard.pronunciation}
                          </div>
                        )}
                        <div className="block">
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-black tracking-widest uppercase">
                            <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
                            Click để lật xem nghĩa
                          </span>
                        </div>
                      </div>
                    ) : (
                      // BACK SIDE (Detailed bilingual translation)
                      <div className="space-y-4 animate-fade-in text-left">
                        <div>
                          <span className="text-[10px] space-x-1 font-bold text-gray-400 uppercase tracking-wider font-mono">Định nghĩa Tiếng Anh:</span>
                          <p className="text-sm md:text-base font-serif italic text-gray-700 leading-relaxed mt-0.5">
                            {currentCard.definition}
                          </p>
                        </div>
                        {currentCard.pronunciation && (
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Phát âm chuẩn:</span>
                            <span className="text-sm font-semibold text-gray-800 font-mono tracking-tight block mt-0.5">
                              {currentCard.pronunciation}
                            </span>
                          </div>
                        )}
                        <div className="bg-blue-50/50 p-3.5 border-l-4 border-l-[#2563EB] rounded-r-xl">
                          <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block font-mono">Nghĩa Tiếng Việt:</span>
                          <strong className="text-lg font-black text-gray-900 tracking-tight block mt-0.5 font-sans">
                            {currentCard.vietnamese}
                          </strong>
                        </div>
                        {currentCard.synonyms && (
                          <div className="bg-amber-50/50 p-3.5 border-l-4 border-l-amber-500 rounded-r-xl">
                            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block font-mono">Academic synonyms / related words:</span>
                            <span className="text-xs md:text-sm font-semibold text-amber-950 font-mono tracking-tight block mt-0.5">
                              {currentCard.synonyms}
                            </span>
                          </div>
                        )}
                        <div className="bg-emerald-50/50 p-3.5 border-l-4 border-l-emerald-500 rounded-r-xl">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1 font-mono">
                            <Smile className="w-3.5 h-3.5 text-emerald-600" />
                            Gợi ý ghi nhớ:
                          </span>
                          <p className="text-xs md:text-sm text-emerald-950 leading-relaxed font-sans mt-1">
                            {currentCard.memoryHook}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footing helper tips */}
                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                      {!isFlipped ? "Nhấp chuột vào thân thẻ để xem giải nghĩa Việt-Anh" : "Nhấp vào để quay lại mặt trước"}
                    </span>
                    <span className="font-mono text-[11px] font-bold">
                      ID: {currentCard.id}
                    </span>
                  </div>
                </div>

                {/* Left and Right navigation buttons */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={handlePrevCard}
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border-2 border-[#0F172A] hover:translate-y-[-1px] active:translate-y-[1px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase transition-all shadow-[2px_2px_0px_0px_#0F172A] cursor-pointer flex items-center justify-center gap-1"
                  >
                    <ChevronLeft className="w-4.5 h-4.5" />
                    Từ trước
                  </button>
                  
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="bg-white text-gray-600 border-2 border-gray-300 p-3 rounded-xl hover:bg-gray-50 active:scale-95 transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    title="Xoay lại mặt"
                  >
                    <RotateCw className="w-4.5 h-4.5" />
                    LẬT THẺ
                  </button>

                  <button
                    onClick={handleNextCard}
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border-2 border-[#0F172A] hover:translate-y-[-1px] active:translate-y-[1px] py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase transition-all shadow-[2px_2px_0px_0px_#0F172A] cursor-pointer flex items-center justify-center gap-1"
                  >
                    Từ sau
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-10 text-center shadow-[4px_4px_0px_0px_#0F172A] space-y-5">
                <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                  <Trophy className="w-10 h-10 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                    Xuất sắc! Đã hoàn thành chủ đề! 🎉
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                    Bạn đã thuộc toàn bộ từ vựng trong {selectedCategory === "All" ? "tất cả chủ đề" : `chủ đề "${selectedCategory}"`}. Thử thách bản thân với các từ đã học hoặc chọn một chủ đề mới bên trên nhé!
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleToggleHideKnown(false)}
                    className="bg-[#2563EB] text-white border-2 border-[#0F172A] hover:translate-y-[-1px] active:translate-y-[1px] py-2.5 px-5 rounded-xl text-xs font-black uppercase transition-all shadow-[2px_2px_0px_0px_#0F172A] cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCw className="w-4 h-4" />
                    Xem lại từ đã thuộc
                  </button>
                  {knownWords.length > 0 && (
                    <button
                      onClick={() => {
                        if (window.confirm("Bạn có chắc chắn muốn xóa tiến trình của tất cả các từ đã thuộc và học lại từ đầu?")) {
                          setKnownWords([]);
                          localStorage.removeItem("topic_vocab_known_v1");
                        }
                      }}
                      className="bg-white hover:bg-gray-50 text-red-600 border-2 border-red-200 py-2.5 px-5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer"
                    >
                      Xóa lịch sử & học lại từ đầu
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick learning status list & tip board */}
          <div className="space-y-4">
            
            {/* Topic Stats Card */}
            <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#0F172A]">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 font-mono">BẤT ĐỘNG SẢN TỪ VỰNG</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl text-center">
                  <div className="font-mono text-2xl font-black text-emerald-800">{knownWords.length}</div>
                  <div className="text-[10px] text-emerald-700 font-bold uppercase font-mono">Đã ghi nhớ</div>
                </div>
                <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-xl text-center">
                  <div className="font-mono text-2xl font-black text-[#2563EB]">{topicVocabData.length - knownWords.length}</div>
                  <div className="text-[10px] text-blue-700 font-bold uppercase font-mono">Cần rèn luyện</div>
                </div>
              </div>
              
              <div className="mt-3.5 bg-gray-50 p-2.5 rounded-xl border border-gray-150">
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500" 
                    style={{ width: `${Math.round((knownWords.length / topicVocabData.length) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-400 mt-1.5">
                  <span>TIẾN TRÌNH LÀM CHỦ</span>
                  <span className="text-emerald-700">{Math.round((knownWords.length / topicVocabData.length) * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Quick list view inside the categorized list */}
            <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#0F172A] flex flex-col h-[280px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1 font-mono">DANH SÁCH CHỦ ĐỀ ({filteredWords.length})</span>
              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 mt-2 scrollbar-thin">
                {filteredWords.map((word, i) => {
                  const isCurrent = i === currentCardIndex;
                  const isKnown = knownWords.includes(word.id);
                  return (
                    <button
                      key={word.id}
                      onClick={() => {
                        setCurrentCardIndex(i);
                        setIsFlipped(false);
                      }}
                      className={`w-full flex items-center justify-between text-left p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        isCurrent 
                          ? "bg-blue-50 text-blue-900 border-[#2563EB] font-black" 
                          : "bg-white text-gray-700 border-gray-150 hover:bg-gray-50"
                      }`}
                    >
                      <span className="truncate max-w-[130px] flex items-center gap-1.5">
                        <span className="font-mono text-[9px] text-gray-300">#{word.id}</span>
                        {word.word}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[10px] text-gray-400 truncate max-w-[70px]">{word.vietnamese}</span>
                        {isKnown && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- SUBTAB 2: MATCHING SPEED SHOWDOWN --- */}
      {activeSubTab === "game" && (
        <div id="game-arena-wrapper" className="bg-white border-2 border-[#0F172A] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#0F172A] space-y-4">
          
          {/* Game Stats indicator and refresh bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0F172A] text-white p-4 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 px-3 py-1.5 rounded-lg">
                <Trophy className="w-4 h-4 shrink-0" />
                <span className="text-xs font-mono font-bold uppercase">SCORE: <span className="text-base text-yellow-400 font-extrabold">{matchTally.score}</span> pts</span>
              </div>
              <div className="text-xs text-slate-300 font-mono">
                Số lượt ghép: <span className="font-bold text-white">{matchTally.turns}</span> lượt
              </div>
            </div>
            
            <button
              onClick={initGame}
              className="bg-[#2563EB] hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase px-4.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              LÀM MỚI GAME 🔄
            </button>
          </div>

          {/* Core game match grid */}
          {!gameCompleted ? (
            <div className="space-y-4">
              <div className="bg-amber-50 text-amber-900 border border-amber-200/50 p-3 rounded-lg text-xs md:text-sm flex items-center gap-2">
                <Zap className="text-amber-600 w-4.5 h-4.5 shrink-0" />
                <span><strong>Luật chơi:</strong> Nhấp vào <strong>1 Thẻ Tiếng Anh (bên trái)</strong> và <strong>1 Thẻ Tiếng Việt (bên phải)</strong> tương ứng để triệt tiêu chúng. Giải phóng toàn bộ bảng đấu để nhận điểm thưởng!</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                
                {/* Left Side: English items */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-center font-mono">Mặt chữ Tiếng Anh</span>
                  {gameCards.filter(c => c.type === "english").map(card => {
                    const isSelected = selectedLeftCard?.uniqueId === card.uniqueId;
                    const isWrongArr = wrongAnimationItemIds.includes(card.uniqueId);
                    
                    return (
                      <button
                        key={card.uniqueId}
                        onClick={() => handleGameCardClick(card)}
                        disabled={card.isMatched}
                        className={`w-full min-h-[56px] text-center px-4 py-3 rounded-xl border-2 text-xs md:text-sm font-black transition-all cursor-pointer ${
                          card.isMatched
                            ? "bg-slate-50 text-slate-300 border-slate-200 line-through opacity-40 cursor-not-allowed"
                            : isWrongArr
                            ? "bg-red-50 text-red-700 border-red-500 animate-shake"
                            : isSelected
                            ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md scale-[1.02]"
                            : "bg-white text-gray-900 border-[#0F172A] hover:bg-slate-50 shadow-[2px_2px_0px_0px_#0F172A]"
                        }`}
                      >
                        {card.text}
                      </button>
                    );
                  })}
                </div>

                {/* Right Side: Vietnamese translations */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-center font-mono">Ý nghĩa Tiếng Việt</span>
                  {gameCards.filter(c => c.type === "vietnamese").map(card => {
                    const isSelected = selectedRightCard?.uniqueId === card.uniqueId;
                    const isWrongArr = wrongAnimationItemIds.includes(card.uniqueId);

                    return (
                      <button
                        key={card.uniqueId}
                        onClick={() => handleGameCardClick(card)}
                        disabled={card.isMatched}
                        className={`w-full min-h-[56px] text-center px-4 py-3 rounded-xl border-2 text-xs md:text-sm font-black transition-all cursor-pointer ${
                          card.isMatched
                            ? "bg-slate-50 text-slate-300 border-slate-200 line-through opacity-40 cursor-not-allowed"
                            : isWrongArr
                            ? "bg-red-50 text-red-700 border-red-500 animate-shake"
                            : isSelected
                            ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md scale-[1.02]"
                            : "bg-white text-gray-900 border-[#0F172A] hover:bg-slate-50 shadow-[2px_2px_0px_0px_#0F172A]"
                        }`}
                      >
                        {card.text}
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>
          ) : (
            // Success victory card
            <div className="border-2 border-emerald-500 bg-emerald-50/30 rounded-2xl p-10 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100/80 text-emerald-600 rounded-full flex items-center justify-center mx-auto scale-110">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">KẾT THÚC BẢN ĐỒ! CỰC KỲ XUẤT SẮC 🎉</h3>
              <p className="text-emerald-900 max-w-md mx-auto text-sm leading-relaxed">
                Bạn đã hoàn thành ghép đôi xuất sắc với tổng điểm đạt được là <strong className="font-extrabold text-base text-yellow-600">{matchTally.score} điểm</strong> chỉ sau <strong className="font-extrabold text-gray-900">{matchTally.turns} lượt ghép</strong>!
              </p>
              
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={initGame}
                  className="bg-[#0F172A] hover:bg-slate-900 text-white font-mono text-xs font-bold uppercase px-6 py-3 rounded-xl transition-all shadow-[2px_2px_0px_0px_#0F172A] cursor-pointer"
                >
                  Chơi ván mới 🔁
                </button>
                <button
                  onClick={() => {
                    setActiveSubTab("flashcard");
                  }}
                  className="bg-white hover:bg-slate-50 text-gray-900 border-2 border-[#0F172A] font-mono text-xs font-bold uppercase px-6 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Ôn lại thẻ học 📖
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
