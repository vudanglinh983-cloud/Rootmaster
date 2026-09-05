import React, { useState, useMemo, useRef, useEffect } from "react";
import { topicVocabData, TopicWord } from "../data/topicVocabData";
import {
  MACRO_DOMAINS,
  MacroDomain,
  getMacroDomainForCategory,
  getGroupedMacroDomains,
  GroupedMacroDomain
} from "../data/topicVocabMacroDomains";
import { D3TopicVocabMindmap } from "./D3TopicVocabMindmap";
import { TopicVocabTableView } from "./TopicVocabTableView";
import { TopicWordDetailView } from "./TopicWordDetailView";
import { AiTopicLessonModal } from "./AiTopicLessonModal";
import { AiVocabTutorModal } from "./AiVocabTutorModal";
import { SpeechService } from "../lib/speechSynthesis";
import {
  BookOpen,
  Sparkles,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Volume2,
  Lightbulb,
  Compass,
  Layers,
  Tag,
  Filter,
  Eye,
  EyeOff,
  LayoutGrid,
  Network,
  Award,
  ArrowRight,
  RotateCcw,
  Maximize2,
  Minimize2,
  Type,
  GraduationCap,
  Zap,
  Table,
  Workflow,
  Brain
} from "lucide-react";

interface TopicVocabArenaProps {
  isFullScreenFocus?: boolean;
  onToggleFullScreen?: () => void;
}

