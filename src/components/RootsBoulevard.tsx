import React, { useState, useMemo } from "react";
import { WordRoot, RootCategory } from "../types";
import { Search, ChevronDown, ChevronUp, HelpCircle, Lightbulb, GraduationCap, Compass, HelpCircle as HelpIcon } from "lucide-react";

interface RootsBoulevardProps {
  allRoots: WordRoot[];
}

export const RootsBoulevard: React.FC<RootsBoulevardProps> = ({ allRoots }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<RootCategory | "All">("All");
  const [expandedRootId, setExpandedRootId] = useState<string | null>(null);

  const categories: (RootCategory | "All")[] = ["All", "Quality & State", "Actions & Motion", "Time & Space", "People & Society"];

  // Filter and search
  const filteredRoots = useMemo(() => {
    return allRoots.filter((root) => {
      const matchCategory = selectedCategory === "All" || root.category === selectedCategory;
      const cleanSearch = searchTerm.toLowerCase().trim();
      const matchSearch =
        root.root.toLowerCase().includes(cleanSearch) ||
        root.meaning.toLowerCase().includes(cleanSearch) ||
        root.tip.toLowerCase().includes(cleanSearch) ||
        root.exampleWords.some(
          (w) =>
            w.word.toLowerCase().includes(cleanSearch) ||
            w.meaning.toLowerCase().includes(cleanSearch)
        );
      return matchCategory && matchSearch;
    });
  }, [allRoots, selectedCategory, searchTerm]);

  const toggleExpand = (id: string) => {
    if (expandedRootId === id) {
      setExpandedRootId(null);
    } else {
      setExpandedRootId(id);
    }
  };

  const getCategoryTheme = (category: RootCategory) => {
    switch (category) {
      case "Quality & State":
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          dot: "bg-amber-500",
        };
      case "Actions & Motion":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          dot: "bg-blue-500",
        };
      case "Time & Space":
        return {
          bg: "bg-indigo-50 text-indigo-800 border-indigo-200",
          dot: "bg-indigo-500",
        };
      case "People & Society":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          dot: "bg-emerald-600",
        };
    }
  };

  return (
    <div id="boulevard-tab" className="space-y-6">
      
      {/* Boulevard Header Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#0F172A] uppercase tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#2563EB]" />
            Đại Lộ Gốc Từ (Roots Boulevard)
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Tra cứu và nghiên cứu cấu trúc {allRoots.length} gốc từ cốt lõi, bao phủ hơn 80% từ vựng học thuật trong đề thi IELTS Reading.
          </p>
        </div>
        <div className="font-mono text-xs text-gray-500 bg-gray-100 rounded-lg px-3 py-1.5 self-start md:self-auto border border-gray-200">
          Đang hiển thị: <strong className="text-[#0F172A] text-[13px] font-black">{filteredRoots.length} GỐC</strong>
        </div>
      </div>

      {/* Filters & Searching Toolbar */}
      <div className="bg-white border-2 border-[#0F172A] rounded-xl p-4 gap-4 flex flex-col md:flex-row md:items-center">
        {/* Search tool */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            id="search-roots-input"
            type="text"
            placeholder="Tìm gốc từ, từ vựng IELTS, nghĩa hoặc mẹo nhớ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2563EB] focus:bg-white rounded-xl text-sm placeholder-gray-400 font-medium focus:outline-hidden transition-all"
          />
        </div>

        {/* Category filtering pills */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer transition-all border ${
                  isActive
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-xs"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-250 text-gray-600"
                }`}
              >
                {cat === "All" ? "Tất Cả" : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Roots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoots.length === 0 ? (
          <div className="col-span-full py-16 bg-white border-2 border-[#0F172A] rounded-2xl flex flex-col items-center justify-center text-center p-6 shadow-sm">
            <HelpIcon className="w-12 h-12 text-gray-300 mb-2 animate-bounce" />
            <h4 className="font-bold text-gray-800 uppercase tracking-wide">Không tìm thấy gốc từ nào khớp!</h4>
            <p className="text-xs text-gray-450 mt-1 max-w-md">
              Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn lọc cấp độ danh mục khác nhé.
            </p>
          </div>
        ) : (
          filteredRoots.map((item) => {
            const isExpanded = expandedRootId === item.id;
            const theme = getCategoryTheme(item.category);
            return (
              <div
                key={item.id}
                id={`root-item-${item.id}`}
                className={`bg-white border-2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md ${
                  isExpanded ? "ring-2 ring-[#0F172A] border-[#0F172A]" : "border-[#0F172A]"
                }`}
              >
                {/* Expandable title row */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none hover:bg-gray-50/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-xl font-black text-[#0F172A] uppercase tracking-wide">
                        {item.root}
                      </span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${theme.bg}`}>
                        {item.category === "Quality & State" ? "T.Chất" : item.category === "Actions & Motion" ? "H.Động" : item.category === "Time & Space" ? "K.Gian" : "X.Hội"}
                      </span>
                    </div>
                    <div className="font-sans text-sm font-semibold text-gray-700">
                      Nghĩa: {item.meaning}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] text-gray-400 hidden sm:inline">{item.origin}</span>
                    <div className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-500 border border-gray-200">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="p-5 border-t-2 border-[#0F172A] bg-gray-50 space-y-4">
                    {/* Background description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Origin & Concept info */}
                      <div className="space-y-1 bg-white p-3 rounded-lg border-2 border-[#0F172A]">
                        <div className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-[#2563EB]" />
                          Nguồn Gốc & Khái Niệm
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed pt-1">
                          <strong className="text-gray-800">{item.origin}</strong>: {item.description}
                        </p>
                      </div>

                      {/* Memorization Tip */}
                      <div className="space-y-1 bg-amber-50 p-3 rounded-lg border-2 border-[#0F172A]">
                        <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                          Mẹo Nhớ Siêu Nhanh
                        </div>
                        <p className="text-xs text-amber-950 font-semibold leading-relaxed pt-1">
                          {item.tip}
                        </p>
                      </div>
                    </div>

                    {/* IELTS Vocabulary usage showcase */}
                    <div className="space-y-2.5">
                      <div className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider font-mono">
                        Phổ Từ Vựng IELTS Thực Tế
                      </div>

                      <div className="space-y-3">
                        {item.exampleWords.map((wordObj, wIdx) => (
                          <div
                            key={wIdx}
                            className="bg-white rounded-lg p-3.5 border-2 border-[#0F172A] space-y-2 hover:translate-y-[-1px] transition-all"
                          >
                            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-100 pb-1.5">
                              <span className="font-sans text-sm font-black text-[#2563EB] uppercase">
                                {wordObj.word} <span className="text-xs text-gray-400 font-normal italic font-sans lowercase">( {wordObj.partOfSpeech} )</span>
                              </span>
                              <span className="text-xs text-[#2563EB] font-bold tracking-tight text-right">
                                {wordObj.meaning}
                              </span>
                            </div>

                            {/* Breakdown morphological map */}
                            <div className="text-[11px] text-gray-500 italic bg-gray-50 p-2 rounded-md font-mono border border-gray-200">
                              <span className="font-bold text-gray-600">Sơ đồ:</span> {wordObj.visualBreakdown}
                            </div>

                            {/* Sentence context */}
                            <div className="space-y-1">
                              <span className="text-xs text-gray-600 block pl-2 border-l-2 border-[#2563EB] italic leading-relaxed">
                                "{wordObj.ieltsSentence}"
                              </span>
                              <span className="text-[11px] text-gray-400 block pl-2 leading-relaxed font-semibold">
                                👉 Dịch nghĩa: {wordObj.vietnameseTranslation}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
