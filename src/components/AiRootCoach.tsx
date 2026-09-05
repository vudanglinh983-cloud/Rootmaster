import React, { useState, useEffect } from "react";
import { WordRoot, UserStats, AILessonPlan, AIStudyRecommendation, AILinguistAnswer } from "../types";
import { 
  BrainCircuit, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Loader2, 
  Save, 
  GraduationCap, 
  Target, 
  Lightbulb, 
  Layers, 
  MessageSquareQuote, 
  BookCheck, 
  Check, 
  Copy, 
  ChevronRight,
  RefreshCw,
  PlusCircle,
  FileText
} from "lucide-react";

interface AiRootCoachProps {
  onImportCustomRoot: (customRoot: WordRoot) => void;
  allRoots: WordRoot[];
  userStats?: UserStats;
  onNavigate?: (tab: string) => void;
}

interface ExtractedRootResult {
  root: string;
  meaning: string;
  originalGreekLatin: string;
  quickTip: string;
  detectedWord: string;
  wordDefinition: string;
  ieltsSentence: string;
}

const TRUNK_LIST = [
  { id: 1, name: "Trục 1: Tiền Tố Định Hướng & Biến Đổi", stems: "CON / DIS / TRANS / SUB / PRO" },
  { id: 2, name: "Trục 2: Tư Duy, Nhận Thức & Diễn Ngôn", stems: "COGN / SCI / LOG / DIC / PHON" },
  { id: 3, name: "Trục 3: Con Người, Quản Trị & Thể Chế", stems: "DEM / CRAC / JUR / CIV / ANTHROP" },
  { id: 4, name: "Trục 4: Vận Động, Biến Đổi & Thời Không", stems: "GEN / CHRON / MUT / GRAD / VERT" },
  { id: 5, name: "Trục 5: Xung Động, Tác Động & Buộc Ép", stems: "PEL / TEND / MIT / TRACT" },
  { id: 6, name: "Trục 6: Chân Lý, Đo Lường & Chuẩn Mực", stems: "VER / VAL / FID / EQU" },
  { id: 7, name: "Trục 7: Vị Thế, Thuộc Tính & Bền Vững", stems: "STA / SED / TEN / HAB" },
  { id: 8, name: "Trục 8: Vòng Đời & Chuyển Dịch", stems: "BIO / MORT / SEQU / CUR" },
  { id: 9, name: "Trục 9: Đo Lường & Chuẩn Mực", stems: "METR / MOD / NUMER / SPEC" },
  { id: 10, name: "Trục 10: Xung Đột & Phòng Thủ", stems: "FEND / FLICT / BELL / FUG / PUGN" },
  { id: 11, name: "Trục 11: Phân Bổ & Sở Hữu", stems: "TRIB / MUN / PROPR / COMMUN" },
  { id: 12, name: "Trục 12: Đích Đến & Dự Phán", stems: "FIN / OPT / SPECT / TEND" },
  { id: 13, name: "Trục 13: Gắn Kết & Liên Tục", stems: "NEX / LIG / SER / APT" },
  { id: 14, name: "Trục 14: Lợi Ích & Phương Hại", stems: "BEN / MAL / NOX / DAMN / DETRI" },
  { id: 15, name: "Trục 15: Đầy Đủ & Thiếu Hụt", stems: "PLE / VAC / PAUC / PLEN" },
  { id: 16, name: "Trục 16: Dẫn Dắt & Quản Trị", stems: "DUC / DUCT / REG / RECT" },
  { id: 17, name: "Trục 17: Biến Đổi Hình Thái", stems: "MORPH / MUT / ALTER / VAR" },
  { id: 18, name: "Trục 18: Minh Bạch & Ẩn Tàng", stems: "LUC / LUM / PHAN / CRYPT / MANI" },
];

