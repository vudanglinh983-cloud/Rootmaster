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
          error: "Hiện tại hệ thống AI chưa được gắn khóa kích hoạt (GEMINI_API_KEY). Vui lòng thêm khóa trong bảng điều khiển Secrets." 
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
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "Bạn là giáo viên IELTS kỳ cựu và chuyên gia từ vựng Etymology học thuật. Nhiệm vụ của bạn là bóc tách gốc từ trong văn bản, giải thích mộc mạc dễ hiểu kèm mẹo nhớ sâu sắc bằng tiếng Việt dưới mạng cấu trúc JSON nghiêm cẩn.",
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
      console.log("Gemini parsed response structure successfully.");
      res.json(JSON.parse(jsonStr));
    } catch (error: any) {
      console.error("Lỗi API phân tích gốc từ:", error);
      res.status(500).json({ error: error?.message || "Đã xảy ra lỗi bất ngờ khi gửi phân tích tới cốt lõi AI." });
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
