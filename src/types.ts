export type RootCategory =
  | "Trục 1: Tiền Tố Định Hướng & Biến Đổi"
  | "Trục 2: Tư Duy, Nhận Thức & Diễn Ngôn"
  | "Trục 3: Con Người, Quản Trị & Thể Chế"
  | "Trục 4: Vận Động, Biến Đổi & Thời Không"
  | "Trục 5: Xung Động, Tác Động & Buộc Ép"
  | "Trục 6: Chân Lý, Đo Lường & Chuẩn Mực"
  | "Trục 7: Vị Thế, Thuộc Tính & Bền Vững"
  | "Trục 8: Vận Động Của Dòng Đời & Chuyển Dịch"
  | "Trục 9: Đo Lường, Chuẩn Mực & Định Lượng"
  | "Trục 10: Xung Đột, Phòng Thủ & Đối Kháng"
  | "Trục 11: Phân Bổ, Sở Hữu & Cộng Đồng"
  | "Trục 12: Đích Đến, Dự Phán & Ý Hướng"
  | "Trục 13: Gắn Kết, Liên Tục & Thắt Chặt"
  | "Trục 14: Tính Thiện, Ác, Lợi Ích & Thiệt Hại"
  | "Trục 15: Đầy Đủ, Thiếu Hụt & Dư Thừa"
  | "Trục 16: Dẫn Dắt, Quản Trị & Thực Thi"
  | "Trục 17: Biến Đổi Hình Thái & Tương Đồng"
  | "Trục 18: Tính Minh Bạch, Phát Lộ & Ẩn Khuất"
  | "Actions & Motion"
  | "Quality & State"
  | "Time & Space"
  | "People & Society"
  | string;

export interface IELTSWordExample {
  word: string;
  partOfSpeech: string;
  phonetic?: string;
  pronunciationGuide?: string;
  meaning: string;
  visualBreakdown: string;
  ieltsSentence: string;
  vietnameseTranslation: string;
  level?: "C1" | "C2" | "B2";
  collocation?: string;
}

export interface IELTSParaphraseItem {
  id?: string;
  root: string;
  rootMeaning?: string;
  basicWord: string;
  advancedWords: string;
  ieltsContext: string;
  category?: string;
}

