import React, { useState, useEffect, useRef, useMemo } from "react";
import { TopicWord, AITutorLesson, BiteSizedSection, WordInDepthAnalysis, ComprehensiveQuizQuestion, SavedLessonRecord, RootContextData } from "../types";
import { SpeechService, getWordPronunciation } from "../lib/speechSynthesis";
import {
  getAllSavedLessons,
  getActiveLesson,
  saveOrUpdateLesson,
  markLessonCompleted,
  canGenerateNewLesson,
  getLearnedWordsList,
  deleteSavedLesson,
  downloadSingleLessonJSON
} from "../lib/lessonStorage";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  X,
  Copy,
  Check,
  Send,
  HelpCircle,
  GitMerge,
  Award,
  Zap,
  Tag,
  FileText,
  Headphones,
  ListOrdered,
  Lock,
  Unlock,
  BookmarkCheck,
  History,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Brain,
  Layers,
  Download,
  Trash2
} from "lucide-react";

interface AiVocabTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  initialWords?: TopicWord[];
  initialMacro?: string;
  initialRootContext?: RootContextData;
}

export const AiVocabTutorModal: React.FC<AiVocabTutorModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
  initialWords = [],
  initialMacro,
  initialRootContext,
}) => {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [targetWordCount, setTargetWordCount] = useState<number>(12); // Default 12 words (between 10-15)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lessonData, setLessonData] = useState<AITutorLesson | null>(null);
  const [currentLessonRecord, setCurrentLessonRecord] = useState<SavedLessonRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"words" | "reading" | "analysis" | "diverse_test" | "upgrades">("words");

  // Saved lessons drawer state
  const [showSavedDrawer, setShowSavedDrawer] = useState<boolean>(false);
  const [savedLessonsList, setSavedLessonsList] = useState<SavedLessonRecord[]>([]);

  // Audio player states
  const [isPlayingFull, setIsPlayingFull] = useState<boolean>(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [playingSectionNum, setPlayingSectionNum] = useState<number | null>(null);
  const audioCancelRef = useRef<boolean>(false);

  // Diverse test interactive answers
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [testCompleted, setTestCompleted] = useState<boolean>(false);

  // Challenge state
  const [selectedChallengeAnswer, setSelectedChallengeAnswer] = useState<string | null>(null);
  const [hasAnsweredChallenge, setHasAnsweredChallenge] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Expanded analysis accordion
  const [expandedAnalysisWord, setExpandedAnalysisWord] = useState<string | null>(null);

  // Reload saved lessons list
  const refreshSavedLessons = () => {
    const list = getAllSavedLessons().filter((l) => l.type === "tutor");
    setSavedLessonsList(list);
  };

  // On mount / open, check for existing active or latest lesson
  useEffect(() => {
    if (isOpen) {
      refreshSavedLessons();
      const active = getActiveLesson();
      if (active && active.type === "tutor" && active.lessonData) {
        const tutorData = active.lessonData as AITutorLesson;
        setLessonData(tutorData);
        setCurrentLessonRecord(active);
        // If analysis words exist, expand the first one
        if (tutorData.inDepthAnalysis && tutorData.inDepthAnalysis.length > 0) {
          setExpandedAnalysisWord(tutorData.inDepthAnalysis[0].word);
        }
      }
    } else {
      stopAudio();
    }
  }, [isOpen]);

  const stopAudio = () => {
    audioCancelRef.current = true;
    SpeechService.stop();
    setIsPlayingFull(false);
    setActiveSectionIndex(null);
    setPlayingSectionNum(null);
    setPlayingWord(null);
  };

  // Quick preset prompt chips
  const quickPrompts = initialRootContext ? [
    {
      label: `🌳 Gốc từ "${initialRootContext.root}": 12 từ + Test ôn tập`,
      prompt: `Gia sư hãy tạo bài học chuyên sâu về họ từ của gốc "${initialRootContext.root}" (${initialRootContext.meaning}) với 12 từ vựng học thuật, phân tích tiền tố/hậu tố, cách đọc, mẹo gợi nhớ siêu tốc và bài đọc 150-250 từ chia đoạn nhỏ kèm bài test ôn tập.`,
      words: 12
    },
    {
      label: `🎯 Toàn diện 15 từ vựng gốc "${initialRootContext.root}"`,
      prompt: `Tuyển chọn đúng 15 từ vựng phát triển từ gốc "${initialRootContext.root}" kèm đối chiếu B2 sang C1/C2, cách đọc chuẩn, bài đọc học thuật 200 từ chia đoạn và 5 câu test kiểm tra.`,
      words: 15
    },
    {
      label: `⚡ Cốt lõi 10 từ + Mẹo liên tưởng`,
      prompt: `Tạo bài học cô đọng 10 từ then chốt mang gốc "${initialRootContext.root}", cách nhớ nhanh qua âm thanh tương tự, bài đọc 150 từ và bộ test ôn tập phản xạ.`,
      words: 10
    },
    {
      label: `🔬 Phân tích hình thái học & cạm bẫy`,
      prompt: `Phân tích chuyên sâu cơ chế biến đổi hình thái học gốc "${initialRootContext.root}" (${initialRootContext.origin || 'Latin/Hy Lạp'}), gia đình từ, cạm bẫy phòng thi và bài đọc ứng dụng IELTS.`,
      words: 12
    }
  ] : [
    {
      label: "🔄 Bài học 12 từ + Bài đọc 150-250 từ",
      prompt: "Hãy tạo bài học hoàn chỉnh với 12 từ vựng học thuật C1/C2 kèm bài đọc 150-250 từ chia thành các phần nhỏ và đối chiếu từ B2.",
      words: 12
    },
    {
      label: "🎯 Bài học chuyên sâu 15 từ vựng",
      prompt: "Hãy chọn lọc đúng 15 từ vựng đắt giá nhất cho chủ đề này, kèm bài đọc chuẩn IELTS 150-250 từ chia thành các phần nhỏ dễ theo dõi.",
      words: 15
    },
    {
      label: "⚡ Bài học cốt lõi 10 từ nhanh",
      prompt: "Tạo bài học cô đọng 10 từ vựng mục tiêu kèm bài đọc 150 từ chia đoạn song ngữ và collocations điểm 8.0+.",
      words: 10
    },
    {
      label: "🌳 Phân tích hình thái & Cạm bẫy",
      prompt: "Phân tích 12 từ vựng chủ đề này kết nối với Đại lộ Gốc từ Latin/Hy Lạp, gia đình từ và các cạm bẫy trong phòng thi IELTS.",
      words: 12
    },
  ];

  // Check if current lesson is completed
  const isCurrentLessonCompleted = currentLessonRecord?.status === "completed";

  // Check if user is allowed to generate new lesson
  const newLessonStatus = useMemo(() => {
    const active = getActiveLesson();
    if (active && active.type === "tutor") {
      return { allowed: false, activeLesson: active };
    }
    return { allowed: true };
  }, [currentLessonRecord, savedLessonsList]);

  // Handle Generating a new lesson
  const handleGenerateLesson = async (customPrompt?: string, countOverride?: number) => {
    // Enforce sequential unlocking rule:
    // Only generate new lesson with new words when the previous lesson is completed!
    if (!newLessonStatus.allowed) {
      setErrorMessage(
        `Bạn đang có bài học dở dang: "${newLessonStatus.activeLesson?.title || "Bài học trước"}". Hãy hoàn thành bài học hiện tại (làm bài test và bấm 'Hoàn thành bài học') để gia sư AI mở khóa bài học mới!`
      );
      return;
    }

    const count = countOverride || targetWordCount;
    const defaultPrompt = initialRootContext
      ? `Gia sư hãy tạo bài học chuyên sâu với ${count} từ vựng thuộc gốc từ "${initialRootContext.root}" (${initialRootContext.meaning}) kèm bài đọc 150-250 từ chia thành nhiều đoạn nhỏ cho dễ học, phân tích chuyên sâu các từ và cách gợi nhớ, cách đọc, cùng bộ đề kiểm tra để ôn tập.`
      : `Gia sư hãy tạo bài học siêu trí nhớ với ${count} từ vựng mục tiêu và bài đọc 150-250 từ chia đoạn nhỏ cho chủ đề: ${initialTopic || "IELTS Academic Core"}`;

    const promptToSend = customPrompt || userPrompt || defaultPrompt;

    setIsLoading(true);
    setErrorMessage(null);
    setSelectedChallengeAnswer(null);
    setHasAnsweredChallenge(false);
    setTestAnswers({});
    setTestCompleted(false);
    stopAudio();

    // Get list of already learned words to strictly exclude
    const excludedWords = getLearnedWordsList();

    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPrompt: promptToSend,
          currentTopic: initialTopic || (initialRootContext ? `Gốc từ ${initialRootContext.root}` : "IELTS Core Academic"),
          selectedWords: initialWords.map((w) => ({ word: w.word, vietnamese: w.vietnamese })),
          macroDomain: initialMacro || (initialRootContext ? "Đại lộ Gốc từ IELTS" : "IELTS Universe"),
          targetBand: "Band 7.5 - 8.5",
          wordCount: count,
          excludedWords,
          rootContext: initialRootContext,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Yêu cầu thất bại (mã ${response.status})`);
      }

      const data: AITutorLesson = await response.json();
      setLessonData(data);

      if (data.inDepthAnalysis && data.inDepthAnalysis.length > 0) {
        setExpandedAnalysisWord(data.inDepthAnalysis[0].word);
      }

      // Save to local storage as active in-progress lesson
      const newRecord: SavedLessonRecord = {
        id: data.id || `tutor_lesson_${Date.now()}`,
        type: "tutor",
        title: data.lessonTheme || (initialRootContext ? `Gốc từ: ${initialRootContext.root} - ${initialRootContext.meaning}` : (initialTopic || "Bài học Gia sư AI")),
        topic: initialTopic || (initialRootContext ? `Gốc từ ${initialRootContext.root}` : "IELTS Core Academic"),
        macroDomain: initialMacro || (initialRootContext ? "Đại lộ Gốc từ IELTS" : "IELTS Universe"),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: "in-progress",
        wordsLearned: data.keyTargetWords.map((w) => w.word),
        totalWords: data.keyTargetWords.length,
        testScore: null,
        savedAnswers: {},
        lessonData: data,
        rootContext: initialRootContext,
      };

      saveOrUpdateLesson(newRecord);
      setCurrentLessonRecord(newRecord);
      refreshSavedLessons();
      setActiveTab("words");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Không thể kết nối đến Gia Sư AI. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  // Mark lesson completed
  const handleCompleteCurrentLesson = () => {
    if (!currentLessonRecord) return;

    // Calculate score from diverse test questions
    const questions = lessonData?.diverseTestQuestions || [];
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
      setTestCompleted(true);
      refreshSavedLessons();
    }
  };

  // Switch to a previously saved lesson
  const handleSelectSavedLesson = (rec: SavedLessonRecord) => {
    stopAudio();
    setCurrentLessonRecord(rec);
    if (rec.lessonData) {
      const tutorData = rec.lessonData as AITutorLesson;
      setLessonData(tutorData);
      if (tutorData.inDepthAnalysis && tutorData.inDepthAnalysis.length > 0) {
        setExpandedAnalysisWord(tutorData.inDepthAnalysis[0].word);
      }
    }
    setShowSavedDrawer(false);
    setErrorMessage(null);
  };

  // Pronounce single word
  const handlePronounceWord = (word: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopAudio();
    setPlayingWord(word);
    SpeechService.speak(word, {
      rate: audioSpeed,
      onEnd: () => setPlayingWord(null),
      onError: () => setPlayingWord(null),
    });
  };

  // Play a single section of the reading passage
  const handlePlaySection = (section: BiteSizedSection, e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopAudio();
    setPlayingSectionNum(section.sectionNumber);
    SpeechService.speak(section.textEn, {
      rate: audioSpeed,
      onEnd: () => setPlayingSectionNum(null),
      onError: () => setPlayingSectionNum(null),
    });
  };

  // Play full reading passage sequentially
  const handlePlayFullPassage = async () => {
    if (!lessonData?.readingPassage?.sections) return;

    if (isPlayingFull) {
      stopAudio();
      return;
    }

    audioCancelRef.current = false;
    setIsPlayingFull(true);

    const sections = lessonData.readingPassage.sections;

    for (let i = 0; i < sections.length; i++) {
      if (audioCancelRef.current) break;
      setActiveSectionIndex(i);
      setPlayingSectionNum(sections[i].sectionNumber);

      await new Promise<void>((resolve) => {
        SpeechService.speak(sections[i].textEn, {
          rate: audioSpeed,
          onEnd: () => resolve(),
          onError: () => resolve(),
        });
      });

      if (!audioCancelRef.current && i < sections.length - 1) {
        await new Promise((r) => setTimeout(r, 600));
      }
    }

    if (!audioCancelRef.current) {
      setIsPlayingFull(false);
      setActiveSectionIndex(null);
      setPlayingSectionNum(null);
    }
  };

  // Copy entire lesson
  const handleCopyLesson = () => {
    if (!lessonData) return;
    const wordsText = lessonData.keyTargetWords
      .map(
        (w, idx) =>
          `${idx + 1}. ${w.word} (${w.ipa}) [${w.partOfSpeech || "academic"}]: ${w.vietnamese}\n   - B2: ${w.b2Equivalent}\n   - Mẹo nhớ: ${w.memoryHook}\n   - Collocation: ${w.ieltsCollocation}`
      )
      .join("\n\n");

    const readingText = `=== BÀI ĐỌC HỌC THUẬT (~150 TỪ) ===\n${lessonData.readingPassage.title}\n\n${lessonData.readingPassage.fullTextEn}\n\n(Bản dịch: ${lessonData.readingPassage.fullTextVi})`;

    const full = `=== ${lessonData.lessonTheme} ===\nLời chào gia sư: ${lessonData.tutorGreeting}\n\n${wordsText}\n\n${readingText}\n\nLời dặn: ${lessonData.tutorAdvice}`;
    navigator.clipboard?.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border-2 border-[#0F172A] shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden">
        {/* Header with Tutor Banner & Status Indicator */}
        <div className="bg-[#0F172A] px-5 py-3.5 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-lg border border-blue-400/40 shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-sans font-black text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                  GIA SƯ AI LUYỆN TỪ VỰNG IELTS
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
                Bài học 10-15 từ mới • Bài đọc 150 từ • Phân tích chuyên sâu • Bài test đa dạng
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Drawer toggle for saved lessons */}
            <button
              onClick={() => setShowSavedDrawer(!showSavedDrawer)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-700 flex items-center gap-1.5"
              title="Xem danh sách các bài học đã lưu"
            >
              <History className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Bài Đã Lưu ({savedLessonsList.length})</span>
            </button>

            {currentLessonRecord && (
              <button
                onClick={() => downloadSingleLessonJSON(currentLessonRecord)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
                title="Tải file lưu trữ bài học này (.JSON) về máy tính"
              >
                <Download className="w-4 h-4 text-sky-400" />
              </button>
            )}

            {lessonData && (
              <button
                onClick={handleCopyLesson}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
                title="Sao chép toàn bộ bài học"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Saved Lessons Drawer (Overlaid when opened) */}
        {showSavedDrawer && (
          <div className="bg-slate-900 border-b border-slate-800 p-4 animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-sky-400" />
                <h4 className="text-sm font-black">DANH SÁCH BÀI HỌC GIA SƯ AI ĐÃ LƯU</h4>
              </div>
              <button
                onClick={() => setShowSavedDrawer(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
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
                        ? "bg-blue-900/60 border-blue-400 text-white"
                        : "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-black line-clamp-1">{rec.title}</span>
                      <span
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          rec.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {rec.status === "completed" ? "Đã xong" : "Đang học"}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">
                      {rec.wordsLearned?.length || 0} từ: {rec.wordsLearned?.slice(0, 3).join(", ")}...
                    </div>
                    {rec.testScore && (
                      <div className="text-[10px] text-emerald-400 font-mono mt-1">
                        Điểm test: {rec.testScore.correctAnswers}/{rec.testScore.totalQuestions} ({rec.testScore.percentage}%)
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Sequential Unlocking Notice Bar if current lesson is in-progress */}
        {currentLessonRecord && currentLessonRecord.status === "in-progress" && (
          <div className="bg-amber-500/10 border-b border-amber-500/30 px-5 py-2.5 flex items-center justify-between gap-3 text-amber-900 text-xs shrink-0">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Bài học đang diễn ra:</strong> "{currentLessonRecord.title}". Bạn chỉ có thể tạo bài học tiếp theo với từ mới sau khi hoàn thành bài học hiện tại.
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
          {/* Request Input & Word Count Selector Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3.5">
            {/* Root Context Banner if learning by Root */}
            {initialRootContext && (
              <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border border-blue-500/40 rounded-xl p-3 sm:p-3.5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-amber-400 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-400/30 font-mono">
                        Đại Lộ Gốc Từ • Trục {initialRootContext.trunkNumber || 1}
                      </span>
                      <span className="text-xs font-bold text-amber-300">
                        {initialRootContext.category || initialRootContext.trunkTitle}
                      </span>
                    </div>
                    <div className="text-sm font-black text-white mt-0.5">
                      Gốc: <span className="text-amber-400">{initialRootContext.root}</span> ({initialRootContext.meaning})
                      {initialRootContext.origin && <span className="text-xs text-slate-300 font-normal ml-2">• Nguồn gốc: {initialRootContext.origin}</span>}
                    </div>
                    {initialRootContext.tip && (
                      <p className="text-xs text-slate-300 mt-0.5 italic">
                        💡 Mẹo nhớ gốc: {initialRootContext.tip}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-[11px] text-sky-300 bg-blue-950/80 border border-blue-800/60 px-2.5 py-1.5 rounded-lg shrink-0 text-center font-mono font-bold">
                  🎯 10-15 TỪ GỐC • ĐỌC 150-250 TỪ • TEST ÔN TẬP
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-blue-700">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Cấu hình bài học Gia Sư AI (10 - 15 từ vựng mới):
              </span>
              {initialTopic && (
                <span className="text-slate-500 font-normal">
                  Chủ đề: <strong className="text-slate-800">{initialTopic}</strong>
                </span>
              )}
            </div>

            {/* Word Count Selector (10 to 15 words) */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">
                  Số lượng từ mới mỗi lần học:
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-black text-xs">
                  {targetWordCount} TỪ MỤC TIÊU
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {[10, 12, 15].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setTargetWordCount(cnt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      targetWordCount === cnt
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cnt} từ
                  </button>
                ))}
                <span className="text-[11px] text-slate-400 font-medium ml-1">
                  (Từ 10 - 15 từ học thuật)
                </span>
              </div>
            </div>

            {/* Prompt input and submit */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={`Ví dụ: 'Tạo bài học ${targetWordCount} từ mới chủ đề ${initialTopic || "Môi trường"} kèm bài đọc 150 từ chia đoạn và đối chiếu từ B2'..."`}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isLoading) handleGenerateLesson();
                }}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleGenerateLesson()}
                disabled={isLoading}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50 transition-all shrink-0"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Gia sư đang soạn...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Tạo bài học mới</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Prompt Presets */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Gợi ý nhanh:
              </span>
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUserPrompt(p.prompt);
                    setTargetWordCount(p.words);
                    handleGenerateLesson(p.prompt, p.words);
                  }}
                  disabled={isLoading}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-blue-500/30 mx-auto flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-800">
                  Gia Sư AI đang tuyển chọn từ mới & thiết kế bài giảng...
                </h4>
                <p className="text-xs text-slate-500 max-w-lg mx-auto">
                  Đang lọc từ mới (loại trừ các từ đã học), tạo bài đọc 150 từ chia đoạn song ngữ, phân tích hình thái học chuyên sâu và bộ bài test 5 dạng đa dạng.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-xs sm:text-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
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
          {lessonData && !isLoading && (
            <div className="space-y-6">
              {/* Tutor Greeting & Theme Box with Complete Button */}
              <div className="bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-2xl p-5 text-white shadow-md border-l-4 border-l-[#2563EB] flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-blue-400" />
                      Chủ Đề Giảng Dạy:
                    </span>
                    <span className="text-xs font-bold text-slate-200">{lessonData.lessonTheme}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold">
                      {lessonData.keyTargetWords.length} TỪ MỤC TIÊU
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans italic">
                    "{lessonData.tutorGreeting}"
                  </p>
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

              {/* Full Lesson Audio Player Bar */}
              <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-xl border border-blue-700/50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-sky-400">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-sky-300 font-mono">
                        PHẦN NGHE TOÀN BỘ BÀI HỌC (AUDIO BẢN XỨ)
                      </span>
                      {isPlayingFull && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-bold text-white uppercase animate-pulse">
                          Đang phát
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 font-medium">
                      Nghe bài đọc 150 từ chia đoạn bite-sized với tốc độ tùy chỉnh và highlight thời gian thực.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700 text-xs">
                    <span className="text-slate-400 font-bold px-2">Tốc độ:</span>
                    {[0.75, 1.0, 1.25].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => {
                          setAudioSpeed(rate);
                          if (isPlayingFull) stopAudio();
                        }}
                        className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          audioSpeed === rate ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handlePlayFullPassage}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                      isPlayingFull
                        ? "bg-red-600 hover:bg-red-500 text-white"
                        : "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white"
                    }`}
                  >
                    {isPlayingFull ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Dừng nghe</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white" />
                        <span>Nghe toàn bộ bài đọc</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Navigation Tabs for Lesson Modules */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-thin">
                <button
                  onClick={() => setActiveTab("words")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "words"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Từ Vựng ({lessonData.keyTargetWords.length} Từ)</span>
                </button>

                <button
                  onClick={() => setActiveTab("reading")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "reading"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Bài Đọc 150 Từ (Bite-sized)</span>
                </button>

                <button
                  onClick={() => setActiveTab("analysis")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "analysis"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span>Phân Tích Chuyên Sâu ({lessonData.inDepthAnalysis?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTab("diverse_test")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "diverse_test"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Bài Test Đa Dạng ({lessonData.diverseTestQuestions?.length || 0} Câu)</span>
                </button>

                <button
                  onClick={() => setActiveTab("upgrades")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "upgrades"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Zap className="w-4 h-4 text-emerald-500" />
                  <span>Nâng Cấp B2 ➔ C1</span>
                </button>
              </div>

              {/* TAB 1: KEY TARGET WORDS */}
              {activeTab === "words" && (
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      DANH SÁCH {lessonData.keyTargetWords.length} TỪ VỰNG MỤC TIÊU C1/C2
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      Nhấn vào loa để nghe phát âm IPA
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lessonData.keyTargetWords.map((word, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 hover:border-blue-400 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-mono font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="text-base font-black text-slate-900">{word.word}</span>
                            {word.partOfSpeech && (
                              <span className="px-1.5 py-0.5 rounded bg-slate-200 text-[10px] font-mono font-bold text-slate-700">
                                {word.partOfSpeech}
                              </span>
                            )}
                            <span className="text-xs font-mono font-bold text-slate-500">
                              {word.ipa}
                            </span>
                            <span className="text-[11px] font-sans text-amber-800 bg-amber-100/80 border border-amber-300/60 px-1.5 py-0.5 rounded font-medium">
                              Đọc: <strong>{getWordPronunciation(word.word, word.ipa).guide}</strong>
                            </span>
                          </div>
                          <button
                            onClick={(e) => handlePronounceWord(word.word, e)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              playingWord === word.word
                                ? "bg-blue-600 text-white animate-pulse"
                                : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                            }`}
                            title="Nghe phát âm bản xứ"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-xs font-bold text-slate-800">
                          {word.vietnamese}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 font-bold text-amber-900 shrink-0">
                            B2 Đối ứng:
                          </span>
                          <span className="font-semibold text-slate-700 line-clamp-1">{word.b2Equivalent}</span>
                        </div>

                        <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-950 font-medium leading-relaxed">
                          <strong className="text-amber-900 block font-bold mb-0.5">
                            💡 Cách gợi nhớ siêu tốc (Memory Hook):
                          </strong>
                          {word.memoryHook}
                        </div>

                        <div className="text-[11px] text-slate-600">
                          <strong className="text-slate-800">IELTS Collocation: </strong>
                          <span className="font-mono font-semibold text-blue-700">{word.ieltsCollocation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: READING PASSAGE (150 - 250 WORDS) IN BITE-SIZED SECTIONS */}
              {activeTab === "reading" && lessonData.readingPassage && (
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 font-mono">
                          BÀI ĐỌC HỌC THUẬT IELTS CHUẨN (150 - 250 TỪ)
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                          {lessonData.readingPassage.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Chia thành {lessonData.readingPassage.sections.length} đoạn nhỏ dễ học kèm đối chiếu song ngữ & audio bản xứ.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold">
                        {lessonData.readingPassage.totalWordCount} TỪ
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-mono font-bold">
                        {lessonData.readingPassage.sections.length} PHẦN NHỎ
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {lessonData.readingPassage.sections.map((sec, sIdx) => {
                      const isActiveSection = activeSectionIndex === sIdx || playingSectionNum === sec.sectionNumber;
                      return (
                        <div
                          key={sIdx}
                          className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                            isActiveSection
                              ? "border-blue-500 bg-blue-50/40 ring-2 ring-blue-400/40 shadow-md"
                              : "border-slate-200 bg-slate-50/70 hover:border-slate-300"
                          }`}
                        >
                          <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                                {sec.sectionNumber}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-slate-900">
                                {sec.sectionTitle}
                              </span>
                            </div>

                            <button
                              onClick={(e) => handlePlaySection(sec, e)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                playingSectionNum === sec.sectionNumber
                                  ? "bg-red-100 text-red-700 border border-red-300"
                                  : "bg-blue-100/70 hover:bg-blue-200 text-blue-700 border border-blue-200"
                              }`}
                              title="Nghe riêng phần này"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>{playingSectionNum === sec.sectionNumber ? "Đang phát..." : "Nghe đoạn này"}</span>
                            </button>
                          </div>

                          <div className="p-4 space-y-3">
                            <div className="text-sm sm:text-base font-serif leading-relaxed text-slate-900 bg-white p-4 rounded-xl border border-slate-200 shadow-inner">
                              {sec.textEn}
                            </div>

                            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans bg-slate-100/80 p-3 rounded-xl border border-slate-200">
                              <span className="font-bold text-slate-900 mr-1.5">Bản dịch song ngữ:</span>
                              {sec.textVi}
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                  Từ vựng trong đoạn:
                                </span>
                                {sec.keyWordsInSection.map((kw, kwIdx) => (
                                  <button
                                    key={kwIdx}
                                    onClick={(e) => handlePronounceWord(kw, e)}
                                    className="px-2 py-0.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold font-mono transition-colors cursor-pointer border border-amber-300 flex items-center gap-1"
                                    title="Nhấn để nghe phát âm"
                                  >
                                    <span>{kw}</span>
                                    <Volume2 className="w-2.5 h-2.5 opacity-60" />
                                  </button>
                                ))}
                              </div>

                              {sec.keyStructures && (
                                <div className="text-[11px] text-indigo-700 font-medium italic">
                                  💡 {sec.keyStructures}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
                      Bóc tách gốc từ Latin/Hy Lạp, gia đình từ (Word Family), cạm bẫy phòng thi IELTS và khuôn mẫu câu thực chiến Writing & Speaking.
                    </p>
                  </div>

                  {(!lessonData.inDepthAnalysis || lessonData.inDepthAnalysis.length === 0) ? (
                    <div className="bg-white rounded-2xl p-6 text-center text-xs text-slate-500 border border-slate-200">
                      Chưa có dữ liệu phân tích chuyên sâu cho bài học này.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {lessonData.inDepthAnalysis.map((item, idx) => {
                        const isExpanded = expandedAnalysisWord === item.word;
                        return (
                          <div
                            key={idx}
                            className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm transition-all"
                          >
                            {/* Word Header Accordion */}
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
                                  onClick={(e) => handlePronounceWord(item.word, e)}
                                  className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
                                  title="Nghe phát âm"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                                {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                              </div>
                            </div>

                            {/* Expanded Detailed Analysis */}
                            {isExpanded && (
                              <div className="p-5 border-t border-slate-200 space-y-4 bg-white">
                                {/* Morphology & Etymology Root */}
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
                                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Gốc từ then chốt:</span>
                                      <span className="font-mono font-black text-blue-700">{item.morphology.root}</span>
                                    </div>
                                    <div className="bg-white p-2.5 rounded-lg border border-purple-100">
                                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Ý niệm gốc:</span>
                                      <span className="font-medium text-slate-800">{item.morphology.rootMeaning}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Word Family */}
                                {item.wordFamily && (
                                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                                    <span className="text-xs font-black uppercase text-slate-700 font-mono flex items-center gap-1.5">
                                      🌿 Gia Đình Từ (Word Family)
                                    </span>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Danh từ (Noun):</span>
                                        <span className="font-mono font-bold text-slate-800 block">{item.wordFamily.noun || "—"}</span>
                                      </div>
                                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Động từ (Verb):</span>
                                        <span className="font-mono font-bold text-slate-800 block">{item.wordFamily.verb || "—"}</span>
                                      </div>
                                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Tính từ (Adj):</span>
                                        <span className="font-mono font-bold text-slate-800 block">{item.wordFamily.adj || "—"}</span>
                                      </div>
                                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Trạng từ (Adv):</span>
                                        <span className="font-mono font-bold text-slate-800 block">{item.wordFamily.adv || "—"}</span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Academic Register & B2 Contrast */}
                                <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 space-y-2">
                                  <span className="text-xs font-black uppercase text-blue-900 font-mono flex items-center gap-1.5">
                                    ⚡ Sắc Thái Học Thuật & Nâng Chuẩn Lexical Resource
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                                    <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                                      <span className="text-slate-400 font-bold block text-[10px] uppercase">So sánh với B2:</span>
                                      <span className="text-slate-800">{item.academicRegister.b2Contrast}</span>
                                    </div>
                                    <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Lý do tăng Band 7.5+:</span>
                                      <span className="text-emerald-700 font-semibold">{item.academicRegister.bandLiftReason}</span>
                                    </div>
                                    <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Sắc thái tinh tế:</span>
                                      <span className="text-slate-800">{item.academicRegister.nuance}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Exam Pitfalls */}
                                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-2">
                                  <span className="text-xs font-black uppercase text-amber-950 font-mono flex items-center gap-1.5">
                                    ⚠️ Cạm Bẫy Phòng Thi IELTS Cần Tránh
                                  </span>
                                  <div className="space-y-1.5 text-xs text-amber-900">
                                    <div><strong>Bẫy nghe (Listening Trap):</strong> {item.examPitfalls.listeningTrap}</div>
                                    <div><strong>Lỗi chính tả/ngữ pháp:</strong> {item.examPitfalls.spellingOrGrammar}</div>
                                    <div><strong>Quy tắc Collocation:</strong> <span className="font-mono text-blue-800 font-semibold">{item.examPitfalls.collocationRule}</span></div>
                                  </div>
                                </div>

                                {/* Sentence Frames */}
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
                        Bao gồm trắc nghiệm ngữ cảnh, nâng cấp Paraphrase, độ chính xác Collocation, tìm lỗi sai và phản xạ định nghĩa.
                      </p>
                    </div>

                    {/* Test score badge */}
                    {Object.keys(testAnswers).length > 0 && (
                      <div className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white font-mono font-black text-xs">
                        Đã làm: {Object.keys(testAnswers).length} / {lessonData.diverseTestQuestions?.length || 5}
                      </div>
                    )}
                  </div>

                  {(!lessonData.diverseTestQuestions || lessonData.diverseTestQuestions.length === 0) ? (
                    <div className="bg-white rounded-2xl p-6 text-center text-xs text-slate-500 border border-slate-200">
                      Chưa có câu hỏi test đa dạng cho bài học này.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {lessonData.diverseTestQuestions.map((q, qIdx) => {
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
                                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold font-mono">
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

                            {/* Explanation Box */}
                            {isAnswered && (
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5 text-xs text-slate-800 animate-in fade-in duration-200">
                                <div>
                                  <strong className="text-blue-700">Lời giải chi tiết: </strong>
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

                      {/* Complete Lesson Call-to-action button */}
                      <div className="bg-white rounded-2xl p-5 border-2 border-emerald-500 shadow-md text-center space-y-3">
                        <h4 className="text-sm font-black text-slate-900">
                          {Object.keys(testAnswers).length === (lessonData.diverseTestQuestions?.length || 5)
                            ? "🎉 Bạn đã hoàn thành toàn bộ câu hỏi bài test!"
                            : `Bạn đã trả lời ${Object.keys(testAnswers).length}/${lessonData.diverseTestQuestions?.length || 5} câu hỏi.`}
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

              {/* TAB 5: B2 TO C1 UPGRADES & DIGITAL CROSS-LINKS */}
              {activeTab === "upgrades" && (
                <div className="space-y-6">
                  {/* B2 to C1 Upgrade Table */}
                  {lessonData.b2ToC1Upgrades && lessonData.b2ToC1Upgrades.length > 0 && (
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        BẢNG CHUYỂN ĐỔI TỪ B2 SANG HỌC THUẬT C1/C2 (LEXICAL UPGRADES)
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                              <th className="py-2.5 px-3">Từ B2 Hay Dùng</th>
                              <th className="py-2.5 px-3">Nghĩa Tiếng Việt</th>
                              <th className="py-2.5 px-3 text-blue-700">Nâng Cấp C1/C2</th>
                              <th className="py-2.5 px-3">Ứng Dụng Ngữ Cảnh</th>
                              <th className="py-2.5 px-3">Hiệu Quả Band Điểm</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {lessonData.b2ToC1Upgrades.map((item, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="py-2.5 px-3 font-bold text-slate-800">{item.b2Word}</td>
                                <td className="py-2.5 px-3 text-slate-600">{item.b2Meaning}</td>
                                <td className="py-2.5 px-3 font-black text-blue-700">{item.c1Upgrade}</td>
                                <td className="py-2.5 px-3 text-slate-700">{item.contextUsage}</td>
                                <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">
                                  {item.bandImpact}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Digital Cross-Links */}
                  {lessonData.digitalCrossLinks && lessonData.digitalCrossLinks.length > 0 && (
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                        <GitMerge className="w-4 h-4 text-indigo-600" />
                        LIÊN KẾT NỘI DUNG SỐ XUYÊN SUỐT (CROSS-LINKS)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {lessonData.digitalCrossLinks.map((link, idx) => (
                          <div
                            key={idx}
                            className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-indigo-900">{link.title}</span>
                              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-[10px] font-mono font-bold text-indigo-700">
                                {link.type.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-xs text-indigo-950/80 leading-relaxed">{link.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tutor Strategy Advice */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
                        LỜI DẶN CHIẾN LƯỢC CỦA GIA SƯ AI:
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {lessonData.tutorAdvice}
                      </p>
                    </div>

                    {lessonData.suggestedFollowUps && lessonData.suggestedFollowUps.length > 0 && (
                      <div className="pt-3 border-t border-slate-800 space-y-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Hỏi tiếp gia sư:
                        </span>
                        <div className="flex items-center gap-2 flex-wrap">
                          {lessonData.suggestedFollowUps.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setUserPrompt(q);
                                handleGenerateLesson(q);
                              }}
                              disabled={isLoading}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-900/60 hover:text-sky-300 text-xs text-slate-300 border border-slate-700 transition-colors cursor-pointer text-left"
                            >
                              💬 {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Initial Welcome Screen when no lesson yet */}
          {!lessonData && !isLoading && !errorMessage && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white flex items-center justify-center mx-auto shadow-md">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Chào bạn! Tôi là Gia Sư AI Luyện Từ Vựng IELTS.
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Tôi có thể tạo bài học linh hoạt từ <strong>10 đến 15 từ mới mỗi buổi</strong>, tích hợp <strong>bài đọc học thuật 150 từ chia đoạn nhỏ song ngữ</strong>, <strong>phân tích hình thái học chuyên sâu</strong> và <strong>bộ bài test đa dạng 5 dạng câu hỏi</strong>!
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleGenerateLesson()}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  🚀 Tạo ngay bài học ({targetWordCount} từ mới)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
