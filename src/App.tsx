import { useState, useEffect, useMemo, useTransition } from "react";
import { WordRoot, SRSState, UserStats, RootCategory } from "./types";
import { rootsData } from "./data/rootsData";
import { initializeSRSDatabase, saveSRSDatabase } from "./lib/srsHelper";

// Import Modular Subcomponents
import { Dashboard } from "./components/Dashboard";
import { RootsBoulevard } from "./components/RootsBoulevard";
import { AiRootCoach } from "./components/AiRootCoach";
import { TopicVocabArena } from "./components/TopicVocabArena";

// React icons
import { LayoutDashboard, Compass, BrainCircuit, Sparkles, Maximize2, Minimize2 } from "lucide-react";

export default function App() {
  // Navigation Tabs state
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isPending, startTransition] = useTransition();

  // Full-Screen Focus Mode for PC / Laptop (Hides navigation sidebar and expands workspace)
  const [isFullScreenFocus, setIsFullScreenFocus] = useState<boolean>(false);

  const toggleFullScreenFocus = () => {
    setIsFullScreenFocus((prev) => {
      const next = !prev;
      if (next) {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } else {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
      return next;
    });
  };

  useEffect(() => {
    const handleFsChange = () => {
      if (!document.fullscreenElement && isFullScreenFocus) {
        // user pressed ESC to leave native fullscreen, we can sync or keep layout
      }
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, [isFullScreenFocus]);

  // Active study parameters mapping to SRS
  const [studyMode, setStudyMode] = useState<"due" | "new" | "all">("due");

  // Roots storage state (predefined + custom ones extracted by AI)
  const [customRoots, setCustomRoots] = useState<WordRoot[]>([]);
  const [srsData, setSrsData] = useState<Record<string, SRSState>>({});

  // Global user statistics
  const [stats, setStats] = useState<UserStats>({
    streak: 0,
    lastActiveDate: null,
    totalCardsReviewed: 0,
    correctAnswersCount: 0,
    masteredCount: 0,
  });

  // Load and initialize data on mount
  useEffect(() => {
    // 1. Gather custom user-analyzed roots
    const storedCustom = localStorage.getItem("ielts_roots_custom_v1");
    let loadedCustom: WordRoot[] = [];
    if (storedCustom) {
      try {
        loadedCustom = JSON.parse(storedCustom);
        setCustomRoots(loadedCustom);
      } catch (e) {
        console.error("Error reading custom roots:", e);
      }
    }

    // 2. Aggregate active pool of root IDs
    const allIds = [
      ...rootsData.map((r) => r.id),
      ...loadedCustom.map((r) => r.id),
    ];

    // 3. Initialize SRS Sm-2 scheduling database
    const db = initializeSRSDatabase(allIds);
    setSrsData(db);

    // 4. Load Stats
    const storedStats = localStorage.getItem("ielts_roots_stats_v1");
    if (storedStats) {
      try {
        const parsedStats = JSON.parse(storedStats);
        
        // Calculate Streak logic based on date
        const todayStr = new Date().toISOString().split("T")[0];
        let calculatedStreak = parsedStats.streak || 0;

        if (parsedStats.lastActiveDate) {
          const lastActiveStr = parsedStats.lastActiveDate.split("T")[0];
          
          if (lastActiveStr === todayStr) {
            // Already active today, maintain streak
          } else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split("T")[0];

            if (lastActiveStr === yesterdayStr) {
              // Active yesterday, maintain streak
            } else {
              // Skipped, reset to 1
              calculatedStreak = calculatedStreak > 0 ? 1 : 0;
            }
          }
        }

        setStats({
          ...parsedStats,
          streak: calculatedStreak,
        });
      } catch (e) {
        console.error("Error parsing stats:", e);
      }
    } else {
      // First time user gets 1 streak to motivate
      setStats({
        streak: 1,
        lastActiveDate: new Date().toISOString(),
        totalCardsReviewed: 0,
        correctAnswersCount: 0,
        masteredCount: 0,
      });
    }
  }, []);

  // Merge predefined static 102 roots and custom AI-mined ones
  const mergedRoots = useMemo(() => {
    return [...rootsData, ...customRoots];
  }, [customRoots]);

  // Handle saving and propagation of SRS rating events
  const handleSrsStateUpdate = (
    newDb: Record<string, SRSState>,
    rateMetric: { correct: boolean }
  ) => {
    setSrsData(newDb);
    saveSRSDatabase(newDb);

    // Update global statistics
    const todayISO = new Date().toISOString();
    const todayStr = todayISO.split("T")[0];
    
    let currentStreak = stats.streak;
    const lastActiveStr = stats.lastActiveDate ? stats.lastActiveDate.split("T")[0] : "";

    if (lastActiveStr !== todayStr) {
      // Advance streak since user performs a study action on a new day
      currentStreak += 1;
    }

    // Recalculate Mastered totals in pool
    const masteredCount = Object.values(newDb).filter(
      (state) => state.status === "Mastered"
    ).length;

    const newStats: UserStats = {
      streak: Math.max(1, currentStreak),
      lastActiveDate: todayISO,
      totalCardsReviewed: stats.totalCardsReviewed + 1,
      correctAnswersCount: stats.correctAnswersCount + (rateMetric.correct ? 1 : 0),
      masteredCount,
    };

    setStats(newStats);
    localStorage.setItem("ielts_roots_stats_v1", JSON.stringify(newStats));
  };

  // Helper interfaces for quick practice arena questions metrics
  const handleCorrectPracticeAnswer = () => {
    const updatedStats = {
      ...stats,
      correctAnswersCount: stats.correctAnswersCount + 1,
      lastActiveDate: new Date().toISOString(),
    };
    setStats(updatedStats);
    localStorage.setItem("ielts_roots_stats_v1", JSON.stringify(updatedStats));
  };

  const handleTotalPracticeAnswer = () => {
    const updatedStats = {
      ...stats,
      totalCardsReviewed: stats.totalCardsReviewed + 1,
      lastActiveDate: new Date().toISOString(),
    };
    setStats(updatedStats);
    localStorage.setItem("ielts_roots_stats_v1", JSON.stringify(updatedStats));
  };

  // Callback to import brand new custom roots dissected via AI
  const handleImportCustomRoot = (newRoot: WordRoot) => {
    const updatedCustomList = [...customRoots, newRoot];
    setCustomRoots(updatedCustomList);
    localStorage.setItem("ielts_roots_custom_v1", JSON.stringify(updatedCustomList));

    // Register initial SRS state parameters for new root immediately
    const nowISO = new Date().toISOString();
    const initialSrsState: SRSState = {
      rootId: newRoot.id,
      status: "New",
      intervalDays: 0,
      easeFactor: 2.5,
      repetitions: 0,
      lastReviewedAt: null,
      nextReviewAt: nowISO, // due immediately
    };

    const newDb = { ...srsData, [newRoot.id]: initialSrsState };
    setSrsData(newDb);
    saveSRSDatabase(newDb);
  };

  const startSrsStudySession = (_mode?: "due" | "new" | "all") => {
    setActiveTab("boulevard");
  };

  // Calculate dynamic progress percent for header progress tracking
  const progressPercent = useMemo(() => {
    if (mergedRoots.length === 0) return 0;
    const srsValues = Object.values(srsData) as SRSState[];
    const nonNewCount = srsValues.filter((state) => state.status !== "New").length;
    return Math.min(100, Math.round((nonNewCount / mergedRoots.length) * 100));
  }, [srsData, mergedRoots]);

  return (
    <div className="min-h-screen bg-[#F5F7F9] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-950">
      
      {/* Prime Top Branding Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
            <div className="w-9 h-9 bg-[#2563EB] text-white rounded-lg flex items-center justify-center font-mono font-black text-lg shadow-sm">
              R
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#0F172A] flex items-center">
                ROOT<span className="text-[#2563EB]">MASTER</span>
                <span className="bg-blue-50 text-[#2563EB] text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm ml-2 border border-blue-100">
                  SRS
                </span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Fullscreen focus toggle button in header */}
            <button
              onClick={toggleFullScreenFocus}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isFullScreenFocus
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
              }`}
              title={isFullScreenFocus ? "Thoát toàn màn hình (Hiện lại mục lục)" : "Toàn màn hình (Ẩn mục lục để xem từ vựng tối ưu)"}
            >
              {isFullScreenFocus ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullScreenFocus ? "Hiện mục lục" : "Toàn màn hình"}</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">TIẾN ĐỘ HỌC</span>
              <div className="w-28 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#2563EB] h-full transition-all" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <span className="text-xs font-mono font-bold text-[#0F172A]">{progressPercent}%</span>
            </div>
            <div className="h-4 w-px bg-gray-200 hidden md:block"></div>
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full text-amber-800">
              <span className="text-xs font-bold font-mono">STREAK: {stats.streak} NGÀY 🔥</span>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen notification bar if sidebar is hidden */}
      {isFullScreenFocus && (
        <div className="bg-blue-50/90 border-b border-blue-200 px-4 py-2 text-xs flex items-center justify-between text-blue-900">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Chế độ Toàn Màn Hình đang bật: Mục lục học phần đã được ẩn để hiển thị tối đa nội dung từ vựng.</span>
          </div>
          <button
            onClick={toggleFullScreenFocus}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 underline flex items-center gap-1 cursor-pointer"
          >
            <Minimize2 className="w-3 h-3" />
            Hiện lại mục lục
          </button>
        </div>
      )}

      {/* Main app grid frame */}
      <main className={`flex-1 w-full mx-auto py-6 flex flex-col md:flex-row gap-6 ${isFullScreenFocus ? "max-w-none px-3 md:px-8" : "max-w-7xl px-4 sm:px-6 lg:px-8"}`}>
        
        {/* Responsive Drawer navigation toolbar (Hidden in full-screen focus mode) */}
        {!isFullScreenFocus && (
          <nav className="w-full md:w-64 shrink-0 bg-white border border-gray-200 rounded-2xl p-4 h-fit md:sticky md:top-22 space-y-1.5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2 block">Mục lục Học Phần</span>
            
            <button
              onClick={() => startTransition(() => setActiveTab("dashboard"))}
              disabled={isPending}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer border ${
                activeTab === "dashboard"
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                  : "text-[#0F172A] bg-white border-transparent hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="w-4.5 h-4.5" />
              BẢNG ĐIỀU KHIỂN
            </button>

            <button
              onClick={() => startTransition(() => setActiveTab("boulevard"))}
              disabled={isPending}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer border ${
                activeTab === "boulevard"
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                  : "text-[#0F172A] bg-white border-transparent hover:bg-gray-100"
              }`}
            >
              <Compass className="w-4.5 h-4.5" />
              ĐẠI LỘ GỐC TỪ
            </button>

            <button
              onClick={() => startTransition(() => setActiveTab("topic_vocab"))}
              disabled={isPending}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer border ${
                activeTab === "topic_vocab"
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                  : "text-[#0F172A] bg-white border-transparent hover:bg-gray-100"
              }`}
            >
              <Sparkles className="w-4.5 h-4.5" />
              VŨ TRỤ TỪ VỰNG CHỦ ĐỀ
            </button>

            <div className="h-px bg-gray-100 my-4"></div>

            <button
              onClick={() => startTransition(() => setActiveTab("coach"))}
              disabled={isPending}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer border ${
                activeTab === "coach"
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                  : "text-[#2563EB] bg-blue-50/50 border-blue-150 hover:bg-blue-50"
              }`}
            >
              <BrainCircuit className="w-4.5 h-4.5" />
              CHUYÊN GIA LINGUIST AI
            </button>
          </nav>
        )}

        {/* Principal Central Workspace Area */}
        <div className="flex-1 min-w-0">
          {activeTab === "dashboard" && (
            <Dashboard
              allRoots={mergedRoots}
              srsData={srsData}
              stats={stats}
              onNavigate={(tab) => setActiveTab(tab)}
              onStartStudy={startSrsStudySession}
            />
          )}

          {activeTab === "boulevard" && <RootsBoulevard allRoots={mergedRoots} />}

          {activeTab === "topic_vocab" && (
            <TopicVocabArena
              isFullScreenFocus={isFullScreenFocus}
              onToggleFullScreen={toggleFullScreenFocus}
            />
          )}

          {activeTab === "coach" && (
            <AiRootCoach
              onImportCustomRoot={handleImportCustomRoot}
              allRoots={mergedRoots}
              userStats={stats}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}
        </div>
      </main>

      {/* Humble Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-400">
          <p>© 2026 IELTS Word Roots SRS. Bọc bởi Bold Typography & Blue Accent Theme.</p>
        </div>
      </footer>
    </div>
  );
}
