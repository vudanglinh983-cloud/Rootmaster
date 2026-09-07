import React, { useState, useEffect, useMemo } from "react";
import { TopicWord, AITopicLesson, SavedLessonRecord } from "../types";
import { MACRO_DOMAINS } from "../data/topicVocabMacroDomains";
import { SpeechService } from "../lib/speechSynthesis";
import {
  getAllSavedLessons,
  getActiveLesson,
  saveOrUpdateLesson,
  markLessonCompleted,
  canGenerateNewLesson,
  getLearnedWordsList,
  downloadSingleLessonJSON
} from "../lib/lessonStorage";
import {
  Sparkles,
  X,
  Volume2,
  Lightbulb,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BookOpen,
  HelpCircle,
  Award,
  Copy,
  Check,
  RefreshCw,
  Flame,
  ArrowRight,
  Bookmark,
  History,
  Lock,
  Unlock,
  AlertTriangle,
  Brain,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  Download,
  BookmarkCheck
} from "lucide-react";

interface AiTopicLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  initialMacroDomain?: string;
  initialWords?: TopicWord[];
}

export const AiTopicLessonModal: React.FC<AiTopicLessonModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
  initialMacroDomain,
  initialWords = [],
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(
    initialTopic || "1. Personal Information & Registration"
  );
  const [selectedBand, setSelectedBand] = useState<string>("Band 7.0 - 8.5");
  const [customGoal, setCustomGoal] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lesson, setLesson] = useState<AITopicLesson | null>(null);
  const [currentLessonRecord, setCurrentLessonRecord] = useState<SavedLessonRecord | null>(null);

  // Active module tab
  const [activeTab, setActiveTab] = useState<"mnemonics" | "story" | "analysis" | "diverse_test" | "upgrades">("mnemonics");

  // Saved lessons drawer state
  const [showSavedDrawer, setShowSavedDrawer] = useState<boolean>(false);
  const [savedLessonsList, setSavedLessonsList] = useState<SavedLessonRecord[]>([]);

  // Diverse test interactive answers: questionId -> selectedOption
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [activeSpeechWord, setActiveSpeechWord] = useState<string | null>(null);

  // Expanded analysis accordion item
  const [expandedAnalysisWord, setExpandedAnalysisWord] = useState<string | null>(null);

  // All available categories for dropdown
  const allCategories = useMemo(() => {
    return MACRO_DOMAINS.flatMap((d) =>
      d.categories.map((c) => ({
        category: c,
        domainName: d.name,
        emoji: d.emoji,
      }))
    );
  }, []);

  const refreshSavedLessons = () => {
    const list = getAllSavedLessons().filter((l) => l.type === "topic_lesson");
    setSavedLessonsList(list);
  };

  useEffect(() => {
    if (isOpen) {
      refreshSavedLessons();
      const active = getActiveLesson();
      if (active && active.type === "topic_lesson" && active.lessonData) {
        const topicLessonData = active.lessonData as AITopicLesson;
        setLesson(topicLessonData);
        setCurrentLessonRecord(active);
        if (topicLessonData.inDepthAnalysis && topicLessonData.inDepthAnalysis.length > 0) {
          setExpandedAnalysisWord(topicLessonData.inDepthAnalysis[0].word);
        }
      }
    }
  }, [isOpen]);

  const newLessonStatus = useMemo(() => {
    const active = getActiveLesson();
    if (active && active.type === "topic_lesson") {
      return { allowed: false, activeLesson: active };
    }
    return { allowed: true };
  }, [currentLessonRecord, savedLessonsList]);

  if (!isOpen) return null;

  const handleGenerateLesson = async (overrideTopic?: string) => {
    // Check sequential unlocking
    if (!newLessonStatus.allowed) {
      setError(
        `Bạn đang có bài học dở dang: "${newLessonStatus.activeLesson?.title || "Bài học trước"}". Hãy hoàn thành bài học hiện tại (bấm 'Hoàn thành bài học') để mở khóa bài học tiếp theo!`
      );
      return;
    }

    const topicToUse = overrideTopic || selectedTopic;
    setIsLoading(true);
    setError(null);
    setTestAnswers({});

    try {
      const matchedDomain = MACRO_DOMAINS.find((d) =>
        d.categories.includes(topicToUse)
      );

      const contextWords =
        initialWords.length > 0 && (!overrideTopic || overrideTopic === initialTopic)
          ? initialWords.slice(0, 15)
          : [];

      // Pass already learned words to strictly exclude them from generation
      const excludedWords = getLearnedWordsList();

      const res = await fetch("/api/generate-topic-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicName: topicToUse,
          macroDomain: matchedDomain?.name || initialMacroDomain || "Vũ trụ từ vựng chủ đề",
          words: contextWords,
          targetBand: selectedBand,
          customFocus: customGoal.trim() || undefined,
          excludedWords,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Không thể tạo bài học lúc này.");
      }

      const data: AITopicLesson = await res.json();
      setLesson(data);

      if (data.inDepthAnalysis && data.inDepthAnalysis.length > 0) {
        setExpandedAnalysisWord(data.inDepthAnalysis[0].word);
      }

      // Save as active lesson in localStorage
      const newRecord: SavedLessonRecord = {
        id: data.id || `topic_lesson_${Date.now()}`,
        type: "topic_lesson",
        title: data.lessonTitle || topicToUse,
        topic: topicToUse,
        macroDomain: matchedDomain?.name || initialMacroDomain || "Vũ trụ từ vựng chủ đề",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: "in-progress",
        wordsLearned: data.mnemonicStories.map((m) => m.word),
        totalWords: data.mnemonicStories.length,
        testScore: null,
        savedAnswers: {},
        lessonData: data,
      };

      saveOrUpdateLesson(newRecord);
      setCurrentLessonRecord(newRecord);
      refreshSavedLessons();
      setActiveTab("mnemonics");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Đã xảy ra lỗi khi tạo bài học bằng AI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteCurrentLesson = () => {
    if (!currentLessonRecord) return;

    const questions = lesson?.diverseTestQuestions || [];
    let correctCount = 0;
    questions.forEach((q) => {
      if (testAnswers[q.id] === q.answer) correctCount++;
    });

    const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 100;

    const testScore = {
      totalQuestions: questions.length || 1,
      correctAnswers: correctCount,
      percentage,
      passed: percentage >= 50,
    };

    const updated = markLessonCompleted(currentLessonRecord.id, testScore);
    if (updated) {
      setCurrentLessonRecord({ ...updated });
      refreshSavedLessons();
    }
  };

  const handleSelectSavedLesson = (rec: SavedLessonRecord) => {
    setCurrentLessonRecord(rec);
    if (rec.lessonData) {
      const topicLessonData = rec.lessonData as AITopicLesson;
      setLesson(topicLessonData);
      if (topicLessonData.inDepthAnalysis && topicLessonData.inDepthAnalysis.length > 0) {
        setExpandedAnalysisWord(topicLessonData.inDepthAnalysis[0].word);
      }
    }
    setShowSavedDrawer(false);
    setError(null);
  };

  const handlePronounce = (word: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveSpeechWord(word);
    SpeechService.speak(word, {
      onEnd: () => setActiveSpeechWord(null),
      onError: () => setActiveSpeechWord(null),
    });
  };

  const handleCopyLesson = () => {
    if (!lesson) return;
    const text = `=== ${lesson.lessonTitle} ===
Chủ đề: ${lesson.topic}
${lesson.summary}

--- MẸO NHỚ SIÊU TỐC ---
${lesson.mnemonicStories
  .map(
    (m) =>
      `• ${m.word} ${m.ipa ? `/${m.ipa}/` : ""}: ${m.vietnamese}
  - Siêu Mẹo: ${m.superHook}
  - Collocation: ${m.ieltsCollocation}
  ${m.commonTrap ? `- Cạm bẫy: ${m.commonTrap}` : ""}`
  )
  .join("\n\n")}

--- CÂU CHUYỆN NGỮ CẢNH ---
${lesson.connectingNarrative.title}
${lesson.connectingNarrative.text}
Dịch nghĩa: ${lesson.connectingNarrative.translation}`;

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border-2 border-[#0F172A] shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0F172A] px-5 py-3.5 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-600 to-rose-600 flex items-center justify-center shadow-lg border border-amber-400/40 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-sans font-black text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                  AI TẠO BÀI HỌC DỄ NHỚ THEO CHỦ ĐỀ
                </span>
                {currentLessonRecord && (
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase flex items-center gap-1 ${
                      currentLessonRecord.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    }`}
                  >
                    {currentLessonRecord.status === "completed" ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> ĐÃ HOÀN THÀNH
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" /> ĐANG HỌC DỞ DANG
                      </>
                    )}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 font-medium line-clamp-1">
                Ghi nhớ siêu tốc bằng mẹo âm thanh tương tự • Phân tích chuyên sâu • Test 5 dạng câu hỏi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSavedDrawer(!showSavedDrawer)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-700 flex items-center gap-1.5"
              title="Xem danh sách bài học đã lưu"
            >
              <History className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Bài Đã Lưu ({savedLessonsList.length})</span>
            </button>

            {currentLessonRecord && (
              <button
                onClick={() => downloadSingleLessonJSON(currentLessonRecord)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
                title="Tải riêng file bài học này (.JSON) để lưu trữ trên máy tính"
              >
                <Download className="w-4 h-4 text-blue-400" />
              </button>
            )}

            {lesson && (
              <button
                onClick={handleCopyLesson}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
                title="Sao chép bài học"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Saved Lessons Drawer */}
        {showSavedDrawer && (
          <div className="bg-slate-900 border-b border-slate-800 p-4 animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-black">DANH SÁCH BÀI HỌC DỄ NHỚ ĐÃ LƯU</h4>
              </div>
              <button onClick={() => setShowSavedDrawer(false)} className="text-xs text-slate-400 hover:text-white">
                Đóng ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-3 max-h-48 overflow-y-auto">
              {savedLessonsList.length === 0 ? (
                <div className="col-span-full text-center text-xs text-slate-400 py-3">
                  Chưa có bài học nào được lưu. Hãy bấm tạo bài học mới bên dưới!
                </div>
              ) : (
                savedLessonsList.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => handleSelectSavedLesson(rec)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      currentLessonRecord?.id === rec.id
                        ? "bg-amber-900/40 border-amber-400 text-white"
                        : "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-black line-clamp-1">{rec.title}</span>
                      <span
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          rec.status === "completed" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {rec.status === "completed" ? "Đã xong" : "Đang học"}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">
                      Chủ đề: {rec.topic || rec.topicName}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Sequential Unlocking Notice */}
        {currentLessonRecord && currentLessonRecord.status === "in-progress" && (
          <div className="bg-amber-500/10 border-b border-amber-500/30 px-5 py-2.5 flex items-center justify-between gap-3 text-amber-900 text-xs shrink-0">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Bài học đang diễn ra:</strong> "{currentLessonRecord.title}". Bạn chỉ có thể tạo bài học mới với từ vựng mới sau khi hoàn thành bài học này.
              </span>
            </div>
            <button
              onClick={handleCompleteCurrentLesson}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Hoàn thành bài học</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/60">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3.5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Topic selector */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1">
                  Chủ đề học thuật:
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500"
                >
                  {allCategories.map((c, i) => (
                    <option key={i} value={c.category}>
                      {c.emoji} {c.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Band target */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1">
                  Mục tiêu Band điểm:
                </label>
                <select
                  value={selectedBand}
                  onChange={(e) => setSelectedBand(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Band 6.5 - 7.5">Band 6.5 - 7.5 (Nền tảng vững chắc)</option>
                  <option value="Band 7.0 - 8.5">Band 7.0 - 8.5 (Học thuật nâng cao)</option>
                  <option value="Band 8.0 - 9.0">Band 8.0 - 9.0 (Chuyên gia ngôn ngữ)</option>
                </select>
              </div>

              {/* Custom Goal & Action */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1">
                  Yêu cầu trọng tâm:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Tập trung Writing Task 2..."
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => handleGenerateLesson()}
                disabled={isLoading}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:opacity-90 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI đang tạo bài học dễ nhớ...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Tạo bài học dễ nhớ mới (Từ mới)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-500/30 mx-auto flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-amber-600 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-800">
                  AI đang tuyển chọn từ mới và sáng tác mẹo siêu trí nhớ...
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Đang lọc bỏ các từ đã học, tạo liên kết âm thanh tương tự, câu chuyện ngữ cảnh, phân tích hình thái học và bài test 5 dạng đa dạng.
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-xs sm:text-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
              {currentLessonRecord?.status === "in-progress" && (
                <button
                  onClick={handleCompleteCurrentLesson}
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold shrink-0 hover:bg-emerald-500 transition-all cursor-pointer"
                >
                  Hoàn thành bài cũ ngay
                </button>
              )}
            </div>
          )}

          {/* Lesson Content Presentation */}
          {lesson && !isLoading && (
            <div className="space-y-6">
              {/* Header Box with Status */}
              <div className="bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-2xl p-5 text-white shadow-md border-l-4 border-l-amber-500 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                      CHỦ ĐỀ: {lesson.topic}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                      {lesson.targetBand}
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-white">{lesson.lessonTitle}</h2>
                  <p className="text-xs text-slate-300 leading-relaxed">{lesson.summary}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {currentLessonRecord?.status === "in-progress" ? (
                    <button
                      onClick={handleCompleteCurrentLesson}
                      className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Hoàn Thành Bài Học</span>
                    </button>
                  ) : (
                    <div className="px-4 py-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Bài học đã hoàn thành!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-thin">
                <button
                  onClick={() => setActiveTab("mnemonics")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "mnemonics"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Lightbulb className="w-4 h-4 text-yellow-300" />
                  <span>Mẹo Nhớ Siêu Tốc ({lesson.mnemonicStories?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTab("story")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "story"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-amber-200" />
                  <span>Câu Chuyện Ngữ Cảnh</span>
                </button>

                <button
                  onClick={() => setActiveTab("analysis")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "analysis"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Brain className="w-4 h-4 text-purple-300" />
                  <span>Phân Tích Chuyên Sâu ({lesson.inDepthAnalysis?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTab("diverse_test")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "diverse_test"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Award className="w-4 h-4 text-yellow-300" />
                  <span>Bài Test Đa Dạng ({lesson.diverseTestQuestions?.length || 0} Câu)</span>
                </button>

                <button
                  onClick={() => setActiveTab("upgrades")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "upgrades"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Zap className="w-4 h-4 text-emerald-300" />
                  <span>Nâng Cấp B2 ➔ C1</span>
                </button>
              </div>

              {/* TAB 1: MNEMONICS */}
              {activeTab === "mnemonics" && (
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      DANH SÁCH MẸO NHỚ BẰNG ÂM THANH TƯƠNG TỰ & HÌNH ẢNH HÓA
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      Nhấn vào loa để nghe phát âm IPA
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lesson.mnemonicStories.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 hover:border-amber-400 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-mono font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="text-base font-black text-slate-900">{m.word}</span>
                            {m.ipa && (
                              <span className="text-xs font-mono font-bold text-slate-500">
                                /{m.ipa}/
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => handlePronounce(m.word, e)}
                            className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-xs font-bold text-slate-800">{m.vietnamese}</div>

                        <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-950 font-medium leading-relaxed">
                          <strong className="text-amber-900 block font-bold mb-0.5">
                            💡 Siêu mẹo liên tưởng:
                          </strong>
                          {m.superHook}
                        </div>

                        <div className="text-[11px] text-slate-600">
                          <strong className="text-slate-800">IELTS Collocation: </strong>
                          <span className="font-mono font-semibold text-blue-700">{m.ieltsCollocation}</span>
                        </div>

                        {m.commonTrap && (
                          <div className="text-[11px] text-red-700 bg-red-50 p-2 rounded-lg border border-red-200">
                            <strong>⚠️ Cạm bẫy: </strong>{m.commonTrap}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: CONNECTING NARRATIVE STORY */}
              {activeTab === "story" && lesson.connectingNarrative && (
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900">
                      {lesson.connectingNarrative.title}
                    </h3>
                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      {showTranslation ? "Ẩn bản dịch" : "Hiện bản dịch"}
                    </button>
                  </div>

                  <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-200/60 font-serif leading-relaxed text-slate-900 text-sm sm:text-base">
                    {lesson.connectingNarrative.text}
                  </div>

                  {showTranslation && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      <strong className="text-slate-900 block mb-1">Bản dịch song ngữ:</strong>
                      {lesson.connectingNarrative.translation}
                    </div>
                  )}

                  {lesson.connectingNarrative.takeawayTip && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 font-medium">
                      💡 <strong>Bài học rút ra: </strong>{lesson.connectingNarrative.takeawayTip}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: IN-DEPTH ANALYSIS */}
              {activeTab === "analysis" && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-5 shadow-sm space-y-1">
                    <h4 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-300" />
                      PHÂN TÍCH HÌNH THÁI HỌC & SẮC THÁI HỌC THUẬT CHUYÊN SÂU
                    </h4>
                    <p className="text-xs text-purple-200">
                      Gốc từ Latin/Hy Lạp, gia đình từ (Word Family), cạm bẫy phòng thi IELTS và khuôn mẫu câu thực chiến Writing & Speaking.
                    </p>
                  </div>

                  {(!lesson.inDepthAnalysis || lesson.inDepthAnalysis.length === 0) ? (
                    <div className="bg-white rounded-2xl p-6 text-center text-xs text-slate-500 border border-slate-200">
                      Chưa có dữ liệu phân tích chuyên sâu cho bài học này.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {lesson.inDepthAnalysis.map((item, idx) => {
                        const isExpanded = expandedAnalysisWord === item.word;
                        return (
                          <div
                            key={idx}
                            className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm transition-all"
                          >
                            <div
                              onClick={() => setExpandedAnalysisWord(isExpanded ? null : item.word)}
                              className="p-4 bg-slate-50 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between gap-3 select-none"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-mono font-black text-sm flex items-center justify-center">
                                  {idx + 1}
                                </span>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-base font-black text-slate-900">{item.word}</h3>
                                    <span className="text-xs font-mono text-slate-500 font-bold">{item.ipa}</span>
                                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold uppercase">
                                      {item.pos || "Academic"}
                                    </span>
                                  </div>
                                  <p className="text-xs font-bold text-slate-600">{item.vietnamese}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => handlePronounce(item.word, e)}
                                  className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
                                  title="Nghe phát âm"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                                {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="p-5 border-t border-slate-200 space-y-4 bg-white">
                                <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-3.5 space-y-2">
                                  <span className="text-xs font-black uppercase text-purple-900 font-mono flex items-center gap-1.5">
                                    🧬 Cấu tạo Hình thái & Gốc từ (Morphology & Root)
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                                    <div className="bg-white p-2.5 rounded-lg border border-purple-100">
                                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Nguồn gốc:</span>
                                      <span className="font-bold text-purple-950">{item.morphology.origin}</span>
                                    </div>
                                    <div className="bg-white p-2.5 rounded-lg border border-purple-100">
                                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Gốc từ:</span>
                                      <span className="font-mono font-black text-blue-700">{item.morphology.root}</span>
                                    </div>
                                    <div className="bg-white p-2.5 rounded-lg border border-purple-100">
                                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Ý niệm gốc:</span>
                                      <span className="font-medium text-slate-800">{item.morphology.rootMeaning}</span>
                                    </div>
                                  </div>
                                </div>

                                {item.wordFamily && (
                                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                                    <span className="text-xs font-black uppercase text-slate-700 font-mono flex items-center gap-1.5">
                                      🌿 Gia Đình Từ (Word Family)
                                    </span>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Noun:</span>
                                        <span className="font-mono font-bold text-slate-800 block">{item.wordFamily.noun || "—"}</span>
                                      </div>
                                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Verb:</span>
                                        <span className="font-mono font-bold text-slate-800 block">{item.wordFamily.verb || "—"}</span>
                                      </div>
                                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Adj:</span>
                                        <span className="font-mono font-bold text-slate-800 block">{item.wordFamily.adj || "—"}</span>
                                      </div>
                                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Adv:</span>
                                        <span className="font-mono font-bold text-slate-800 block">{item.wordFamily.adv || "—"}</span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 space-y-2">
                                  <span className="text-xs font-black uppercase text-blue-900 font-mono flex items-center gap-1.5">
                                    ⚡ Sắc Thái Học Thuật & Nâng Chuẩn Lexical Resource
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                                    <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                                      <span className="text-slate-400 font-bold block text-[10px] uppercase">So sánh B2:</span>
                                      <span className="text-slate-800">{item.academicRegister.b2Contrast}</span>
                                    </div>
                                    <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Lý do tăng Band 7.5+:</span>
                                      <span className="text-emerald-700 font-semibold">{item.academicRegister.bandLiftReason}</span>
                                    </div>
                                    <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Sắc thái:</span>
                                      <span className="text-slate-800">{item.academicRegister.nuance}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-2">
                                  <span className="text-xs font-black uppercase text-amber-950 font-mono flex items-center gap-1.5">
                                    ⚠️ Cạm Bẫy Phòng Thi Cần Tránh
                                  </span>
                                  <div className="space-y-1.5 text-xs text-amber-900">
                                    <div><strong>Bẫy nghe:</strong> {item.examPitfalls.listeningTrap}</div>
                                    <div><strong>Lỗi chính tả/ngữ pháp:</strong> {item.examPitfalls.spellingOrGrammar}</div>
                                    <div><strong>Quy tắc Collocation:</strong> <span className="font-mono text-blue-800 font-semibold">{item.examPitfalls.collocationRule}</span></div>
                                  </div>
                                </div>

                                <div className="bg-slate-900 text-white rounded-xl p-4 space-y-2">
                                  <span className="text-xs font-black uppercase text-sky-400 font-mono flex items-center gap-1.5">
                                    🎯 Khuôn Mẫu Câu Ứng Dụng Phòng Thi
                                  </span>
                                  <div className="space-y-2 text-xs">
                                    <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                                      <span className="text-sky-300 font-bold block mb-1">Writing Task 2:</span>
                                      <p className="font-serif italic text-slate-200">"{item.sentenceFrames.writingTask2}"</p>
                                    </div>
                                    <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                                      <span className="text-sky-300 font-bold block mb-1">Speaking Part 3:</span>
                                      <p className="font-serif italic text-slate-200">"{item.sentenceFrames.speakingPart3}"</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: DIVERSE TEST QUESTIONS */}
              {activeTab === "diverse_test" && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white rounded-2xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-200" />
                        BỘ BÀI TEST ĐA DẠNG NÂNG CAO PHẢN XẠ (5 DẠNG BÀI)
                      </h4>
                      <p className="text-xs text-amber-100">
                        Kiểm tra toàn diện từ vựng qua ngữ cảnh, paraphrase, collocation, lỗi sai và định nghĩa.
                      </p>
                    </div>

                    {Object.keys(testAnswers).length > 0 && (
                      <div className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white font-mono font-black text-xs">
                        Đã làm: {Object.keys(testAnswers).length} / {lesson.diverseTestQuestions?.length || 5}
                      </div>
                    )}
                  </div>

                  {(!lesson.diverseTestQuestions || lesson.diverseTestQuestions.length === 0) ? (
                    <div className="bg-white rounded-2xl p-6 text-center text-xs text-slate-500 border border-slate-200">
                      Chưa có câu hỏi test đa dạng cho bài học này.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {lesson.diverseTestQuestions.map((q, qIdx) => {
                        const userAns = testAnswers[q.id];
                        const isAnswered = !!userAns;
                        const isCorrect = userAns === q.answer;

                        return (
                          <div
                            key={q.id || qIdx}
                            className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm space-y-3"
                          >
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                                  {qIdx + 1}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-mono">
                                  {q.typeLabel || q.type}
                                </span>
                              </div>

                              {isAnswered && (
                                <span
                                  className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                    isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                  {isCorrect ? "Chính xác" : "Chưa chính xác"}
                                </span>
                              )}
                            </div>

                            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                              {q.question}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                              {q.options.map((opt, optIdx) => {
                                const isChosen = userAns === opt;
                                const isThisCorrect = opt === q.answer;

                                let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100";
                                if (isAnswered) {
                                  if (isThisCorrect) btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold";
                                  else if (isChosen) btnStyle = "bg-red-100 border-red-500 text-red-950 font-bold";
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    onClick={() => {
                                      setTestAnswers((prev) => ({ ...prev, [q.id]: opt }));
                                    }}
                                    className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                                  >
                                    <span>{opt}</span>
                                    {isAnswered && isThisCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                                    {isAnswered && isChosen && !isThisCorrect && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                                  </button>
                                );
                              })}
                            </div>

                            {isAnswered && (
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5 text-xs text-slate-800 animate-in fade-in duration-200">
                                <div>
                                  <strong className="text-amber-700">Lời giải chi tiết: </strong>
                                  {q.explanation}
                                </div>
                                {q.memoryHookReminder && (
                                  <div className="text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 font-medium">
                                    💡 <strong>Mẹo nhớ nhanh: </strong>{q.memoryHookReminder}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Complete Lesson CTA */}
                      <div className="bg-white rounded-2xl p-5 border-2 border-emerald-500 shadow-md text-center space-y-3">
                        <h4 className="text-sm font-black text-slate-900">
                          {Object.keys(testAnswers).length === (lesson.diverseTestQuestions?.length || 5)
                            ? "🎉 Bạn đã hoàn thành toàn bộ câu hỏi bài test!"
                            : `Bạn đã trả lời ${Object.keys(testAnswers).length}/${lesson.diverseTestQuestions?.length || 5} câu hỏi.`}
                        </h4>
                        <p className="text-xs text-slate-500 max-w-md mx-auto">
                          Bấm nút bên dưới để lưu kết quả và mở khóa quyền tạo bài học mới với những từ vựng mới hoàn toàn!
                        </p>
                        <button
                          onClick={handleCompleteCurrentLesson}
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Lưu Kết Quả & Hoàn Thành Bài Học</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: B2 TO C1 UPGRADES */}
              {activeTab === "upgrades" && (
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    BẢNG CHUYỂN ĐỔI TỪ B2 SANG HỌC THUẬT C1/C2 (LEXICAL UPGRADES)
                  </h4>
                  {lesson.lexicalUpgrades && lesson.lexicalUpgrades.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                            <th className="py-2.5 px-3">Từ B2 Hay Dùng</th>
                            <th className="py-2.5 px-3">Nghĩa Tiếng Việt</th>
                            <th className="py-2.5 px-3 text-amber-700">Nâng Cấp C1/C2</th>
                            <th className="py-2.5 px-3">Ứng Dụng Ngữ Cảnh</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {lesson.lexicalUpgrades.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="py-2.5 px-3 font-bold text-slate-800">{item.b2Word}</td>
                              <td className="py-2.5 px-3 text-slate-600">{item.vietnamese}</td>
                              <td className="py-2.5 px-3 font-black text-amber-700">{item.c1Upgrade}</td>
                              <td className="py-2.5 px-3 text-slate-700">{item.contextSentence}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">Chưa có bảng nâng cấp cho bài này.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
