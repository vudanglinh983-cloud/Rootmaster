import { SavedLessonRecord, TopicWord } from "../types";
import { getActiveProfile } from "./profileStorage";

const LESSON_STORAGE_KEY = "ielts_ai_saved_lessons_v2";

/**
 * Retrieve raw list of all saved lessons from localStorage (all users)
 */
export function getAllSavedLessonsRaw(): SavedLessonRecord[] {
  try {
    const raw = localStorage.getItem(LESSON_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error reading saved lessons:", e);
    return [];
  }
}

/**
 * Retrieve saved lessons for a specific user (defaults to currently active profile)
 */
export function getAllSavedLessons(targetUserId?: string): SavedLessonRecord[] {
  try {
    const activeProfile = getActiveProfile();
    const currentUserId = targetUserId || activeProfile.id;
    const all = getAllSavedLessonsRaw();

    return all.filter((l) => {
      // If lesson doesn't have a userId, treat it as belonging to default user
      if (!l.userId) {
        return currentUserId === "user_default" || currentUserId === activeProfile.id;
      }
      return l.userId === currentUserId;
    });
  } catch (e) {
    console.error("Error filtering saved lessons by user:", e);
    return [];
  }
}

/**
 * Save the entire list of lessons back to localStorage
 */
function persistLessons(lessons: SavedLessonRecord[]): void {
  try {
    localStorage.setItem(LESSON_STORAGE_KEY, JSON.stringify(lessons));
  } catch (e) {
    console.error("Error writing saved lessons:", e);
  }
}

/**
 * Get the currently active in-progress lesson for current user (if any)
 */
export function getActiveLesson(targetUserId?: string): SavedLessonRecord | null {
  const lessons = getAllSavedLessons(targetUserId);
  return lessons.find((l) => l.status === "in-progress") || null;
}

/**
 * Check if the current user is allowed to generate a new lesson.
 * Rule: Only allow new lesson generation if the previous lesson for this user is completed!
 */
export function canGenerateNewLesson(targetUserId?: string): {
  allowed: boolean;
  activeLesson?: SavedLessonRecord;
} {
  const active = getActiveLesson(targetUserId);
  if (active) {
    return {
      allowed: false,
      activeLesson: active,
    };
  }
  return { allowed: true };
}

/**
 * Save a new lesson or update an existing lesson for the specified or active user
 */
export function saveOrUpdateLesson(record: SavedLessonRecord, targetUserId?: string): void {
  const allLessons = getAllSavedLessonsRaw();
  const index = allLessons.findIndex((l) => l.id === record.id);
  const now = Date.now();
  const activeProfile = getActiveProfile();
  const assignedUserId = record.userId || targetUserId || activeProfile.id;
  const assignedUserName = record.userName || activeProfile.name;

  const toSave: SavedLessonRecord = {
    ...record,
    userId: assignedUserId,
    userName: assignedUserName,
    updatedAt: now,
  };

  if (index >= 0) {
    allLessons[index] = toSave;
  } else {
    allLessons.unshift(toSave);
  }

  persistLessons(allLessons);
}

/**
 * Mark a lesson as completed (e.g., when the user finishes the test or clicks complete)
 */
export function markLessonCompleted(
  lessonId: string,
  testScore?: SavedLessonRecord["testScore"]
): SavedLessonRecord | null {
  const allLessons = getAllSavedLessonsRaw();
  const index = allLessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return null;

  allLessons[index].status = "completed";
  allLessons[index].updatedAt = Date.now();
  if (testScore) {
    allLessons[index].testScore = testScore;
  }

  persistLessons(allLessons);
  return allLessons[index];
}

/**
 * Delete a saved lesson
 */
export function deleteSavedLesson(lessonId: string): void {
  const allLessons = getAllSavedLessonsRaw().filter((l) => l.id !== lessonId);
  persistLessons(allLessons);
}

/**
 * Get all words that have been learned/included in any past lessons for the current user
 */
export function getLearnedWordsSet(targetUserId?: string): Set<string> {
  const lessons = getAllSavedLessons(targetUserId);
  const set = new Set<string>();
  for (const lesson of lessons) {
    if (Array.isArray(lesson.wordsLearned)) {
      for (const w of lesson.wordsLearned) {
        if (w) set.add(w.toLowerCase().trim());
      }
    }
  }
  return set;
}

/**
 * Get array of all learned words for API exclusion for the current user
 */
export function getLearnedWordsList(targetUserId?: string): string[] {
  return Array.from(getLearnedWordsSet(targetUserId));
}

/**
 * Filter candidates so only unlearned and unknown words are returned for the current user
 */
export function filterNewWords(
  candidates: TopicWord[],
  knownWordIds: string[] = [],
  targetUserId?: string
): TopicWord[] {
  const learned = getLearnedWordsSet(targetUserId);
  const knownSet = new Set(knownWordIds);

  return candidates.filter((wordObj) => {
    const wordKey = wordObj.word.toLowerCase().trim();
    if (learned.has(wordKey)) return false;
    if (knownSet.has(wordObj.id)) return false;
    return true;
  });
}

/**
 * Internal helper to mutate a single lesson in the global raw store
 */
function mutateLesson(
  lessonId: string,
  mutator: (lesson: SavedLessonRecord) => void
): SavedLessonRecord | null {
  const all = getAllSavedLessonsRaw();
  const idx = all.findIndex((l) => l.id === lessonId);
  if (idx === -1) return null;
  mutator(all[idx]);
  all[idx].updatedAt = Date.now();
  persistLessons(all);
  return all[idx];
}

/**
 * Toggle bookmark state for a saved lesson
 */
export function toggleLessonBookmark(lessonId: string): boolean {
  let isMarked = false;
  mutateLesson(lessonId, (l) => {
    l.isBookmarked = !l.isBookmarked;
    isMarked = !!l.isBookmarked;
  });
  return isMarked;
}

/**
 * Update personal notes for a saved lesson
 */
export function updateLessonNotes(lessonId: string, notes: string): void {
  mutateLesson(lessonId, (l) => {
    l.userNotes = notes;
  });
}

/**
 * Reset test answers and score to re-take the quiz / review
 */
export function resetLessonTest(lessonId: string): SavedLessonRecord | null {
  return mutateLesson(lessonId, (l) => {
    l.savedAnswers = {};
    l.testScore = null;
    l.lastReviewedAt = Date.now();
  });
}

/**
 * Record a review timestamp for spaced repetition tracking
 */
export function recordLessonReview(lessonId: string): void {
  mutateLesson(lessonId, (l) => {
    l.lastReviewedAt = Date.now();
  });
}

/**
 * Export all saved lessons for current user to a downloadable JSON file
 */
export function exportLessonsToJSONFile(filename?: string): void {
  try {
    const active = getActiveProfile();
    const lessons = getAllSavedLessons(active.id);
    const safeName = active.name.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
    const finalFilename = filename || `ielts_saved_lessons_${safeName}_${Date.now()}.json`;

    const payload = {
      version: "2.0",
      exportedAt: new Date().toISOString(),
      appName: "IELTS Word Roots & Topic Vocab Master",
      user: {
        id: active.id,
        name: active.name,
        targetBand: active.targetBand,
      },
      totalLessons: lessons.length,
      totalWordsLearned: getLearnedWordsList(active.id).length,
      lessons,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to export lessons to JSON file:", err);
    throw err;
  }
}

/**
 * Download a single lesson as JSON file
 */
export function downloadSingleLessonJSON(lesson: SavedLessonRecord): void {
  try {
    const safeTitle = lesson.title.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase().slice(0, 35);
    const filename = `lesson_${safeTitle}_${Date.now()}.json`;

    const blob = new Blob([JSON.stringify(lesson, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to download single lesson:", err);
    throw err;
  }
}

/**
 * Import lessons from JSON string with validation
 */
export function importLessonsFromJSONFile(
  jsonString: string,
  mode: "merge" | "replace" = "merge"
): { success: boolean; count: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    let incomingLessons: SavedLessonRecord[] = [];

    if (Array.isArray(parsed)) {
      incomingLessons = parsed;
    } else if (parsed && Array.isArray(parsed.lessons)) {
      incomingLessons = parsed.lessons;
    } else if (parsed && parsed.id && parsed.type && parsed.lessonData) {
      // Single lesson import
      incomingLessons = [parsed];
    } else {
      return { success: false, count: 0, error: "Định dạng file không hợp lệ." };
    }

    // Filter valid records
    const validLessons = incomingLessons.filter(
      (l) => l && typeof l.id === "string" && l.title && l.lessonData
    );

    if (validLessons.length === 0) {
      return { success: false, count: 0, error: "Không tìm thấy bài học hợp lệ trong file." };
    }

    const active = getActiveProfile();
    const preparedLessons = validLessons.map((l) => ({
      ...l,
      userId: l.userId || active.id,
      userName: l.userName || active.name,
    }));

    const allRaw = getAllSavedLessonsRaw();

    if (mode === "replace") {
      // Keep other users' lessons, replace current user's lessons
      const otherUsersLessons = allRaw.filter((l) => (l.userId || "user_default") !== active.id);
      const combined = [...preparedLessons, ...otherUsersLessons];
      persistLessons(combined);
      return { success: true, count: preparedLessons.length };
    }

    // Merge mode: retain existing, overwrite if duplicate ID, add new
    const rawMap = new Map<string, SavedLessonRecord>();
    allRaw.forEach((l) => rawMap.set(l.id, l));

    preparedLessons.forEach((l) => {
      rawMap.set(l.id, l);
    });

    const merged = Array.from(rawMap.values()).sort(
      (a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0)
    );

    persistLessons(merged);
    return { success: true, count: preparedLessons.length };
  } catch (err: any) {
    return { success: false, count: 0, error: err?.message || "Lỗi xử lý file JSON." };
  }
}

/**
 * Export all lessons as a formatted Markdown study guide for printing / offline study
 */
export function exportLessonsAsStudyMarkdown(): void {
  try {
    const lessons = getAllSavedLessons();
    if (lessons.length === 0) {
      throw new Error("Chưa có bài học nào để xuất tài liệu.");
    }

    let doc = `# TÀI LIỆU ÔN TẬP TỪ VỰNG IELTS - KHO BÀI HỌC ĐÃ LƯU\n`;
    doc += `*Xuất lúc: ${new Date().toLocaleString("vi-VN")} | Tổng cộng: ${lessons.length} bài học*\n\n`;
    doc += `---\n\n`;

    lessons.forEach((rec, idx) => {
      doc += `## BÀI ${idx + 1}: ${rec.title.toUpperCase()}\n`;
      doc += `- **Chủ đề**: ${rec.topic} (${rec.macroDomain || "Chủ đề vĩ mô"})\n`;
      doc += `- **Trạng thái**: ${rec.status === "completed" ? "Đã hoàn thành" : "Đang học"}\n`;
      if (rec.testScore) {
        doc += `- **Điểm kiểm tra**: ${rec.testScore.correctAnswers}/${rec.testScore.totalQuestions} (${rec.testScore.percentage}%)\n`;
      }
      doc += `- **Các từ vựng cốt lõi**: ${rec.wordsLearned?.join(", ") || "N/A"}\n\n`;

      if (rec.type === "topic_lesson") {
        const data = rec.lessonData as any;
        if (data.mnemonicStories && data.mnemonicStories.length > 0) {
          doc += `### 1. Bảng Mẹo Nhớ Từ Vựng (Mnemonics & Collocations)\n\n`;
          data.mnemonicStories.forEach((m: any) => {
            doc += `#### **${m.word}** ${m.ipa ? `/${m.ipa}/` : ""}\n`;
            doc += `- **Nghĩa**: ${m.vietnamese}\n`;
            doc += `- **Siêu mẹo nhớ**: ${m.superHook}\n`;
            doc += `- **IELTS Collocation**: \`${m.ieltsCollocation}\`\n`;
            if (m.b2Equivalent) doc += `- **Nâng cấp từ B2**: ${m.b2Equivalent}\n`;
            if (m.commonTrap) doc += `- **Cạm bẫy bài thi**: ${m.commonTrap}\n`;
            doc += `\n`;
          });
        }

        if (data.connectingNarrative) {
          doc += `### 2. Câu Chuyện Ngữ Cảnh Tích Hợp\n\n`;
          doc += `**${data.connectingNarrative.title}**\n\n`;
          doc += `${data.connectingNarrative.text}\n\n`;
          doc += `*Bản dịch tiếng Việt:*\n${data.connectingNarrative.translation}\n\n`;
        }
      } else if (rec.type === "tutor") {
        const data = rec.lessonData as any;
        if (data.keyTargetWords && data.keyTargetWords.length > 0) {
          doc += `### 1. Từ Vựng Mục Tiêu Gia Sư\n\n`;
          data.keyTargetWords.forEach((w: any) => {
            doc += `#### **${w.word}** ${w.ipa ? `/${w.ipa}/` : ""}\n`;
            doc += `- **Nghĩa**: ${w.vietnamese}\n`;
            doc += `- **Nâng cấp B2**: ${w.b2Equivalent}\n`;
            doc += `- **Mẹo nhớ**: ${w.memoryHook}\n`;
            doc += `- **Collocation**: \`${w.ieltsCollocation}\`\n\n`;
          });
        }

        if (data.readingPassage) {
          doc += `### 2. Bài Đọc IELTS Chuyên Sâu\n\n`;
          doc += `**${data.readingPassage.title}**\n\n`;
          doc += `${data.readingPassage.fullTextEn}\n\n`;
          doc += `*Dịch nghĩa:*\n${data.readingPassage.fullTextVi}\n\n`;
        }
      }

      if (rec.userNotes) {
        doc += `> **Ghi chú cá nhân**: ${rec.userNotes}\n\n`;
      }

      doc += `---\n\n`;
    });

    const blob = new Blob([doc], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `IELTS_Tai_Lieu_On_Tap_Bai_Da_Hoc_${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to export study markdown:", err);
    throw err;
  }
}
