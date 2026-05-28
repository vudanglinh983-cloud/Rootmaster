import React, { useState } from "react";
import { WordRoot, SRSState } from "../types";
import { BrainCircuit, Loader2, Sparkles, AlertCircle, Save, CheckCircle, HelpCircle } from "lucide-react";

interface AiRootCoachProps {
  onImportCustomRoot: (customRoot: WordRoot) => void;
  allRoots: WordRoot[];
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

export const AiRootCoach: React.FC<AiRootCoachProps> = ({
  onImportCustomRoot,
  allRoots,
}) => {
  const [passage, setPassage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ExtractedRootResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Track which roots have been imported successfully to avoid double importing
  const [importedRoots, setImportedRoots] = useState<Record<string, boolean>>({});

  const samplePassages = [
    {
      title: "Chủ đề Không Gian (Aerospace & Celestial)",
      text: "Governments around the world have dramatically boosted investments in private aerospace corporations this decade. Researchers are collaborating globally, utilizing sophisticated telescopes to inspect microscopic dust particles and monitor cellular senescence of organisms. Finding a sustainable ecological equilibrium in space remains as an extraordinary challenge for posterity."
    },
    {
      title: "Chủ đề Y tế & Xã hội (Malfunctions & Epidemics)",
      text: "The medical community is currently facing an acute shortage of skilled practitioners. A malignant tumor was detected during a routine biopsy because a flight scanner suffered a temporal malfunction. To alleviate these chronic structural issues, schools must incorporate health demographics in their curriculum."
    }
  ];

  const handleAnalyze = async () => {
    if (!passage || passage.trim() === "") {
      setError("Vui lòng nhập hoặc chọn một đoạn văn bản tiếng Anh để phân tích.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch("/api/analyze-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: passage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Không thể kết nối đến máy chủ phân tích gốc từ.");
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Lỗi định dạng dữ liệu AI phản hồi. Vui lòng thử lại.");
      }

      setResults(data);
    } catch (err: any) {
      console.error("Lỗi phân tích AI:", err);
      setError(err?.message || "Đã xảy ra sự cố đột ngột trong quá trình kết nối với AI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = (item: ExtractedRootResult) => {
    const rootUpper = item.root.toUpperCase().trim();
    const cleanId = `cust_${rootUpper.replace(/[^A-Z]/g, "")}_${Date.now()}`;

    // Verify if this root already exists in current loaded database to prevent duplication
    const isDuplicate = allRoots.some(
      (r) => r.root.toUpperCase().trim() === rootUpper
    );

    if (isDuplicate) {
      alert(`Gốc từ "${rootUpper}" đã tồn tại sẵn trong hệ thống học tập của bạn rồi nhé!`);
      return;
    }

    // Convert extracted format back to standard WordRoot type
    const newRoot: WordRoot = {
      id: cleanId,
      root: rootUpper,
      meaning: item.meaning,
      origin: item.originalGreekLatin,
      description: `Gốc từ tự động phân tích bằng AI từ từ vựng: ${item.detectedWord} (${item.wordDefinition}).`,
      tip: item.quickTip,
      category: "People & Society", // Default category
      exampleWords: [
        {
          word: item.detectedWord,
          partOfSpeech: "n/v/adj",
          meaning: item.wordDefinition,
          visualBreakdown: `Gốc [ ${rootUpper} ] tích hợp trong trường nghĩa cấu trúc từ học`,
          ieltsSentence: item.ieltsSentence,
          vietnameseTranslation: "Bản dịch câu mẫu trích lọc qua phân tích AI."
        }
      ]
    };

    onImportCustomRoot(newRoot);
    setImportedRoots((prev) => ({ ...prev, [rootUpper]: true }));
  };

  return (
    <div id="coach-tab" className="space-y-6">
      
      {/* Coach Introduction */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-[#0F172A] uppercase tracking-tight flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-[#2563EB] animate-pulse" />
          Mổ Xẻ Đọc Hiểu IELTS Bằng AI (AI Word Roots Coach)
        </h2>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          Lập tức tìm kiếm, bóc tách và phân tích các gốc từ ẩn sâu bên trong bài đọc IELTS thực chiến của bạn. Khám phá các mối liên hệ ngữ và đưa chúng thẳng vào bộ ôn tập lặp lại ngắt quãng SRS cá nhân!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Input Passage form */}
        <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#0F172A] lg:col-span-1 space-y-4">
          <h3 className="font-sans font-black text-[#0F172A] text-sm uppercase tracking-wider">Nhập Đoạn Văn Bản Cần Phân Tích</h3>
          
          <div className="space-y-3">
            <textarea
              id="coach-passage-textarea"
              placeholder="Dán đoạn văn IELTS, bài báo kinh tế hoặc danh sách từ vựng tiếng Anh tại đây để bắt đầu dò tìm gốc rễ..."
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
              className="w-full h-48 p-3.5 bg-gray-50 border-2 border-[#0F172A] focus:border-[#2563EB] focus:bg-white rounded-xl text-xs md:text-sm placeholder-gray-400 font-semibold focus:outline-hidden transition-all resize-none"
              disabled={isLoading}
            />

            {error && (
              <div className="bg-rose-50 border-2 border-rose-500 text-rose-950 rounded-xl p-3 text-xs flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              id="btn-coach-analyze"
              onClick={handleAnalyze}
              disabled={isLoading || !passage.trim()}
              className="w-full bg-[#2563EB] hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-black uppercase tracking-wider text-xs py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Đang bóc tách tế bào từ vựng...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Phân Tích Đoạn Văn Bằng AI
                </>
              )}
            </button>
          </div>

          {/* Quick templates */}
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Đoạn mẫu thử thách nhanh:</span>
            <div className="space-y-2">
              {samplePassages.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPassage(p.text);
                    setError(null);
                  }}
                  className="w-full text-left p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[11px] text-gray-700 transition-colors cursor-pointer leading-normal block"
                >
                  <strong className="text-gray-900 font-bold block mb-0.5">💡 {p.title}</strong>
                  {p.text.slice(0, 100)}...
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Results list */}
        <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#0F172A] lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 className="font-sans font-black text-[#0F172A] text-sm uppercase tracking-wider">Gốc Từ Chiết Tách Bởi AI ({results.length})</h3>
            <span className="text-xs text-gray-400 font-mono">Bảo chứng phân tích hiệu suất cao</span>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 font-sans">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#2563EB] animate-spin absolute" />
                <BrainCircuit className="w-6 h-6 text-[#0F172A] animate-pulse absolute" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-[#0F172A] text-sm uppercase tracking-tight">Đang tháo gỡ mật mã Etymology...</p>
                <p className="text-xs text-gray-400 max-w-sm leading-relaxed font-medium">
                  Trợ lý AI đang rà quét Latin/Greek roots ẩn giấu, tổng hợp trường nghĩa IELTS và biên soạn mẹo nhớ nhanh. Phân tích này kéo dài khoảng 8 giây.
                </p>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center p-6 bg-slate-50 border-2 border-dashed border-gray-200 rounded-2xl">
              <HelpCircle className="w-12 h-12 text-gray-300 mb-2 animate-bounce" />
              <h4 className="font-bold text-gray-700 uppercase tracking-wider">Chưa có kết quả phân tích!</h4>
              <p className="text-xs text-gray-400 mt-1 max-w-md leading-relaxed font-semibold">
                Hãy dán một đoạn văn bản tiếng Anh sang cột bên tay trái, hoặc nhấp vào một trong các <strong>đoạn mẫu định dạng sẵn</strong> để xem sự kỳ diệu từ cách phân tích gốc từ của AI.
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {results.map((item, idx) => {
                const rootUpper = item.root.toUpperCase().trim();
                const isAlreadyImported = importedRoots[rootUpper] || false;
                
                return (
                  <div
                    key={idx}
                    className="bg-white hover:bg-slate-55 border-2 border-[#0F172A] rounded-2xl p-5 space-y-4 transition-all relative"
                  >
                    {/* Header info */}
                    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-gray-250 pb-2">
                      <div className="space-y-0.5">
                        <span className="font-sans text-lg font-black text-[#2563EB] tracking-tight uppercase">
                          {item.root}
                        </span>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">Bản thể: {item.originalGreekLatin}</p>
                      </div>

                      <div className="text-xs text-[#2563EB] font-black uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                        Ý nghĩa gốc: {item.meaning}
                      </div>
                    </div>

                    {/* Mnemonic trick & word found */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Tip */}
                      <div className="bg-amber-50 border-2 border-[#0F172A] p-3 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block font-mono">💡 Mẹo Nhớ Siêu Tốc</span>
                        <p className="text-xs text-amber-950 font-semibold leading-relaxed">{item.quickTip}</p>
                      </div>

                      {/* Word found details */}
                      <div className="bg-white border-2 border-[#0F172A] p-3 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block font-mono">🔍 Từ vựng trích tách</span>
                        <strong className="text-xs text-[#2563EB] font-black uppercase">{item.detectedWord}</strong>: <span className="text-xs text-slate-800 font-semibold">{item.wordDefinition}</span>
                      </div>
                    </div>

                    {/* Example phrase */}
                    <div className="space-y-1 pt-1 border-l-2 border-[#2563EB] pl-3">
                      <p className="text-xs text-gray-600 font-mono italic leading-relaxed">"{item.ieltsSentence}"</p>
                    </div>

                    {/* Import to Spaced repetition database action */}
                    <div className="flex justify-end pt-2">
                      {isAlreadyImported ? (
                        <button
                          disabled
                          className="bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider text-[11px] px-3.5 py-2 rounded-lg flex items-center gap-1.5 cursor-not-allowed border-2 border-emerald-300"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          Đã thêm thành công!
                        </button>
                      ) : (
                        <button
                          onClick={() => handleImport(item)}
                          className="bg-[#2563EB] hover:bg-blue-700 text-white font-black uppercase tracking-wider text-[11px] px-4 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
                        >
                          <Save className="w-3.5 h-3.5" />
                          Lưu vào Đấu trường SRS
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