export const AiRootCoach: React.FC<AiRootCoachProps> = ({
  onImportCustomRoot,
  allRoots,
  userStats,
  onNavigate,
}) => {
  // Navigation tabs within AI Coach
  const [activeMode, setActiveMode] = useState<"lesson" | "recommend" | "analyze" | "qa">("lesson");

  // Notification state
  const [notification, setNotification] = useState<{ message: string; type: "success" | "warning" } | null>(null);

  const showNotification = (message: string, type: "success" | "warning" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // =========================================================================
  // MODE 1: LESSON GENERATOR STATE
  // =========================================================================
  const [selectedTrunk, setSelectedTrunk] = useState<number>(10);
  const [lessonTopic, setLessonTopic] = useState<string>("Bảo Vệ Môi Trường & Khủng Hoảng Đa Dạng Sinh Học");
  const [lessonTargetBand, setLessonTargetBand] = useState<string>("Band 7.5 - 8.5");
  const [lessonCustomGoal, setLessonCustomGoal] = useState<string>("Tập trung vào cơ chế danh từ hóa (Nominalization) và Collocation học thuật");
  const [isGeneratingLesson, setIsGeneratingLesson] = useState<boolean>(false);
  const [currentLesson, setCurrentLesson] = useState<AILessonPlan | null>(null);
  const [savedLessons, setSavedLessons] = useState<AILessonPlan[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<Record<number, boolean>>({});

  // Load saved lessons from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("ielts_ai_saved_lessons");
    if (stored) {
      try {
        setSavedLessons(JSON.parse(stored));
      } catch (e) {
        console.error("Lỗi đọc bài học đã lưu:", e);
      }
    }
  }, []);

  const handleGenerateLesson = async () => {
    setIsGeneratingLesson(true);
    setUserAnswers({});
    setCheckedAnswers({});

    try {
      const trunkObj = TRUNK_LIST.find((t) => t.id === selectedTrunk);
      const res = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trunkNumber: selectedTrunk,
          trunkName: trunkObj?.name || "",
          topic: lessonTopic,
          targetBand: lessonTargetBand,
          customGoal: lessonCustomGoal,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error || "Không thể tạo bài học lúc này.");
      }

      const lessonData: AILessonPlan = await res.json();
      setCurrentLesson(lessonData);
      showNotification("Giáo sư Ngôn ngữ AI đã thiết kế thành công bài học học thuật cho bạn!");
    } catch (err: any) {
      console.error(err);
      showNotification(err?.message || "Đã xảy ra lỗi khi tạo bài học bằng AI.", "warning");
    } finally {
      setIsGeneratingLesson(false);
    }
  };

  const handleSaveCurrentLesson = () => {
    if (!currentLesson) return;
    const isExisted = savedLessons.some((l) => l.id === currentLesson.id);
    let updated: AILessonPlan[];
    if (isExisted) {
      updated = savedLessons.map((l) => (l.id === currentLesson.id ? currentLesson : l));
    } else {
      updated = [currentLesson, ...savedLessons];
    }
    setSavedLessons(updated);
    localStorage.setItem("ielts_ai_saved_lessons", JSON.stringify(updated));
    showNotification("Đã lưu bài học vào kho lưu trữ cá nhân thành công!");
  };

  const handleImportWordToSRS = (wordItem: any) => {
    const rootCandidate = wordItem.morphologicalBreakdown?.split(" ")[0] || "ROOT";
    const cleanId = `ai_voc_${wordItem.word.toLowerCase().replace(/[^a-z]/g, "")}_${Date.now()}`;
    
    const newRoot: WordRoot = {
      id: cleanId,
      root: rootCandidate.toUpperCase(),
      meaning: wordItem.meaning,
      origin: "Chiết xuất từ bài học Chuyên gia AI",
      description: `Từ vựng học thuật ${wordItem.word} (${wordItem.partOfSpeech}): ${wordItem.meaning}. Phân tách: ${wordItem.morphologicalBreakdown}`,
      tip: `Ghi nhớ collocation: ${wordItem.bandCollocation}`,
      category: `Trục ${selectedTrunk}` as any,
      exampleWords: [
        {
          word: wordItem.word,
          partOfSpeech: wordItem.partOfSpeech,
          phonetic: wordItem.phonetic,
          meaning: wordItem.meaning,
          visualBreakdown: wordItem.morphologicalBreakdown,
          ieltsSentence: wordItem.sampleUsage,
          vietnameseTranslation: `Collocation: ${wordItem.bandCollocation}`,
          level: "C1",
          collocation: wordItem.bandCollocation,
        }
      ]
    };

    onImportCustomRoot(newRoot);
    showNotification(`Đã thêm từ "${wordItem.word}" vào kho ôn tập SRS cá nhân!`);
  };

  // =========================================================================
  // MODE 2: STUDY RECOMMENDATIONS STATE
  // =========================================================================
  const [currentLevel, setCurrentLevel] = useState<string>("Intermediate (Band 6.0 - 6.5)");
  const [targetBandGoal, setTargetBandGoal] = useState<string>("Band 8.0");
  const [weakAreasInput, setWeakAreasInput] = useState<string>(
    "Vốn từ vựng Writing Task 2 còn đơn điệu, hay bị lặp từ cơ bản và gặp trở ngại khi đọc các bài luận Reading dài chứa nhiều thuật ngữ gốc Hy Lạp/Latin."
  );
  const [preferredDailyTime, setPreferredDailyTime] = useState<string>("30 - 45 phút/ngày");
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState<boolean>(false);
  const [recommendationResult, setRecommendationResult] = useState<AIStudyRecommendation | null>(null);

  const handleGenerateRecommendations = async () => {
    setIsLoadingRecommendations(true);
    try {
      const res = await fetch("/api/study-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentStats: userStats,
          targetBand: targetBandGoal,
          currentLevel,
          weakAreas: weakAreasInput,
          preferredTimePerDay: preferredDailyTime,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error || "Không thể tạo gợi ý học tập lúc này.");
      }

      const data: AIStudyRecommendation = await res.json();
      setRecommendationResult(data);
      showNotification("Đã khởi tạo thành công Bản Chẩn Đoán & Lộ Trình 7 Ngày Cá Nhân Hóa!");
    } catch (err: any) {
      console.error(err);
      showNotification(err?.message || "Đã xảy ra lỗi khi tạo gợi ý học tập.", "warning");
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  // =========================================================================
  // MODE 3: ETYMOLOGY PASSAGE SCANNER STATE
  // =========================================================================
  const [passage, setPassage] = useState<string>("");
  const [isLoadingPassage, setIsLoadingPassage] = useState<boolean>(false);
  const [extractedRoots, setExtractedRoots] = useState<ExtractedRootResult[]>([]);
  const [importedRootsRecord, setImportedRootsRecord] = useState<Record<string, boolean>>({});

  const samplePassages = [
    {
      title: "Địa Chính Trị & Xung Đột (Trục 10 & 16)",
      text: "The international community is witnessing unprecedented geopolitical friction as belligerent factions repeatedly breach diplomatic accords. Fending off cyber intrusions has necessitated aggressive defensive mobilization, while authoritarian regimes attempt to subdue civic resistance through strictly regimented digital surveillance."
    },
    {
      title: "Môi Trường & Cạn Kiệt Nguồn Lực (Trục 14 & 15)",
      text: "Industrialized overfishing continues to deplete marine ecosystems to the severe detriment of biodiversity. As finite aquifers empty, an acute paucity of potable water threatens suburban populations. Sustainable replenishment policies must supersede mere corporate beneficence to avert permanent ecological catastrophe."
    },
    {
      title: "Khoa Học & Trí Tuệ Nhân Tạo (Trục 17 & 18)",
      text: "Machine learning algorithms undergo rapid metamorphic adaptations, rendering older computational models obsolete. To illuminate obscure decision matrices, computer scientists strive for algorithmic lucidity. Without robust cryptography, encrypted communication networks remain vulnerable to malicious interception."
    }
  ];

  const handleAnalyzePassage = async () => {
    if (!passage || passage.trim() === "") {
      showNotification("Vui lòng nhập hoặc chọn một đoạn văn bản tiếng Anh để phân tích.", "warning");
      return;
    }

    setIsLoadingPassage(true);
    setExtractedRoots([]);

    try {
      const response = await fetch("/api/analyze-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: passage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Không thể phân tích đoạn văn.");
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Lỗi định dạng dữ liệu AI phản hồi.");
      }

      setExtractedRoots(data);
      showNotification(`Đã phân tích thành công và bóc tách được ${data.length} gốc từ học thuật!`);
    } catch (err: any) {
      console.error(err);
      showNotification(err?.message || "Đã xảy ra lỗi khi phân tích đoạn văn.", "warning");
    } finally {
      setIsLoadingPassage(false);
    }
  };

  const handleImportExtractedRoot = (item: ExtractedRootResult) => {
    const rootUpper = item.root.toUpperCase().trim();
    const cleanId = `cust_${rootUpper.replace(/[^A-Z]/g, "")}_${Date.now()}`;

    const isDuplicate = allRoots.some((r) => r.root.toUpperCase().trim() === rootUpper);
    if (isDuplicate) {
      showNotification(`Gốc từ "${rootUpper}" đã có sẵn trong danh mục học tập của bạn!`, "warning");
      return;
    }

    const newRoot: WordRoot = {
      id: cleanId,
      root: rootUpper,
      meaning: item.meaning,
      origin: item.originalGreekLatin,
      description: `Gốc từ bóc tách bằng AI từ từ vựng: ${item.detectedWord} (${item.wordDefinition}).`,
      tip: item.quickTip,
      category: "Trục 1: Tiền Tố Định Hướng & Biến Đổi",
      exampleWords: [
        {
          word: item.detectedWord,
          partOfSpeech: "n/v/adj",
          meaning: item.wordDefinition,
          visualBreakdown: `Gốc [ ${rootUpper} ] phân giải trong trường từ học`,
          ieltsSentence: item.ieltsSentence,
          vietnameseTranslation: "Ví dụ trích xuất học thuật từ AI.",
          level: "C1"
        }
      ]
    };

    onImportCustomRoot(newRoot);
    setImportedRootsRecord((prev) => ({ ...prev, [rootUpper]: true }));
    showNotification(`Đã lưu thành công gốc từ "${rootUpper}" vào hệ thống SRS!`);
  };

  // =========================================================================
  // MODE 4: LINGUISTICS Q&A STATE
  // =========================================================================
  const [qaQuestion, setQaQuestion] = useState<string>("");
  const [qaContextRoot, setQaContextRoot] = useState<string>("");
  const [isLoadingQa, setIsLoadingQa] = useState<boolean>(false);
  const [qaAnswer, setQaAnswer] = useState<AILinguistAnswer | null>(null);

  const sampleQaPrompts = [
    "Phân biệt sự khác nhau giữa Beneficent và Benevolent trong văn cảnh IELTS Writing Task 2?",
    "Tại sao Conducive lại đi với giới từ 'to', và làm sao để dùng từ này mở rộng Band Lexical Resource?",
    "Giải thích cơ chế hình thái học của gốc TEND trong các từ Portend, Distend, và Contend?",
    "Làm thế nào để ứng dụng kỹ thuật Danh từ hóa (Nominalization) từ động từ Rectify thành luận điểm Band 8.5?"
  ];

  const handleAskLinguist = async () => {
    if (!qaQuestion.trim()) {
      showNotification("Vui lòng nhập câu hỏi dành cho Chuyên gia Ngôn ngữ.", "warning");
      return;
    }

    setIsLoadingQa(true);
    setQaAnswer(null);

    try {
      const res = await fetch("/api/ask-linguist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: qaQuestion,
          contextRoot: qaContextRoot,
          targetBand: "Band 8.0 - 9.0",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error || "Không thể kết nối tới Chuyên gia Ngôn ngữ học.");
      }

      const answerData: AILinguistAnswer = await res.json();
      setQaAnswer(answerData);
    } catch (err: any) {
      console.error(err);
      showNotification(err?.message || "Đã xảy ra lỗi khi gửi câu hỏi tới AI.", "warning");
    } finally {
      setIsLoadingQa(false);
    }
  };

  return (
    <div id="ai-linguistics-coach" className="space-y-6">
      
      {/* Prime Persona Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-blue-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-[11px] font-bold uppercase tracking-wider text-blue-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              GS. LINGUIST AI • TRỢ LÝ HÌNH THÁI HỌC & TỪ NGUYÊN IELTS
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Chuyên Gia Ngôn Ngữ Học & Thiết Kế Lộ Trình
            </h2>
            <p className="text-xs md:text-sm text-blue-100/80 max-w-2xl leading-relaxed">
              Tạo giáo án học thuật chuyên sâu theo 18 Trục Gốc từ, chẩn đoán điểm nghẽn từ vựng, xây dựng kế hoạch ôn tập 7 ngày ngắt quãng và giải mã mọi bí ẩn cấu trúc ngôn ngữ tiếng Anh ở dải điểm Band 7.5 – 9.0.
            </p>
          </div>

          {/* Quick stats snapshot badge */}
          {userStats && (
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 shrink-0 flex items-center gap-4">
              <div>
                <div className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">HỒ SƠ HỌC VIÊN</div>
                <div className="text-lg font-black text-white">{userStats.masteredCount} Thẻ Mastered</div>
                <div className="text-xs text-blue-200/80 font-mono">Streak: {userStats.streak} ngày 🔥</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center">
                <Target className="w-5 h-5 text-amber-300" />
              </div>
            </div>
          )}
        </div>

        {/* 4 Mode Switcher Tabs */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            onClick={() => setActiveMode("lesson")}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeMode === "lesson"
                ? "bg-white text-slate-900 shadow-lg font-black"
                : "bg-white/5 hover:bg-white/10 text-white/90 border border-white/10"
            }`}
          >
            <GraduationCap className={`w-4.5 h-4.5 ${activeMode === "lesson" ? "text-blue-600" : "text-blue-300"}`} />
            <div>
              <div className="leading-tight">Tạo Bài Học Học Thuật</div>
              <div className="text-[10px] opacity-70 font-normal mt-0.5">Lesson Generator</div>
            </div>
          </button>

          <button
            onClick={() => setActiveMode("recommend")}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeMode === "recommend"
                ? "bg-white text-slate-900 shadow-lg font-black"
                : "bg-white/5 hover:bg-white/10 text-white/90 border border-white/10"
            }`}
          >
            <Calendar className={`w-4.5 h-4.5 ${activeMode === "recommend" ? "text-blue-600" : "text-blue-300"}`} />
            <div>
              <div className="leading-tight">Gợi Ý & Lộ Trình 7 Ngày</div>
              <div className="text-[10px] opacity-70 font-normal mt-0.5">Diagnostic & Roadmap</div>
            </div>
          </button>

          <button
            onClick={() => setActiveMode("analyze")}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeMode === "analyze"
                ? "bg-white text-slate-900 shadow-lg font-black"
                : "bg-white/5 hover:bg-white/10 text-white/90 border border-white/10"
            }`}
          >
            <BrainCircuit className={`w-4.5 h-4.5 ${activeMode === "analyze" ? "text-blue-600" : "text-blue-300"}`} />
            <div>
              <div className="leading-tight">Bóc Tách Bài Đọc IELTS</div>
              <div className="text-[10px] opacity-70 font-normal mt-0.5">Passage Etymology</div>
            </div>
          </button>

          <button
            onClick={() => setActiveMode("qa")}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeMode === "qa"
                ? "bg-white text-slate-900 shadow-lg font-black"
                : "bg-white/5 hover:bg-white/10 text-white/90 border border-white/10"
            }`}
          >
            <MessageSquareQuote className={`w-4.5 h-4.5 ${activeMode === "qa" ? "text-blue-600" : "text-blue-300"}`} />
            <div>
              <div className="leading-tight">Hỏi Đáp Với Giáo Sư</div>
              <div className="text-[10px] opacity-70 font-normal mt-0.5">Linguistic Q&A</div>
            </div>
          </button>
        </div>
      </div>

      {/* Global In-app Notification Banner */}
      {notification && (
        <div className={`p-4 rounded-2xl border-2 font-medium text-xs md:text-sm flex items-center justify-between gap-3 shadow-md animate-fadeIn ${
          notification.type === "success" 
            ? "bg-emerald-50 border-emerald-500 text-emerald-950" 
            : "bg-amber-50 border-amber-500 text-amber-950"
        }`}>
          <div className="flex items-center gap-2.5">
            {notification.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
            )}
            <span>{notification.message}</span>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-xs uppercase font-bold opacity-60 hover:opacity-100 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 1: LESSON GENERATOR VIEW                                         */}
      {/* ===================================================================== */}
      {activeMode === "lesson" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Creator form */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  🎓
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Thiết Kế Bài Học Học Thuật Tùy Biến</h3>
                  <p className="text-xs text-gray-400">Chọn trục gốc từ và chủ đề IELTS để AI khởi tạo giáo án chuẩn mực C1/C2</p>
                </div>
              </div>

              {savedLessons.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 hidden sm:inline">Bài học đã lưu:</span>
                  <select
                    onChange={(e) => {
                      const found = savedLessons.find((l) => l.id === e.target.value);
                      if (found) setCurrentLesson(found);
                    }}
                    value=""
                    className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium"
                  >
                    <option value="">📂 Mở bài học đã lưu ({savedLessons.length})...</option>
                    {savedLessons.map((l) => (
                      <option key={l.id} value={l.id}>{l.title}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Select Trunk */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  1. Chọn Trục Gốc Từ (18 Trục)
                </label>
                <select
                  value={selectedTrunk}
                  onChange={(e) => setSelectedTrunk(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs md:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                >
                  {TRUNK_LIST.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.stems})
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Band */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  2. Mục Tiêu Band Điểm
                </label>
                <select
                  value={lessonTargetBand}
                  onChange={(e) => setLessonTargetBand(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs md:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                >
                  <option value="Band 6.5 - 7.5 (B2/C1 Competent)">Band 6.5 - 7.5 (Vững vàng)</option>
                  <option value="Band 7.5 - 8.5 (C1/C2 Advanced)">Band 7.5 - 8.5 (Học thuật cao cấp)</option>
                  <option value="Band 8.5 - 9.0 (C2 Native Mastery)">Band 8.5 - 9.0 (Bậc thầy xuất sắc)</option>
                </select>
              </div>

              {/* Topic */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  3. Chủ Đề IELTS Writing/Reading
                </label>
                <input
                  type="text"
                  value={lessonTopic}
                  onChange={(e) => setLessonTopic(e.target.value)}
                  placeholder="Ví dụ: Công Nghệ AI, Môi Trường, Y Tế..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs md:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Custom learning goal */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                4. Trọng Tâm Kỹ Năng Muốn Đột Phá (Tùy chọn)
              </label>
              <input
                type="text"
                value={lessonCustomGoal}
                onChange={(e) => setLessonCustomGoal(e.target.value)}
                placeholder="Ví dụ: Rèn luyện kỹ thuật danh từ hóa, tăng vốn Collocation C2, tránh lỗi nhầm tiền tố..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs md:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white"
              />
            </div>

            <button
              onClick={handleGenerateLesson}
              disabled={isGeneratingLesson}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold text-xs md:text-sm uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isGeneratingLesson ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Giáo Sư AI Đang Soạn Giáo Án Học Thuật...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Soạn Bài Học Ngay Bằng AI
                </>
              )}
            </button>
          </div>

          {/* Lesson Content Rendered */}
          {currentLesson ? (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-md text-[11px] font-bold">
                        {currentLesson.trunkOrTheme}
                      </span>
                      <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-md text-[11px] font-bold">
                        {currentLesson.targetBand}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900">{currentLesson.title}</h3>
                    <p className="text-xs text-gray-500">Chủ đề: {currentLesson.topic}</p>
                  </div>

                  <button
                    onClick={handleSaveCurrentLesson}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-blue-600" />
                    Lưu Bài Học Này
                  </button>
                </div>

                {/* Objectives */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-blue-600" />
                    Mục Tiêu Bài Học
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentLesson.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-2 bg-blue-50/50 border border-blue-100 p-2.5 rounded-xl text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 1. Morphological Core */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">1. Hạt Nhân Hình Thái Học (Morphological Core)</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentLesson.morphologicalCore.map((c, idx) => (
                    <div key={idx} className="bg-gradient-to-b from-indigo-50/40 to-white border border-indigo-100 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-black text-lg text-indigo-900 tracking-wide">{c.root}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">{c.origin}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-800">Ý nghĩa: {c.coreMeaning}</div>
                      <p className="text-xs text-gray-600 leading-relaxed">{c.breakdownExplanation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Academic Passage */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">2. Đoạn Văn Học Thuật IELTS Reading Mẫu</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="text-xs font-bold uppercase text-slate-500 mb-2 font-mono">{currentLesson.academicPassage.title}</div>
                    <p className="text-sm md:text-base text-slate-800 leading-relaxed font-serif">
                      {currentLesson.academicPassage.text}
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-xs text-emerald-950 leading-relaxed">
                    <span className="font-bold block mb-1">🇻🇳 Bản dịch tiếng Việt học thuật:</span>
                    {currentLesson.academicPassage.translation}
                  </div>
                </div>
              </div>

              {/* 3. Vocabulary Table & 1-Click SRS Import */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BookCheck className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">3. Bảng Phân Giải Từ Vựng Band C1/C2 & Collocations</h4>
                  </div>
                  <span className="text-xs text-gray-400">Nhấp "Thêm vào SRS" để lưu thẻ học</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentLesson.vocabularyTable.map((voc, i) => (
                    <div key={i} className="border border-gray-200 rounded-2xl p-4.5 bg-gray-50/50 hover:bg-white hover:border-blue-200 transition-all space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-black text-lg text-slate-900 font-mono">{voc.word}</span>
                            <span className="text-xs text-blue-600 font-mono font-medium">{voc.phonetic}</span>
                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-gray-200 rounded text-gray-700">
                              {voc.partOfSpeech}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-slate-800 mt-1">{voc.meaning}</div>
                        </div>

                        <button
                          onClick={() => handleImportWordToSRS(voc)}
                          className="shrink-0 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          SRS
                        </button>
                      </div>

                      <div className="space-y-1.5 text-xs text-gray-600">
                        <div className="p-2 bg-white rounded-lg border border-gray-100">
                          <span className="font-bold text-slate-700 block">Cấu trúc hình thái:</span>
                          {voc.morphologicalBreakdown}
                        </div>

                        <div className="p-2 bg-amber-50/50 rounded-lg border border-amber-100 text-amber-900">
                          <span className="font-bold text-amber-950 block">Collocation học thuật:</span>
                          • {voc.bandCollocation}
                        </div>

                        <div className="text-slate-700 italic border-l-2 border-blue-500 pl-2 mt-2">
                          "{voc.sampleUsage}"
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Paraphrase Transformation Engine */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">4. Cơ Chế Paraphrase Học Thuật & Danh Từ Hóa (Writing Task 2)</h4>
                </div>

                <div className="space-y-3">
                  {currentLesson.paraphraseTransformation.map((trans, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                      <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-xs">
                        <span className="text-[10px] font-bold text-rose-600 uppercase block mb-1">Cách diễn đạt cơ bản (B1/B2):</span>
                        <span className="font-semibold text-rose-950">{trans.originalBasic}</span>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-xs">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase block mb-1">Paraphrase gốc từ (C1/C2 Band 8.0+):</span>
                        <span className="font-bold text-emerald-950">{trans.academicParaphrase}</span>
                      </div>

                      <div className="text-xs text-slate-600 leading-relaxed md:border-l border-gray-200 md:pl-3">
                        <span className="font-bold text-slate-800 block mb-0.5">Cơ chế ngôn ngữ:</span>
                        {trans.grammaticalMechanism}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Practice Exercises with Instant Feedback */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">5. Bài Tập Tương Tác & Luyện Tập Ứng Dụng</h4>
                </div>

                <div className="space-y-4">
                  {currentLesson.practiceExercises.map((ex, idx) => {
                    const isChecked = checkedAnswers[idx];
                    const selectedAns = userAnswers[idx] || "";
                    const isCorrect = selectedAns.trim().toLowerCase() === ex.answer.trim().toLowerCase();

                    return (
                      <div key={idx} className="border border-gray-200 rounded-2xl p-4.5 bg-gray-50/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-600 uppercase">Câu hỏi {idx + 1} ({ex.type})</span>
                          {isChecked && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                            }`}>
                              {isCorrect ? "Chính xác! 🎉" : "Chưa chính xác"}
                            </span>
                          )}
                        </div>

                        <p className="text-xs md:text-sm font-semibold text-slate-900 leading-relaxed">
                          {ex.question}
                        </p>

                        {/* Options if available */}
                        {ex.options && ex.options.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {ex.options.map((opt, optIdx) => (
                              <button
                                key={optIdx}
                                onClick={() => {
                                  setUserAnswers((prev) => ({ ...prev, [idx]: opt }));
                                  setCheckedAnswers((prev) => ({ ...prev, [idx]: false }));
                                }}
                                className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                                  selectedAns === opt
                                    ? "border-blue-600 bg-blue-50 text-blue-900 font-bold"
                                    : "border-gray-200 bg-white hover:bg-gray-100 text-slate-700"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={selectedAns}
                            onChange={(e) => {
                              setUserAnswers((prev) => ({ ...prev, [idx]: e.target.value }));
                              setCheckedAnswers((prev) => ({ ...prev, [idx]: false }));
                            }}
                            placeholder="Nhập câu trả lời hoặc từ thích hợp tại đây..."
                            className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-xs text-slate-800"
                          />
                        )}

                        <div className="flex items-center gap-3 pt-2">
                          <button
                            onClick={() => setCheckedAnswers((prev) => ({ ...prev, [idx]: true }))}
                            disabled={!selectedAns}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                          >
                            Kiểm Tra Đáp Án
                          </button>
                        </div>

                        {isChecked && (
                          <div className="p-3.5 bg-blue-50/50 border border-blue-200 rounded-xl text-xs space-y-1 mt-2 animate-fadeIn">
                            <div className="font-bold text-blue-950">Đáp án chuẩn xác: {ex.answer}</div>
                            <div className="text-slate-700 leading-relaxed">
                              <span className="font-semibold text-slate-900">Phân tích ngôn ngữ:</span> {ex.linguisticExplanation}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 6. Study Tips */}
              <div className="bg-amber-50/60 border border-amber-200 rounded-3xl p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-700" />
                  <h4 className="font-bold text-amber-950 text-sm md:text-base">6. Lời Khuyên Từ Giáo Sư Ngôn Ngữ Học</h4>
                </div>
                <div className="space-y-2">
                  {currentLesson.studyTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-amber-900 leading-relaxed">
                      <span className="font-bold text-amber-700">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-12 text-center space-y-3">
              <GraduationCap className="w-12 h-12 text-gray-300 mx-auto" />
              <h4 className="font-bold text-slate-700 text-base">Chưa Khởi Tạo Bài Học</h4>
              <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                Hãy chọn một trong 18 Trục Gốc từ và nhấn <strong>"Soạn Bài Học Ngay Bằng AI"</strong> ở bảng điều khiển phía trên để nhận ngay giáo án học thuật đầy đủ.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 2: PERSONALIZED RECOMMENDATIONS VIEW                             */}
      {/* ===================================================================== */}
      {activeMode === "recommend" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Diagnostic Generator Card */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                🧭
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Chẩn Đoán & Thiết Kế Lộ Trình 7 Ngày Cá Nhân Hóa</h3>
                <p className="text-xs text-gray-400">AI phân tích dữ liệu học tập và mục tiêu để lập kế hoạch phân bổ 18 Trục Gốc từ</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Current Level */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Trình Độ Hiện Tại
                </label>
                <select
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs md:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                >
                  <option value="Pre-Intermediate (Band 5.0 - 5.5)">Pre-Intermediate (Band 5.0 - 5.5)</option>
                  <option value="Intermediate (Band 6.0 - 6.5)">Intermediate (Band 6.0 - 6.5)</option>
                  <option value="Advanced (Band 7.0 - 7.5)">Advanced (Band 7.0 - 7.5)</option>
                  <option value="Mastery (Band 8.0+)">Mastery (Band 8.0+)</option>
                </select>
              </div>

              {/* Target Band Goal */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Mục Tiêu Band Điểm Hướng Tới
                </label>
                <select
                  value={targetBandGoal}
                  onChange={(e) => setTargetBandGoal(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs md:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                >
                  <option value="Band 7.0 (Vượt ngưỡng)">Band 7.0 (Vượt ngưỡng)</option>
                  <option value="Band 7.5 (Học bổng quốc tế)">Band 7.5 (Học bổng quốc tế)</option>
                  <option value="Band 8.0 (Chuyên gia ngôn ngữ)">Band 8.0 (Chuyên gia ngôn ngữ)</option>
                  <option value="Band 8.5 - 9.0 (Bậc thầy tối thượng)">Band 8.5 - 9.0 (Bậc thầy tối thượng)</option>
                </select>
              </div>

              {/* Daily Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Thời Gian Dành Mỗi Ngày
                </label>
                <select
                  value={preferredDailyTime}
                  onChange={(e) => setPreferredDailyTime(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs md:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                >
                  <option value="15 - 20 phút/ngày (Bận rộn)">15 - 20 phút/ngày (Bận rộn)</option>
                  <option value="30 - 45 phút/ngày (Tối ưu chuẩn SRS)">30 - 45 phút/ngày (Tối ưu chuẩn SRS)</option>
                  <option value="60+ phút/ngày (Cường độ cao)">60+ phút/ngày (Cường độ cao)</option>
                </select>
              </div>
            </div>

            {/* Weak Areas Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Mô Tả Điểm Yếu Hoặc Vấn Đề Từ Vựng Cần Giải Quyết
              </label>
              <textarea
                value={weakAreasInput}
                onChange={(e) => setWeakAreasInput(e.target.value)}
                rows={3}
                placeholder="Ví dụ: Thiếu từ học thuật cho Task 2, hay quên từ sau khi học, đọc bài Reading dài hay bị nản..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs md:text-sm font-medium text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white resize-none"
              />
            </div>

            <button
              onClick={handleGenerateRecommendations}
              disabled={isLoadingRecommendations}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold text-xs md:text-sm uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoadingRecommendations ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang Khởi Tạo Bản Chẩn Đoán & Lộ Trình 7 Ngày...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Lập Kế Hoạch 7 Ngày Cá Nhân Hóa
                </>
              )}
            </button>
          </div>

          {/* Diagnostic Result */}
          {recommendationResult && (
            <div className="space-y-6">
              {/* 1. Assessment */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Compass className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">1. Chẩn Đoán Khoảng Cách Năng Lực & Tiềm Năng Bứt Phá</h4>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium bg-blue-50/40 p-4 rounded-2xl border border-blue-100">
                  {recommendationResult.studentLevelAssessment}
                </p>
              </div>

              {/* 2. Priority Trunks */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Target className="w-5 h-5 text-rose-600" />
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">2. Các Trục Gốc Từ Cần Ưu Tiên Chinh Phục Hàng Đầu</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendationResult.recommendedFocusTrunks.map((trunk, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-black">
                          Trục {trunk.trunkNumber}
                        </span>
                        <button
                          onClick={() => onNavigate?.("boulevard")}
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
                        >
                          Mở Trục <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="font-bold text-slate-900 text-sm">{trunk.trunkName}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{trunk.reason}</p>
                      
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {trunk.keyStems.map((stem, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 bg-white border border-gray-200 rounded-md font-mono text-[11px] font-bold text-slate-700">
                            {stem}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Seven Day Plan */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">3. Lộ Trình Ôn Luyện Spaced Repetition 7 Ngày</h4>
                </div>

                <div className="space-y-3">
                  {recommendationResult.sevenDayPlan.map((dayPlan, i) => (
                    <div key={i} className="bg-gray-50/70 border border-gray-200 hover:border-blue-200 hover:bg-white rounded-2xl p-4 transition-all grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                          D{i + 1}
                        </span>
                        <div>
                          <div className="text-xs font-black text-slate-900">{dayPlan.day}</div>
                          <div className="text-[10px] text-gray-400">{dayPlan.timeEstimate}</div>
                        </div>
                      </div>

                      <div className="text-xs text-slate-800 font-medium md:col-span-2">
                        <div className="font-bold text-slate-900 mb-0.5">{dayPlan.task}</div>
                        <div className="text-[11px] text-blue-600 font-mono">Gốc trọng tâm: {dayPlan.focusRoots}</div>
                      </div>

                      <div className="text-xs text-slate-500 bg-white md:bg-transparent p-2 md:p-0 rounded-lg border md:border-none border-gray-100 font-medium">
                        <span className="font-bold text-slate-700 block md:inline">Phương pháp: </span>
                        {dayPlan.practiceMethod}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Pitfalls & Exam Strategies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-rose-50/50 border border-rose-200 rounded-3xl p-6 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 border-b border-rose-100 pb-2">
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <h4 className="font-bold text-rose-950 text-sm">Cạm Bẫy Cần Tránh Khi Dùng Từ Gốc</h4>
                  </div>
                  <div className="space-y-2">
                    {recommendationResult.academicPitfallsToAvoid.map((pitfall, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-rose-900 leading-relaxed">
                        <span className="font-bold text-rose-600">•</span>
                        <span>{pitfall}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-200 rounded-3xl p-6 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 border-b border-indigo-100 pb-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-bold text-indigo-950 text-sm">Chiến Lược Áp Dụng Trong Phòng Thi IELTS</h4>
                  </div>
                  <div className="space-y-2.5">
                    {recommendationResult.ieltsExamStrategies.map((strat, i) => (
                      <div key={i} className="text-xs text-indigo-950 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-indigo-100">
                        <span className="font-bold text-indigo-800 block mb-0.5">📌 {strat.skill}:</span>
                        <span>{strat.advice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 3: ETYMOLOGY PASSAGE SCANNER VIEW                                */}
      {/* ===================================================================== */}
      {activeMode === "analyze" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Input Passage form */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm lg:col-span-1 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Nhập Đoạn Văn Bản Cần Bóc Tách
            </h3>
            
            <div className="space-y-3">
              <textarea
                id="coach-passage-textarea"
                placeholder="Dán đoạn văn IELTS Reading, bài báo khoa học hoặc đoạn trích bất kỳ tại đây..."
                value={passage}
                onChange={(e) => setPassage(e.target.value)}
                className="w-full h-48 p-3.5 bg-gray-50 border border-gray-200 focus:border-blue-600 focus:bg-white rounded-2xl text-xs md:text-sm font-medium focus:outline-hidden transition-all resize-none"
                disabled={isLoadingPassage}
              />

              <button
                id="btn-coach-analyze"
                onClick={handleAnalyzePassage}
                disabled={isLoadingPassage || !passage.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                {isLoadingPassage ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang bóc tách tế bào từ vựng...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Bóc Tách Gốc Từ Bằng AI
                  </>
                )}
              </button>
            </div>

            {/* Quick templates */}
            <div className="space-y-2 border-t border-gray-100 pt-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                Đoạn mẫu luyện đọc nhanh:
              </span>
              <div className="space-y-2">
                {samplePassages.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPassage(p.text)}
                    className="w-full text-left p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-[11px] text-gray-700 transition-colors cursor-pointer leading-normal block"
                  >
                    <strong className="text-gray-900 font-bold block mb-0.5">💡 {p.title}</strong>
                    {p.text.slice(0, 80)}...
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Results list */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Gốc Từ Chiết Tách Bởi AI ({extractedRoots.length})
              </h3>
              <span className="text-xs text-gray-400 font-mono">Chuẩn hóa Morphology</span>
            </div>

            {isLoadingPassage ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 text-sm">Đang tháo gỡ mật mã Etymology...</p>
                  <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                    Trợ lý AI đang rà quét Latin/Greek roots ẩn giấu, tổng hợp trường nghĩa IELTS và biên soạn mẹo nhớ nhanh.
                  </p>
                </div>
              </div>
            ) : extractedRoots.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center p-6 bg-slate-50 border border-dashed border-gray-200 rounded-3xl space-y-2">
                <HelpCircle className="w-10 h-10 text-gray-300" />
                <h4 className="font-bold text-slate-700">Chưa có kết quả phân tích!</h4>
                <p className="text-xs text-gray-400 max-w-md leading-relaxed">
                  Hãy dán một đoạn văn bản tiếng Anh sang cột bên tay trái để xem sự kỳ diệu từ cách phân tích gốc từ của AI.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extractedRoots.map((item, idx) => {
                  const isImported = importedRootsRecord[item.root.toUpperCase().trim()];

                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50 hover:bg-white hover:border-blue-200 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-black text-lg text-blue-600">{item.root}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full">
                          {item.originalGreekLatin}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-slate-800">
                        Nghĩa gốc: <span className="text-blue-700">{item.meaning}</span>
                      </div>

                      <div className="p-2.5 bg-white border border-gray-100 rounded-xl space-y-1">
                        <div className="text-xs font-bold text-slate-900">
                          Từ phát hiện: <span className="text-indigo-600">{item.detectedWord}</span>
                        </div>
                        <div className="text-[11px] text-gray-600">{item.wordDefinition}</div>
                      </div>

                      <div className="text-[11px] text-slate-600 italic border-l-2 border-blue-400 pl-2">
                        "{item.ieltsSentence}"
                      </div>

                      <div className="p-2 bg-amber-50 border border-amber-100 rounded-xl text-[11px] text-amber-900 font-medium">
                        💡 Mẹo nhớ: {item.quickTip}
                      </div>

                      <button
                        onClick={() => handleImportExtractedRoot(item)}
                        disabled={isImported}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isImported
                            ? "bg-emerald-100 text-emerald-800 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                        }`}
                      >
                        {isImported ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Đã Thêm Vào SRS
                          </>
                        ) : (
                          <>
                            <PlusCircle className="w-3.5 h-3.5" />
                            Thêm Gốc Này Vào SRS
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 4: LINGUISTIC Q&A VIEW                                           */}
      {/* ===================================================================== */}
      {activeMode === "qa" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                💬
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Hỏi Đáp Chuyên Sâu Với Giáo Sư Ngôn Ngữ Học</h3>
                <p className="text-xs text-gray-400">Giải đáp mọi khúc mắc về từ nguyên, so sánh cặp từ dễ nhầm lẫn và cách dùng từ Band 8.5+</p>
              </div>
            </div>

            {/* Suggested prompts */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                Câu hỏi gợi ý nổi bật:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sampleQaPrompts.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQaQuestion(q)}
                    className="text-left p-2.5 bg-gray-50 hover:bg-blue-50/50 hover:border-blue-200 border border-gray-200 rounded-xl text-xs text-slate-700 transition-all cursor-pointer leading-relaxed"
                  >
                    • {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Câu hỏi của bạn
                  </label>
                  <input
                    type="text"
                    value={qaQuestion}
                    onChange={(e) => setQaQuestion(e.target.value)}
                    placeholder="Ví dụ: Phân biệt Conducive vs Conductive? Làm sao dùng gốc TRIB trong bài Task 2?"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs md:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Gốc từ liên quan (tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={qaContextRoot}
                    onChange={(e) => setQaContextRoot(e.target.value)}
                    placeholder="Ví dụ: DUC, BEN, TEND..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs md:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <button
                onClick={handleAskLinguist}
                disabled={isLoadingQa || !qaQuestion.trim()}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold text-xs md:text-sm uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoadingQa ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Giáo Sư Đang Soạn Câu Trả Lời...
                  </>
                ) : (
                  <>
                    <MessageSquareQuote className="w-4 h-4 text-amber-300" />
                    Gửi Câu Hỏi Cho Giáo Sư Ngôn Ngữ
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QA Result Answer */}
          {qaAnswer && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-5 animate-fadeIn">
              <div className="border-b border-gray-100 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                  PHẢN HỒI HỌC THUẬT TỪ GIÁO SƯ
                </span>
                <h4 className="text-lg md:text-xl font-bold text-slate-900">{qaQuestion}</h4>
              </div>

              {/* Summary */}
              <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-2xl text-xs md:text-sm text-blue-950 font-medium leading-relaxed">
                <strong className="block font-bold text-blue-900 mb-1">💡 Tóm lược trọng tâm:</strong>
                {qaAnswer.summary}
              </div>

              {/* Detailed Explanation */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Phân Tích Chi Tiết Cấu Trúc</h5>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                  {qaAnswer.detailedExplanation}
                </p>
              </div>

              {/* Etymology Deep Dive */}
              {qaAnswer.etymologyDeepDive && (
                <div className="p-4.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    Gốc Từ Lịch Sử: <span className="font-mono text-sm">{qaAnswer.etymologyDeepDive.root}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {qaAnswer.etymologyDeepDive.historicalEvolution}
                  </p>
                  {qaAnswer.etymologyDeepDive.cognates && qaAnswer.etymologyDeepDive.cognates.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-xs font-bold text-slate-700 mr-1">Các từ cùng họ:</span>
                      {qaAnswer.etymologyDeepDive.cognates.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white border border-gray-200 rounded-md text-xs font-mono font-medium text-slate-800">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* IELTS Applications */}
              {qaAnswer.ieltsApplications && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-1 text-xs">
                    <span className="font-bold text-emerald-900 block">✍️ Ứng dụng Writing Task 2:</span>
                    <p className="text-emerald-950">{qaAnswer.ieltsApplications.writingTip}</p>
                  </div>

                  <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl space-y-1 text-xs">
                    <span className="font-bold text-purple-900 block">📖 Collocation Đắt Giá:</span>
                    <p className="text-purple-950">{qaAnswer.ieltsApplications.collocationExample}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
