import React, { useState, useMemo } from "react";
import { WordRoot, IELTSWordExample } from "../types";
import { ieltsParaphraseData } from "../data/paraphraseData";
import { getRootPronunciation, getWordPronunciation } from "../lib/speechSynthesis";
import {
  Volume2,
  BookOpen,
  Link2,
  Lightbulb,
  Layers,
  Sparkles,
  ArrowRight,
  Tag,
  ExternalLink,
  ChevronRight,
  Compass,
  X,
  Shuffle
} from "lucide-react";

interface MindmapWordDetailViewProps {
  inspectedRoot: WordRoot | null;
  inspectedWord: IELTSWordExample | null;
  onSelectWord: (word: IELTSWordExample) => void;
  onSelectRoot?: (root: WordRoot) => void;
  onPlayAudio: (text: string, id: string, e?: React.MouseEvent) => void;
  isSpeaking: string | null;
  allRoots: WordRoot[];
  compact?: boolean;
  onClose?: () => void;
  initialTab?: "meaning" | "linked" | "mnemonic";
  onOpenAiTutor?: (root: WordRoot) => void;
}

export const MindmapWordDetailView: React.FC<MindmapWordDetailViewProps> = ({
  inspectedRoot,
  inspectedWord,
  onSelectWord,
  onSelectRoot,
  onPlayAudio,
  isSpeaking,
  allRoots,
  compact = false,
  onClose,
  initialTab = "meaning",
  onOpenAiTutor,
}) => {
  const [activeTab, setActiveTab] = useState<"meaning" | "linked" | "mnemonic">(initialTab);

  // Pronunciation calculations
  const rootPron = useMemo(() => {
    if (!inspectedRoot) return { ipa: "", vietnameseGuide: "", spokenText: "" };
    return getRootPronunciation(inspectedRoot.root);
  }, [inspectedRoot]);

  const wordPron = useMemo(() => {
    if (!inspectedWord) return { ipa: "", guide: "" };
    return getWordPronunciation(inspectedWord.word, inspectedWord.phonetic, inspectedWord.pronunciationGuide);
  }, [inspectedWord]);

  // 1. Root Family Words (Các từ phái sinh cùng chung gốc từ này)
  const rootFamilyWords = useMemo(() => {
    if (!inspectedRoot) return [];
    return (inspectedRoot.exampleWords || []).filter((w) => w.word !== inspectedWord?.word);
  }, [inspectedRoot, inspectedWord]);

  // 2. Paraphrase Connections (Cặp từ tương đương band 7.5 - 9.0)
  const relatedParaphrases = useMemo(() => {
    if (!inspectedWord && !inspectedRoot) return [];
    const wordQuery = (inspectedWord?.word || "").toLowerCase();
    const rootRaw = (inspectedRoot?.root || "").toLowerCase().replace(/[\/-]/g, " ").trim();
    const rootTokens = rootRaw.split(/\s+/).filter(Boolean);

    return ieltsParaphraseData.filter((p) => {
      const matchWord = wordQuery && (
        p.c1c2Academic.toLowerCase().includes(wordQuery) ||
        p.generalWord.toLowerCase().includes(wordQuery)
      );
      const matchRoot = rootTokens.some((token) =>
        p.root.toLowerCase().includes(token) || token.includes(p.root.toLowerCase())
      );
      return matchWord || matchRoot;
    });
  }, [inspectedWord, inspectedRoot]);

  // 3. Trunk Neighbor Words (Từ cùng trục học thuật để mở rộng cụm ngữ nghĩa)
  const trunkNeighborWords = useMemo(() => {
    if (!inspectedRoot) return [];
    const currentCategory = inspectedRoot.category;
    const sameCategoryRoots = allRoots.filter(
      (r) => r.id !== inspectedRoot.id && r.category === currentCategory
    );
    const results: { word: IELTSWordExample; root: WordRoot }[] = [];
    sameCategoryRoots.forEach((r) => {
      (r.exampleWords || []).slice(0, 2).forEach((w) => {
        results.push({ word: w, root: r });
      });
    });
    return results.slice(0, 4);
  }, [inspectedRoot, allRoots]);

  if (!inspectedRoot && !inspectedWord) {
    return (
      <div className="text-center py-10 text-slate-400 space-y-2 p-4">
        <Compass className="w-8 h-8 mx-auto text-slate-600 animate-spin" />
        <p className="text-xs">Nhấp vào bất kỳ nốt gốc từ hoặc từ vựng nào trên Mindmap để xem giải nghĩa, từ liên kết và mẹo gợi nhớ.</p>
      </div>
    );
  }

  const currentWord = inspectedWord || inspectedRoot?.exampleWords?.[0];

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-100">
      {/* Header Bar */}
      <div className="border-b border-slate-800 p-3 sm:p-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 bg-blue-950/70 px-2 py-0.5 rounded border border-blue-800/40">
                {inspectedRoot?.root ? `Gốc: ${inspectedRoot.root}` : "Từ Vựng Học Thuật"}
              </span>
              {currentWord?.level && (
                <span
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                    currentWord.level === "C2" ? "bg-rose-900 text-rose-200" : "bg-blue-900 text-blue-200"
                  }`}
                >
                  Band {currentWord.level}
                </span>
              )}
              {currentWord?.partOfSpeech && (
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  ({currentWord.partOfSpeech})
                </span>
              )}
            </div>

            {/* Word Heading */}
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              {currentWord?.word || inspectedRoot?.root}
            </h3>
          </div>

          {/* Action Buttons: Audio & Close */}
          <div className="flex items-center gap-1.5 shrink-0">
            {onOpenAiTutor && inspectedRoot && (
              <button
                type="button"
                onClick={() => onOpenAiTutor(inspectedRoot)}
                className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[11px] font-black flex items-center gap-1.5 shadow-sm border border-purple-400 cursor-pointer transition-all hover:scale-105 active:scale-95"
                title={`Học gốc "${inspectedRoot.root}" với Gia Sư AI (10-15 từ + bài đọc + test)`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Gia Sư AI</span>
              </button>
            )}
            {currentWord && (
              <button
                type="button"
                onClick={(e) => onPlayAudio(currentWord.word, `view-word-${currentWord.word}`, e)}
                className={`p-2 rounded-xl transition-all cursor-pointer border ${
                  isSpeaking === `view-word-${currentWord.word}`
                    ? "bg-amber-500 text-white border-amber-600 animate-pulse"
                    : "bg-blue-600 text-white hover:bg-blue-500 border-blue-500 shadow-sm"
                }`}
                title="Nghe phát âm chuẩn (US/UK)"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer border border-transparent hover:border-slate-700"
                title="Đóng bảng"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Pronunciation Badges */}
        {currentWord && (
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[11px] font-mono font-bold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              IPA: {currentWord.phonetic || wordPron.ipa || "/.../"}
            </span>
            <span className="text-[11px] font-sans text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">
              Đọc: <strong>{currentWord.pronunciationGuide || wordPron.guide || currentWord.word}</strong>
            </span>
          </div>
        )}

        {/* Word Switcher Pills (Chuyển nhanh giữa các từ cùng gốc) */}
        {inspectedRoot && (inspectedRoot.exampleWords || []).length > 1 && (
          <div className="mt-3 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Layers className="w-3 h-3 text-blue-400" />
                Các Từ Sinh Ra Từ Gốc Này ({inspectedRoot.exampleWords.length}):
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto no-scrollbar py-0.5">
              {inspectedRoot.exampleWords.map((w, idx) => {
                const isSelected = currentWord?.word === w.word;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectWord(w)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-400 shadow-xs ring-1 ring-blue-400"
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border-slate-700"
                    }`}
                  >
                    {w.word}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3 Core Interactive Tabs: Giải Nghĩa • Từ Liên Kết • Mẹo Gợi Nhớ */}
      <div className="bg-slate-950/80 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between gap-1 text-xs">
        <div className="grid grid-cols-3 w-full gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("meaning")}
            className={`py-1.5 px-2 rounded-md font-bold text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === "meaning"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="truncate">Giải Nghĩa</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("linked")}
            className={`py-1.5 px-2 rounded-md font-bold text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === "linked"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span className="truncate">
              Từ Liên Kết ({rootFamilyWords.length + relatedParaphrases.length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("mnemonic")}
            className={`py-1.5 px-2 rounded-md font-bold text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === "mnemonic"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="truncate">Mẹo Gợi Nhớ</span>
          </button>
        </div>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 max-h-[380px] sm:max-h-[440px]">
        {/* TAB 1: GIẢI NGHĨA (Definition, Context & IELTS Sentence) */}
        {activeTab === "meaning" && (
          <div className="space-y-3 animate-in fade-in duration-150">
            {/* Core Meaning in Vietnamese */}
            <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Định Nghĩa Trọng Tâm:
                </span>
                {currentWord?.level && (
                  <span className="text-[10px] text-blue-400 font-bold">
                    CEFR {currentWord.level}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-emerald-300 leading-snug">
                {currentWord?.meaning || inspectedRoot?.meaning}
              </p>
              {inspectedRoot?.meaning && currentWord && (
                <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-700/50">
                  <span className="font-semibold text-slate-300">Ý nghĩa gốc từ ({inspectedRoot.root}):</span>{" "}
                  {inspectedRoot.meaning}
                </p>
              )}
            </div>

            {/* Academic Collocation */}
            {currentWord?.collocation && (
              <div className="bg-indigo-950/40 rounded-xl p-2.5 border border-indigo-800/40 flex items-start gap-2">
                <Tag className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-indigo-300 block mb-0.5">Collocation Học Thuật:</span>
                  <span className="font-mono text-indigo-200 font-semibold">{currentWord.collocation}</span>
                </div>
              </div>
            )}

            {/* IELTS Authentic Sentence with Translation */}
            {currentWord?.ieltsSentence && (
              <div className="bg-slate-900/90 rounded-xl p-3 border-l-4 border-blue-500 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    Ví Dụ Đề Thi IELTS:
                  </span>
                </div>
                <p className="text-xs text-slate-200 italic leading-relaxed font-sans">
                  "{currentWord.ieltsSentence}"
                </p>
                {currentWord.vietnameseTranslation && (
                  <p className="text-[11px] text-slate-400 leading-normal pt-1 border-t border-slate-800">
                    👉 <strong>Dịch nghĩa:</strong> {currentWord.vietnameseTranslation}
                  </p>
                )}
              </div>
            )}

            {/* Root Origin */}
            {inspectedRoot?.origin && (
              <div className="text-[11px] text-slate-400 bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <span>Nguồn gốc ngôn ngữ:</span>
                <span className="font-medium text-slate-300 italic">{inspectedRoot.origin}</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CÁC TỪ LIÊN KẾT (Root Family, Paraphrases & Same Axis) */}
        {activeTab === "linked" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* 1. Từ cùng gốc từ (Root Family) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  Họ Từ Cùng Gốc ({inspectedRoot?.root})
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {rootFamilyWords.length} từ liên kết
                </span>
              </div>

              {rootFamilyWords.length > 0 ? (
                <div className="space-y-1.5">
                  {rootFamilyWords.map((w, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectWord(w)}
                      className="group p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/60 transition-all cursor-pointer flex items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-xs text-white group-hover:text-blue-300 transition-colors">
                            {w.word}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">({w.partOfSpeech})</span>
                          {w.level && (
                            <span
                              className={`text-[8px] font-black px-1 rounded ${
                                w.level === "C2" ? "bg-rose-900 text-rose-200" : "bg-blue-900 text-blue-200"
                              }`}
                            >
                              {w.level}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-300 truncate">
                          {w.meaning}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => onPlayAudio(w.word, `linked-word-${w.word}`, e)}
                          className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-blue-400 cursor-pointer"
                          title="Phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic bg-slate-800/40 p-2.5 rounded-lg">
                  Đây là từ đại diện chính của gốc từ này.
                </p>
              )}
            </div>

            {/* 2. Cặp Paraphrase Band Cao (IELTS Academic Paraphrases) */}
            {relatedParaphrases.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Shuffle className="w-3.5 h-3.5 text-amber-400" />
                  Cặp Paraphrase Thay Thế Band Cao
                </span>

                <div className="space-y-2">
                  {relatedParaphrases.slice(0, 2).map((para, pIdx) => (
                    <div
                      key={pIdx}
                      className="bg-amber-950/25 border border-amber-500/30 rounded-xl p-2.5 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-400">Từ thường: {para.generalWord}</span>
                        <ArrowRight className="w-3 h-3 text-amber-400" />
                        <span className="text-amber-300 font-mono">{para.c1c2Academic}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 italic">
                        "{para.exampleIeltsSentence}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Từ cùng trục học thuật (Trunk Cluster) */}
            {trunkNeighborWords.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  Từ Cùng Trục Ngữ Nghĩa ({inspectedRoot?.category.split(":")[0]})
                </span>

                <div className="grid grid-cols-2 gap-1.5">
                  {trunkNeighborWords.map((item, nIdx) => (
                    <button
                      key={nIdx}
                      type="button"
                      onClick={() => {
                        if (onSelectRoot) onSelectRoot(item.root);
                        onSelectWord(item.word);
                      }}
                      className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left transition-all cursor-pointer"
                    >
                      <span className="text-xs font-bold text-emerald-300 block truncate">
                        {item.word.word}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {item.word.meaning}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MẸO GỢI NHỚ (Mnemonic Hook & Morphological Diagram) */}
        {activeTab === "mnemonic" && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            {/* Mẹo Liên Tưởng Gợi Nhớ Nhanh */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-950/50 to-slate-900 border border-amber-500/40 text-amber-200 space-y-1.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mẹo Liên Tưởng Gợi Nhớ Nhanh (Memory Anchor)</span>
              </div>
              <p className="text-xs text-amber-100/95 leading-relaxed italic font-medium">
                "{inspectedRoot?.tip || inspectedRoot?.description || "Gốc từ giúp liên kết nghĩa chặt chẽ."}"
              </p>
            </div>

            {/* Sơ Đồ Ghép Từ & Phân Rã Hình Thái (Morphological Equation Flowchart) */}
            {currentWord?.visualBreakdown && (
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    Sơ Đồ Ghép Từ & Giải Phẫu Hình Thái:
                  </span>
                </div>

                {/* Equation Flow */}
                <div className="flex flex-wrap items-center gap-1.5 py-1.5">
                  {currentWord.visualBreakdown
                    .split(/\s*(\+|\=)\s*/)
                    .filter(Boolean)
                    .map((part, pIdx) => {
                      if (part === "+") {
                        return (
                          <span key={pIdx} className="text-slate-500 font-black text-xs px-0.5">
                            +
                          </span>
                        );
                      }
                      if (part === "=") {
                        return (
                          <span
                            key={pIdx}
                            className="text-amber-400 font-black text-xs px-0.5 flex items-center"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        );
                      }

                      const isResult =
                        currentWord.visualBreakdown?.indexOf("=") !== -1 &&
                        currentWord.visualBreakdown?.indexOf(part) >
                          (currentWord.visualBreakdown?.indexOf("=") || 0);

                      return (
                        <span
                          key={pIdx}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-transform hover:scale-105 border shadow-xs ${
                            isResult
                              ? "bg-amber-500/20 text-amber-200 border-amber-500/40"
                              : part.includes("-")
                              ? "bg-blue-900/50 text-blue-300 border-blue-700/60"
                              : "bg-emerald-950/60 text-emerald-300 border-emerald-700/60"
                          }`}
                        >
                          {part}
                        </span>
                      );
                    })}
                </div>

                <div className="text-[11px] text-slate-400 pt-1.5 border-t border-slate-800 space-y-1">
                  <p>
                    💡 <strong>Cơ chế tư duy:</strong> Khi gặp từ mới trong bài thi IELTS Reading, hãy tách tiền tố & gốc từ theo công thức trên để đoán nghĩa chính xác 90%.
                  </p>
                </div>
              </div>
            )}

            {/* Quick Context Decoder */}
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/70 text-xs space-y-1">
              <span className="font-bold text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Ứng Dụng Trong Bài Thi IELTS
              </span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Sử dụng từ <strong className="text-white">{currentWord?.word}</strong> cùng collocation{" "}
                <span className="text-indigo-300 font-mono">
                  {currentWord?.collocation || "học thuật"}
                </span>{" "}
                để tăng điểm tiêu chí Lexical Resource trong Writing Task 2 và Speaking Part 3.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/90 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (inspectedRoot) {
              if (onSelectRoot) onSelectRoot(inspectedRoot);
              document
                .getElementById(`root-item-${inspectedRoot.id}`)
                ?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
        >
          <span>Xem Thẻ Chi Tiết Trên Đại Lộ</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
