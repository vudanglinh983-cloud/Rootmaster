import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI-powered IELTS Reading Text Analyzer
  app.post("/api/analyze-text", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== "string" || text.trim() === "") {
        return res.status(400).json({ error: "Nội dung văn bản phân tích không hợp lệ hoặc đang trống." });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "Hiện tại hệ thống AI chưa được gắn khóa kích hoạt (GEMINI_API_KEY). Vui lòng cấu hình GEMINI_API_KEY trong phần Settings." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Phân tích văn bản tiếng Anh sau đây và trích xuất tối đa 10 gốc từ (Latin/Greek roots) phổ biến hoặc quan trọng bậc nhất đối với bài thi IELTS Reading.
Với mỗi gốc từ tìm thấy, hãy cung cấp chi tiết:
1. Gốc từ nguyên bản dạng chữ IN HOA (Ví dụ: PORT, SPECT, CHRON, v.v.).
2. Ý nghĩa tiếng Việt cốt lõi của gốc từ.
3. Thông tin nguồn gốc Hy Lạp/Latin ngắn gọn.
4. Một mẹo ghi nhớ nhanh kết cấu từ vựng độc đáo bằng tiếng Việt.
5. Từ vựng tiếng Anh phát hiện chứa gốc từ trong văn bản.
6. Ý nghĩa từ vựng đó khi đi thi IELTS (dịch Việt).
7. Câu học thuật mẫu IELTS có chứa từ đó và đi kèm bản dịch tiếng Việt mượt mà.

VĂN BẢN TRÍCH ĐOẠN ĐỂ PHÂN TÍCH:
"""
${text}
"""`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: "Bạn là giáo sư ngôn ngữ học và chuyên gia khảo thí IELTS cao cấp. Bạn chuyên phân tích hình thái học (Morphology) và từ nguyên học (Etymology) để giải mã cấu trúc từ vựng tiếng Anh học thuật dưới định dạng JSON chuẩn mực.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                root: { type: Type.STRING, description: "Gốc từ tiếng Hy Lạp hoặc Latin tìm thấy trong từ vựng, in hoa hoàn toàn, ví dụ: TRANS" },
                meaning: { type: Type.STRING, description: "Ý nghĩa tiếng Việt chính xác của gốc từ đó" },
                originalGreekLatin: { type: Type.STRING, description: "Nguồn gốc lịch sử, ví dụ: Latin (trans - across)" },
                quickTip: { type: Type.STRING, description: "Mẹo ghi nhớ nhanh dễ thương học dễ thuộc nhất bằng tiếng Việt" },
                detectedWord: { type: Type.STRING, description: "Từ vựng IELTS tìm thấy trong đoạn văn chứa gốc từ này" },
                wordDefinition: { type: Type.STRING, description: "Định nghĩa và dịch chuẩn học thuật tiếng Việt của từ đó" },
                ieltsSentence: { type: Type.STRING, description: "Câu mẫu học thuật IELTS chứa từ phát hiện kèm bản dịch tiếng Việt hoàn chỉnh" }
              },
              required: ["root", "meaning", "originalGreekLatin", "quickTip", "detectedWord", "wordDefinition", "ieltsSentence"]
            }
          }
        }
      });

      const jsonStr = response.text || "[]";
      res.json(JSON.parse(jsonStr));
    } catch (error: any) {
      console.error("Lỗi API phân tích gốc từ:", error);
      res.status(500).json({ error: error?.message || "Đã xảy ra lỗi bất ngờ khi gửi phân tích tới cốt lõi AI." });
    }
  });

  // AI-powered Linguistics Lesson Generator
  app.post("/api/generate-lesson", async (req, res) => {
    try {
      const { trunkNumber, trunkName, topic, targetBand = "Band 7.5 - 8.5", customGoal } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "Hiện tại hệ thống AI chưa được gắn khóa kích hoạt (GEMINI_API_KEY). Vui lòng cấu hình GEMINI_API_KEY trong phần Settings." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Bạn là Chuyên Gia Ngôn Ngữ Học (Linguistics Professor & IELTS Senior Examiner). Hãy thiết kế một BÀI HỌC HÌNH THÁI HỌC & TỪ NGUYÊN HỌC IELTS (Academic Etymology & Morphology Masterclass) chuyên sâu, chuẩn bị cho học viên dải điểm ${targetBand}.

Thông tin yêu cầu:
- Trục gốc từ: ${trunkNumber ? `Trục ${trunkNumber}: ${trunkName || ''}` : "Tự chọn theo chủ đề phù hợp"}
- Chủ đề thảo luận: ${topic || "Học thuật tổng hợp (Academic & Contemporary Issues)"}
- Mục tiêu cá nhân: ${customGoal || "Nâng cấp từ vựng Band 7.5 - 9.0, hiểu sâu cơ chế biến đổi từ loại và danh từ hóa (Nominalization)"}

Hãy thiết kế bài học đầy đủ các phần sau:
1. Title: Tên bài học lôi cuốn, mang tính học thuật cao.
2. Objectives: 3-4 mục tiêu bài học cụ thể.
3. Morphological Core: 2-3 gốc từ hạt nhân của bài học (gốc, nguồn gốc Hy Lạp/Latin, ý nghĩa cốt lõi, cơ chế tạo từ).
4. Academic Passage: Một đoạn văn mẫu IELTS Reading chuẩn mực (khoảng 130-180 từ) sử dụng tự nhiên các từ vựng thuộc họ gốc từ, kèm bản dịch tiếng Việt trau chuốt và danh sách từ khóa bôi đậm.
5. Vocabulary Table: 4-6 từ vựng học thuật cao cấp thuộc họ gốc từ trên (gồm từ, phiên âm IPA, từ loại, định nghĩa tiếng Việt, phân tách hình thái, collocation band 8+, câu ví dụ mẫu).
6. Paraphrase Transformation: 3 cặp biến đổi từ vựng cơ bản (B1/B2) thành cụm từ học thuật C1/C2 dựa trên gốc từ, kèm giải thích cơ chế ngữ pháp/danh từ hóa.
7. Practice Exercises: 3 câu hỏi thực hành ứng dụng (điền từ, chọn ngữ cảnh, hoặc ghép collocation) kèm đáp án và lời giải thích ngôn ngữ học chi tiết.
8. Study Tips: 2-3 lời khuyên từ chuyên gia ngôn ngữ học để tránh lỗi sai và tối ưu hóa ghi nhớ ngắt quãng.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: "Bạn là Giáo sư Ngôn ngữ học ứng dụng và Chuyên gia Khảo thí IELTS Quốc tế. Bạn soạn thảo giáo án học thuật sắc sảo, chuẩn xác về từ nguyên học và có tính ứng dụng thực chiến tối đa cho bài thi IELTS Academic Writing & Reading.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              topic: { type: Type.STRING },
              targetBand: { type: Type.STRING },
              trunkOrTheme: { type: Type.STRING },
              objectives: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              morphologicalCore: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    root: { type: Type.STRING },
                    origin: { type: Type.STRING },
                    coreMeaning: { type: Type.STRING },
                    breakdownExplanation: { type: Type.STRING }
                  },
                  required: ["root", "origin", "coreMeaning", "breakdownExplanation"]
                }
              },
              academicPassage: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  text: { type: Type.STRING },
                  translation: { type: Type.STRING },
                  highlightedKeywords: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING } 
                  }
                },
                required: ["title", "text", "translation", "highlightedKeywords"]
              },
              vocabularyTable: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    phonetic: { type: Type.STRING },
                    partOfSpeech: { type: Type.STRING },
                    meaning: { type: Type.STRING },
                    morphologicalBreakdown: { type: Type.STRING },
                    bandCollocation: { type: Type.STRING },
                    sampleUsage: { type: Type.STRING }
                  },
                  required: ["word", "phonetic", "partOfSpeech", "meaning", "morphologicalBreakdown", "bandCollocation", "sampleUsage"]
                }
              },
              paraphraseTransformation: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    originalBasic: { type: Type.STRING },
                    academicParaphrase: { type: Type.STRING },
                    grammaticalMechanism: { type: Type.STRING }
                  },
                  required: ["originalBasic", "academicParaphrase", "grammaticalMechanism"]
                }
              },
              practiceExercises: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING, enum: ["fill-blank", "collocation-match", "context-choice"] },
                    question: { type: Type.STRING },
                    options: { 
                      type: Type.ARRAY, 
                      items: { type: Type.STRING } 
                    },
                    answer: { type: Type.STRING },
                    linguisticExplanation: { type: Type.STRING }
                  },
                  required: ["type", "question", "answer", "linguisticExplanation"]
                }
              },
              studyTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: [
              "id", "title", "topic", "targetBand", "trunkOrTheme", "objectives", 
              "morphologicalCore", "academicPassage", "vocabularyTable", 
              "paraphraseTransformation", "practiceExercises", "studyTips"
            ]
          }
        }
      });

      const jsonStr = response.text || "{}";
      const parsed = JSON.parse(jsonStr);
      if (!parsed.id) parsed.id = `lesson_${Date.now()}`;
      res.json(parsed);
    } catch (error: any) {
      console.error("Lỗi API tạo bài học ngôn ngữ:", error);
      res.status(500).json({ error: error?.message || "Đã xảy ra lỗi khi tạo bài học bằng AI." });
    }
  });

  // AI-powered Personalized Study Recommendations
  app.post("/api/study-recommendations", async (req, res) => {
    try {
      const { 
        currentStats, 
        targetBand = "Band 8.0", 
        currentLevel = "Intermediate (Band 6.0 - 6.5)", 
        weakAreas = "Thiếu vốn từ học thuật C1/C2 cho Writing Task 2 & gặp khó khăn khi đọc bài Reading dài chứa nhiều thuật ngữ Hy Lạp - Latin",
        preferredTimePerDay = "30 - 45 phút/ngày"
      } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "Hiện tại hệ thống AI chưa được gắn khóa kích hoạt (GEMINI_API_KEY). Vui lòng cấu hình GEMINI_API_KEY trong phần Settings." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const statsSummary = currentStats ? `
- Thẻ đã ôn tập: ${currentStats.totalCardsReviewed || 0}
- Thẻ đã làm chủ: ${currentStats.masteredCount || 0}
- Tỷ lệ đúng: ${currentStats.correctAnswersCount || 0} / ${currentStats.totalCardsReviewed || 1}
- Chuỗi ngày streak: ${currentStats.streak || 0} ngày` : "Chưa có nhiều dữ liệu ôn tập thực tế.";

      const prompt = `Bạn là Giám đốc Học thuật Ngôn ngữ & Chuyên gia Luyện thi IELTS cấp cao. Hãy lập BẢN CHẨN ĐOÁN VÀ KẾ HOẠCH HỌC TẬP GỐC TỪ 7 NGÀY CÁ NHÂN HÓA (7-Day Spaced Repetition Mastery Blueprint) cho học viên.

Dữ liệu học viên:
- Trình độ hiện tại: ${currentLevel}
- Mục tiêu hướng tới: ${targetBand}
- Vấn đề gặp phải: ${weakAreas}
- Thời gian dành mỗi ngày: ${preferredTimePerDay}
- Thống kê hệ thống SRS: ${statsSummary}

Hệ thống kiến thức dựa trên 18 Trục Gốc từ IELTS (Trục 1: Tiền tố định hướng; Trục 2: Tư duy & Nhận thức; Trục 3: Con người & Quản trị; Trục 4: Vận động & Biến đổi; Trục 5: Xung động & Buộc ép; Trục 6: Chân lý & Đo lường; Trục 7: Vị thế & Bền vững; Trục 8: Vòng đời & Giới hạn; Trục 9: Đo lường & Định lượng; Trục 10: Xung đột & Phòng thủ; Trục 11: Phân bổ & Sở hữu; Trục 12: Đích đến & Dự phán; Trục 13: Gắn kết & Liên tục; Trục 14: Lợi ích & Phương hại; Trục 15: Đầy đủ & Thiếu hụt; Trục 16: Dẫn dắt & Quản trị; Trục 17: Biến đổi hình thái; Trục 18: Minh bạch & Ẩn tàng).

Yêu cầu đầu ra cấu trúc:
1. studentLevelAssessment: Nhận định chuyên môn sâu sắc về khoảng cách năng lực hiện tại và tiềm năng bứt phá qua phương pháp Etymology.
2. recommendedFocusTrunks: Đề xuất 3-4 Trục Gốc từ cần ưu tiên hàng đầu (kèm số trục, tên trục, lý do học thuật, và các gốc từ then chốt).
3. sevenDayPlan: Kế hoạch 7 ngày chi tiết từng ngày (Day 1 đến Day 7) với nhiệm vụ cụ thể, gốc từ tập trung, thời lượng ước tính, phương pháp luyện tập (SRS, Paraphrase drills, Reading scan).
4. academicPitfallsToAvoid: 3-4 cạm bẫy từ vựng/hình thái học thường gặp (False cognates, nhầm lẫn tiền tố, lạm dụng danh từ hóa gượng gạo).
5. ieltsExamStrategies: 3 chiến lược thực chiến cho Writing Task 2, Reading và Speaking.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: "Bạn là Chuyên gia Cố vấn Học thuật IELTS hàng đầu. Bạn đưa ra những chỉ dẫn thực tế, truyền cảm hứng mạnh mẽ, căn cứ khoa học theo phương pháp Lặp lại Ngắt quãng (Spaced Repetition) và Hình thái học.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              studentLevelAssessment: { type: Type.STRING },
              recommendedFocusTrunks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    trunkNumber: { type: Type.INTEGER },
                    trunkName: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    keyStems: { 
                      type: Type.ARRAY, 
                      items: { type: Type.STRING } 
                    }
                  },
                  required: ["trunkNumber", "trunkName", "reason", "keyStems"]
                }
              },
              sevenDayPlan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING },
                    task: { type: Type.STRING },
                    focusRoots: { type: Type.STRING },
                    timeEstimate: { type: Type.STRING },
                    practiceMethod: { type: Type.STRING }
                  },
                  required: ["day", "task", "focusRoots", "timeEstimate", "practiceMethod"]
                }
              },
              academicPitfallsToAvoid: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              ieltsExamStrategies: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    skill: { type: Type.STRING },
                    advice: { type: Type.STRING }
                  },
                  required: ["skill", "advice"]
                }
              }
            },
            required: [
              "studentLevelAssessment", "recommendedFocusTrunks", 
              "sevenDayPlan", "academicPitfallsToAvoid", "ieltsExamStrategies"
            ]
          }
        }
      });

      const jsonStr = response.text || "{}";
      res.json(JSON.parse(jsonStr));
    } catch (error: any) {
      console.error("Lỗi API gợi ý học tập cá nhân:", error);
      res.status(500).json({ error: error?.message || "Đã xảy ra lỗi khi tạo kế hoạch gợi ý học tập bằng AI." });
    }
  });

  // AI-powered Linguistic Q&A (Ask the Etymology Professor)
  app.post("/api/ask-linguist", async (req, res) => {
    try {
      const { question, contextRoot, targetBand = "Band 8.0" } = req.body;
      if (!question || typeof question !== "string" || question.trim() === "") {
        return res.status(400).json({ error: "Vui lòng nhập câu hỏi dành cho Chuyên gia Ngôn ngữ học." });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "Hiện tại hệ thống AI chưa được gắn khóa kích hoạt (GEMINI_API_KEY). Vui lòng cấu hình GEMINI_API_KEY trong phần Settings." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Bạn là Giáo sư Ngôn ngữ học và Chuyên gia Từ vựng IELTS Cấp cao. Hãy trả lời câu hỏi sau của học viên với góc nhìn chuyên sâu về Hình thái học (Morphology), Từ nguyên học (Etymology) và Ứng dụng IELTS:

CÂU HỎI CỦA HỌC VIÊN:
"${question}"
${contextRoot ? `Gốc từ liên quan đang xem: "${contextRoot}"` : ""}
Mục tiêu Band điểm: ${targetBand}

Hãy trả lời bằng định dạng JSON gồm:
1. summary: Tóm lược câu trả lời ngắn gọn, trực diện trong 1-2 câu.
2. detailedExplanation: Giải thích cặn kẽ, minh bạch cơ chế cấu tạo từ, tiền tố, gốc từ, hậu tố hoặc sự khác biệt ngữ nghĩa.
3. etymologyDeepDive (tùy chọn nhưng khuyến khích): Gốc từ lịch sử, các từ cùng họ (cognates), tiến trình biến đổi ngữ nghĩa từ Latin/Hy Lạp sang tiếng Anh hiện đại.
4. ieltsApplications (tùy chọn): Mẹo áp dụng trong Writing Task 2, Reading và ví dụ collocation nâng cao chuẩn Band 8.0+.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: "Bạn là Giáo sư Ngôn ngữ học học thuật & Huấn luyện viên Từ vựng IELTS. Trả lời khúc chiết, khoa học, dễ tiếp thu bằng tiếng Việt và kèm ví dụ minh họa tiếng Anh học thuật đắt giá.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              detailedExplanation: { type: Type.STRING },
              etymologyDeepDive: {
                type: Type.OBJECT,
                properties: {
                  root: { type: Type.STRING },
                  cognates: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING } 
                  },
                  historicalEvolution: { type: Type.STRING }
                },
                required: ["root", "cognates", "historicalEvolution"]
              },
              ieltsApplications: {
                type: Type.OBJECT,
                properties: {
                  writingTip: { type: Type.STRING },
                  readingTip: { type: Type.STRING },
                  collocationExample: { type: Type.STRING }
                },
                required: ["writingTip", "readingTip", "collocationExample"]
              }
            },
            required: ["summary", "detailedExplanation"]
          }
        }
      });

      const jsonStr = response.text || "{}";
      res.json(JSON.parse(jsonStr));
    } catch (error: any) {
      console.error("Lỗi API hỏi đáp chuyên gia:", error);
      res.status(500).json({ error: error?.message || "Đã xảy ra lỗi khi gửi câu hỏi tới Chuyên gia Ngôn ngữ." });
    }
  });

  // Serve static files and integrate Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Express custom sever] is running at port :${PORT}`);
  });
}

startServer();
