import React, { useState, useMemo } from "react";
import { WordRoot, RootCategory, RootContextData } from "../types";
import { ieltsParaphraseData, IELTSParaphraseItem } from "../data/paraphraseData";
import { SpeechService, getRootPronunciation, getWordPronunciation } from "../lib/speechSynthesis";
import { D3RootsMindmap } from "./D3RootsMindmap";
import { AiVocabTutorModal } from "./AiVocabTutorModal";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  GraduationCap, 
  Compass, 
  Network, 
  Bookmark, 
  Tag, 
  BookOpen, 
  Sparkles, 
  Check, 
  Layers,
  ArrowUpRight,
  ArrowRightLeft,
  Copy,
  CheckCheck,
  Volume2,
  VolumeX,
  Mic,
  LayoutGrid
} from "lucide-react";

interface RootsBoulevardProps {
  allRoots: WordRoot[];
}

export const RootsBoulevard: React.FC<RootsBoulevardProps> = ({ allRoots }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<"All" | "C1" | "C2">("All");
  const [expandedRootId, setExpandedRootId] = useState<string | null>(allRoots[0]?.id || null);
  const [showMindmapView, setShowMindmapView] = useState<boolean>(true);
  const [mindmapDisplayMode, setMindmapDisplayMode] = useState<"d3" | "grid">("d3");
  const [showParaphraseView, setShowParaphraseView] = useState<boolean>(false);
  const [paraphraseSearch, setParaphraseSearch] = useState<string>("");
  const [paraphraseFilterTrunk, setParaphraseFilterTrunk] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.85);

  // AI Tutor Integration States for Roots Boulevard
  const [isAiTutorOpen, setIsAiTutorOpen] = useState<boolean>(false);
  const [selectedRootForTutor, setSelectedRootForTutor] = useState<RootContextData | null>(null);
  const [tutorWords, setTutorWords] = useState<any[]>([]);

  const handlePlaySpeech = (text: string, id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentlyPlayingId === id) {
      SpeechService.stop();
      setCurrentlyPlayingId(null);
      return;
    }
    setCurrentlyPlayingId(id);
    SpeechService.speak(text, {
      rate: speechSpeed,
      onEnd: () => setCurrentlyPlayingId(null),
      onError: () => setCurrentlyPlayingId(null),
    });
  };

  interface TrunkConfig {
    number: number;
    category: string;
    title: string;
    subtitle: string;
    badge: string;
    accentBorder: string;
    headerBg: string;
    cardBorder: string;
    indicator: string;
    chipActive: string;
    textColor: string;
    darkBorder: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    btnBg: string;
    btnBorder: string;
  }

  const TRUNK_CONFIGS: TrunkConfig[] = [
    {
      number: 1,
      category: "Trục 1: Tiền Tố Định Hướng & Biến Đổi",
      title: "TRỤC 1: ACTION & VECTOR",
      subtitle: "Tiền tố định hướng & biến đổi hành vi",
      badge: "bg-blue-100 text-blue-800 border-blue-300",
      accentBorder: "border-l-blue-600",
      headerBg: "bg-blue-50/50",
      cardBorder: "border-blue-200",
      indicator: "bg-blue-600",
      chipActive: "bg-blue-600 text-white",
      textColor: "text-blue-400",
      darkBorder: "border-blue-500/30",
      badgeBg: "bg-blue-900/60",
      badgeText: "text-blue-300",
      badgeBorder: "border-blue-700/50",
      btnBg: "bg-blue-950/40",
      btnBorder: "border-blue-800/40",
    },
    {
      number: 2,
      category: "Trục 2: Tư Duy, Nhận Thức & Diễn Ngôn",
      title: "TRỤC 2: MIND & DISCOURSE",
      subtitle: "Tư duy, nhận thức, tri giác & ngôn biện",
      badge: "bg-purple-100 text-purple-800 border-purple-300",
      accentBorder: "border-l-purple-600",
      headerBg: "bg-purple-50/50",
      cardBorder: "border-purple-200",
      indicator: "bg-purple-600",
      chipActive: "bg-purple-600 text-white",
      textColor: "text-purple-400",
      darkBorder: "border-purple-500/30",
      badgeBg: "bg-purple-900/60",
      badgeText: "text-purple-300",
      badgeBorder: "border-purple-700/50",
      btnBg: "bg-purple-950/40",
      btnBorder: "border-purple-800/40",
    },
    {
      number: 3,
      category: "Trục 3: Con Người, Quản Trị & Thể Chế",
      title: "TRỤC 3: SOCIETY & GOVERNANCE",
      subtitle: "Con người, quyền lực, luật pháp & công bằng",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      accentBorder: "border-l-emerald-600",
      headerBg: "bg-emerald-50/50",
      cardBorder: "border-emerald-200",
      indicator: "bg-emerald-600",
      chipActive: "bg-emerald-600 text-white",
      textColor: "text-emerald-400",
      darkBorder: "border-emerald-500/30",
      badgeBg: "bg-emerald-900/60",
      badgeText: "text-emerald-300",
      badgeBorder: "border-emerald-700/50",
      btnBg: "bg-emerald-950/40",
      btnBorder: "border-emerald-800/40",
    },
    {
      number: 4,
      category: "Trục 4: Vận Động, Biến Đổi & Thời Không",
      title: "TRỤC 4: DYNAMICS & CHANGE",
      subtitle: "Vận động, kiến tạo, dòng chảy & thời không",
      badge: "bg-amber-100 text-amber-800 border-amber-300",
      accentBorder: "border-l-amber-600",
      headerBg: "bg-amber-50/50",
      cardBorder: "border-amber-200",
      indicator: "bg-amber-600",
      chipActive: "bg-amber-600 text-white",
      textColor: "text-amber-400",
      darkBorder: "border-amber-500/30",
      badgeBg: "bg-amber-900/60",
      badgeText: "text-amber-300",
      badgeBorder: "border-amber-700/50",
      btnBg: "bg-amber-950/40",
      btnBorder: "border-amber-800/40",
    },
    {
      number: 5,
      category: "Trục 5: Xung Động, Tác Động & Buộc Ép",
      title: "TRỤC 5: FORCE, URGE & MOTION",
      subtitle: "Xung động, tác động lực & buộc ép",
      badge: "bg-rose-100 text-rose-800 border-rose-300",
      accentBorder: "border-l-rose-600",
      headerBg: "bg-rose-50/50",
      cardBorder: "border-rose-200",
      indicator: "bg-rose-600",
      chipActive: "bg-rose-600 text-white",
      textColor: "text-rose-400",
      darkBorder: "border-rose-500/30",
      badgeBg: "bg-rose-900/60",
      badgeText: "text-rose-300",
      badgeBorder: "border-rose-700/50",
      btnBg: "bg-rose-950/40",
      btnBorder: "border-rose-800/40",
    },
    {
      number: 6,
      category: "Trục 6: Chân Lý, Đo Lường & Chuẩn Mực",
      title: "TRỤC 6: TRUTH, MEASURE & VALUE",
      subtitle: "Chân lý, đo lường & chuẩn mực giá trị",
      badge: "bg-cyan-100 text-cyan-800 border-cyan-300",
      accentBorder: "border-l-cyan-600",
      headerBg: "bg-cyan-50/50",
      cardBorder: "border-cyan-200",
      indicator: "bg-cyan-600",
      chipActive: "bg-cyan-600 text-white",
      textColor: "text-cyan-400",
      darkBorder: "border-cyan-500/30",
      badgeBg: "bg-cyan-900/60",
      badgeText: "text-cyan-300",
      badgeBorder: "border-cyan-700/50",
      btnBg: "bg-cyan-950/40",
      btnBorder: "border-cyan-800/40",
    },
    {
      number: 7,
      category: "Trục 7: Vị Thế, Thuộc Tính & Bền Vững",
      title: "TRỤC 7: STATE, POSITION & HOLDING",
      subtitle: "Vị thế, thuộc tính, cố định & bền vững",
      badge: "bg-indigo-100 text-indigo-800 border-indigo-300",
      accentBorder: "border-l-indigo-600",
      headerBg: "bg-indigo-50/50",
      cardBorder: "border-indigo-200",
      indicator: "bg-indigo-600",
      chipActive: "bg-indigo-600 text-white",
      textColor: "text-indigo-400",
      darkBorder: "border-indigo-500/30",
      badgeBg: "bg-indigo-900/60",
      badgeText: "text-indigo-300",
      badgeBorder: "border-indigo-700/50",
      btnBg: "bg-indigo-950/40",
      btnBorder: "border-indigo-800/40",
    },
    {
      number: 8,
      category: "Trục 8: Vận Động Của Dòng Đời & Chuyển Dịch",
      title: "TRỤC 8: CYCLE, PROGRESS & LIMITS",
      subtitle: "Vòng đời, chuyển dịch, tiến trình & giới hạn",
      badge: "bg-orange-100 text-orange-800 border-orange-300",
      accentBorder: "border-l-orange-600",
      headerBg: "bg-orange-50/50",
      cardBorder: "border-orange-200",
      indicator: "bg-orange-600",
      chipActive: "bg-orange-600 text-white",
      textColor: "text-orange-400",
      darkBorder: "border-orange-500/30",
      badgeBg: "bg-orange-900/60",
      badgeText: "text-orange-300",
      badgeBorder: "border-orange-700/50",
      btnBg: "bg-orange-950/40",
      btnBorder: "border-orange-800/40",
    },
    {
      number: 9,
      category: "Trục 9: Đo Lường, Chuẩn Mực & Định Lượng",
      title: "TRỤC 9: MEASURE, SCALE & BOUNDS",
      subtitle: "Đo lường, định lượng & tính toán (Task 1 & Thống kê)",
      badge: "bg-teal-100 text-teal-800 border-teal-300",
      accentBorder: "border-l-teal-600",
      headerBg: "bg-teal-50/50",
      cardBorder: "border-teal-200",
      indicator: "bg-teal-600",
      chipActive: "bg-teal-600 text-white",
      textColor: "text-teal-400",
      darkBorder: "border-teal-500/30",
      badgeBg: "bg-teal-900/60",
      badgeText: "text-teal-300",
      badgeBorder: "border-teal-700/50",
      btnBg: "bg-teal-950/40",
      btnBorder: "border-teal-800/40",
    },
    {
      number: 10,
      category: "Trục 10: Xung Đột, Phòng Thủ & Đối Kháng",
      title: "TRỤC 10: CONFLICT, DEFENSE & STRIKE",
      subtitle: "Xung đột, phòng thủ & đối kháng địa chính trị",
      badge: "bg-red-100 text-red-800 border-red-300",
      accentBorder: "border-l-red-600",
      headerBg: "bg-red-50/50",
      cardBorder: "border-red-200",
      indicator: "bg-red-600",
      chipActive: "bg-red-600 text-white",
      textColor: "text-red-400",
      darkBorder: "border-red-500/30",
      badgeBg: "bg-red-900/60",
      badgeText: "text-red-300",
      badgeBorder: "border-red-700/50",
      btnBg: "bg-red-950/40",
      btnBorder: "border-red-800/40",
    },
    {
      number: 11,
      category: "Trục 11: Phân Bổ, Sở Hữu & Cộng Đồng",
      title: "TRỤC 11: SHARE, PROPERTY & OBLIGATION",
      subtitle: "Sở hữu, phân chia & trách nhiệm công vụ",
      badge: "bg-violet-100 text-violet-800 border-violet-300",
      accentBorder: "border-l-violet-600",
      headerBg: "bg-violet-50/50",
      cardBorder: "border-violet-200",
      indicator: "bg-violet-600",
      chipActive: "bg-violet-600 text-white",
      textColor: "text-violet-400",
      darkBorder: "border-violet-500/30",
      badgeBg: "bg-violet-900/60",
      badgeText: "text-violet-300",
      badgeBorder: "border-violet-700/50",
      btnBg: "bg-violet-950/40",
      btnBorder: "border-violet-800/40",
    },
    {
      number: 12,
      category: "Trục 12: Đích Đến, Dự Phán & Ý Hướng",
      title: "TRỤC 12: AIM, SCOPE & DESTINATION",
      subtitle: "Đích đến, dự phán & hoạch định tương lai",
      badge: "bg-sky-100 text-sky-800 border-sky-300",
      accentBorder: "border-l-sky-600",
      headerBg: "bg-sky-50/50",
      cardBorder: "border-sky-200",
      indicator: "bg-sky-600",
      chipActive: "bg-sky-600 text-white",
      textColor: "text-sky-400",
      darkBorder: "border-sky-500/30",
      badgeBg: "bg-sky-900/60",
      badgeText: "text-sky-300",
      badgeBorder: "border-sky-700/50",
      btnBg: "bg-sky-950/40",
      btnBorder: "border-sky-800/40",
    },
    {
      number: 13,
      category: "Trục 13: Gắn Kết, Liên Tục & Thắt Chặt",
      title: "TRỤC 13: BIND, CONNECT & CONTINUITY",
      subtitle: "Gắn kết xã hội, giao tiếp & mắt xích trung tâm",
      badge: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300",
      accentBorder: "border-l-fuchsia-600",
      headerBg: "bg-fuchsia-50/50",
      cardBorder: "border-fuchsia-200",
      indicator: "bg-fuchsia-600",
      chipActive: "bg-fuchsia-600 text-white",
      textColor: "text-fuchsia-400",
      darkBorder: "border-fuchsia-500/30",
      badgeBg: "bg-fuchsia-900/60",
      badgeText: "text-fuchsia-300",
      badgeBorder: "border-fuchsia-700/50",
      btnBg: "bg-fuchsia-950/40",
      btnBorder: "border-fuchsia-800/40",
    },
    {
      number: 14,
      category: "Trục 14: Tính Thiện, Ác, Lợi Ích & Thiệt Hại",
      title: "TRỤC 14: GOOD, ILL, HARM & BENEFIT",
      subtitle: "Tính thiện, ác, lợi ích & tác hại môi trường",
      badge: "bg-lime-100 text-lime-800 border-lime-300",
      accentBorder: "border-l-lime-600",
      headerBg: "bg-lime-50/50",
      cardBorder: "border-lime-200",
      indicator: "bg-lime-600",
      chipActive: "bg-lime-600 text-white",
      textColor: "text-lime-400",
      darkBorder: "border-lime-500/30",
      badgeBg: "bg-lime-900/60",
      badgeText: "text-lime-300",
      badgeBorder: "border-lime-700/50",
      btnBg: "bg-lime-950/40",
      btnBorder: "border-lime-800/40",
    },
    {
      number: 15,
      category: "Trục 15: Đầy Đủ, Thiếu Hụt & Dư Thừa",
      title: "TRỤC 15: FULLNESS, VOID & SCARCITY",
      subtitle: "Sự đầy đủ, thiếu hụt & cạn kiệt tài nguyên",
      badge: "bg-stone-100 text-stone-800 border-stone-300",
      accentBorder: "border-l-stone-600",
      headerBg: "bg-stone-50/50",
      cardBorder: "border-stone-200",
      indicator: "bg-stone-600",
      chipActive: "bg-stone-600 text-white",
      textColor: "text-stone-300",
      darkBorder: "border-stone-500/30",
      badgeBg: "bg-stone-800/80",
      badgeText: "text-stone-300",
      badgeBorder: "border-stone-600/50",
      btnBg: "bg-stone-900/60",
      btnBorder: "border-stone-700/40",
    },
    {
      number: 16,
      category: "Trục 16: Dẫn Dắt, Quản Trị & Thực Thi",
      title: "TRỤC 16: LEAD, GUIDE & DIRECT",
      subtitle: "Dẫn dắt, quản trị & thực thi chính sách",
      badge: "bg-yellow-100 text-yellow-800 border-yellow-300",
      accentBorder: "border-l-yellow-600",
      headerBg: "bg-yellow-50/50",
      cardBorder: "border-yellow-200",
      indicator: "bg-yellow-600",
      chipActive: "bg-yellow-600 text-white",
      textColor: "text-yellow-400",
      darkBorder: "border-yellow-500/30",
      badgeBg: "bg-yellow-900/60",
      badgeText: "text-yellow-300",
      badgeBorder: "border-yellow-700/50",
      btnBg: "bg-yellow-950/40",
      btnBorder: "border-yellow-800/40",
    },
    {
      number: 17,
      category: "Trục 17: Biến Đổi Hình Thái & Tương Đồng",
      title: "TRỤC 17: FORM, MUTATION & VARIETY",
      subtitle: "Biến đổi hình thái, đột biến & thích nghi",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      accentBorder: "border-l-emerald-600",
      headerBg: "bg-emerald-50/50",
      cardBorder: "border-emerald-200",
      indicator: "bg-emerald-600",
      chipActive: "bg-emerald-600 text-white",
      textColor: "text-emerald-400",
      darkBorder: "border-emerald-500/30",
      badgeBg: "bg-emerald-900/60",
      badgeText: "text-emerald-300",
      badgeBorder: "border-emerald-700/50",
      btnBg: "bg-emerald-950/40",
      btnBorder: "border-emerald-800/40",
    },
    {
      number: 18,
      category: "Trục 18: Tính Minh Bạch, Phát Lộ & Ẩn Khuất",
      title: "TRỤC 18: LIGHT, REVEAL & CONCEAL",
      subtitle: "Tính minh bạch, phát lộ & mã hóa bảo mật",
      badge: "bg-purple-100 text-purple-800 border-purple-300",
      accentBorder: "border-l-purple-600",
      headerBg: "bg-purple-50/50",
      cardBorder: "border-purple-200",
      indicator: "bg-purple-600",
      chipActive: "bg-purple-600 text-white",
      textColor: "text-purple-300",
      darkBorder: "border-purple-500/30",
      badgeBg: "bg-purple-900/60",
      badgeText: "text-purple-300",
      badgeBorder: "border-purple-700/50",
      btnBg: "bg-purple-950/40",
      btnBorder: "border-purple-800/40",
    },
  ];

  const trunkCategories = [
    { key: "All", label: "Tất Cả 18 Trục", color: "border-slate-300 text-slate-700" },
    ...TRUNK_CONFIGS.map((t) => ({
      key: t.category,
      label: `Trục ${t.number}: ${t.title.split(": ")[1] || t.title}`,
      color: `${t.cardBorder} ${t.badge} ${t.headerBg}`,
    })),
  ];

  // Map each category to style themes
  const getCategoryTheme = (category: string) => {
    const match = TRUNK_CONFIGS.find((t) => category.includes(`Trục ${t.number}`));
    if (match) {
      return {
        badge: match.badge,
        accentBorder: match.accentBorder,
        headerBg: match.headerBg,
        cardBorder: match.cardBorder,
        indicator: match.indicator,
        chipActive: match.chipActive,
        name: match.title,
      };
    }
    return {
      badge: "bg-slate-100 text-slate-800 border-slate-300",
      accentBorder: "border-l-slate-600",
      headerBg: "bg-slate-50/50",
      cardBorder: "border-slate-200",
      indicator: "bg-slate-600",
      chipActive: "bg-slate-700 text-white",
      name: category,
    };
  };

  // Filter and search
  const filteredRoots = useMemo(() => {
    return allRoots.filter((root) => {
      const matchCategory =
        selectedCategory === "All" ||
        root.category === selectedCategory ||
        root.category.includes(selectedCategory) ||
        (root.axisTitle && root.axisTitle.includes(selectedCategory));
      const cleanSearch = searchTerm.toLowerCase().trim();
      
      const matchSearch =
        !cleanSearch ||
        root.root.toLowerCase().includes(cleanSearch) ||
        root.meaning.toLowerCase().includes(cleanSearch) ||
        root.tip.toLowerCase().includes(cleanSearch) ||
        (root.stemKey && root.stemKey.toLowerCase().includes(cleanSearch)) ||
        root.exampleWords.some(
          (w) =>
            w.word.toLowerCase().includes(cleanSearch) ||
            w.meaning.toLowerCase().includes(cleanSearch) ||
            (w.collocation && w.collocation.toLowerCase().includes(cleanSearch)) ||
            (w.visualBreakdown && w.visualBreakdown.toLowerCase().includes(cleanSearch))
        );

      const matchLevel =
        selectedLevel === "All" ||
        root.exampleWords.some((w) => w.level === selectedLevel);

      return matchCategory && matchSearch && matchLevel;
    });
  }, [allRoots, selectedCategory, searchTerm, selectedLevel]);

  const toggleExpand = (id: string) => {
    setExpandedRootId(prev => (prev === id ? null : id));
  };

  // Group roots for Mindmap visualizer across all 18 Trục
  const mindmapGroups = useMemo(() => {
    const groups: { [key: number]: WordRoot[] } = {};
    TRUNK_CONFIGS.forEach((t) => {
      groups[t.number] = [];
    });

    allRoots.forEach((root) => {
      const matchedTrunk = TRUNK_CONFIGS.find(
        (t) =>
          root.category.includes(`Trục ${t.number}`) ||
          (root.axis && root.axis.includes(`Trục ${t.number}`)) ||
          (root.axisTitle && root.axisTitle.includes(`Trục ${t.number}`))
      );
      if (matchedTrunk) {
        groups[matchedTrunk.number].push(root);
      }
    });

    return groups;
  }, [allRoots]);

  const filteredParaphrases = useMemo(() => {
    return ieltsParaphraseData.filter((item) => {
      const matchTrunk = paraphraseFilterTrunk === "All" || item.trunk.includes(paraphraseFilterTrunk);
      const clean = paraphraseSearch.toLowerCase().trim();
      const matchSearch =
        !clean ||
        item.root.toLowerCase().includes(clean) ||
        item.meaning.toLowerCase().includes(clean) ||
        item.generalWord.toLowerCase().includes(clean) ||
        item.c1c2Academic.toLowerCase().includes(clean) ||
        item.exampleIeltsSentence.toLowerCase().includes(clean) ||
        item.vietnameseTranslation.toLowerCase().includes(clean);
      return matchTrunk && matchSearch;
    });
  }, [paraphraseFilterTrunk, paraphraseSearch]);

  const handleCopySentence = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalWordsCount = useMemo(() => {
    return allRoots.reduce((acc, root) => acc + (root.exampleWords?.length || 0), 0);
  }, [allRoots]);

  const handleOpenRootTutor = (rootItem: WordRoot, trunkInfo?: TrunkConfig, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const rootContext: RootContextData = {
      root: rootItem.root,
      meaning: rootItem.meaning,
      origin: rootItem.origin,
      tip: rootItem.tip,
      category: rootItem.category,
      trunkNumber: trunkInfo?.number,
      trunkTitle: trunkInfo?.title,
      roots: rootItem.root,
    };
    setSelectedRootForTutor(rootContext);
    const wordsForTutor = (rootItem.exampleWords || []).map((w) => ({
      id: `root_w_${w.word}`,
      word: w.word,
      vietnamese: w.meaning || "",
      definition: w.visualBreakdown || w.meaning || "",
      category: rootItem.category,
      categoryEmoji: "🌳",
      memoryHook: rootItem.tip || w.visualBreakdown || "",
    }));
    setTutorWords(wordsForTutor);
    setIsAiTutorOpen(true);
  };

  return (
    <div id="boulevard-tab" className="space-y-6">
      
      {/* Boulevard Header Intro */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border-2 border-[#0F172A] p-5 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-300 uppercase tracking-wide">
              Hệ Thống Hình Thái Học (Morphological Stems)
            </span>
            <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-purple-300 uppercase tracking-wide">
              Chuẩn C1/C2 Academic (18 Trục Lớn Toàn Diện)
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#0F172A] tracking-tight mt-2 flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#2563EB]" />
            Đại Lộ Gốc Từ Theo Khung Mạng Lưới 18 Trục Lớn & Bảng Paraphrase IELTS
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
            Học từ vựng theo phương pháp giải mã gốc từ (Roots & Prefixes): khung 18 Trục Gốc từ bao quát 90%+ hiện tượng biến đổi từ vị ngữ, danh từ hóa và paraphrase học thuật ở dải điểm Band 7.5 – 9.0 trong IELTS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
          {/* AI Tutor Main Entrance Button for Roots Boulevard */}
          <button
            id="open-roots-ai-tutor-btn"
            type="button"
            onClick={() => {
              setSelectedRootForTutor({
                root: "Đại Lộ Gốc Từ",
                meaning: "Giải mã hình thái học Latin & Hy Lạp",
                origin: "Latin & Hy Lạp",
                tip: "Học theo cụm gốc từ giúp nhân 5 tốc độ ghi nhớ và mở rộng vốn từ học thuật C1/C2",
                category: selectedCategory === "All" ? "18 Trục Lớn" : selectedCategory,
                trunkTitle: selectedCategory === "All" ? "18 Trục Lớn Toàn Diện" : selectedCategory,
              });
              setTutorWords([]);
              setIsAiTutorOpen(true);
            }}
            className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md border border-blue-400 hover:scale-105 active:scale-95"
            title="Mở Gia Sư AI học từ vựng theo gốc từ (10-15 từ, bài đọc 150-250 từ & test ôn tập)"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Gia Sư AI Gốc Từ</span>
          </button>

          <button
            id="toggle-paraphrase-btn"
            onClick={() => setShowParaphraseView(!showParaphraseView)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border ${
              showParaphraseView 
                ? "bg-indigo-700 text-white border-indigo-800 shadow-xs" 
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200"
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            {showParaphraseView ? "Đóng Bảng Paraphrase" : "Bảng Paraphrase IELTS"}
          </button>

          <button
            id="toggle-mindmap-btn"
            onClick={() => setShowMindmapView(!showMindmapView)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border ${
              showMindmapView 
                ? "bg-[#0F172A] text-white border-[#0F172A]" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
            }`}
          >
            <Network className="w-4 h-4" />
            {showMindmapView ? "Thu Gọn Mindmap" : "Mở Sơ Đồ Mindmap"}
          </button>

          {/* Voice Engine Speed Controller */}
          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold shadow-2xs">
            <Volume2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="hidden sm:inline">Phát Âm:</span>
            <button
              type="button"
              onClick={() => setSpeechSpeed(speechSpeed === 0.85 ? 1.0 : 0.85)}
              className="px-2 py-0.5 rounded-md bg-white border border-blue-300 hover:bg-blue-100 text-[11px] font-bold text-blue-800 transition-colors cursor-pointer"
              title="Nhấn để đổi tốc độ phát âm (chậm 0.85x hoặc bình thường 1.0x)"
            >
              {speechSpeed === 0.85 ? "0.85x Chậm" : "1.0x Chuẩn"}
            </button>
            {currentlyPlayingId && (
              <button
                type="button"
                onClick={() => {
                  SpeechService.stop();
                  setCurrentlyPlayingId(null);
                }}
                className="px-1.5 py-0.5 rounded bg-rose-500 text-white text-[10px] font-bold hover:bg-rose-600 transition-colors cursor-pointer"
                title="Dừng phát âm"
              >
                Dừng
              </button>
            )}
          </div>
          
          <div className="font-mono text-xs text-gray-700 bg-gray-100 rounded-xl px-3 py-2 border border-gray-200 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span><strong>{allRoots.length}</strong> Gốc / <strong>{totalWordsCount}</strong> Từ C1/C2</span>
          </div>
        </div>
      </div>

      {/* IELTS Paraphrase Matrix View Section */}
      {showParaphraseView && (
        <div id="paraphrase-table-container" className="bg-white border-2 border-[#0F172A] rounded-2xl p-5 md:p-6 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-200 uppercase tracking-wide">
                  Academic Paraphrasing Matrix
                </span>
                <span className="text-xs font-bold text-gray-500">
                  {filteredParaphrases.length} Mẫu Chuyển Đổi Trọng Tâm
                </span>
              </div>
              <h3 className="text-lg font-black text-[#0F172A] tracking-tight mt-1 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
                Bảng Tra Cứu Paraphrase IELTS Theo Gốc Từ
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Chuyển đổi các từ vựng chung chung (Force, Send out, Trustworthy, Keep...) sang các động từ/tính từ C1-C2 Academic áp dụng trực tiếp cho IELTS Writing Task 2 & Speaking.
              </p>
            </div>

            {/* Quick search inside Paraphrase */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={paraphraseSearch}
                onChange={(e) => setParaphraseSearch(e.target.value)}
                placeholder="Tìm gốc, từ C1/C2, câu ví dụ..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Quick Trunk Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase mr-1">Lọc Trục:</span>
            {["All", ...TRUNK_CONFIGS.map((t) => `Trục ${t.number}`)].map((trunkName) => (
              <button
                key={trunkName}
                onClick={() => setParaphraseFilterTrunk(trunkName)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  paraphraseFilterTrunk === trunkName
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                }`}
              >
                {trunkName === "All" ? "Tất cả 18 Trục" : trunkName}
              </button>
            ))}
          </div>

          {/* Paraphrase Table Grid */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-slate-800 text-[11px] uppercase tracking-wider font-black border-b border-gray-200">
                  <th className="p-3 w-36">Gốc Từ (Root)</th>
                  <th className="p-3 w-40">Nghĩa Đơn Giản (Basic)</th>
                  <th className="p-3 w-48">Từ Vựng C1/C2 (Academic)</th>
                  <th className="p-3">Ví Dụ IELTS Writing Task 2 & Dịch Nghĩa</th>
                  <th className="p-3 w-20 text-center">Sao Chép</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs">
                {filteredParaphrases.map((row) => (
                  <tr key={row.id} className="hover:bg-indigo-50/40 transition-colors">
                    <td className="p-3 align-top">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-black text-[#0F172A] text-sm">
                          {row.root}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handlePlaySpeech(row.root, `para-root-${row.id}`, e)}
                          title="Nghe phát âm gốc từ"
                          className="p-1 rounded hover:bg-indigo-100 text-indigo-700 transition-colors cursor-pointer"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${currentlyPlayingId === `para-root-${row.id}` ? "text-amber-500 animate-pulse" : ""}`} />
                        </button>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {row.meaning}
                      </div>
                      <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {row.trunk.split(":")[0]}
                      </span>
                    </td>

                    <td className="p-3 align-top">
                      <span className="font-medium text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-200 inline-block">
                        {row.generalWord}
                      </span>
                    </td>

                    <td className="p-3 align-top">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-indigo-900 bg-indigo-50 px-2 py-1 rounded border border-indigo-200 inline-block">
                          {row.c1c2Academic}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handlePlaySpeech(row.c1c2Academic, `para-word-${row.id}`, e)}
                          title="Nghe phát âm từ C1/C2"
                          className="p-1 rounded hover:bg-indigo-100 text-indigo-700 transition-colors cursor-pointer"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${currentlyPlayingId === `para-word-${row.id}` ? "text-amber-500 animate-pulse" : ""}`} />
                        </button>
                      </div>
                      {row.collocation && (
                        <div className="text-[10px] text-indigo-700 mt-1.5 font-medium flex items-center gap-1">
                          <Tag className="w-3 h-3 text-indigo-500 shrink-0" />
                          <span>{row.collocation}</span>
                        </div>
                      )}
                    </td>

                    <td className="p-3 align-top space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-gray-800 leading-relaxed italic">
                          "{row.exampleIeltsSentence}"
                        </p>
                        <button
                          type="button"
                          onClick={(e) => handlePlaySpeech(row.exampleIeltsSentence, `para-sent-${row.id}`, e)}
                          title="Nghe đọc cả câu ví dụ"
                          className="shrink-0 p-1 rounded hover:bg-indigo-100 text-gray-500 hover:text-indigo-700 transition-colors cursor-pointer"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${currentlyPlayingId === `para-sent-${row.id}` ? "text-amber-500 animate-pulse" : ""}`} />
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        <strong className="text-gray-700">Dịch:</strong> {row.vietnameseTranslation}
                      </p>
                    </td>

                    <td className="p-3 align-top text-center">
                      <button
                        onClick={() => handleCopySentence(row.exampleIeltsSentence, row.id)}
                        title="Sao chép câu ví dụ"
                        className="p-1.5 rounded-lg border border-gray-200 hover:border-indigo-400 bg-white hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all cursor-pointer"
                      >
                        {copiedId === row.id ? (
                          <CheckCheck className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mindmap Interactive Explorer Section */}
      {showMindmapView && (
        <div id="mindmap-container" className="space-y-3">
          {/* Sub-mode Switcher Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 px-4 py-3 rounded-xl border-2 border-slate-800 text-white shadow-md">
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-blue-400" />
              <span className="font-sans font-black text-sm uppercase tracking-wide">
                🧭 Hệ Thống Trực Quan Hóa Mindmap 18 Trục Academic
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMindmapDisplayMode("d3")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  mindmapDisplayMode === "d3"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Sơ Đồ D3.js Tương Tác</span>
              </button>

              <button
                type="button"
                onClick={() => setMindmapDisplayMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  mindmapDisplayMode === "grid"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Lưới Thẻ 18 Trục</span>
              </button>
            </div>
          </div>

          {/* D3 Mindmap Interactive Canvas Mode */}
          {mindmapDisplayMode === "d3" ? (
            <D3RootsMindmap
              allRoots={allRoots}
              selectedRootId={expandedRootId}
              onSelectRoot={(root) => {
                setSelectedCategory(root.category);
                setExpandedRootId(root.id);
                setTimeout(() => {
                  document.getElementById(`root-item-${root.id}`)?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              onOpenAiTutor={(root) => handleOpenRootTutor(root)}
            />
          ) : (
            /* Classic 18-Trunk Grid View */
            <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6 border-2 border-[#0F172A] shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-200">
                  Lưới Phân Loại 18 Trục Lớn
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">
                  Nhấp vào bất kỳ gốc từ nào để nhảy ngay đến bảng chi tiết
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {TRUNK_CONFIGS.map((trunk) => {
                  const rootsInTrunk = mindmapGroups[trunk.number] || [];
                  return (
                    <div
                      key={trunk.number}
                      className={`bg-slate-800/80 rounded-xl p-4 border ${trunk.darkBorder} flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className={`text-xs font-black ${trunk.textColor} uppercase tracking-wide`}>
                            {trunk.title}
                          </span>
                          <span className={`text-[10px] ${trunk.badgeBg} ${trunk.badgeText} px-1.5 py-0.5 rounded border ${trunk.badgeBorder}`}>
                            {rootsInTrunk.length} Gốc
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">{trunk.subtitle}</p>
                        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                          {rootsInTrunk.map((root) => (
                            <button
                              key={root.id}
                              onClick={() => {
                                setSelectedCategory(root.category);
                                setExpandedRootId(root.id);
                                document.getElementById(`root-item-${root.id}`)?.scrollIntoView({ behavior: "smooth" });
                              }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-700/60 text-xs font-mono text-slate-200 hover:text-white border border-slate-700/60 hover:${trunk.darkBorder} transition-all flex items-center justify-between group cursor-pointer`}
                            >
                              <span className={`font-bold ${trunk.textColor} group-hover:text-white`}>
                                {root.root}
                              </span>
                              <span className="text-[10px] text-slate-400 group-hover:text-slate-200 truncate ml-2 max-w-[130px]">
                                {root.meaning}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedCategory(trunk.category)}
                        className={`mt-3 text-[11px] font-bold ${trunk.textColor} hover:brightness-125 flex items-center justify-center gap-1 py-1.5 ${trunk.btnBg} rounded border ${trunk.btnBorder} cursor-pointer transition-all`}
                      >
                        Lọc xem toàn bộ Trục {trunk.number} <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filters & Searching Toolbar */}
      <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-4 gap-4 flex flex-col space-y-3">
        {/* Row 1: Search and Level Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
            <input
              id="search-roots-input"
              type="text"
              placeholder="Tìm theo gốc từ, từ vựng IELTS, collocations, nghĩa tiếng Việt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-250 focus:border-[#2563EB] focus:bg-white rounded-xl text-sm placeholder-gray-400 font-medium focus:outline-hidden transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0">Cấp độ:</span>
            {(["All", "C1", "C2"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black tracking-wider uppercase transition-all cursor-pointer border ${
                  selectedLevel === lvl
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200"
                }`}
              >
                {lvl === "All" ? "Tất Cả C1+C2" : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Category Trunk Selector */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-600" /> Trục:
          </span>
          {trunkCategories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                  isActive
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-xs"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Stem Cards */}
      <div className="space-y-4">
        {filteredRoots.length === 0 ? (
          <div className="py-16 bg-white border-2 border-[#0F172A] rounded-2xl flex flex-col items-center justify-center text-center p-6 shadow-sm">
            <Search className="w-12 h-12 text-gray-300 mb-2" />
            <h4 className="font-bold text-gray-800 uppercase tracking-wide">Không tìm thấy gốc từ nào khớp!</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-md">
              Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn lọc Trục khác trong Mindmap.
            </p>
          </div>
        ) : (
          filteredRoots.map((item) => {
            const isExpanded = expandedRootId === item.id;
            const theme = getCategoryTheme(item.category);
            const rootPron = getRootPronunciation(item.root);
            const wordsList = item.exampleWords.filter(
              (w) => selectedLevel === "All" || w.level === selectedLevel
            );

            return (
              <div
                key={item.id}
                id={`root-item-${item.id}`}
                className={`bg-white border-2 rounded-2xl overflow-hidden transition-all duration-300 border-l-8 ${theme.accentBorder} ${
                  isExpanded ? "border-[#0F172A] shadow-md ring-1 ring-[#0F172A]" : "border-[#0F172A]"
                }`}
              >
                {/* Header row */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none transition-colors ${
                    isExpanded ? theme.headerBg : "hover:bg-gray-50/70"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-sans text-xl md:text-2xl font-black text-[#0F172A] tracking-tight">
                        {item.root}
                      </span>

                      {/* Root IPA Phonetic Badge */}
                      <span className="text-xs font-mono font-bold bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-0.5 rounded-md">
                        IPA: {item.phonetic || rootPron.ipa}
                      </span>

                      {/* Root Vietnamese Pronunciation Guide */}
                      <span className="text-[11px] font-sans font-medium text-amber-950 bg-amber-50/90 border border-amber-200 px-2 py-0.5 rounded-md">
                        Đọc: <strong>{item.pronunciationGuide || rootPron.vietnameseGuide}</strong>
                      </span>

                      {/* Listen Button for Root */}
                      <button
                        type="button"
                        id={`listen-root-${item.id}`}
                        onClick={(e) => handlePlaySpeech(rootPron.spokenText || item.root, `root-${item.id}`, e)}
                        title={`Nghe phát âm chuẩn gốc từ ${item.root}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                          currentlyPlayingId === `root-${item.id}`
                            ? "bg-amber-500 text-white border-amber-600 shadow-xs animate-pulse ring-2 ring-amber-300"
                            : "bg-[#2563EB] text-white hover:bg-blue-700 border-blue-600 shadow-2xs"
                        }`}
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${currentlyPlayingId === `root-${item.id}` ? "animate-bounce" : ""}`} />
                        <span>{currentlyPlayingId === `root-${item.id}` ? "Đang đọc..." : "Nghe Gốc"}</span>
                      </button>

                      {/* AI Tutor Button on Root Card */}
                      <button
                        type="button"
                        id={`ai-tutor-root-${item.id}`}
                        onClick={(e) => handleOpenRootTutor(item, undefined, e)}
                        title={`Mở Gia Sư AI học chuyên sâu 10-15 từ gốc ${item.root} kèm bài đọc 150-250 từ & test ôn tập`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xs border border-purple-400 hover:scale-105 active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Gia Sư AI</span>
                      </button>

                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
                        {theme.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300">
                        {item.exampleWords.length} Từ IELTS C1/C2
                      </span>
                    </div>

                    <div className="font-sans text-sm md:text-base font-semibold text-gray-800">
                      Ý nghĩa cốt lõi: <span className="text-blue-700">{item.meaning}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="font-mono text-xs text-gray-500 bg-white/80 px-2.5 py-1 rounded border border-gray-200">
                      {item.origin}
                    </span>
                    <div className="p-2 bg-white rounded-xl text-gray-700 border border-gray-300 shadow-xs">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="p-5 md:p-6 border-t-2 border-[#0F172A] bg-slate-50/60 space-y-5">
                    {/* Dedicated AI Tutor Callout for this Root */}
                    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-indigo-500/40 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm shrink-0">
                          <GraduationCap className="w-6 h-6 text-amber-300" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/40 font-mono">
                              Gia Sư AI Chuyên Sâu
                            </span>
                            <span className="text-xs font-bold text-amber-300">
                              Gốc: {item.root} ({item.meaning})
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-white mt-0.5">
                            Bài học 10-15 từ vựng, mẹo gợi nhớ, bài đọc 150-250 từ & 5 câu test ôn tập
                          </h4>
                          <p className="text-xs text-slate-300 mt-0.5">
                            Gia sư AI sẽ phân tích chuyên sâu hình thái học, đối chiếu từ B2 sang C1/C2, hướng dẫn phát âm và kiểm tra kiến thức tự động.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleOpenRootTutor(item, undefined, e)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer hover:scale-105 active:scale-95"
                      >
                        <Sparkles className="w-4 h-4 text-slate-950" />
                        <span>Học Gốc Này Với AI</span>
                      </button>
                    </div>

                    {/* Origin description & Mnemonic Tip */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Concept explanation */}
                      <div className="space-y-1.5 bg-white p-4 rounded-xl border-2 border-slate-300 shadow-xs">
                        <div className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                          <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                          Bản Chất Khái Niệm & Nguồn Gốc
                        </div>
                        <p className="text-xs md:text-sm text-gray-700 leading-relaxed pt-1">
                          <strong className="text-gray-900">{item.origin}</strong>: {item.description}
                        </p>
                      </div>

                      {/* Memorization Tip */}
                      <div className="space-y-1.5 bg-amber-50/90 p-4 rounded-xl border-2 border-amber-300/80 shadow-xs">
                        <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          Mẹo Nhớ Siêu Tốc (Mnemonic Cue)
                        </div>
                        <p className="text-xs md:text-sm text-amber-950 font-semibold leading-relaxed pt-1">
                          {item.tip}
                        </p>
                      </div>
                    </div>

                    {/* Word List Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <div className="text-xs font-black text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        Danh Mục {wordsList.length} Từ Vựng Học Thuật C1/C2 (Academic Lexicon)
                      </div>
                      <span className="text-[11px] text-gray-500 font-mono">
                        Kèm Nút Nghe, Phiên Âm IPA & Cách Đọc Chuẩn
                      </span>
                    </div>

                    {/* Words Grid / List */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                      {wordsList.map((wordObj, wIdx) => {
                        const wordPron = getWordPronunciation(wordObj.word, wordObj.phonetic, wordObj.pronunciationGuide);
                        const wordPlayId = `word-${item.id}-${wIdx}`;
                        const sentencePlayId = `sent-${item.id}-${wIdx}`;

                        return (
                          <div
                            key={wIdx}
                            className="bg-white rounded-xl p-4 border-2 border-slate-300 hover:border-[#2563EB] space-y-2.5 transition-all shadow-xs"
                          >
                            {/* Top row: Word, pos, phonetics, listen button, level, meaning */}
                            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-100 pb-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-sans text-base font-black text-[#0F172A]">
                                  {wordObj.word}
                                </span>
                                <span className="text-[11px] text-gray-500 italic">
                                  ({wordObj.partOfSpeech})
                                </span>

                                {/* IPA Phonetic */}
                                <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                  {wordPron.ipa}
                                </span>

                                {/* Vietnamese reading guide */}
                                <span className="text-[11px] font-sans text-amber-950 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                  Đọc: <strong>{wordPron.guide}</strong>
                                </span>

                                {/* Listen button for the word */}
                                <button
                                  type="button"
                                  id={`listen-word-${item.id}-${wIdx}`}
                                  onClick={(e) => handlePlaySpeech(wordObj.word, wordPlayId, e)}
                                  title={`Nghe phát âm từ ${wordObj.word}`}
                                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer border ${
                                    currentlyPlayingId === wordPlayId
                                      ? "bg-amber-500 text-white border-amber-600 animate-pulse ring-1 ring-amber-300"
                                      : "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 hover:border-blue-400"
                                  }`}
                                >
                                  <Volume2 className="w-3 h-3 text-blue-600" />
                                  <span>{currentlyPlayingId === wordPlayId ? "Đang đọc..." : "Nghe"}</span>
                                </button>

                                {wordObj.level && (
                                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded font-mono ${
                                    wordObj.level === "C2"
                                      ? "bg-rose-100 text-rose-800 border border-rose-300"
                                      : "bg-blue-100 text-blue-800 border border-blue-300"
                                  }`}>
                                    {wordObj.level}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-blue-800 font-bold text-right">
                                {wordObj.meaning}
                              </span>
                            </div>

                            {/* Visual breakdown & Collocation */}
                            <div className="flex flex-wrap gap-2 text-xs">
                              {wordObj.visualBreakdown && (
                                <div className="text-[11px] text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md font-mono border border-slate-200">
                                  <span className="font-bold text-slate-500">Phân tích:</span> {wordObj.visualBreakdown}
                                </div>
                              )}

                              {wordObj.collocation && (
                                <div className="text-[11px] text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-md font-sans font-semibold border border-indigo-200 flex items-center gap-1">
                                  <Tag className="w-3 h-3 text-indigo-600 shrink-0" />
                                  <span>{wordObj.collocation}</span>
                                </div>
                              )}
                            </div>

                            {/* Sentence context with Listen button */}
                            <div className="space-y-1.5 bg-gray-50/80 p-2.5 rounded-lg border-l-2 border-blue-600">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-xs text-gray-800 italic leading-relaxed">
                                  "{wordObj.ieltsSentence}"
                                </p>
                                <button
                                  type="button"
                                  onClick={(e) => handlePlaySpeech(wordObj.ieltsSentence, sentencePlayId, e)}
                                  title="Nghe phát âm cả câu ví dụ IELTS"
                                  className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded border cursor-pointer transition-colors ${
                                    currentlyPlayingId === sentencePlayId
                                      ? "bg-amber-500 text-white border-amber-600 animate-pulse"
                                      : "bg-white text-slate-600 hover:bg-slate-100 border-slate-200"
                                  }`}
                                >
                                  <Volume2 className="w-3 h-3 text-slate-500" />
                                  <span>{currentlyPlayingId === sentencePlayId ? "..." : "Nghe câu"}</span>
                                </button>
                              </div>
                              <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                                👉 <strong className="text-gray-700">Dịch nghĩa:</strong> {wordObj.vietnameseTranslation}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* AI Tutor Modal for Roots Boulevard */}
      <AiVocabTutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        initialTopic={selectedRootForTutor ? `Gốc từ ${selectedRootForTutor.root}: ${selectedRootForTutor.meaning}` : "Đại Lộ Gốc Từ IELTS"}
        initialWords={tutorWords}
        initialMacro="Đại Lộ Gốc Từ IELTS"
        initialRootContext={selectedRootForTutor || undefined}
      />
    </div>
  );
};
