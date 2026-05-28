import React, { useState, useEffect, useMemo, useTransition } from "react";
import { WordRoot, QuizQuestion } from "../types";
import { HelpCircle, CheckCircle2, AlertTriangle, RefreshCw, Trophy, ArrowRight, BrainCircuit, Zap } from "lucide-react";

interface PracticeArenaProps {
  allRoots: WordRoot[];
  onCorrectAnswer: () => void;
  onTotalAnswer: () => void;
}

export const PracticeArena: React.FC<PracticeArenaProps> = ({
  allRoots,
  onCorrectAnswer,
  onTotalAnswer,
}) => {
  const [quizType, setQuizType] = useState<"roots" | "sentences">("roots");
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  // Generate a random quiz question dynamically
  const generateQuestion = () => {
    if (allRoots.length < 5) return;
    setSelectedAnswer(null);
    setIsAnswered(false);

    const randomIndex = Math.floor(Math.random() * allRoots.length);
    const targetRoot = allRoots[randomIndex];

    if (quizType === "roots") {
      // Create type 1 Quiz: Guess root meaning
      const correctAnswer = targetRoot.meaning;
      
      // Select 3 random distractors
      const distractors = allRoots
        .filter((r) => r.id !== targetRoot.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((r) => r.meaning);

      const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());

      setCurrentQuestion({
        id: `quiz_roots_${Date.now()}`,
        type: "rootMeaning",
        questionText: `Gốc từ "${targetRoot.root}" dưới đây có nghĩa chính xác nhất là gì?`,
        options,
        correctAnswer,
        context: targetRoot.origin,
        rootId: targetRoot.id,
      });
    } else {
      // Create type 2 Quiz: Complete IELTS sentence
      // Pick a random example word in this root
      if (!targetRoot.exampleWords || targetRoot.exampleWords.length === 0) {
        // Fallback to roots quiz
        setQuizType("roots");
        return;
      }
      const randomWordIdx = Math.floor(Math.random() * targetRoot.exampleWords.length);
      const exWord = targetRoot.exampleWords[randomWordIdx];

      // Replace word with blanks in IELTS sentence
      const regex = new RegExp(`\\b${exWord.word}\\b`, "gi");
      const blankSentence = exWord.ieltsSentence.replace(regex, "____________");

      const correctAnswer = exWord.word;

      // Select 3 random words as distractors
      const distractors: string[] = [];
      const usedIds = new Set<string>([targetRoot.id]);

      while (distractors.length < 3) {
        const dRootIdx = Math.floor(Math.random() * allRoots.length);
        const dRoot = allRoots[dRootIdx];
        if (!usedIds.has(dRoot.id) && dRoot.exampleWords && dRoot.exampleWords.length > 0) {
          const dWord = dRoot.exampleWords[0].word;
          distractors.push(dWord);
          usedIds.add(dRoot.id);
        }
      }

      const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());

      setCurrentQuestion({
        id: `quiz_sentences_${Date.now()}`,
        type: "exampleCompletion",
        questionText: `Hãy lấp đầy khoảng trống tế bọc câu sau đây bằng từ IELTS phù hợp:`,
        options,
        correctAnswer,
        context: blankSentence,
        rootId: targetRoot.id,
        ieltsWord: exWord.meaning,
      });
    }
  };

  useEffect(() => {
    generateQuestion();
  }, [quizType, allRoots]);

  const handleSelectAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQuestion?.correctAnswer;
    onTotalAnswer();
    setQuestionsAnswered((prev) => prev + 1);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      onCorrectAnswer();
    }
  };

  const handleNext = () => {
    generateQuestion();
  };

  // Find root information associated with the current question
  const linkedRoot = useMemo(() => {
    if (!currentQuestion) return null;
    return allRoots.find((r) => r.id === currentQuestion.rootId) || null;
  }, [currentQuestion, allRoots]);

  return (
    <div id="practice-tab" className="space-y-6">
      
      {/* Practice Header with Games switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#0F172A] uppercase tracking-tight flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#2563EB]" />
            Đấu Trường Thực Chiến (Practice Arena)
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Luyện tập nhanh để kiểm chứng trí nhớ của bạn và nâng cao năng lực ứng biến phản xạ IELTS Reading.
          </p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl shrink-0 self-start sm:self-auto border border-gray-200/50">
          <button
            onClick={() => startTransition(() => setQuizType("roots"))}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
              quizType === "roots"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Đoán Nghĩa Gốc Từ
          </button>
          <button
            onClick={() => startTransition(() => setQuizType("sentences"))}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
              quizType === "sentences"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Điền Khuyết Câu IELTS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Quiz Section */}
        <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#0F172A] lg:col-span-2 space-y-6">
          {currentQuestion ? (
            <div className="space-y-6">
              
              {/* Question card */}
              <div className="space-y-3">
                <span className="bg-blue-50 text-[#2563EB] font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border border-blue-200">
                  {currentQuestion.type === "rootMeaning" ? "Thử Thách: Định nghĩa gốc" : "Thử thách: Đọc hiểu ngữ cảnh"}
                </span>
                
                <h3 className="text-base md:text-lg font-black text-[#0F172A] uppercase tracking-tight leading-snug">
                  {currentQuestion.questionText}
                </h3>

                {/* Sub context sentence for fill blanks */}
                {currentQuestion.type === "exampleCompletion" && (
                  <div className="bg-blue-50/30 border-l-4 border-[#2563EB] rounded-lg p-5 italic font-mono space-y-2 mt-4 border border-blue-100">
                    <p className="text-sm md:text-base text-gray-900 leading-relaxed font-semibold">
                      "{currentQuestion.context}"
                    </p>
                    {currentQuestion.ieltsWord && (
                      <div className="text-[11px] text-[#2563EB] font-sans not-italic font-bold block pt-1">
                        👉 Dịch từ cần điền: {currentQuestion.ieltsWord}
                      </div>
                    )}
                  </div>
                )}

                {currentQuestion.type === "rootMeaning" && (
                  <div className="text-[44px] md:text-[56px] font-sans font-black text-[#0F172A] text-center py-6 select-all uppercase tracking-tight">
                    {linkedRoot?.root}
                  </div>
                )}
              </div>

              {/* Multiple choices options list */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                {currentQuestion.options?.map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectAnswer = option === currentQuestion.correctAnswer;
                  
                  let buttonStyle = "bg-gray-50 hover:bg-gray-100 hover:border-[#0F172A] border-2 border-[#0F172A] text-gray-950 font-bold";
                  
                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      buttonStyle = "bg-blue-50 text-blue-900 border-2 border-[#2563EB] font-black";
                    } else if (isSelected) {
                      buttonStyle = "bg-rose-50 text-rose-950 border-2 border-rose-500 font-bold";
                    } else {
                      buttonStyle = "bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`quiz-option-${idx}`}
                      onClick={() => handleSelectAnswer(option)}
                      disabled={isAnswered || isPending}
                      className={`w-full text-left p-4 rounded-xl text-xs md:text-sm transition-all cursor-pointer ${buttonStyle}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span>{option}</span>
                        {isAnswered && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0" />}
                        {isAnswered && isSelected && !isCorrectAnswer && <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 animate-shake" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Answers Explanations details after submission */}
              {isAnswered && linkedRoot && (
                <div className="bg-slate-50 border-2 border-[#0F172A] rounded-xl p-5 space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 border-b border-gray-200 pb-2.5">
                    <BrainCircuit className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-xs md:text-sm font-black text-[#0F172A] uppercase tracking-wider font-sans">
                      Giải mã cấu trúc gốc: {linkedRoot.root}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Meaning analysis */}
                    <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-1">
                      <strong className="text-slate-900 uppercase tracking-wide text-[10px] font-mono">Bản chất Gốc Từ:</strong>
                      <p className="font-bold">{linkedRoot.root} = {linkedRoot.meaning} ({linkedRoot.origin})</p>
                      <p className="text-gray-500 text-[11px] font-medium pt-1">
                        Chi tiết: {linkedRoot.description}
                      </p>
                    </div>

                    {/* Tip details */}
                    <div className="text-xs text-amber-900 leading-relaxed bg-amber-50 p-2.5 rounded-lg border-2 border-amber-200">
                      <strong className="text-amber-950 font-black block uppercase tracking-wide text-[10px] font-mono">💡 Mẹo cốt lõi ghi nhớ:</strong>
                      <p className="mt-0.5">{linkedRoot.tip}</p>
                    </div>
                  </div>

                  {/* Vocabulary references */}
                  <div className="text-xs space-y-2.5 border-t border-gray-205 pt-3">
                    <strong className="text-[#0F172A] block font-black uppercase tracking-wider text-[10px] font-mono">Từ vựng IELTS liên quan</strong>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {linkedRoot.exampleWords.map((wordObj, wIdx) => (
                        <div key={wIdx} className="bg-white border-2 border-[#0F172A] rounded-lg p-3 space-y-1">
                          <strong className="text-[#2563EB] font-black uppercase">{wordObj.word}</strong>: <span className="text-gray-900 font-bold">{wordObj.meaning}</span>
                          <p className="text-[11px] text-gray-500 leading-relaxed pt-1 font-mono">Cấu trúc: {wordObj.visualBreakdown}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Move Next Action button */}
                  <div className="flex justify-end pt-2">
                    <button
                      id="btn-quiz-next"
                      onClick={handleNext}
                      className="bg-[#2563EB] hover:bg-blue-700 text-white font-black text-xs py-2.5 px-5 rounded-xl flex items-center gap-2 cursor-pointer transition-all uppercase tracking-wider shadow-md active:scale-95"
                    >
                      Tiếp tục thách đấu
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[250px] text-gray-400 italic">
              Đang kiến tạo đề thách đấu ngẫu nhiên...
            </div>
          )}
        </div>

        {/* Dynamic Game Score Tally */}
        <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#0F172A] lg:col-span-1 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h4 className="font-sans font-black text-[#0F172A] text-sm uppercase tracking-wider">Thành tích Đấu Trường</h4>

            {/* Percentages circle */}
            <div className="flex flex-col items-center justify-center py-4 space-y-2.5 border-b border-gray-200">
              <div className="font-sans text-4xl font-black text-[#2563EB]">{score} ĐIỂM</div>
              <p className="text-xs text-gray-450 font-semibold">Bạn đã vượt qua: <strong>{questionsAnswered}</strong> câu</p>
            </div>

            {/* Mini facts */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between items-center text-gray-500">
                <span>Trực giác phản xạ:</span>
                <strong className="text-gray-900 font-black">
                  {questionsAnswered > 0 ? Math.round((score / questionsAnswered) * 100) : 100}%
                </strong>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Thử thách loại hình:</span>
                <strong className="text-[#2563EB] font-black uppercase font-sans">
                  {quizType === "roots" ? "Gốc Từ" : "Điền Câu"}
                </strong>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 border-2 border-amber-200 rounded-xl space-y-1.5 flex items-start gap-2.5">
            <Zap className="text-amber-500 w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-950 font-semibold leading-relaxed">
              <strong>Mẹo nhạy:</strong> Điền khuyết câu IELTS trực tiếp đo lường năng lực ngữ cảnh, bổ trợ cực tốt cho kỹ năng Skimming & Scanning trong bài thi đọc thực chiến.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
