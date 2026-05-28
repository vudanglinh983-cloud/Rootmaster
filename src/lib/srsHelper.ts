import { SRSState, SRSStatus } from "../types";

/**
 * Calculates the next SRS interval using a simplified SuperMemo-2 (SM-2) algorithm.
 * @param rating 1: Again (Chưa thuộc), 2: Hard (Hơi khó), 3: Good (Nhớ tốt), 4: Easy (Dễ quá)
 */
export function calculateNextSRS(
  currentState: SRSState,
  rating: number
): SRSState {
  const newState = { ...currentState };
  let ef = currentState.easeFactor;
  let reps = currentState.repetitions;
  let interval = currentState.intervalDays;

  // Handle Again
  if (rating === 1) {
    reps = 0;
    interval = 0.01; // Review in ~15 mins (0.01 of a day)
    ef = Math.max(1.3, ef - 0.2);
    newState.status = "Learning";
  } else {
    // Correct Response
    if (reps === 0) {
      interval = rating === 2 ? 1 : rating === 3 ? 2 : 4; // Days
    } else if (reps === 1) {
      interval = rating === 2 ? 2 : rating === 3 ? 5 : 8; // Days
    } else {
      const scale = rating === 2 ? 1.1 : rating === 3 ? ef : ef * 1.3;
      interval = Math.ceil(interval * scale);
    }

    reps += 1;

    // Adjust ease factor based on performance
    if (rating === 2) ef = Math.max(1.3, ef - 0.15);
    else if (rating === 4) ef += 0.15;

    // Transition status
    if (reps >= 5 || interval >= 14) {
      newState.status = "Mastered";
    } else if (reps >= 2) {
      newState.status = "Reviewing";
    } else {
      newState.status = "Learning";
    }
  }

  const now = new Date();
  
  newState.repetitions = reps;
  newState.easeFactor = Number(ef.toFixed(2));
  newState.intervalDays = interval;
  newState.lastReviewedAt = now.toISOString();

  // Add interval in days to determine next review
  const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);
  newState.nextReviewAt = nextReview.toISOString();

  return newState;
}

// Load and initialize all roots into the local SRS database
export function initializeSRSDatabase(allRootIds: string[]): Record<string, SRSState> {
  const stored = localStorage.getItem("ielts_roots_srs_v1");
  let db: Record<string, SRSState> = {};

  if (stored) {
    try {
      db = JSON.parse(stored);
    } catch (e) {
      console.error("Error parsing SRS Database, initializing fresh one.");
    }
  }

  // Populate missing roots
  let modified = false;
  allRootIds.forEach((id) => {
    if (!db[id]) {
      db[id] = {
        rootId: id,
        status: "New",
        intervalDays: 0,
        easeFactor: 2.5,
        repetitions: 0,
        lastReviewedAt: null,
        nextReviewAt: new Date().toISOString(), // Due immediately as "New"
      };
      modified = true;
    }
  });

  if (modified) {
    localStorage.setItem("ielts_roots_srs_v1", JSON.stringify(db));
  }

  return db;
}

export function saveSRSDatabase(db: Record<string, SRSState>) {
  localStorage.setItem("ielts_roots_srs_v1", JSON.stringify(db));
}