export const TopicVocabArena: React.FC<TopicVocabArenaProps> = ({
  isFullScreenFocus = false,
  onToggleFullScreen,
}) => {
  // View mode: Mindmap, Table, or Bento Grid Matrix
  const [viewMode, setViewMode] = useState<"mindmap" | "table" | "grid">("mindmap");

  // Fullscreen support ref & state
  const arenaContainerRef = useRef<HTMLDivElement>(null);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsNativeFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (arenaContainerRef.current?.requestFullscreen) {
        arenaContainerRef.current.requestFullscreen().catch(() => {
          onToggleFullScreen?.();
        });
      } else {
        onToggleFullScreen?.();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          onToggleFullScreen?.();
        });
      } else {
        onToggleFullScreen?.();
      }
    }
  };

  // Font scale mode: normal (100%), large (115%), xlarge (130%)
  const [fontScale, setFontScale] = useState<"normal" | "large" | "xlarge">(() => {
    try {
      return (localStorage.getItem("topic_vocab_font_scale") as any) || "normal";
    } catch {
      return "normal";
    }
  });

  const handleSetFontScale = (scale: "normal" | "large" | "xlarge") => {
    setFontScale(scale);
    try {
      localStorage.setItem("topic_vocab_font_scale", scale);
    } catch (e) {
      console.error(e);
    }
  };

  // Filter & Search states
  const [selectedMacroId, setSelectedMacroId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedDomainId, setExpandedDomainId] = useState<string | null>(MACRO_DOMAINS[0].id);
  const [selectedSubcat, setSelectedSubcat] = useState<string>("All");

  // AI Mnemonic Lesson Generator modal states
  const [isAiLessonOpen, setIsAiLessonOpen] = useState<boolean>(false);
  const [aiLessonTopic, setAiLessonTopic] = useState<string | undefined>(undefined);
  const [aiLessonMacro, setAiLessonMacro] = useState<string | undefined>(undefined);
  const [aiLessonWords, setAiLessonWords] = useState<TopicWord[]>([]);

  const handleOpenAiLesson = (topic?: string, words?: TopicWord[], macro?: string) => {
    setAiLessonTopic(topic || "1. Personal Information & Registration");
    setAiLessonMacro(macro);
    setAiLessonWords(words || []);
    setIsAiLessonOpen(true);
  };

  // AI Master Tutor modal states
  const [isAiTutorOpen, setIsAiTutorOpen] = useState<boolean>(false);
  const [aiTutorTopic, setAiTutorTopic] = useState<string | undefined>(undefined);
  const [aiTutorMacro, setAiTutorMacro] = useState<string | undefined>(undefined);
  const [aiTutorWords, setAiTutorWords] = useState<TopicWord[]>([]);

  const handleOpenAiTutor = (topic?: string, words?: TopicWord[], macro?: string) => {
    setAiTutorTopic(topic || "IELTS Core Academic");
    setAiTutorMacro(macro);
    setAiTutorWords(words || []);
    setIsAiTutorOpen(true);
  };

  // Known / Mastered words state stored in localStorage
  const [knownWords, setKnownWords] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("topic_vocab_known_v1");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [hideKnown, setHideKnown] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("topic_vocab_hide_known");
      return stored === "true";
    } catch {
      return false;
    }
  });

  // Inspected word for modal/detail card
  const [inspectedWord, setInspectedWord] = useState<TopicWord | null>(null);
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  // Toggle known word
  const handleToggleKnown = (id: string) => {
    setKnownWords((prev) => {
      const next = prev.includes(id) ? prev.filter((wId) => wId !== id) : [...prev, id];
      try {
        localStorage.setItem("topic_vocab_known_v1", JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleToggleHideKnown = (val: boolean) => {
    setHideKnown(val);
    try {
      localStorage.setItem("topic_vocab_hide_known", String(val));
    } catch (e) {
      console.error(e);
    }
  };

  const handlePlaySpeech = (word: string, id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPlayingWordId(id);
    SpeechService.speak(word, {
      onEnd: () => setPlayingWordId(null),
      onError: () => setPlayingWordId(null),
    });
  };

  // Grouped macro domains
  const groupedDomains = useMemo(() => {
    return getGroupedMacroDomains(topicVocabData);
  }, []);

  // Filtered macro domains for grid view
  const filteredDomains = useMemo(() => {
    let list = groupedDomains;
    if (selectedMacroId !== "all") {
      list = list.filter((g) => g.domain.id === selectedMacroId);
    }

    if (!searchQuery.trim() && !hideKnown) {
      return list;
    }

    const q = searchQuery.toLowerCase().trim();

    return list.map((g) => {
      const matchingSubcats = g.subcategories.map((subcat) => {
        let words = subcat.words;
        if (hideKnown) {
          words = words.filter((w) => !knownWords.includes(w.id));
        }
        if (q) {
          words = words.filter(
            (w) =>
              w.word.toLowerCase().includes(q) ||
              w.vietnamese.toLowerCase().includes(q) ||
              w.definition.toLowerCase().includes(q) ||
              w.memoryHook.toLowerCase().includes(q)
          );
        }
        return {
          category: subcat.category,
          words,
        };
      }).filter((s) => s.words.length > 0);

      const allMatchingWords = matchingSubcats.flatMap((s) => s.words);

      return {
        domain: g.domain,
        words: allMatchingWords,
        subcategories: matchingSubcats,
      };
    }).filter((g) => g.words.length > 0);
  }, [groupedDomains, selectedMacroId, searchQuery, hideKnown, knownWords]);

  // Overall statistics
  const totalWords = topicVocabData.length;
  const masteredCount = knownWords.length;
  const masteredPercent = Math.round((masteredCount / totalWords) * 100);

  // Dynamic typography styles based on fontScale
  const fontClasses = useMemo(() => {
    switch (fontScale) {
      case "large":
        return {
          wordTitle: "text-xl md:text-2xl font-black",
          vietnamese: "text-base md:text-lg font-black text-[#0F172A]",
          definition: "text-sm md:text-base text-slate-800 leading-relaxed",
          hook: "text-sm md:text-base font-semibold text-amber-950 leading-relaxed",
          ipa: "text-sm font-mono font-bold text-gray-400",
          subtag: "text-xs font-mono font-semibold",
        };
      case "xlarge":
        return {
          wordTitle: "text-2xl md:text-3xl font-black",
          vietnamese: "text-lg md:text-xl font-black text-[#0F172A]",
          definition: "text-base md:text-lg text-slate-800 leading-relaxed",
          hook: "text-base md:text-lg font-semibold text-amber-950 leading-relaxed",
          ipa: "text-base font-mono font-bold text-gray-400",
          subtag: "text-sm font-mono font-semibold",
        };
      case "normal":
      default:
        return {
          wordTitle: "text-lg md:text-xl font-black",
          vietnamese: "text-sm md:text-base font-bold text-[#0F172A]",
          definition: "text-xs md:text-sm text-slate-700 leading-relaxed",
          hook: "text-xs md:text-sm font-medium text-amber-950 leading-relaxed",
          ipa: "text-xs md:text-sm font-mono font-bold text-gray-400",
          subtag: "text-xs font-mono font-semibold",
        };
    }
  }, [fontScale]);

  return (
    <div
      ref={arenaContainerRef}
      id="topic-vocab-tab"
      className={`space-y-6 ${
        isNativeFullscreen
          ? "fixed inset-0 z-50 bg-slate-950 overflow-y-auto p-4 md:p-8"
          : ""
      }`}
    >
      {/* Floating Exit Button for Native Fullscreen Mode */}
      {isNativeFullscreen && (
        <div className="sticky top-2 z-50 flex justify-end">
          <button
            onClick={handleToggleFullscreen}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 cursor-pointer border border-blue-400 animate-bounce"
          >
            <Minimize2 className="w-4 h-4" />
            <span>Thoát Toàn Màn Hình (Esc)</span>
          </button>
        </div>
      )}

      {/* Hero Welcome Banner */}
      <div className="bg-[#0F172A] rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border-l-4 border-l-[#2563EB]">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/40 font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              HỆ THỐNG TỪ VỰNG IELTS CHỦ ĐỀ
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">
              {MACRO_DOMAINS.length} NHÓM TỪ LỚN • {totalWords.toLocaleString()} TỪ VỰNG
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight font-sans">
            VŨ TRỤ TỪ VỰNG CHỦ ĐỀ & CẤU TRÚC HỆ THỐNG DỄ NHỚ
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            Toàn bộ <strong>{totalWords.toLocaleString()} từ vựng IELTS</strong> được cấu trúc theo 4 góc nhìn khoa học: <strong>Sơ đồ Mindmap</strong>, <strong>Bảng hệ thống tra cứu</strong>, <strong>3 Trụ cột nhận thức</strong> và <strong>Chu trình 5 bước logic lập luận</strong> giúp nhớ sâu, phản xạ nhanh và đạt chuẩn điểm C1/C2.
          </p>

          {/* Quick Progress Bar & AI CTA */}
          <div className="pt-1 flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-medium">Tiến độ làm chủ:</span>
              <span className="font-mono font-bold text-white">
                {masteredCount} / {totalWords} từ ({masteredPercent}%)
              </span>
              <div className="w-36 md:w-48 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${masteredPercent}%` }}
                ></div>
              </div>
            </div>

            {/* AI Action CTA Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => handleOpenAiTutor()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-xs md:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer border border-sky-300/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <GraduationCap className="w-4 h-4 text-amber-300 animate-pulse" />
                GIA SƯ AI LUYỆN TỪ VỰNG
              </button>

              <button
                onClick={() => handleOpenAiLesson()}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs md:text-sm uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer border border-slate-700"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                AI TẠO BÀI HỌC DỄ NHỚ
              </button>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs (Mindmap vs Table vs System vs Logic vs Grid) & Display Controls */}
        <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700/80 overflow-x-auto scrollbar-thin">
            <button
              onClick={() => setViewMode("mindmap")}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                viewMode === "mindmap"
                  ? "bg-[#2563EB] text-white shadow-md"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Network className="w-4 h-4" />
              SƠ ĐỒ MINDMAP
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                viewMode === "table"
                  ? "bg-[#2563EB] text-white shadow-md"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Table className="w-4 h-4" />
              CẤU TRÚC BẢNG
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                viewMode === "grid"
                  ? "bg-[#2563EB] text-white shadow-md"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              MA TRẬN NHÓM
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Font Size Scaler */}
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700 text-xs">
              <span className="text-slate-400 font-bold px-2 flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Phông chữ:</span>
              </span>
              <button
                onClick={() => handleSetFontScale("normal")}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  fontScale === "normal"
                    ? "bg-[#2563EB] text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title="Cỡ chữ Chuẩn (100%)"
              >
                A
              </button>
              <button
                onClick={() => handleSetFontScale("large")}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  fontScale === "large"
                    ? "bg-[#2563EB] text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title="Cỡ chữ Lớn (+15%) - Dành cho Laptop/PC"
              >
                A+
              </button>
              <button
                onClick={() => handleSetFontScale("xlarge")}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  fontScale === "xlarge"
                    ? "bg-[#2563EB] text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title="Cỡ chữ Rất Lớn (+30%)"
              >
                A++
              </button>
            </div>

            {/* Toggle Hide Known */}
            <button
              onClick={() => handleToggleHideKnown(!hideKnown)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                hideKnown
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-slate-900/90 text-slate-300 border-slate-700 hover:bg-slate-800"
              }`}
            >
              {hideKnown ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
              <span>{hideKnown ? "Đang ẩn từ đã thuộc" : "Hiện tất cả"}</span>
            </button>

            {/* Fullscreen Expansion Button */}
            <button
              onClick={handleToggleFullscreen}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isNativeFullscreen || isFullScreenFocus
                  ? "bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400/40"
                  : "bg-slate-900/90 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
              }`}
              title={
                isNativeFullscreen || isFullScreenFocus
                  ? "Thu nhỏ toàn màn hình"
                  : "Mở rộng toàn màn hình để học tập trung không bị phân tâm"
              }
            >
              {isNativeFullscreen || isFullScreenFocus ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
              <span>
                {isNativeFullscreen || isFullScreenFocus
                  ? "Thu nhỏ"
                  : "Toàn màn hình"}
              </span>
            </button>
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute right-0 bottom-0 top-0 opacity-10 hidden lg:block select-none pointer-events-none">
          <Network className="w-80 h-80 -mr-10 -mt-10 text-white" />
        </div>
      </div>

      {/* VIEW MODE 1: D3 MINDMAP VIEW */}
      {viewMode === "mindmap" && (
        <D3TopicVocabMindmap
          knownWords={knownWords}
          onToggleKnown={handleToggleKnown}
          hideKnown={hideKnown}
          onToggleHideKnown={handleToggleHideKnown}
          initialSelectedWordId={inspectedWord?.id}
          onOpenAiLesson={(topic, word, macro) => handleOpenAiLesson(topic, word ? [word] : [], macro)}
          onOpenAiTutor={(topic, words, macro) => handleOpenAiTutor(topic, words, macro)}
          fontScale={fontScale}
          onChangeFontScale={handleSetFontScale}
          selectedMacroId={selectedMacroId}
          onSelectMacroId={setSelectedMacroId}
        />
      )}

      {/* VIEW MODE 2: INTERACTIVE STRUCTURED TABLE VIEW */}
      {viewMode === "table" && (
        <TopicVocabTableView
          words={topicVocabData}
          knownWords={knownWords}
          onToggleKnown={handleToggleKnown}
          onSelectWord={setInspectedWord}
          onOpenAiTutor={handleOpenAiTutor}
          onOpenAiLesson={handleOpenAiLesson}
          selectedMacroId={selectedMacroId}
          onSelectMacroId={setSelectedMacroId}
          fontScale={fontScale}
        />
      )}

      {/* VIEW MODE 3: BENTO GRID MATRIX VIEW */}
      {viewMode === "grid" && (
        <div className="space-y-6">
          {/* Controls bar */}
          <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                placeholder="Tra cứu từ vựng, tiếng Việt, mẹo nhớ trong toàn bộ nhóm từ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Macro Domain Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
              <button
                onClick={() => {
                  setSelectedMacroId("all");
                  setSelectedSubcat("All");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedMacroId === "all"
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                Tất Cả ({MACRO_DOMAINS.length} Nhóm)
              </button>
              {MACRO_DOMAINS.map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => {
                    setSelectedMacroId(domain.id);
                    setExpandedDomainId(domain.id);
                    setSelectedSubcat("All");
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
                    selectedMacroId === domain.id
                      ? "text-white shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                  style={{
                    backgroundColor: selectedMacroId === domain.id ? domain.color : undefined,
                    borderColor: selectedMacroId === domain.id ? domain.color : undefined,
                  }}
                >
                  <span>{domain.emoji}</span>
                  <span className="hidden sm:inline">{domain.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Macro Domain Cards */}
          <div className="space-y-6">
            {filteredDomains.map((group) => {
              const isExpanded = expandedDomainId === group.domain.id;
              const domainMastered = group.words.filter((w) => knownWords.includes(w.id)).length;
              const domainPercent = Math.round((domainMastered / (group.words.length || 1)) * 100);

              return (
                <div
                  key={group.domain.id}
                  className="bg-white border-2 border-[#0F172A] rounded-2xl shadow-sm overflow-hidden transition-all"
                >
                  {/* Domain Header Accordion Toggle */}
                  <div
                    onClick={() => setExpandedDomainId(isExpanded ? null : group.domain.id)}
                    className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
                    style={{ borderLeft: `6px solid ${group.domain.color}` }}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0"
                        style={{ backgroundColor: `${group.domain.color}15`, color: group.domain.color }}
                      >
                        {group.domain.emoji}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base md:text-lg lg:text-xl font-black text-[#0F172A] tracking-tight">
                            {group.domain.name}
                          </h3>
                          <span className="text-xs md:text-sm font-bold text-gray-500 font-mono">
                            ({group.domain.nameEn})
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 mt-0.5 line-clamp-1">
                          {group.domain.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Quick AI Lesson for this domain */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAiLesson(group.subcategories[0]?.category || group.domain.name, group.words.slice(0, 6), group.domain.name);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Tạo bài học AI cho nhóm này"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span className="hidden sm:inline">Bài Học AI</span>
                      </button>

                      {/* Mastered progress pill */}
                      <div className="text-right hidden sm:block">
                        <div className="text-xs md:text-sm font-mono font-bold text-[#0F172A]">
                          {domainMastered} / {group.words.length} từ
                        </div>
                        <div className="text-[11px] text-gray-400 font-bold uppercase">
                          {domainPercent}% Đã thuộc
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Subcategories & Word Cards */}
                  {isExpanded && (
                    <div className="p-5 border-t border-gray-100 bg-slate-50/40 space-y-5">
                      {/* Subcategories Selector */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" />
                          Chủ đề con:
                        </span>
                        <button
                          onClick={() => setSelectedSubcat("All")}
                          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                            selectedSubcat === "All"
                              ? "bg-[#0F172A] text-white border-[#0F172A]"
                              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          Tất cả ({group.words.length})
                        </button>
                        {group.subcategories.map((sub) => (
                          <button
                            key={sub.category}
                            onClick={() => setSelectedSubcat(sub.category)}
                            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                              selectedSubcat === sub.category
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            {sub.category} ({sub.words.length})
                          </button>
                        ))}
                      </div>

                      {/* Words Grid Cards with Scaled Typography */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {group.subcategories
                          .filter((sub) => selectedSubcat === "All" || sub.category === selectedSubcat)
                          .flatMap((sub) => sub.words)
                          .map((word) => {
                            const isKnown = knownWords.includes(word.id);
                            const isPlaying = playingWordId === word.id;

                            return (
                              <div
                                key={word.id}
                                onClick={() => setInspectedWord(word)}
                                className={`p-4 md:p-5 rounded-2xl border-2 transition-all cursor-pointer bg-white hover:shadow-md flex flex-col justify-between gap-3.5 ${
                                  isKnown
                                    ? "border-emerald-300 bg-emerald-50/20"
                                    : "border-gray-200 hover:border-[#2563EB]"
                                }`}
                              >
                                <div className="space-y-2.5">
                                  {/* Word header */}
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className={`${fontClasses.wordTitle} text-[#0F172A] hover:text-[#2563EB] transition-colors`}>
                                          {word.word}
                                        </h4>
                                        <button
                                          onClick={(e) => handlePlaySpeech(word.word, word.id, e)}
                                          className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                                            isPlaying
                                              ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                                              : "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                                          }`}
                                          title="Nghe phát âm"
                                        >
                                          <Volume2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                      {word.pronunciation && (
                                        <span className={`${fontClasses.ipa} block mt-0.5`}>
                                          /{word.pronunciation}/
                                        </span>
                                      )}
                                    </div>

                                    {/* Mark as known button */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleKnown(word.id);
                                      }}
                                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                                        isKnown
                                          ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                                          : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
                                      }`}
                                      title={isKnown ? "Đã thuộc (Nhấn để bỏ chọn)" : "Đánh dấu đã thuộc"}
                                    >
                                      <CheckCircle2 className="w-4.5 h-4.5" />
                                    </button>
                                  </div>

                                  {/* Vietnamese meaning */}
                                  <div className={`${fontClasses.vietnamese} bg-slate-50 px-3 py-2 rounded-xl border border-slate-100`}>
                                    {word.vietnamese}
                                  </div>

                                  {/* English definition */}
                                  {word.definition && (
                                    <p className={`${fontClasses.definition} italic text-slate-600 line-clamp-2`}>
                                      "{word.definition}"
                                    </p>
                                  )}

                                  {/* Memory Hook Preview */}
                                  {word.memoryHook && (
                                    <div className="flex items-start gap-2 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                      <p className={`${fontClasses.hook} line-clamp-2`}>
                                        {word.memoryHook}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                {/* Card bottom subcategory tag & action */}
                                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-2.5 font-mono">
                                  <span className="truncate max-w-[160px] font-semibold text-slate-500">
                                    {word.category}
                                  </span>
                                  <span className="text-[#2563EB] font-bold flex items-center gap-1 hover:underline">
                                    Chi tiết <ArrowRight className="w-3.5 h-3.5" />
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Detail Modal when inspecting a word in Table, System, Logic or Grid view */}
      {inspectedWord && viewMode !== "mindmap" && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            <TopicWordDetailView
              word={inspectedWord}
              isKnown={knownWords.includes(inspectedWord.id)}
              onToggleKnown={handleToggleKnown}
              onClose={() => setInspectedWord(null)}
              onOpenAiLesson={(topic, word) => handleOpenAiLesson(topic, [word])}
              onOpenAiTutor={(topic, words) => handleOpenAiTutor(topic, words)}
            />
          </div>
        </div>
      )}

      {/* AI Mnemonic Lesson Modal */}
      <AiTopicLessonModal
        isOpen={isAiLessonOpen}
        onClose={() => setIsAiLessonOpen(false)}
        initialTopic={aiLessonTopic}
        initialMacroDomain={aiLessonMacro}
        initialWords={aiLessonWords}
      />

      {/* AI Master Tutor Modal (Gia Sư AI Học Từ Vựng) */}
      <AiVocabTutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        initialTopic={aiTutorTopic}
        initialMacro={aiTutorMacro}
        initialWords={aiTutorWords}
      />
    </div>
  );
};
