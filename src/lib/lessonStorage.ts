import { SavedLessonRecord, TopicWord } from "../types";

const LESSON_STORAGE_KEY = "ielts_ai_saved_lessons_v2";

/**
 * Retrieve all saved lessons from localStorage
 */
export function getAllSavedLessons(): SavedLessonRecord[] {
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
 * Get the currently active in-progress lesson (if any)
 */
export function getActiveLesson(): SavedLessonRecord | null {
  const lessons = getAllSavedLessons();
  return lessons.find((l) => l.status === "in-progress") || null;
}

/**
 * Check if the user is allowed to generate a new lesson.
 * Rule: Only allow new lesson generation if the previous lesson is completed!
 */
export function canGenerateNewLesson(): {
  allowed: boolean;
  activeLesson?: SavedLessonRecord;
} {
  const active = getActiveLesson();
  if (active) {
    return {
      allowed: false,
      activeLesson: active,
    };
  }
  return { allowed: true };
}

/**
 * Save a new lesson or update an existing lesson
 */
export function saveOrUpdateLesson(record: SavedLessonRecord): void {
  const lessons = getAllSavedLessons();
  const index = lessons.findIndex((l) => l.id === record.id);
  const now = Date.now();

  const toSave: SavedLessonRecord = {
    ...record,
    updatedAt: now,
  };

  if (index >= 0) {
    lessons[index] = toSave;
  } else {
    // If saving a new in-progress lesson, make sure no other lesson is in-progress
    lessons.unshift(toSave);
  }

  persistLessons(lessons);
}

/**
 * Mark a lesson as completed (e.g., when the user finishes the test or clicks complete)
 */
export function markLessonCompleted(
  lessonId: string,
  testScore?: SavedLessonRecord["testScore"]
): SavedLessonRecord | null {
  const lessons = getAllSavedLessons();
  const index = lessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return null;

  lessons[index].status = "completed";
  lessons[index].updatedAt = Date.now();
  if (testScore) {
    lessons[index].testScore = testScore;
  }

  persistLessons(lessons);
  return lessons[index];
}

/**
 * Delete a saved lesson
 */
export function deleteSavedLesson(lessonId: string): void {
  const lessons = getAllSavedLessons().filter((l) => l.id !== lessonId);
  persistLessons(lessons);
}

/**
 * Get all words that have been learned/included in any past lessons
 */
export function getLearnedWordsSet(): Set<string> {
  const lessons = getAllSavedLessons();
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
 * Get array of all learned words for API exclusion
 */
export function getLearnedWordsList(): string[] {
  return Array.from(getLearnedWordsSet());
}

/**
 * Filter candidates so only unlearned and unknown words are returned
 */
export function filterNewWords(
  candidates: TopicWord[],
  knownWordIds: string[] = []
): TopicWord[] {
  const learned = getLearnedWordsSet();
  const knownSet = new Set(knownWordIds);

  return candidates.filter((wordObj) => {
    const wordKey = wordObj.word.toLowerCase().trim();
    if (learned.has(wordKey)) return false;
    if (knownSet.has(wordObj.id)) return false;
    return true;
  });
}
