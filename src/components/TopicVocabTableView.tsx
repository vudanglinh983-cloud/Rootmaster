import React, { useState, useMemo } from "react";
import { TopicWord } from "../data/topicVocabData";
import { MACRO_DOMAINS, getMacroDomainForCategory } from "../data/topicVocabMacroDomains";
import { SpeechService } from "../lib/speechSynthesis";
import {
  Search,
  Volume2,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  ArrowUpDown,
  Filter,
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  ExternalLink,
  BookOpen,
  Tag
} from "lucide-react";

interface TopicVocabTableViewProps {
  words: TopicWord[];
  knownWords: string[];
  onToggleKnown: (id: string) => void;
  onSelectWord: (word: TopicWord) => void;
  onOpenAiTutor: (topic?: string, words?: TopicWord[], macro?: string) => void;
  onOpenAiLesson: (topic?: string, words?: TopicWord[], macro?: string) => void;
  selectedMacroId: string;
  onSelectMacroId: (id: string) => void;
  fontScale?: "normal" | "large" | "xlarge";
}

export const TopicVocabTableView: React.FC<TopicVocabTableViewProps> = ({
  words,
  knownWords,
  onToggleKnown,
  onSelectWord,
  onOpenAiTutor,
  onOpenAiLesson,
  selectedMacroId,
  onSelectMacroId,
  fontScale = "normal",
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "mastered" | "learning">("all");
  const [sortField, setSortField] = useState<"word" | "category" | "vietnamese">("word");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 30;

  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  const handlePlaySpeech = (word: string, id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPlayingWordId(id);
    SpeechService.speak(word, {
      onEnd: () => setPlayingWordId(null),
      onError: () => setPlayingWordId(null),
    });
  };

  // Filter words
  const filteredWords = useMemo(() => {
    let result = words;

    // Macro filter
    if (selectedMacroId !== "all") {
      result = result.filter((w) => {
        const macro = getMacroDomainForCategory(w.category);
        return macro.id === selectedMacroId;
      });
    }

    // Status filter
    if (statusFilter === "mastered") {
      result = result.filter((w) => knownWords.includes(w.id));
    } else if (statusFilter === "learning") {
      result = result.filter((w) => !knownWords.includes(w.id));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.vietnamese.toLowerCase().includes(q) ||
          w.category.toLowerCase().includes(q) ||
          (w.definition && w.definition.toLowerCase().includes(q)) ||
          (w.memoryHook && w.memoryHook.toLowerCase().includes(q)) ||
          (w.collocations && w.collocations.some((c) => c.toLowerCase().includes(q)))
      );
    }

    // Sort
    return [...result].sort((a, b) => {
      let comparison = 0;
      if (sortField === "word") {
        comparison = a.word.localeCompare(b.word);
      } else if (sortField === "category") {
        comparison = a.category.localeCompare(b.category);
      } else if (sortField === "vietnamese") {
        comparison = a.vietnamese.localeCompare(b.vietnamese);
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [words, selectedMacroId, statusFilter, searchQuery, sortField, sortDirection, knownWords]);

  const totalPages = Math.ceil(filteredWords.length / pageSize) || 1;
  const paginatedWords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredWords.slice(start, start + pageSize);
  }, [filteredWords, currentPage]);

  const handleToggleSort = (field: "word" | "category" | "vietnamese") => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls & Search Filter Bar */}
      <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tra cứu từ vựng, tiếng Việt, collocations, mẹo nhớ trong bảng..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => {
                setStatusFilter("all");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                statusFilter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tất cả ({words.length})
            </button>
            <button
              onClick={() => {
                setStatusFilter("learning");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                statusFilter === "learning" ? "bg-white text-blue-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Chưa thuộc ({words.length - knownWords.length})
            </button>
            <button
              onClick={() => {
                setStatusFilter("mastered");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                statusFilter === "mastered" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Đã thuộc ({knownWords.length})
            </button>
          </div>
        </div>

        {/* Macro domain horizontal filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => {
              onSelectMacroId("all");
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedMacroId === "all"
                ? "bg-[#0F172A] text-white border-[#0F172A]"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            Tất Cả ({MACRO_DOMAINS.length} Nhóm)
          </button>
          {MACRO_DOMAINS.map((domain) => {
            const isSelected = selectedMacroId === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => {
                  onSelectMacroId(domain.id);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
                  isSelected ? "text-white shadow-xs" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
                style={{
                  backgroundColor: isSelected ? domain.color : undefined,
                  borderColor: isSelected ? domain.color : undefined,
                }}
              >
                <span>{domain.emoji}</span>
                <span className="hidden sm:inline">{domain.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Structured Table Container */}
      <div className="bg-white border-2 border-[#0F172A] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-[#0F172A] text-white font-sans font-bold border-b border-slate-800">
                <th className="py-3 px-3 text-center w-12 text-slate-400 font-mono">#</th>
                <th
                  onClick={() => handleToggleSort("word")}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>TỪ VỰNG C1/C2 & PHÁT ÂM</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th
                  onClick={() => handleToggleSort("vietnamese")}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>NGHĨA TIẾNG VIỆT & ĐỊNH NGHĨA</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th className="py-3 px-4 hidden lg:table-cell">
                  IELTS COLLOCATION
                </th>
                <th className="py-3 px-4 hidden md:table-cell">
                  MẸO SIÊU TRÍ NHỚ (MEMORY HOOK)
                </th>
                <th
                  onClick={() => handleToggleSort("category")}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-800 transition-colors hidden sm:table-cell"
                >
                  <div className="flex items-center gap-1.5">
                    <span>NHÓM CHỦ ĐỀ</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center w-24">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedWords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Không tìm thấy từ vựng nào khớp với bộ lọc.
                  </td>
                </tr>
              ) : (
                paginatedWords.map((word, idx) => {
                  const globalIdx = (currentPage - 1) * pageSize + idx + 1;
                  const isKnown = knownWords.includes(word.id);
                  const isPlaying = playingWordId === word.id;
                  const macro = getMacroDomainForCategory(word.category);

                  return (
                    <tr
                      key={word.id}
                      onClick={() => onSelectWord(word)}
                      className={`hover:bg-blue-50/40 transition-colors cursor-pointer ${
                        isKnown ? "bg-emerald-50/20" : ""
                      }`}
                    >
                      {/* 1. STT */}
                      <td className="py-3 px-3 text-center font-mono text-xs text-slate-400 font-bold">
                        {globalIdx}
                      </td>

                      {/* 2. Word + IPA + Audio */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-900 text-sm md:text-base hover:text-blue-600 transition-colors">
                              {word.word}
                            </span>
                            <button
                              onClick={(e) => handlePlaySpeech(word.word, word.id, e)}
                              className={`p-1 rounded-full border transition-all cursor-pointer ${
                                isPlaying
                                  ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                                  : "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                              }`}
                              title="Nghe phát âm bản xứ"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {word.pronunciation && (
                            <span className="font-mono text-xs text-slate-400 block">
                              /{word.pronunciation}/
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 3. Vietnamese & Definition */}
                      <td className="py-3 px-4">
                        <div className="space-y-1 max-w-sm">
                          <div className="font-bold text-slate-900 text-xs md:text-sm">
                            {word.vietnamese}
                          </div>
                          {word.definition && (
                            <p className="text-xs text-slate-500 italic line-clamp-2">
                              "{word.definition}"
                            </p>
                          )}
                        </div>
                      </td>

                      {/* 4. Collocations */}
                      <td className="py-3 px-4 hidden lg:table-cell">
                        {word.collocations && word.collocations.length > 0 ? (
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {word.collocations.slice(0, 2).map((col, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-mono font-semibold"
                              >
                                {col}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-300 text-xs font-mono">—</span>
                        )}
                      </td>

                      {/* 5. Memory Hook */}
                      <td className="py-3 px-4 hidden md:table-cell">
                        {word.memoryHook ? (
                          <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-2 text-xs text-amber-950 font-medium max-w-xs leading-relaxed flex items-start gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{word.memoryHook}</span>
                          </div>
                        ) : (
                          <span className="text-slate-300 text-xs font-mono">—</span>
                        )}
                      </td>

                      {/* 6. Macro & Category */}
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <div className="space-y-1">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-white uppercase tracking-wider"
                            style={{ backgroundColor: macro.color }}
                          >
                            <span>{macro.emoji}</span>
                            <span className="truncate max-w-[120px]">{macro.name}</span>
                          </span>
                          <span className="block text-[11px] text-slate-500 font-semibold truncate max-w-[140px]">
                            {word.category}
                          </span>
                        </div>
                      </td>

                      {/* 7. Action & Known */}
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleKnown(word.id);
                            }}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isKnown
                                ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                                : "bg-slate-50 text-slate-300 border-slate-200 hover:bg-slate-100 hover:text-slate-500"
                            }`}
                            title={isKnown ? "Đã thuộc" : "Đánh dấu đã thuộc"}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenAiTutor(word.category, [word], macro.name);
                            }}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                            title="Gia sư AI giảng dạy từ này"
                          >
                            <GraduationCap className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 font-medium">
            Hiển thị <strong className="text-slate-800">{paginatedWords.length}</strong> / <strong className="text-slate-800">{filteredWords.length}</strong> từ vựng
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-slate-700">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
