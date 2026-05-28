import React, { useState, useMemo } from "react";
import { WordRoot, SRSState, SRSStatus } from "../types";
import { calculateNextSRS } from "../lib/srsHelper";
import { CheckCircle2, RefreshCw, Star, Info, Lightbulb, BookOpen, ChevronRight, GraduationCap, Volume2, Calendar } from "lucide-react";

interface SrsArenaProps {
  allRoots: WordRoot[];
  srsData: Record<string, SRSState>;
  onStateUpdate: (updatedState: Record<string, SRSState>, statsDelta: { correct: boolean }) => void;
  studyMode: "due" | "new" | "all";
  onSetStudyMode: (mode: "due" | "new" | "all") => void;
}

export const SrsArena: React.FC<SrsArenaProps> = ({
  allRoots,
  srsData,
  onStateUpdate,
  studyMode,
  onSetStudyMode,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Group roots based on study state
  const studyQueue = useMemo(() => {
    const now = new Date();
    
    // Convert roots to dictionary for easy access
    const rootsMap = new Map<string, WordRoot>();
    allRoots.forEach((r) => rootsMap.set(r.id, r));

    let candidates: SRSState[] = [];

    if (studyMode === "due") {
      // due reviews have status !== "New" and nextReviewAt <= now
      candidates = (Object.values(srsData) as SRSState[]).filter((state) => {
        return state.status !== "New" && new Date(state.nextReviewAt) <= now;
      });
    } else if (studyMode === "new") {
      // new cards are those with status === "New"
      candidates = (Object.values(srsData) as SRSState[]).filter((state) => {
        return state.status === "New";
      });
    } else {
      // study all custom or standard available cards
      candidates = Object.values(srsData) as SRSState[];
    }

    // Map SRSState back to full root details
    return candidates
      .map((state) => {
        const rootDetails = rootsMap.get(state.rootId);
        return {
          state,
          root: rootDetails,
        };
      })
      .filter((q) => q.root !== undefined) as Array<{ state: SRSState; root: WordRoot }>;
  }, [allRoots, srsData, studyMode]);

  const activeCard = studyQueue[currentIndex] || null;

  const handleReveal = () => {
    setIsFlipped(true);
  };

  const handleRate = (rating: number) => {
    if (!activeCard) return;

    // Recalculate next srs parameters via SM-2 helper
    const updatedState = calculateNextSRS(activeCard.state, rating);

    const newDb = { ...srsData, [activeCard.state.rootId]: updatedState };
    
    // Update parent state
    // Rate 1 (Again) counts as incorrect for recall metrics, other rates are correct
    onStateUpdate(newDb, { correct: rating > 1 });

    // Procedural move to next card
    setIsFlipped(false);
    if (currentIndex + 1 < studyQueue.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Reset queue
      setCurrentIndex(0);
    }
  };

  // Speaks out the IELTS words using speechSynthesis API (client-side only, non-blocking)
  const speakWord = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getFormatLabel = (status: SRSStatus) => {
    switch (status) {
      case "New":
        return "Mới toanh (New)";
      case "Learning":
        return "Đang học (Learning)";
      case "Reviewing":
        return "Đang ôn (Reviewing)";
      case "Mastered":
        return "Thành thạo (Mastered)";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Quality & State":
        return "bg-amber-100 text-amber-900 border-amber-200";
      case "Actions & Motion":
        return "bg-blue-100 text-blue-950 border-blue-200";
      case "Time & Space":
        return "bg-indigo-100 text-indigo-950 border-indigo-200";
      default:
        return "bg-emerald-100 text-emerald-950 border-emerald-200";
    }
  };

  return (
    <div id="srs-tab" className="space-y-6">
      
      {/* Mode selectors */}
      <div className="flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#0F172A] uppercase tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#2563EB]" />
            Đấu Trường Lặp Lại Ngắt Quãng (SRS Arena)
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Ghi nhớ bằng phương pháp tăng dần khoảng cách thời gian ôn bài thông minh.
          </p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl self-start sm:self-auto border border-gray-200/50 shrink-0">
          <button
            onClick={() => {
              onSetStudyMode("due");
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
              studyMode === "due"
                ? "bg-[#2563EB] text-white shadow-xs font-bold"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Đến Hạn Ôn
          </button>
          <button
            onClick={() => {
              onSetStudyMode("new");
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
              studyMode === "new"
                ? "bg-[#2563EB] text-white shadow-xs font-bold"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Từ Mới
          </button>
          <button
            onClick={() => {
              onSetStudyMode("all");
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
              studyMode === "all"
                ? "bg-[#2563EB] text-white shadow-xs font-bold"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Ôn Tất Cả
          </button>
        </div>
      </div>

      {/* Main Interactive Deck Screen */}
      {studyQueue.length === 0 ? (
        <div className="bg-white border-2 border-[#0F172A] rounded-3xl p-10 md:p-16 text-center shadow-[6px_6px_0px_0px_#0F172A] flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#2563EB] mb-2">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-[#0F172A] uppercase">Tuyệt vời! Bạn đã hoàn thành phân loại!</h3>
          <p className="text-sm text-gray-500 max-w-md leading-relaxed">
            {studyMode === "due"
              ? "Hiện tại không còn gốc từ nào đến hạn ôn tập trong ngày hôm nay. Hãy tiếp tục học thêm từ gốc mới để tăng điểm IELTS Reading nhé."
              : studyMode === "new"
              ? "Tuyệt vời, bạn đã khởi động học tập toàn bộ gốc từ IELTS có trong thư viện. Chúc mừng sự kiên trì của bạn!"
              : "Thư viện trống trơn hoặc chưa được tải chuẩn xác."}
          </p>
          <div className="flex gap-2.5 pt-2">
            {studyMode === "due" && (
              <button
                onClick={() => onSetStudyMode("new")}
                className="bg-[#2563EB] hover:bg-blue-700 text-white font-black text-xs px-5 py-3 rounded-xl cursor-pointer transition-all flex items-center gap-2 uppercase tracking-wider shadow-md"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Học Gốc Từ Mới Ngay
              </button>
            )}
            <button
              onClick={() => onSetStudyMode("all")}
              className="border-2 border-[#0F172A] hover:bg-gray-100 text-[#0F172A] font-black text-xs px-5 py-3 rounded-xl cursor-pointer uppercase tracking-wider transition-all"
            >
              Luyện Tập Toàn Bộ Tự Do
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress gauge banner */}
          <div className="flex items-center justify-between text-xs text-gray-400 font-medium px-1">
            <span>Tiến độ học phần: <strong className="text-gray-700 font-semibold">{currentIndex + 1}</strong> / <strong className="text-[#2563EB] font-bold">{studyQueue.length}</strong> Gốc Từ</span>
            <span>Mục tiêu: học sâu & lặp lại</span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#2563EB] h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / studyQueue.length) * 100}%` }}
            ></div>
          </div>

          {/* Interactive Study Flashcard */}
          <div
            id="srs-active-card"
            className="bg-white border-2 border-[#0F172A] rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#0F172A] min-h-[380px] flex flex-col justify-between transition-all"
          >
            {/* Front of card */}
            {!isFlipped ? (
              <div className="space-y-6 text-center my-auto flex flex-col items-center justify-center">
                <div className="space-y-2">
                  <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md border ${getCategoryColor(activeCard.root.category)}`}>
                    {activeCard.root.category}
                  </span>
                  <div className="text-xs text-gray-400 font-mono mt-1 pt-1">
                    Trạng thái: <strong>{getFormatLabel(activeCard.state.status)}</strong>
                  </div>
                </div>

                <div className="space-y-1">
                  <h1 className="text-[60px] md:text-[80px] font-black tracking-tighter leading-none text-[#0F172A] uppercase select-all font-sans">
                    {activeCard.root.root}
                  </h1>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider font-mono">Nguồn gốc: {activeCard.root.origin}</p>
                </div>

                <p className="text-xs md:text-sm text-gray-400 max-w-md italic leading-relaxed">
                  "Hãy cố gắng tư duy bóc tách nguồn gốc, đoán nghĩa của các từ ví dụ trước khi lật thẻ xem kết quả chi tiết."
                </p>

                <button
                  id="btn-reveal-card"
                  onClick={handleReveal}
                  className="bg-[#2563EB] hover:bg-blue-700 text-white font-black text-xs px-6 py-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 uppercase tracking-wider active:scale-95 shadow-md shadow-blue-500/10"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  Lật Thẻ Xem Nghĩa & Ví Dụ
                </button>
              </div>
            ) : (
              // Back of card (Full Details & Rating controls)
              <div className="space-y-6">
                
                {/* Header detail */}
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="text-3xl font-black text-[#0F172A] uppercase tracking-tight">{activeCard.root.root}</h3>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider font-mono">Bản chất gốc từ: {activeCard.root.origin}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md border ${getCategoryColor(activeCard.root.category)}`}>
                    {activeCard.root.category}
                  </span>
                </div>

                {/* Core Vietnamese translation */}
                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block font-mono">Ý nghĩa cốt lõi</span>
                    <strong className="text-base text-[#0F172A] mt-1 block font-black uppercase tracking-tight">{activeCard.root.meaning}</strong>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{activeCard.root.description}</p>
                  </div>
                </div>

                {/* Memory trick panel */}
                <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200 flex items-start gap-3">
                  <Lightbulb className="text-amber-500 w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block font-mono">Mẹo nhớ nhanh</span>
                    <p className="text-xs text-amber-950 font-semibold mt-1 leading-relaxed">{activeCard.root.tip}</p>
                  </div>
                </div>

                {/* Real Academic examples */}
                <div className="space-y-3 pt-1">
                  <span className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider block font-mono">Áp dụng trong bài thi IELTS Reading</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeCard.root.exampleWords.map((wordObj, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-200/60 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between border-b border-gray-200/30 pb-1">
                          <span className="font-mono text-sm font-black text-[#2563EB] tracking-wide flex items-center gap-1.5">
                            {wordObj.word}
                            <button
                              onClick={() => speakWord(wordObj.word)}
                              className="text-gray-400 hover:text-[#2563EB] p-1 rounded-md cursor-pointer"
                              title="Phát âm tiếng Anh"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </span>
                          <span className="text-xs text-gray-900 font-bold">{wordObj.meaning}</span>
                        </div>
                        <div className="text-[10px] font-mono text-blue-800 font-semibold">Sơ đồ: {wordObj.visualBreakdown}</div>
                        <p className="text-xs text-gray-600 italic leading-relaxed">"{wordObj.ieltsSentence}"</p>
                        <p className="text-[10px] text-gray-500 font-medium">👉 {wordObj.vietnameseTranslation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SRS Rate Action Buttons */}
                <div className="border-t border-gray-100 pt-5 space-y-3">
                  <div className="text-center text-xs text-[#0F172A] font-black uppercase tracking-wider">
                    Đánh giá mức độ thuộc để SRS xếp lịch ôn tập tự động:
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {/* Rate 1 */}
                    <button
                      id="rate-again"
                      onClick={() => handleRate(1)}
                      className="bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-800 border-2 border-rose-200 hover:border-rose-500 p-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex flex-col items-center gap-0.5"
                    >
                      <span>Lặp Lại</span>
                      <span className="text-[9px] font-semibold opacity-80">Quên mất (~2h)</span>
                    </button>

                    {/* Rate 2 */}
                    <button
                      id="rate-hard"
                      onClick={() => handleRate(2)}
                      className="bg-amber-50 hover:bg-amber-500 hover:text-white text-amber-800 border-2 border-amber-200 hover:border-amber-500 p-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex flex-col items-center gap-0.5"
                    >
                      <span>Hơi Khó</span>
                      <span className="text-[9px] font-semibold opacity-80">Gợi nhớ (1-2 ngày)</span>
                    </button>

                    {/* Rate 3 */}
                    <button
                      id="rate-good"
                      onClick={() => handleRate(3)}
                      className="bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 border-2 border-emerald-200 hover:border-emerald-600 p-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex flex-col items-center gap-0.5"
                    >
                      <span>Nhớ Tốt</span>
                      <span className="text-[9px] font-semibold opacity-80 font-mono">Nhớ rõ (3-6 ngày)</span>
                    </button>

                    {/* Rate 4 */}
                    <button
                      id="rate-easy"
                      onClick={() => handleRate(4)}
                      className="bg-[#2563EB] hover:bg-blue-700 text-white p-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex flex-col items-center gap-0.5 shadow-lg shadow-blue-500/10 active:scale-95 border-2 border-[#2563EB]"
                    >
                      <span>Dễ Quá</span>
                      <span className="text-[9px] font-semibold text-blue-100 font-mono">Bảo chứng (7-14 ngày)</span>
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
          
          <div className="text-center font-mono text-[10px] text-gray-400">
            Mẹo: Nhấn nút phát loa <Volume2 className="inline w-3 h-3 text-gray-300" /> bên cạnh từ tiếng Anh để nghe phát âm chính xác từ vựng học thuật.
          </div>
        </div>
      )}
    </div>
  );
};
