export type RootCategory = "Actions & Motion" | "Quality & State" | "Time & Space" | "People & Society";

export interface IELTSWordExample {
  word: string;
  partOfSpeech: string;
  meaning: string;
  visualBreakdown: string;
  ieltsSentence: string;
  vietnameseTranslation: string;
}

export interface WordRoot {
  id: string; // unique identifier
  root: string; // e.g., "bene-", "dict-"
  meaning: string; // translation in Vietnamese
  origin: string; // Latin/Greek origin
  description: string; // background about how this root functions
  tip: string; // memory trick
  category: RootCategory;
  exampleWords: IELTSWordExample[];
}

export type SRSStatus = "New" | "Learning" | "Reviewing" | "Mastered";

export interface SRSState {
  rootId: string;
  status: SRSStatus;
  intervalDays: number; // Interval in days (can be decimal for rapid learning phases)
  easeFactor: number; // default SM-2 factor starts at 2.5
  repetitions: number; // consecutive correct reviews
  lastReviewedAt: string | null; // ISO string
  nextReviewAt: string; // ISO string (due date)
}

export interface QuizQuestion {
  id: string;
  type: "rootMeaning" | "exampleCompletion" | "spelling";
  questionText: string;
  options?: string[]; // list of choices for multiple choice
  correctAnswer: string;
  context?: string; // context sentence or code explanation
  rootId: string; // link to root
  ieltsWord?: string; // optional IELTS word reference
}

export interface UserStats {
  streak: number;
  lastActiveDate: string | null;
  totalCardsReviewed: number;
  correctAnswersCount: number;
  masteredCount: number;
}
