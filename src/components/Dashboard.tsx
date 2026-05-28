import React, { useMemo } from "react";
import { WordRoot, SRSState, UserStats } from "../types";
import { BookOpen, Award, CheckCircle2, RefreshCw, Zap, Flame, BrainCircuit, Compass } from "lucide-react";

interface DashboardProps {
  allRoots: WordRoot[];
  srsData: Record<string, SRSState>;
  stats: UserStats;
  onNavigate: (tab: string) => void;
  onStartStudy: (mode: "due" | "new" | "all") => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  allRoots,
  srsData,
  stats,
  onNavigate,
  onStartStudy,
}) => {
  // Count states
  const srsCounts = useMemo(() => {
    const counts = { New: 0, Learning: 0, Reviewing: 0, Mastered: 0 };
    (Object.values(srsData) as SRSState[]).forEach((state) => {
      counts[state.status] += 1;
    });
    return counts;
  }, [srsData]);

  // Determine what is due today
  const dueCount = useMemo(() => {
    const now = new Date();
    return (Object.values(srsData) as SRSState[]).filter((state) => {
      return state.status !== "New" && new Date(state.nextReviewAt) <= now;
    }).length;
  }, [srsData]);

  const newCardsAvailable = srsCounts.New;

  const masteredPercentage = useMemo(() => {
    if (allRoots.length === 0) return 0;
    return Math.round((srsCounts.Mastered / allRoots.length) * 100);
  }, [allRoots, srsCounts]);

  const activeRecallPercentage = useMemo(() => {
    const total = stats.totalCardsReviewed;
    if (total === 0) return 100;
    return Math.round((stats.correctAnswersCount / total) * 100);
  }, [stats]);

  // Dynamic advice
  const dailyMnemonicQuote = useMemo(() => {
    const quotes = [
      "Học gốc từ (Roots) giúp đoán nghĩa đến 80% từ mới trong IELTS Reading mà không cần tra từ điển.",
      "Lặp lại ngắt quãng kích thích não bộ chuyển thông tin từ ký ức ngắn hạn sang dài hạn trước khi quên.",
      "Hãy nhấn 'Chưa thuộc' (Again) nếu mất quá 5 giây để nhớ nghĩa gốc từ. Sự trung thực nâng cao hiệu năng SRS.",
      "Gốc 'SPEC/SPIC' có nghĩa là 'Nhìn' - xuất hiện trong Spectacular (hoành mỹ), Inspect (thang tra), Conspicuous (lộ liễu).",
      "Gốc 'BENE' là tốt lành, đối nghịch hoàn toàn với 'MAL' mang nghĩa tồi tệ, lỗi hoặc độc ác."
    ];
    const index = new Date().getDate() % quotes.length;
    return quotes[index];
  }, []);

  return (
    <div id="dashboard-tab" className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-[#0F172A] rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border-l-4 border-l-[#2563EB]">
        <div className="relative z-10 max-w-2xl">
          <span className="bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/30 font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            PHƯƠNG PHÁP HỌC TỐI ƯU
          </span>
          <h1 className="text-3xl font-black tracking-tight mt-3 text-white leading-tight font-sans">
            CHINH PHỤC IELTS READING QUA 100+ GỐC TỪ & LẶP LẠI NGẮT QUÃNG
          </h1>
          <p className="text-slate-300 mt-2 text-sm md:text-base leading-relaxed">
            Học thông minh thay vì học vẹt. Bóc tách tiền tố, hậu tố và áp dụng thuật toán lặp lại ngắt quãng chuẩn khoa học để thuộc vĩnh viễn từ vựng điểm cao.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              id="btn-study-due"
              onClick={() => onStartStudy("due")}
              className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                dueCount > 0 
                  ? "bg-[#2563EB] hover:bg-blue-700 text-white shadow-md active:scale-95" 
                  : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
              }`}
              disabled={dueCount === 0}
            >
              <RefreshCw className={`w-4 h-4 ${dueCount > 0 ? "animate-spin-slow" : ""}`} />
              ÔN TẬP ĐẾN HẠN ({dueCount})
            </button>
            <button
              id="btn-study-new"
              onClick={() => onStartStudy("new")}
              className="bg-white hover:bg-gray-100 text-[#0F172A] px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              HỌC TỪ GỐC MỚI ({newCardsAvailable})
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 top-0 opacity-10 hidden md:block select-none pointer-events-none">
          <BrainCircuit className="w-96 h-96 -mr-10 -mt-10" />
        </div>
      </div>

      {/* Dynamic Daily Tips */}
      <div className="bg-amber-50/70 border border-amber-200/50 rounded-xl p-4 flex items-start gap-3.5">
        <Zap className="text-amber-600 w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-xs md:text-sm text-amber-900">
          <strong className="font-semibold text-amber-950">Mẹo vàng hôm nay:</strong> {dailyMnemonicQuote}
        </div>
      </div>

      {/* Key Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div id="stat-card-streak" className="bg-white border-2 border-[#0F172A] rounded-xl p-5 shadow-[4px_4px_0px_0px_#0F172A] flex items-center gap-4 hover:translate-y-[-2px] transition-all">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="font-mono text-2xl font-black text-gray-900">{stats.streak} ngày</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Chuỗi liên tục</div>
          </div>
        </div>

        {/* Due Count */}
        <div id="stat-card-due" className="bg-white border-2 border-[#0F172A] rounded-xl p-5 shadow-[4px_4px_0px_0px_#0F172A] flex items-center gap-4 hover:translate-y-[-2px] transition-all">
          <div className="p-3 bg-blue-50 rounded-lg text-[#2563EB]">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <div className="font-mono text-2xl font-black text-gray-900">{dueCount} gốc</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Cần ôn ngay</div>
          </div>
        </div>

        {/* Mastered Percentage */}
        <div id="stat-card-mastered" className="bg-white border-2 border-[#0F172A] rounded-xl p-5 shadow-[4px_4px_0px_0px_#0F172A] flex items-center gap-4 hover:translate-y-[-2px] transition-all">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="font-mono text-2xl font-black text-gray-900">{masteredPercentage}%</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Đã làm chủ</div>
          </div>
        </div>

        {/* Review Accuracy */}
        <div id="stat-card-recall" className="bg-white border-2 border-[#0F172A] rounded-xl p-5 shadow-[4px_4px_0px_0px_#0F172A] flex items-center gap-4 hover:translate-y-[-2px] transition-all">
          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="font-mono text-2xl font-black text-gray-900">{activeRecallPercentage}%</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Độ chính xác</div>
          </div>
        </div>
      </div>

      {/* Progress detail (Bento grid style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Progress gauge card */}
        <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-6 shadow-sm md:col-span-1 space-y-6">
          <h3 className="font-sans font-black text-[#0F172A] uppercase tracking-wider text-sm">Hành Trình Ghi Nhớ</h3>
          
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-gray-100 fill-none"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-[#2563EB] fill-none transition-all duration-1000"
                  strokeWidth="8"
                  strokeDasharray={`${2.512 * masteredPercentage} 251.2`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="font-mono text-2xl font-black text-gray-900">{masteredPercentage}%</span>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tỷ lệ thuộc</p>
              </div>
            </div>
            <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
              *Mục tiêu Mastered đạt được khi gốc từ có thời gian ngắt quãng giãn ra trên 14 ngày.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="font-mono text-base font-black text-gray-900 block">
                {srsCounts.Mastered} / {allRoots.length}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Đã thuộc lòng</span>
            </div>
            <div>
              <span className="font-mono text-base font-black text-gray-900 block">
                {stats.totalCardsReviewed}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tác động SRS</span>
            </div>
          </div>
        </div>

        {/* Spaced repetition stage details card */}
        <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-6 shadow-sm md:col-span-2 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-sans font-black text-[#0F172A] uppercase tracking-wider text-sm mb-4">Các Cấp Độ Kiểm Soát</h3>
            
            <div className="space-y-4">
              {/* New Cards */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span className="flex items-center gap-2 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                    Mới Toanh (New)
                  </span>
                  <span className="font-mono font-bold">{srsCounts.New} gốc từ ({Math.round(srsCounts.New / allRoots.length * 100) || 0}%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-gray-400 h-full transition-all" style={{ width: `${(srsCounts.New / allRoots.length) * 100}%` }}></div>
                </div>
              </div>

              {/* Learning Cards */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span className="flex items-center gap-2 text-amber-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Đang Học (Learning)
                  </span>
                  <span className="font-mono font-bold">{srsCounts.Learning} gốc từ ({Math.round(srsCounts.Learning / allRoots.length * 100) || 0}%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full transition-all" style={{ width: `${(srsCounts.Learning / allRoots.length) * 100}%` }}></div>
                </div>
              </div>

              {/* Reviewing Cards */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span className="flex items-center gap-2 text-indigo-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    Đang Ôn (Reviewing)
                  </span>
                  <span className="font-mono font-bold">{srsCounts.Reviewing} gốc từ ({Math.round(srsCounts.Reviewing / allRoots.length * 100) || 0}%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full transition-all" style={{ width: `${(srsCounts.Reviewing / allRoots.length) * 100}%` }}></div>
                </div>
              </div>

              {/* Mastered Cards */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span className="flex items-center gap-2 text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    Thành Thạo (Mastered)
                  </span>
                  <span className="font-mono font-bold">{srsCounts.Mastered} gốc từ ({Math.round(srsCounts.Mastered / allRoots.length * 100) || 0}%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full transition-all" style={{ width: `${(srsCounts.Mastered / allRoots.length) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 mt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate("boulevard")}
              className="flex-1 border-2 border-gray-200 hover:border-[#0F172A] text-gray-700 hover:bg-slate-50 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Compass className="w-4 h-4" />
              KHÁM PHÁ ĐẠI LỘ GỐC TỪ
            </button>
            <button
              onClick={() => onNavigate("practice")}
              className="flex-1 border-2 border-[#2563EB]/40 hover:border-[#2563EB] text-[#2563EB] hover:bg-blue-50 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Award className="w-4 h-4" />
              ĐẤU TRƯỜNG TRẮC NGHIỆM
            </button>
          </div>
        </div>

      </div>

      {/* AI Invitation Box */}
      <div className="bg-[#0F172A] text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative border-2 border-[#0F172A]">
        <div className="space-y-2 max-w-xl">
          <span className="bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/30 font-mono text-[9px] px-2.5 py-0.5 rounded-md uppercase tracking-wider font-semibold">
            TÍNH NĂNG CAO CẤP
          </span>
          <h3 className="text-xl font-black tracking-tight uppercase">AI phân tích gốc từ trong bài đọc IELTS bất kỳ</h3>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Bạn vừa đọc một bài báo hoặc đoạn văn IELTS Reading hóc búa? Hãy dán nó cho vị Cố vấn AI bóc tách trực tiếp các gốc từ cổ đại ẩn giấu bên trong, tạo mẹo nhớ tức thời và thêm vào học phần SRS cá nhân của bạn!
          </p>
        </div>
        <button
          onClick={() => onNavigate("coach")}
          className="bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider shrink-0 transition-all shadow-md flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center active:scale-95"
        >
          <BrainCircuit className="w-4 h-4" />
          KÍCH HOẠT CỐ VẤN AI
        </button>
      </div>
    </div>
  );
};
