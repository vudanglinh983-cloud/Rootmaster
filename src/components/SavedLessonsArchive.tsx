import React, { useState, useEffect, useMemo, useRef } from "react";
import { SavedLessonRecord, TopicWord, AITopicLesson, AITutorLesson, BiteSizedSection } from "../types";
import {
  getAllSavedLessons,
  deleteSavedLesson,
  toggleLessonBookmark,
  updateLessonNotes,
  resetLessonTest,
  recordLessonReview,
  exportLessonsToJSONFile,
  downloadSingleLessonJSON,
  importLessonsFromJSONFile,
  exportLessonsAsStudyMarkdown,
  markLessonCompleted
} from "../lib/lessonStorage";
import { SpeechService, getWordPronunciation } from "../lib/speechSynthesis";
import {
  BookmarkCheck,
  Download,
  Upload,
  FileText,
  Search,
  Filter,
  Trash2,
  RefreshCw,
  Play,
  RotateCcw,
  CheckCircle2,
  Lock,
  Star,
  BookOpen,
  GraduationCap,
  Sparkles,
  Volume2,
  VolumeX,
  Headphones,
  Pause,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Copy,
  Check,
  FileJson,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";

interface SavedLessonsArchiveProps {
  onOpenAiLesson?: (topic?: string, words?: TopicWord[], macro?: string) => void;
  onOpenAiTutor?: (topic?: string, words?: TopicWord[], macro?: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const SavedLessonsArchive: React.FC<SavedLessonsArchiveProps> = ({
  onOpenAiLesson,
  onOpenAiTutor,
  onNavigateTab,
}) => {
  const [lessons, setLessons] = useState<SavedLessonRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<"all" | "topic_lesson" | "tutor">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "in-progress" | "bookmarked">("all");

  // Selected lesson for in-depth Review & Re-study mode
  const [reviewingLesson, setReviewingLesson] = useState<SavedLessonRecord | null>(null);
  const [reviewTab, setReviewTab] = useState<"vocab" | "reading" | "analysis" | "test" | "notes">("vocab");

  // Interactive Test State in Review Mode
  const [activeTestAnswers, setActiveTestAnswers] = useState<Record<string, string>>({});
  const [testResult, setTestResult] = useState<{ score: number; total: number; passed: boolean } | null>(null);

  // Audio Speech state
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [isPlayingReadingFull, setIsPlayingReadingFull] = useState<boolean>(false);
  const [playingReadingSection, setPlayingReadingSection] = useState<number | string | null>(null);
  const [readingAudioSpeed, setReadingAudioSpeed] = useState<number>(1.0);
  const readingCancelRef = useRef<boolean>(false);

  const stopReadingAudio = () => {
    readingCancelRef.current = true;
    SpeechService.stop();
    setIsPlayingReadingFull(false);
    setPlayingReadingSection(null);
    setPlayingWord(null);
  };

  // Feedback notifications
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Notes editing state
  const [editingNotes, setEditingNotes] = useState<string>("");
  const [isSavingNotes, setIsSavingNotes] = useState<boolean>(false);
  const [copiedLesson, setCopiedLesson] = useState<boolean>(false);
  const [showViTranslation, setShowViTranslation] = useState<boolean>(true);

  // Hidden file input for importing JSON
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadLessons = () => {
    const list = getAllSavedLessons();
    setLessons(list);
  };

  useEffect(() => {
    loadLessons();
    return () => {
      stopReadingAudio();
    };
  }, []);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotice({ type, message });
    setTimeout(() => {
      setNotice(null);
    }, 3500);
  };

  // Play audio pronunciation for single word
  const handlePronounce = (word: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopReadingAudio();
    setPlayingWord(word);
    SpeechService.speak(word, {
      rate: 0.9,
      onEnd: () => setPlayingWord(null),
      onError: () => setPlayingWord(null),
    });
  };

  // Play full passage for Tutor Lesson sequentially
  const handlePlayFullTutorPassage = async (readingPassage: any) => {
    if (isPlayingReadingFull) {
      stopReadingAudio();
      return;
    }
    stopReadingAudio();
    readingCancelRef.current = false;
    setIsPlayingReadingFull(true);

    if (readingPassage?.sections && readingPassage.sections.length > 0) {
      for (let i = 0; i < readingPassage.sections.length; i++) {
        if (readingCancelRef.current) break;
        const sec = readingPassage.sections[i];
        setPlayingReadingSection(sec.sectionNumber);
        await new Promise<void>((resolve) => {
          SpeechService.speak(sec.textEn, {
            rate: readingAudioSpeed,
            onEnd: () => resolve(),
            onError: () => resolve(),
          });
        });
        if (!readingCancelRef.current && i < readingPassage.sections.length - 1) {
          await new Promise((r) => setTimeout(r, 600));
        }
      }
    } else if (readingPassage?.fullTextEn) {
      setPlayingReadingSection("full");
      await new Promise<void>((resolve) => {
        SpeechService.speak(readingPassage.fullTextEn, {
          rate: readingAudioSpeed,
          onEnd: () => resolve(),
          onError: () => resolve(),
        });
      });
    }

    if (!readingCancelRef.current) {
      setIsPlayingReadingFull(false);
      setPlayingReadingSection(null);
    }
  };

  // Play single section of the reading passage
  const handlePlaySingleSection = (textEn: string, sectionId: number | string) => {
    if (playingReadingSection === sectionId) {
      stopReadingAudio();
      return;
    }
    stopReadingAudio();
    readingCancelRef.current = false;
    setPlayingReadingSection(sectionId);
    SpeechService.speak(textEn, {
      rate: readingAudioSpeed,
      onEnd: () => {
        if (!readingCancelRef.current) setPlayingReadingSection(null);
      },
      onError: () => {
        if (!readingCancelRef.current) setPlayingReadingSection(null);
      },
    });
  };

  // Play full story for Topic Lesson
  const handlePlayTopicNarrative = (narrativeText: string) => {
    if (isPlayingReadingFull || playingReadingSection === "topic_story") {
      stopReadingAudio();
      return;
    }
    stopReadingAudio();
    readingCancelRef.current = false;
    setIsPlayingReadingFull(true);
    setPlayingReadingSection("topic_story");
    SpeechService.speak(narrativeText, {
      rate: readingAudioSpeed,
      onEnd: () => {
        if (!readingCancelRef.current) {
          setIsPlayingReadingFull(false);
          setPlayingReadingSection(null);
        }
      },
      onError: () => {
        if (!readingCancelRef.current) {
          setIsPlayingReadingFull(false);
          setPlayingReadingSection(null);
        }
      },
    });
  };

  // Filtering lessons
  const filteredLessons = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return lessons.filter((l) => {
      // Type filter
      if (typeFilter !== "all" && l.type !== typeFilter) return false;

      // Status filter
      if (statusFilter === "completed" && l.status !== "completed") return false;
      if (statusFilter === "in-progress" && l.status !== "in-progress") return false;
      if (statusFilter === "bookmarked" && !l.isBookmarked) return false;

      // Search query
      if (q) {
        const inTitle = l.title?.toLowerCase().includes(q);
        const inTopic = l.topic?.toLowerCase().includes(q);
        const inMacro = l.macroDomain?.toLowerCase().includes(q);
        const inWords = l.wordsLearned?.some((w) => w.toLowerCase().includes(q));
        const inNotes = l.userNotes?.toLowerCase().includes(q);
        if (!inTitle && !inTopic && !inMacro && !inWords && !inNotes) return false;
      }

      return true;
    });
  }, [lessons, searchQuery, typeFilter, statusFilter]);

  // Summary statistics
  const stats = useMemo(() => {
    const total = lessons.length;
    const completed = lessons.filter((l) => l.status === "completed").length;
    const inProgress = total - completed;
    const bookmarked = lessons.filter((l) => l.isBookmarked).length;

    // Unique words count across all lessons
    const wordsSet = new Set<string>();
    lessons.forEach((l) => {
      if (Array.isArray(l.wordsLearned)) {
        l.wordsLearned.forEach((w) => w && wordsSet.add(w.toLowerCase().trim()));
      }
    });

    return { total, completed, inProgress, bookmarked, totalWords: wordsSet.size };
  }, [lessons]);

  // Start Reviewing a lesson
  const handleStartReview = (lessonRecord: SavedLessonRecord) => {
    setReviewingLesson(lessonRecord);
    setReviewTab("vocab");
    setActiveTestAnswers(lessonRecord.savedAnswers || {});
    setEditingNotes(lessonRecord.userNotes || "");
    setTestResult(
      lessonRecord.testScore
        ? {
            score: lessonRecord.testScore.correctAnswers,
            total: lessonRecord.testScore.totalQuestions,
            passed: lessonRecord.testScore.passed,
          }
        : null
    );
    recordLessonReview(lessonRecord.id);
  };

  // Exit review mode
  const handleExitReview = () => {
    stopReadingAudio();
    setReviewingLesson(null);
    loadLessons();
  };

  // Bookmark toggle
  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isBookmarked = toggleLessonBookmark(id);
    loadLessons();
    if (reviewingLesson && reviewingLesson.id === id) {
      setReviewingLesson({ ...reviewingLesson, isBookmarked });
    }
  };

  // Delete a lesson
  const handleDelete = (id: string, title: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (window.confirm(`Bạn có chắc muốn xóa bài học "${title}" khỏi danh sách lưu trữ?`)) {
      deleteSavedLesson(id);
      loadLessons();
      if (reviewingLesson?.id === id) {
        setReviewingLesson(null);
      }
      showNotification("success", `Đã xóa bài học "${title}" thành công.`);
    }
  };

  // Reset quiz to retake test
  const handleResetQuiz = () => {
    if (!reviewingLesson) return;
    const updated = resetLessonTest(reviewingLesson.id);
    if (updated) {
      setReviewingLesson({ ...updated });
      setActiveTestAnswers({});
      setTestResult(null);
      loadLessons();
      showNotification("success", "Đã đặt lại bài kiểm tra! Bạn có thể làm lại bài test.");
    }
  };

  // Save personal notes
  const handleSaveNotes = () => {
    if (!reviewingLesson) return;
    setIsSavingNotes(true);
    updateLessonNotes(reviewingLesson.id, editingNotes);
    setReviewingLesson({ ...reviewingLesson, userNotes: editingNotes });
    loadLessons();
    setTimeout(() => {
      setIsSavingNotes(false);
      showNotification("success", "Đã lưu ghi chú học tập cá nhân.");
    }, 300);
  };

  // Submit test answers in review mode
  const handleSubmitTest = () => {
    if (!reviewingLesson || !reviewingLesson.lessonData) return;
    const questions = reviewingLesson.lessonData.diverseTestQuestions || [];
    if (questions.length === 0) return;

    let correct = 0;
    questions.forEach((q) => {
      if (activeTestAnswers[q.id] === q.answer) correct++;
    });

    const total = questions.length;
    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= 50;

    const scoreObj = {
      totalQuestions: total,
      correctAnswers: correct,
      percentage,
      passed,
    };

    const updated = markLessonCompleted(reviewingLesson.id, scoreObj);
    if (updated) {
      // Save current answers too
      updated.savedAnswers = activeTestAnswers;
      setReviewingLesson({ ...updated });
      setTestResult({ score: correct, total, passed });
      loadLessons();
      showNotification("success", `Đã chấm điểm: ${correct}/${total} câu (${percentage}%).`);
    }
  };

  // Export JSON file
  const handleExportJSON = () => {
    try {
      if (lessons.length === 0) {
        showNotification("error", "Chưa có bài học nào được lưu để xuất file.");
        return;
      }
      exportLessonsToJSONFile(`ielts_learned_lessons_${new Date().toISOString().split("T")[0]}.json`);
      showNotification("success", "Đã xuất file lưu trữ bài học .JSON về máy của bạn!");
    } catch (err: any) {
      showNotification("error", err?.message || "Lỗi khi xuất file JSON.");
    }
  };

  // Export Markdown Study Sheet
  const handleExportMarkdown = () => {
    try {
      if (lessons.length === 0) {
        showNotification("error", "Chưa có bài học nào được lưu để xuất tài liệu.");
        return;
      }
      exportLessonsAsStudyMarkdown();
      showNotification("success", "Đã tải tài liệu ôn tập định dạng Markdown (.md)!");
    } catch (err: any) {
      showNotification("error", err?.message || "Lỗi khi xuất tài liệu ôn tập.");
    }
  };

  // Handle File Input selection for JSON import
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const content = evt.target?.result as string;
        const result = importLessonsFromJSONFile(content, "merge");
        if (result.success) {
          loadLessons();
          showNotification("success", `Đã nhập thành công ${result.count} bài học vào kho lưu trữ!`);
        } else {
          showNotification("error", result.error || "Không thể nhập bài học từ file này.");
        }
      } catch (err: any) {
        showNotification("error", err?.message || "Lỗi đọc file JSON.");
      }
    };
    reader.readAsText(file);
    // Reset file input value
    e.target.value = "";
  };

  // Copy lesson summary to clipboard
  const handleCopyReviewLesson = () => {
    if (!reviewingLesson) return;
    const text = `=== ${reviewingLesson.title} ===
Chủ đề: ${reviewingLesson.topic} (${reviewingLesson.macroDomain || "Chủ đề vĩ mô"})
Trạng thái: ${reviewingLesson.status === "completed" ? "Đã hoàn thành" : "Đang học"}
Từ vựng: ${reviewingLesson.wordsLearned?.join(", ")}
${reviewingLesson.userNotes ? `\nGhi chú: ${reviewingLesson.userNotes}` : ""}`;

    navigator.clipboard?.writeText(text);
    setCopiedLesson(true);
    setTimeout(() => setCopiedLesson(false), 2000);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Hidden File Input for Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,application/json"
        className="hidden"
      />

      {/* Floating Notification */}
      {notice && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-bold transition-all border ${
            notice.type === "success"
              ? "bg-emerald-900 text-emerald-100 border-emerald-700"
              : "bg-rose-900 text-rose-100 border-rose-700"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{notice.message}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP HEADER & REPOSITORY FILE ACTIONS */}
      {/* ========================================================================= */}
      <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-md font-black">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0F172A] tracking-tight">
                  KHO BÀI HỌC ĐÃ LƯU & ÔN TẬP
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Lưu trữ các bài học AI đã hoàn thành, ôn tập lại bài cũ, làm lại bài test và xuất file lưu trữ độc lập.
                </p>
              </div>
            </div>
          </div>

          {/* Export & Import File Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
              title="Xuất toàn bộ bài đã học ra file JSON để sao lưu dự phòng trên máy tính"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Xuất File .JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black transition-all cursor-pointer shadow-sm flex items-center gap-1.5 border border-slate-700"
              title="Nhập lại bài học từ file JSON lưu trữ trước đó"
            >
              <Upload className="w-4 h-4 text-blue-400" />
              <span>Nhập File .JSON</span>
            </button>

            <button
              onClick={handleExportMarkdown}
              className="px-3 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              title="Tải tài liệu tổng hợp từ vựng và câu chuyện định dạng Markdown để in hoặc đọc offline"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Tải Cẩm Nang .MD</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-gray-100">
          <div className="bg-slate-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 font-mono">{stats.total}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tổng bài đã lưu</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 font-mono">{stats.totalWords}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Từ vựng đã nạp</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 font-mono">{stats.completed}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Đã hoàn thành</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 font-mono">{stats.bookmarked}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Đã đánh dấu sao</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. IF IN REVIEW MODE: SHOW DETAILED RE-STUDY WORKSPACE */}
      {/* ========================================================================= */}
      {reviewingLesson && reviewingLesson.lessonData ? (
        <div className="bg-white border-2 border-[#0F172A] rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
          {/* Review Header Banner */}
          <div className="bg-[#0F172A] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <button
                onClick={handleExitReview}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700 flex items-center gap-1.5 text-xs font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay Lại Danh Sách</span>
              </button>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white font-mono">
                    CHẾ ĐỘ ÔN TẬP BÀI HỌC
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {reviewingLesson.macroDomain} • {reviewingLesson.topic}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                  {reviewingLesson.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => handleToggleBookmark(reviewingLesson.id, e)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  reviewingLesson.isBookmarked
                    ? "bg-amber-400 text-slate-900 border-amber-300"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                }`}
                title={reviewingLesson.isBookmarked ? "Bỏ đánh dấu sao" : "Đánh dấu sao bài học"}
              >
                <Star className={`w-4 h-4 ${reviewingLesson.isBookmarked ? "fill-slate-900" : ""}`} />
              </button>

              <button
                onClick={() => downloadSingleLessonJSON(reviewingLesson)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                title="Tải riêng file bài học này (.JSON)"
              >
                <FileJson className="w-4 h-4 text-blue-400" />
              </button>

              <button
                onClick={handleCopyReviewLesson}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                title="Sao chép nội dung bài học"
              >
                {copiedLesson ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Module Tabs Navigation */}
          <div className="bg-slate-100 border-b border-gray-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => {
                  if (reviewTab === "reading") stopReadingAudio();
                  setReviewTab("vocab");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  reviewTab === "vocab"
                    ? "bg-white text-slate-900 shadow-sm border border-gray-300"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Từ Vựng & Mẹo Nhớ ({reviewingLesson.wordsLearned?.length || 0})</span>
              </button>

              <button
                onClick={() => {
                  if (reviewTab !== "reading") stopReadingAudio();
                  setReviewTab("reading");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  reviewTab === "reading"
                    ? "bg-white text-slate-900 shadow-sm border border-gray-300 ring-1 ring-blue-500/20"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Headphones className="w-3.5 h-3.5 text-blue-600" />
                <span>Bài Đọc & Đọc Mẫu</span>
              </button>

              <button
                onClick={() => {
                  if (reviewTab === "reading") stopReadingAudio();
                  setReviewTab("analysis");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  reviewTab === "analysis"
                    ? "bg-white text-slate-900 shadow-sm border border-gray-300"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Morfology & Cạm Bẫy</span>
              </button>

              <button
                onClick={() => {
                  if (reviewTab === "reading") stopReadingAudio();
                  setReviewTab("test");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  reviewTab === "test"
                    ? "bg-white text-slate-900 shadow-sm border border-gray-300"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bài Test Kiểm Tra ({reviewingLesson.lessonData.diverseTestQuestions?.length || 0})</span>
              </button>

              <button
                onClick={() => {
                  if (reviewTab === "reading") stopReadingAudio();
                  setReviewTab("notes");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  reviewTab === "notes"
                    ? "bg-white text-slate-900 shadow-sm border border-gray-300"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-rose-500" />
                <span>Ghi Chú Cá Nhân</span>
              </button>
            </div>

            {/* Test quick reset button */}
            {reviewTab === "test" && (
              <button
                onClick={handleResetQuiz}
                className="px-3 py-1 rounded-lg text-xs font-bold text-gray-600 hover:text-slate-900 hover:bg-gray-200 flex items-center gap-1 cursor-pointer transition-colors"
                title="Xóa kết quả cũ và làm lại bài kiểm tra"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm Lại Test</span>
              </button>
            )}
          </div>

          {/* Review Tab Contents */}
          <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
            {/* 1. VOCABULARY & MNEMONICS TAB */}
            {reviewTab === "vocab" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 pb-2 border-b border-gray-100 font-medium">
                  <span>Bấm vào biểu tượng 🔊 để nghe phát âm chuẩn bản xứ.</span>
                  <span className="font-mono font-bold text-slate-700">
                    {reviewingLesson.wordsLearned?.length || 0} từ cốt lõi
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Topic Lesson Mnemonics */}
                  {reviewingLesson.type === "topic_lesson" &&
                    (reviewingLesson.lessonData as AITopicLesson).mnemonicStories?.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white border-2 border-gray-200 hover:border-blue-500 rounded-xl p-4 transition-all shadow-xs space-y-2.5"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-base font-black text-slate-900">{item.word}</span>
                              {item.ipa && (
                                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                  /{item.ipa}/
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-bold text-blue-700 mt-0.5">{item.vietnamese}</div>
                          </div>

                          <button
                            onClick={(e) => handlePronounce(item.word, e)}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${
                              playingWord === item.word
                                ? "bg-amber-100 text-amber-700 ring-2 ring-amber-400"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }`}
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Super Hook */}
                        <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-950 space-y-1">
                          <span className="font-black text-[11px] uppercase tracking-wider text-amber-800 block">
                            💡 Siêu mẹo âm thanh tương tự:
                          </span>
                          <p className="font-medium leading-relaxed">{item.superHook}</p>
                        </div>

                        {/* Collocation & Traps */}
                        <div className="text-xs space-y-1 pt-1 border-t border-gray-100">
                          <div className="flex items-baseline gap-1.5 text-gray-700">
                            <span className="font-bold text-gray-500 shrink-0">Collocation:</span>
                            <span className="font-semibold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                              {item.ieltsCollocation}
                            </span>
                          </div>
                          {item.b2Equivalent && (
                            <div className="flex items-baseline gap-1.5 text-gray-600">
                              <span className="font-bold text-amber-700 shrink-0">Nâng cấp từ B2:</span>
                              <span className="font-medium">{item.b2Equivalent}</span>
                            </div>
                          )}
                          {item.commonTrap && (
                            <div className="text-rose-700 text-[11px] font-medium">
                              ⚠️ Cạm bẫy: {item.commonTrap}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                  {/* Tutor Key Target Words */}
                  {reviewingLesson.type === "tutor" &&
                    (reviewingLesson.lessonData as AITutorLesson).keyTargetWords?.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white border-2 border-gray-200 hover:border-blue-500 rounded-xl p-4 transition-all shadow-xs space-y-2.5"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-base font-black text-slate-900">{item.word}</span>
                              {item.ipa && (
                                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                  /{item.ipa}/
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-bold text-blue-700 mt-0.5">{item.vietnamese}</div>
                          </div>

                          <button
                            onClick={(e) => handlePronounce(item.word, e)}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${
                              playingWord === item.word
                                ? "bg-amber-100 text-amber-700 ring-2 ring-amber-400"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }`}
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Memory Hook */}
                        <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-950 space-y-1">
                          <span className="font-black text-[11px] uppercase tracking-wider text-amber-800 block">
                            💡 Mẹo ghi nhớ:
                          </span>
                          <p className="font-medium leading-relaxed">{item.memoryHook}</p>
                        </div>

                        {/* Collocation & B2 Upgrade */}
                        <div className="text-xs space-y-1 pt-1 border-t border-gray-100">
                          <div className="flex items-baseline gap-1.5 text-gray-700">
                            <span className="font-bold text-gray-500 shrink-0">Collocation:</span>
                            <span className="font-semibold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                              {item.ieltsCollocation}
                            </span>
                          </div>
                          {item.b2Equivalent && (
                            <div className="flex items-baseline gap-1.5 text-gray-600">
                              <span className="font-bold text-amber-700 shrink-0">Nâng cấp từ B2:</span>
                              <span className="font-medium">{item.b2Equivalent}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 2. READING PASSAGE / CONTEXT STORY TAB WITH SAMPLE AUDIO READING */}
            {reviewTab === "reading" && (
              <div className="space-y-5">
                {/* Full Lesson Audio Player Bar */}
                <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-5 text-white shadow-xl border border-blue-800/40 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-sky-400 shrink-0">
                      <Headphones className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black uppercase tracking-wider text-sky-300 font-mono">
                          PHẦN ĐỌC MẪU BẢN XỨ (SAMPLE AUDIO READING)
                        </span>
                        {isPlayingReadingFull && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-[10px] font-mono font-bold text-white uppercase animate-pulse flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            Đang đọc mẫu toàn bài
                          </span>
                        )}
                        {playingReadingSection !== null && !isPlayingReadingFull && (
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-[10px] font-mono font-bold text-white uppercase animate-pulse">
                            Đang phát đoạn {playingReadingSection}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 font-medium mt-0.5">
                        Luyện nghe đọc mẫu chuẩn giọng bản xứ học thuật IELTS. Hỗ trợ điều chỉnh tốc độ và nghe theo từng đoạn bite-sized.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Speed Controls */}
                    <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700 text-xs">
                      <span className="text-slate-400 font-bold px-2">Tốc độ:</span>
                      {[0.75, 0.9, 1.0, 1.25].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => {
                            setReadingAudioSpeed(rate);
                            if (isPlayingReadingFull || playingReadingSection !== null) {
                              stopReadingAudio();
                            }
                          }}
                          className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                            readingAudioSpeed === rate
                              ? "bg-blue-600 text-white shadow-sm"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>

                    {/* Play / Stop Button */}
                    <button
                      onClick={() => {
                        if (reviewingLesson.type === "tutor") {
                          const tutorData = reviewingLesson.lessonData as AITutorLesson;
                          if (tutorData?.readingPassage) {
                            handlePlayFullTutorPassage(tutorData.readingPassage);
                          }
                        } else if (reviewingLesson.type === "topic_lesson") {
                          const topicData = reviewingLesson.lessonData as AITopicLesson;
                          if (topicData?.connectingNarrative?.text) {
                            handlePlayTopicNarrative(topicData.connectingNarrative.text);
                          }
                        }
                      }}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                        isPlayingReadingFull || playingReadingSection !== null
                          ? "bg-red-600 hover:bg-red-500 text-white"
                          : "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white"
                      }`}
                    >
                      {isPlayingReadingFull || playingReadingSection !== null ? (
                        <>
                          <VolumeX className="w-4 h-4" />
                          <span>Dừng đọc mẫu</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-white" />
                          <span>Nghe đọc mẫu toàn bài</span>
                        </>
                      )}
                    </button>

                    {/* Toggle Translation */}
                    <button
                      onClick={() => setShowViTranslation(!showViTranslation)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {showViTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{showViTranslation ? "Ẩn bản dịch" : "Hiện bản dịch"}</span>
                    </button>
                  </div>
                </div>

                {/* TUTOR LESSON READING PASSAGE */}
                {reviewingLesson.type === "tutor" && (() => {
                  const tutorData = reviewingLesson.lessonData as AITutorLesson;
                  const readingPassage = tutorData?.readingPassage;

                  if (!readingPassage) {
                    return (
                      <div className="bg-white rounded-2xl p-8 text-center text-xs text-gray-500 border border-gray-200">
                        Bài học này chưa có dữ liệu bài đọc văn bản.
                      </div>
                    );
                  }

                  const hasSections = readingPassage.sections && readingPassage.sections.length > 0;

                  return (
                    <div className="space-y-4">
                      {/* Reading Passage Title Header */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 font-mono">
                              BÀI ĐỌC HỌC THUẬT IELTS (~150 - 250 TỪ)
                            </span>
                            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                              {readingPassage.title}
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {hasSections
                                ? `Chia thành ${readingPassage.sections.length} đoạn nhỏ dễ học kèm audio đọc mẫu & bản dịch song ngữ.`
                                : "Bài đọc ngữ cảnh học thuật kèm audio đọc mẫu bản xứ."}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {readingPassage.totalWordCount > 0 && (
                            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold">
                              {readingPassage.totalWordCount} TỪ
                            </span>
                          )}
                          {hasSections && (
                            <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-mono font-bold">
                              {readingPassage.sections.length} ĐOẠN NHỎ
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bite-Sized Sections */}
                      {hasSections ? (
                        <div className="space-y-4">
                          {readingPassage.sections.map((sec, sIdx) => {
                            const isThisSectionPlaying = playingReadingSection === sec.sectionNumber;
                            return (
                              <div
                                key={sIdx}
                                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                  isThisSectionPlaying
                                    ? "border-blue-500 bg-blue-50/40 ring-2 ring-blue-400/50 shadow-md"
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
                                    onClick={() => handlePlaySingleSection(sec.textEn, sec.sectionNumber)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                      isThisSectionPlaying
                                        ? "bg-red-100 text-red-700 border border-red-300"
                                        : "bg-blue-100/70 hover:bg-blue-200 text-blue-700 border border-blue-200"
                                    }`}
                                    title="Nghe riêng phần đọc mẫu đoạn này"
                                  >
                                    {isThisSectionPlaying ? (
                                      <>
                                        <VolumeX className="w-3.5 h-3.5" />
                                        <span>Dừng đọc đoạn</span>
                                      </>
                                    ) : (
                                      <>
                                        <Volume2 className="w-3.5 h-3.5" />
                                        <span>Nghe đọc mẫu đoạn này</span>
                                      </>
                                    )}
                                  </button>
                                </div>

                                <div className="p-4 space-y-3">
                                  <div className="text-sm sm:text-base font-serif leading-relaxed text-slate-900 bg-white p-4 rounded-xl border border-slate-200 shadow-inner">
                                    {sec.textEn}
                                  </div>

                                  {showViTranslation && (
                                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans bg-slate-100/80 p-3 rounded-xl border border-slate-200">
                                      <span className="font-bold text-slate-900 mr-1.5">Bản dịch song ngữ:</span>
                                      {sec.textVi}
                                    </div>
                                  )}

                                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                                    {sec.keyWordsInSection && sec.keyWordsInSection.length > 0 && (
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                          Từ vựng then chốt:
                                        </span>
                                        {sec.keyWordsInSection.map((kw, kwIdx) => (
                                          <button
                                            key={kwIdx}
                                            onClick={(e) => handlePronounce(kw, e)}
                                            className="px-2 py-0.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold font-mono transition-colors cursor-pointer border border-amber-300 flex items-center gap-1"
                                            title="Nhấn để nghe phát âm"
                                          >
                                            <span>{kw}</span>
                                            <Volume2 className="w-2.5 h-2.5 opacity-60" />
                                          </button>
                                        ))}
                                      </div>
                                    )}

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
                      ) : (
                        /* Fallback Full Text */
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
                          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200">
                            {readingPassage.fullTextEn}
                          </p>

                          {showViTranslation && (
                            <div className="p-4 bg-slate-100/80 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                              <strong className="text-slate-900 block mb-1">Dịch toàn văn:</strong>
                              {readingPassage.fullTextVi}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* TOPIC LESSON CONNECTING NARRATIVE STORY */}
                {reviewingLesson.type === "topic_lesson" && (() => {
                  const topicData = reviewingLesson.lessonData as AITopicLesson;
                  const narrative = topicData?.connectingNarrative;

                  if (!narrative) {
                    return (
                      <div className="bg-white rounded-2xl p-8 text-center text-xs text-gray-500 border border-gray-200">
                        Bài học này chưa có câu chuyện ngữ cảnh.
                      </div>
                    );
                  }

                  const isPlayingStory = playingReadingSection === "topic_story";

                  return (
                    <div className="space-y-4">
                      <div
                        className={`bg-white rounded-2xl border transition-all p-5 space-y-4 shadow-sm ${
                          isPlayingStory
                            ? "border-blue-500 ring-2 ring-blue-400/50 bg-blue-50/20"
                            : "border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                          <div>
                            <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 font-mono">
                              CÂU CHUYỆN NGỮ CẢNH HỌC THUẬT
                            </span>
                            <h4 className="text-base font-black text-slate-900">
                              {narrative.title}
                            </h4>
                          </div>

                          <button
                            onClick={() => handlePlayTopicNarrative(narrative.text)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                              isPlayingStory
                                ? "bg-red-100 text-red-700 border border-red-300"
                                : "bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {isPlayingStory ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5" />
                                <span>Dừng đọc mẫu</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>Nghe đọc mẫu câu chuyện</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-200/60 font-serif leading-relaxed text-slate-900 text-sm sm:text-base whitespace-pre-line">
                          {narrative.text}
                        </div>

                        {showViTranslation && (
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                            <strong className="text-slate-900 block mb-1">Bản dịch song ngữ:</strong>
                            {narrative.translation}
                          </div>
                        )}

                        {narrative.takeawayTip && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 font-medium">
                            💡 <strong>Bài học rút ra: </strong>{narrative.takeawayTip}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Shadowing Practice Guide */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50/60 border border-blue-200/80 rounded-2xl p-4 sm:p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-blue-900 font-mono">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Phương Pháp Ôn Tập Shadowing Hiệu Quả Cùng Phần Đọc Mẫu</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs text-slate-700">
                    <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-2xs">
                      <strong className="text-blue-900 block mb-0.5">1. Nghe ngấm (Active Listening)</strong>
                      Bật đọc mẫu 1-2 lần để bắt trọn ngữ điệu (intonation), nhịp điệu (cadence) và ngắt nghỉ tự nhiên.
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-2xs">
                      <strong className="text-blue-900 block mb-0.5">2. Đọc đuổi (Shadowing)</strong>
                      Bật đọc mẫu ở tốc độ 0.9x hoặc 1.0x, đọc đuổi theo với độ trễ 0.5 - 1 giây để luyện phản xạ phát âm.
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-2xs">
                      <strong className="text-blue-900 block mb-0.5">3. Đối chiếu từ vựng</strong>
                      Bấm vào từng từ vựng then chốt trong đoạn để nghe lại cách đọc âm tiết, trọng âm và liên kết câu.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. IN-DEPTH MORPHOLOGICAL ANALYSIS TAB */}
            {reviewTab === "analysis" && (
              <div className="space-y-4">
                {reviewingLesson.lessonData.inDepthAnalysis && reviewingLesson.lessonData.inDepthAnalysis.length > 0 ? (
                  <div className="space-y-3">
                    {reviewingLesson.lessonData.inDepthAnalysis.map((item, idx) => (
                      <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-black text-blue-700">{item.word}</span>
                            {item.ipa && (
                              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                /{item.ipa}/
                              </span>
                            )}
                            <span className="text-xs font-bold text-slate-700">({item.vietnamese})</span>
                          </div>
                          <span className="text-[11px] font-mono text-gray-400 uppercase font-bold">
                            Gốc: {item.morphology.root}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="bg-slate-50 p-3 rounded-lg border border-gray-200">
                            <span className="font-bold text-slate-900 block mb-1">Cấu Trúc Hình Thái Học:</span>
                            <p className="text-gray-600">
                              Nguồn gốc: {item.morphology.origin} | Tiền tố: {item.morphology.prefix || "N/A"} | Gốc:{" "}
                              {item.morphology.root} ({item.morphology.rootMeaning}) | Hậu tố:{" "}
                              {item.morphology.suffix || "N/A"}
                            </p>
                          </div>

                          <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200">
                            <span className="font-bold text-amber-900 block mb-1">Nâng Cấp B2 ➔ C1/C2:</span>
                            <p className="text-amber-800">{item.academicRegister.bandLiftReason}</p>
                          </div>
                        </div>

                        {item.examPitfalls && (
                          <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-xs text-rose-900 space-y-1">
                            <span className="font-bold block">⚠️ Cạm bẫy phòng thi cần nhớ:</span>
                            <p>• Chính tả / Ngữ pháp: {item.examPitfalls.spellingOrGrammar}</p>
                            <p>• Quy tắc kết hợp từ: {item.examPitfalls.collocationRule}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400 text-xs">
                    Bài học này không có phần phân tích chuyên sâu mở rộng.
                  </div>
                )}
              </div>
            )}

            {/* 4. COMPREHENSIVE TEST TAB */}
            {reviewTab === "test" && (
              <div className="space-y-4">
                {/* Result header if completed */}
                {testResult && (
                  <div
                    className={`p-4 rounded-xl border flex items-center justify-between ${
                      testResult.passed
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                        : "bg-amber-50 border-amber-300 text-amber-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                          testResult.passed ? "bg-emerald-600 text-white" : "bg-amber-600 text-white"
                        }`}
                      >
                        {testResult.passed ? "✓" : "!"}
                      </div>
                      <div>
                        <div className="text-sm font-black">
                          {testResult.passed ? "Chúc mừng! Bạn đã vượt qua bài test!" : "Cần ôn luyện thêm!"}
                        </div>
                        <div className="text-xs opacity-90 font-mono">
                          Kết quả: {testResult.score}/{testResult.total} câu đúng (
                          {Math.round((testResult.score / testResult.total) * 100)}%)
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleResetQuiz}
                      className="px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Làm lại ngay</span>
                    </button>
                  </div>
                )}

                {/* Questions List */}
                {reviewingLesson.lessonData.diverseTestQuestions &&
                reviewingLesson.lessonData.diverseTestQuestions.length > 0 ? (
                  <div className="space-y-4">
                    {reviewingLesson.lessonData.diverseTestQuestions.map((q, qIdx) => {
                      const selected = activeTestAnswers[q.id];
                      const isCorrect = selected === q.answer;
                      const hasAnswered = !!selected;

                      return (
                        <div
                          key={q.id || qIdx}
                          className="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-5 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                              Câu {qIdx + 1}: {q.typeLabel || "Kiểm tra ngữ cảnh"}
                            </span>
                            {hasAnswered && (
                              <span
                                className={`text-xs font-bold flex items-center gap-1 ${
                                  isCorrect ? "text-emerald-600" : "text-rose-600"
                                }`}
                              >
                                {isCorrect ? "✓ Chính xác" : "✗ Chưa đúng"}
                              </span>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">{q.question}</p>

                          {/* Options */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {q.options.map((opt, optIdx) => {
                              const isThisSelected = selected === opt;
                              const isThisTargetAnswer = opt === q.answer;

                              let btnClasses =
                                "border-gray-200 bg-white hover:bg-gray-50 text-slate-800 hover:border-gray-300";
                              if (hasAnswered) {
                                if (isThisTargetAnswer) {
                                  btnClasses = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400";
                                } else if (isThisSelected && !isCorrect) {
                                  btnClasses = "border-rose-400 bg-rose-50 text-rose-950 line-through";
                                }
                              } else if (isThisSelected) {
                                btnClasses = "border-blue-600 bg-blue-50 text-blue-900 font-bold";
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => {
                                    setActiveTestAnswers((prev) => ({ ...prev, [q.id]: opt }));
                                  }}
                                  className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${btnClasses}`}
                                >
                                  <span>{opt}</span>
                                  {hasAnswered && isThisTargetAnswer && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation if answered */}
                          {hasAnswered && (
                            <div className="bg-slate-50 border border-gray-200 rounded-lg p-3 text-xs text-slate-700 space-y-1">
                              <span className="font-bold text-slate-900 block">💡 Giải thích ngôn ngữ học:</span>
                              <p>{q.explanation}</p>
                              {q.memoryHookReminder && (
                                <p className="text-amber-800 font-medium pt-1">
                                  🔔 Nhắc mẹo nhớ: {q.memoryHookReminder}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Submit Button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleSubmitTest}
                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Chấm Điểm & Lưu Kết Quả Ôn Tập</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400 text-xs">
                    Bài học này không có các câu hỏi kiểm tra kèm theo.
                  </div>
                )}
              </div>
            )}

            {/* 5. PERSONAL STUDY NOTES TAB */}
            {reviewTab === "notes" && (
              <div className="space-y-4">
                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs text-amber-950">
                  <span className="font-bold block mb-1">📝 Sổ tay ghi chú cá nhân:</span>
                  <p>
                    Ghi lại các từ vựng bạn dễ nhầm, ví dụ câu bạn tự đặt, hoặc lưu ý riêng để ôn tập hiệu quả hơn.
                    Ghi chú này sẽ được lưu kèm theo bài học và xuất ra khi tải file backup.
                  </p>
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={8}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Nhập ghi chú cá nhân của bạn cho bài học này..."
                    className="w-full p-4 border-2 border-gray-300 rounded-xl text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNotes}
                      disabled={isSavingNotes}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                      <span>{isSavingNotes ? "Đang lưu..." : "Lưu Ghi Chú"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 3. DEFAULT ARCHIVE VIEW: LIST OF ALL SAVED LESSONS */
        /* ========================================================================= */
        <div className="space-y-4">
          {/* Search and Filters Toolbar */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm bài học, chủ đề, từ vựng đã học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-7 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center flex-wrap gap-2 text-xs font-bold">
              {/* Type Filter */}
              <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setTypeFilter("all")}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    typeFilter === "all" ? "bg-white text-slate-900 shadow-xs font-black" : "text-gray-600"
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setTypeFilter("topic_lesson")}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    typeFilter === "topic_lesson" ? "bg-white text-slate-900 shadow-xs font-black" : "text-gray-600"
                  }`}
                >
                  Bài dễ nhớ AI
                </button>
                <button
                  onClick={() => setTypeFilter("tutor")}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    typeFilter === "tutor" ? "bg-white text-slate-900 shadow-xs font-black" : "text-gray-600"
                  }`}
                >
                  Gia sư AI
                </button>
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                className="bg-gray-100 border-none px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 cursor-pointer focus:outline-none"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="in-progress">Đang học dở dang</option>
                <option value="bookmarked">Đã đánh dấu sao ⭐</option>
              </select>
            </div>
          </div>

          {/* Lessons Grid */}
          {filteredLessons.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Chưa có bài học nào trong danh sách</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  {searchQuery || typeFilter !== "all" || statusFilter !== "all"
                    ? "Không tìm thấy bài học nào phù hợp với bộ lọc hiện tại. Thử xóa bộ lọc để xem toàn bộ."
                    : "Khi bạn tạo bài học dễ nhớ hoặc học cùng Gia sư AI trong phần 'Vũ trụ từ vựng chủ đề', hệ thống sẽ tự động lưu lại tại đây để bạn ôn tập bất cứ lúc nào."}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                {onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab("topic_vocab")}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Đến Vũ Trụ Từ Vựng</span>
                  </button>
                )}

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-slate-800 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span>Nhập file backup đã có</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLessons.map((rec) => {
                const isCompleted = rec.status === "completed";
                const isTopicLesson = rec.type === "topic_lesson";
                const dateFormatted = new Date(rec.updatedAt || rec.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });

                return (
                  <div
                    key={rec.id}
                    className={`bg-white border-2 rounded-2xl p-5 transition-all shadow-xs hover:shadow-md flex flex-col justify-between space-y-4 group ${
                      rec.isBookmarked ? "border-amber-400/90 bg-amber-50/10" : "border-gray-200 hover:border-blue-500"
                    }`}
                  >
                    {/* Top Row: Type & Bookmark */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase font-mono tracking-wider ${
                              isTopicLesson
                                ? "bg-amber-100 text-amber-900 border border-amber-200"
                                : "bg-blue-100 text-blue-900 border border-blue-200"
                            }`}
                          >
                            {isTopicLesson ? "Dễ nhớ AI" : "Gia sư AI"}
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 ${
                              isCompleted
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Lock className="w-3 h-3 text-slate-500" />}
                            <span>{isCompleted ? "Hoàn thành" : "Đang học"}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => handleToggleBookmark(rec.id, e)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-amber-500 transition-colors cursor-pointer"
                            title={rec.isBookmarked ? "Bỏ đánh dấu sao" : "Đánh dấu sao"}
                          >
                            <Star className={`w-4 h-4 ${rec.isBookmarked ? "fill-amber-400 text-amber-500" : ""}`} />
                          </button>

                          <button
                            onClick={(e) => handleDelete(rec.id, rec.title, e)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Xóa bài học"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Title & Topic */}
                      <div>
                        <div className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider line-clamp-1">
                          {rec.macroDomain || "Chủ đề học thuật"}
                        </div>
                        <h4 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mt-0.5">
                          {rec.title}
                        </h4>
                      </div>

                      {/* Test Score Badge if tested */}
                      {rec.testScore ? (
                        <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-emerald-800">
                          <Award className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            Điểm test: {rec.testScore.correctAnswers}/{rec.testScore.totalQuestions} ({rec.testScore.percentage}%)
                          </span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono text-gray-500">
                          <span>Chưa làm bài test</span>
                        </div>
                      )}

                      {/* Words Tag Strip */}
                      <div className="pt-2">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Từ vựng ({rec.wordsLearned?.length || 0}):
                        </div>
                        <div className="flex flex-wrap gap-1 max-h-16 overflow-hidden">
                          {rec.wordsLearned?.slice(0, 8).map((w, wIdx) => (
                            <span
                              key={wIdx}
                              className="text-[11px] font-semibold bg-gray-100 text-slate-800 px-2 py-0.5 rounded border border-gray-200 font-mono"
                            >
                              {w}
                            </span>
                          ))}
                          {rec.wordsLearned && rec.wordsLearned.length > 8 && (
                            <span className="text-[10px] text-gray-400 font-bold self-center">
                              +{rec.wordsLearned.length - 8} từ khác
                            </span>
                          )}
                        </div>
                      </div>

                      {/* User Notes Preview if exists */}
                      {rec.userNotes && (
                        <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-2 text-[11px] text-amber-900 line-clamp-2 italic">
                          "{rec.userNotes}"
                        </div>
                      )}
                    </div>

                    {/* Bottom Row: Actions */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-gray-400">{dateFormatted}</span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => downloadSingleLessonJSON(rec)}
                          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                          title="Tải riêng bài này (.JSON)"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleStartReview(rec)}
                          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                          title="Ôn tập & làm lại bài kiểm tra"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Ôn Tập & Học Lại</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
