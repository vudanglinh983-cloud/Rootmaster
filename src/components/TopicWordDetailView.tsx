import React, { useState } from "react";
import { TopicWord } from "../data/topicVocabData";
import { MacroDomain, getMacroDomainForCategory } from "../data/topicVocabMacroDomains";
import { resolveB2Equivalent } from "../data/b2Equivalents";
import { SpeechService } from "../lib/speechSynthesis";
import {
  Volume2,
  CheckCircle2,
  Lightbulb,
  Tag,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Link,
  Layers,
  Copy,
  Check,
  Zap,
  GraduationCap
} from "lucide-react";

interface TopicWordDetailViewProps {
  word: TopicWord;
  isKnown: boolean;
  onToggleKnown: (id: string) => void;
  onClose: () => void;
  onPrevWord?: () => void;
  onNextWord?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onOpenAiLesson?: (topic: string, word: TopicWord) => void;
  onOpenAiTutor?: (topic: string, words: TopicWord[]) => void;
}

export const TopicWordDetailView: React.FC<TopicWordDetailViewProps> = ({
  word,
  isKnown,
  onToggleKnown,
  onClose,
  onPrevWord,
  onNextWord,
  hasPrev = false,
  hasNext = false,
  onOpenAiLesson,
  onOpenAiTutor,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  const domain = getMacroDomainForCategory(word.category, word.id);
  const b2Equivalent = resolveB2Equivalent(word);

  const handlePronounce = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlayingAudio(true);
    SpeechService.speak(word.word, {
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const handleCopy = () => {
    const text = `${word.word} - ${word.vietnamese}\nB2 Đồng nghĩa: ${b2Equivalent}\nĐịnh nghĩa: ${word.definition}\nMẹo nhớ: ${word.memoryHook}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#0F172A] shadow-2xl overflow-hidden flex flex-col w-full max-w-lg transition-all animate-in fade-in zoom-in-95 duration-200">
      {/* Header with Macro Domain theme */}
      <div 
        className="px-5 py-3.5 flex items-center justify-between text-white"
        style={{ backgroundColor: domain.color }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0">{domain.emoji}</span>
          <div className="min-w-0">
            <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-white/80 block truncate">
              {domain.nameEn}
            </span>
            <span className="text-sm font-bold text-white block truncate">
              {domain.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Sao chép từ & mẹo nhớ"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Đóng bảng chi tiết"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Main Body with Optimized, Larger Typography */}
      <div className="p-5 space-y-4 overflow-y-auto max-h-[70vh]">
        {/* Word + Pronunciation + Mastered Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">
                {word.word}
              </h2>
              <button
                onClick={handlePronounce}
                className={`p-1.5 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                  isPlayingAudio
                    ? "bg-blue-600 text-white border-blue-600 animate-pulse scale-105"
                    : "bg-blue-50 text-[#2563EB] border-blue-200 hover:bg-blue-100"
                }`}
                title="Phát âm chuẩn IPA"
              >
                <Volume2 className="w-4.5 h-4.5" />
              </button>
            </div>

            {word.pronunciation && (
              <span className="text-sm font-mono font-bold text-gray-500 block">
                /{word.pronunciation}/
              </span>
            )}
          </div>

          <button
            onClick={() => onToggleKnown(word.id)}
            className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold border transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              isKnown
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            <CheckCircle2 className={`w-4.5 h-4.5 ${isKnown ? "text-emerald-600 fill-emerald-100" : "text-gray-400"}`} />
            <span>{isKnown ? "Đã thuộc" : "Đánh dấu thuộc"}</span>
          </button>
        </div>

        {/* Vietnamese Meaning Pill */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Nghĩa Tiếng Việt
          </span>
          <p className="text-base md:text-lg font-black text-[#0F172A]">
            {word.vietnamese}
          </p>
        </div>

        {/* B2 High-Frequency Equivalent & Synonyms Box */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300/70 rounded-xl p-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              TỪ VỰNG B2 ĐỒNG NGHĨA / TƯƠNG ĐƯƠNG
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-[10px] font-mono font-bold text-amber-900 uppercase">
              B2 Paraphrase
            </span>
          </div>
          <p className="text-sm md:text-base font-black text-amber-950">
            {b2Equivalent}
          </p>
          <span className="text-[11px] text-amber-800/80 block italic">
            *Dùng để paraphrase thay thế trong bài thi IELTS Writing & Speaking tránh lặp từ.
          </span>
        </div>

        {/* Academic Definition */}
        <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Định Nghĩa Học Thuật (English Definition)
          </span>
          <p className="text-xs md:text-sm text-slate-800 leading-relaxed italic">
            "{word.definition}"
          </p>
        </div>

        {/* Memory Hook (Mẹo ghi nhớ siêu trực quan) */}
        {word.memoryHook && (
          <div className="bg-amber-50/90 border-2 border-amber-200 rounded-xl p-4 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs md:text-sm">
              <Lightbulb className="w-4.5 h-4.5 text-amber-600 shrink-0" />
              <span>Mẹo Ghi Nhớ & Liên Tưởng (Memory Hook)</span>
            </div>
            <p className="text-xs md:text-sm text-amber-950 font-medium leading-relaxed">
              {word.memoryHook}
            </p>
          </div>
        )}

        {/* Action Buttons: AI Lesson & AI Tutor */}
        <div className="space-y-2">
          {onOpenAiLesson && (
            <button
              onClick={() => onOpenAiLesson(word.category, word)}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs md:text-sm uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Tạo Bài Học Siêu Nhớ Bằng AI Cho Từ Này
            </button>
          )}

          {onOpenAiTutor && (
            <button
              onClick={() => onOpenAiTutor(word.category, [word])}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs md:text-sm uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
            >
              <GraduationCap className="w-4 h-4 text-sky-400" />
              Hỏi Gia Sư AI Về Từ Này (Liên Kết Số)
            </button>
          )}
        </div>

        {/* Synonyms if available */}
        {word.synonyms && (
          <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-3.5 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block flex items-center gap-1.5">
              <Link className="w-3.5 h-3.5" />
              Từ Đồng Nghĩa & Cụm Liên Quan
            </span>
            <p className="text-xs md:text-sm text-purple-950 font-semibold">
              {word.synonyms}
            </p>
          </div>
        )}

        {/* Subcategory & Domain Tag */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs font-mono px-3 py-1 rounded-md bg-gray-100 text-gray-700 font-semibold border border-gray-200 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-gray-400" />
            {word.category}
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            {domain.name}
          </span>
        </div>
      </div>

      {/* Footer Navigation: Prev / Next */}
      {(hasPrev || hasNext) && (
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs font-bold text-gray-600">
          <button
            onClick={onPrevWord}
            disabled={!hasPrev}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              hasPrev
                ? "bg-white hover:bg-gray-100 border-gray-200 text-[#0F172A]"
                : "opacity-40 cursor-not-allowed border-transparent"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Từ trước
          </button>

          <span className="text-[11px] text-gray-400 font-mono">
            Khám phá theo chuỗi
          </span>

          <button
            onClick={onNextWord}
            disabled={!hasNext}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              hasNext
                ? "bg-white hover:bg-gray-100 border-gray-200 text-[#0F172A]"
                : "opacity-40 cursor-not-allowed border-transparent"
            }`}
          >
            Từ kế tiếp
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