export interface WordRoot {
  id: string; // unique identifier
  root: string; // e.g., "bene-", "dict-"
  meaning: string; // translation in Vietnamese
  origin: string; // Latin/Greek origin
  description: string; // background about how this root functions
  tip: string; // memory trick
  category: RootCategory;
  axis?: "Trục 1" | "Trục 2" | "Trục 3" | "Trục 4" | "Trục 5" | "Trục 6" | "Trục 7" | "Trục 8" | "Trục 9" | "Trục 10" | "Trục 11" | "Trục 12" | "Trục 13" | "Trục 14" | "Trục 15" | "Trục 16" | "Trục 17" | "Trục 18" | string;
  axisTitle?: string;
  axisSubtitle?: string;
  stemKey?: string;
  phonetic?: string; // IPA transcription for the root stem, e.g., "/ˈben.i/, /bɒn/"
  pronunciationGuide?: string; // Vietnamese-oriented reading guide, e.g., "bén-ni / bon"
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

export interface AILessonExercise {
  type: "fill-blank" | "collocation-match" | "context-choice";
  question: string;
  options?: string[];
  answer: string;
  linguisticExplanation: string;
}

export interface AILessonWord {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaning: string;
  morphologicalBreakdown: string;
  bandCollocation: string;
  sampleUsage: string;
}

export interface AILessonPlan {
  id: string;
  title: string;
  topic: string;
  targetBand: string;
  trunkOrTheme: string;
  objectives: string[];
  morphologicalCore: {
    root: string;
    origin: string;
    coreMeaning: string;
    breakdownExplanation: string;
  }[];
  academicPassage: {
    title: string;
    text: string;
    translation: string;
    highlightedKeywords: string[];
  };
  vocabularyTable: AILessonWord[];
  paraphraseTransformation: {
    originalBasic: string;
    academicParaphrase: string;
    grammaticalMechanism: string;
  }[];
  practiceExercises: AILessonExercise[];
  studyTips: string[];
}

export interface AIStudyRecommendation {
  studentLevelAssessment: string;
  recommendedFocusTrunks: {
    trunkNumber: number;
    trunkName: string;
    reason: string;
    keyStems: string[];
  }[];
  sevenDayPlan: {
    day: string;
    task: string;
    focusRoots: string;
    timeEstimate: string;
    practiceMethod: string;
  }[];
  academicPitfallsToAvoid: string[];
  ieltsExamStrategies: {
    skill: string;
    advice: string;
  }[];
}

export interface AILinguistAnswer {
  summary: string;
  detailedExplanation: string;
  etymologyDeepDive?: {
    root: string;
    cognates: string[];
    historicalEvolution: string;
  };
  ieltsApplications?: {
    writingTip: string;
    readingTip: string;
    collocationExample: string;
  };
}

export interface TopicWord {
  id: string;
  word: string;
  definition: string;
  vietnamese: string;
  category: string;
  categoryEmoji: string;
  memoryHook: string;
  pronunciation?: string;
  synonyms?: string;
  b2Equivalent?: string;
  b2Synonyms?: string[];
  level?: "B2" | "C1" | "C2";
}

export interface MnemonicStoryItem {
  word: string;
  ipa?: string;
  vietnamese: string;
  superHook: string;
  ieltsCollocation: string;
  commonTrap?: string;
  b2Equivalent?: string;
}

export interface QuizQuestionItem {
  question: string;
  options: string[];
  answer: string;
  memoryRationale: string;
}

export interface ComprehensiveQuizQuestion {
  id: string;
  type: "context_choice" | "synonym_upgrade" | "collocation_precision" | "error_detection" | "definition_match";
  typeLabel: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  memoryHookReminder?: string;
  difficulty?: "B2" | "C1" | "C2";
}

export interface WordInDepthAnalysis {
  word: string;
  ipa?: string;
  pos?: string;
  vietnamese: string;
  morphology: {
    origin: string;
    root: string;
    prefix?: string;
    suffix?: string;
    rootMeaning: string;
  };
  wordFamily?: {
    noun?: string;
    verb?: string;
    adj?: string;
    adv?: string;
  };
  academicRegister: {
    b2Contrast: string;
    bandLiftReason: string;
    nuance: string;
  };
  examPitfalls: {
    listeningTrap: string;
    spellingOrGrammar: string;
    collocationRule: string;
  };
  sentenceFrames: {
    writingTask2: string;
    speakingPart3: string;
  };
}

export interface AITopicLesson {
  id: string;
  lessonTitle: string;
  topic: string;
  macroDomain?: string;
  summary: string;
  mnemonicStories: MnemonicStoryItem[];
  connectingNarrative: {
    title: string;
    text: string;
    translation: string;
    keyWordsUsed: string[];
    takeawayTip?: string;
  };
  quickRecallQuiz: QuizQuestionItem[];
  diverseTestQuestions?: ComprehensiveQuizQuestion[];
  inDepthAnalysis?: WordInDepthAnalysis[];
  examProTips: string[];
}

export interface AITutorCrossLink {
  type: "root" | "topic" | "listening" | "paraphrase";
  title: string;
  detail: string;
  badge?: string;
}

export interface AITutorB2Upgrade {
  b2Word: string;
  b2Meaning: string;
  c1Upgrade: string;
  contextUsage: string;
  bandImpact: string;
}

export interface RootContextData {
  root?: string;
  meaning?: string;
  origin?: string;
  tip?: string;
  category?: string;
  trunkNumber?: number;
  trunkTitle?: string;
  roots?: string;
}

export interface BiteSizedSection {
  sectionNumber: number;
  sectionTitle: string;
  textEn: string;
  textVi: string;
  keyWordsInSection: string[];
  keyStructures?: string;
}

export interface AITutorReadingPassage {
  title: string;
  totalWordCount: number;
  fullTextEn: string;
  fullTextVi: string;
  sections: BiteSizedSection[];
}

export interface AITutorLesson {
  id: string;
  tutorGreeting: string;
  lessonTheme: string;
  keyTargetWords: {
    word: string;
    ipa: string;
    vietnamese: string;
    b2Equivalent: string;
    memoryHook: string;
    ieltsCollocation: string;
    partOfSpeech?: string;
  }[];
  readingPassage?: AITutorReadingPassage;
  digitalCrossLinks: AITutorCrossLink[];
  b2ToC1Upgrades: AITutorB2Upgrade[];
  mnemonicStory: {
    title: string;
    contentEn: string;
    contentVi: string;
    retentionSecret: string;
  };
  tutorChallenge: {
    question: string;
    options: string[];
    correctAnswer: string;
    tutorExplanation: string;
  };
  diverseTestQuestions?: ComprehensiveQuizQuestion[];
  inDepthAnalysis?: WordInDepthAnalysis[];
  tutorAdvice: string;
  suggestedFollowUps: string[];
  rootContext?: RootContextData;
}

export interface UserProfile {
  id: string;
  name: string;
  avatarEmoji: string;
  hasPassword?: boolean;
  passwordHash?: string;
  targetBand?: string;
  createdAt: number;
  lastActiveAt: number;
}

export interface SavedLessonRecord {
  id: string;
  userId?: string;
  userName?: string;
  type: "tutor" | "topic_lesson";
  title: string;
  topic: string;
  macroDomain?: string;
  createdAt: number;
  updatedAt: number;
  status: "in-progress" | "completed";
  wordsLearned: string[];
  totalWords: number;
  testScore: {
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
    passed: boolean;
  } | null;
  savedAnswers: Record<string | number, string>;
  lessonData: AITutorLesson | AITopicLesson;
  isBookmarked?: boolean;
  userNotes?: string;
  lastReviewedAt?: number;
  rootContext?: RootContextData;
}

export interface AITutorMessage {
  id: string;
  sender: "user" | "tutor";
  text: string;
  timestamp: string;
  lessonData?: AITutorLesson;
}

