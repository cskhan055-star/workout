import { UserProfile, WorkoutLog, StreakData } from '../types';

const PROFILE_KEY = 'hw_user_profile_v1';
const LOGS_KEY = 'hw_workout_logs_v1';
const STREAK_KEY = 'hw_streak_data_v1';

export const DEFAULT_PROFILE: UserProfile = {
  age: 26,
  gender: 'male',
  goal: 'tone',
  level: 'beginner',
  weightKg: 68,
  heightCm: 172,
  soundEnabled: true,
  voiceCoachEnabled: true,
  unit: 'metric',
  reminderTime: '07:30',
  reminderEnabled: true,
  onboardingCompleted: false,
};

export const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  bestStreak: 0,
  lastWorkoutDate: null,
  totalWorkouts: 0,
  totalDurationSeconds: 0,
  totalCalories: 0,
};

export function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_PROFILE;
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {}
}

export function loadLogs(): WorkoutLog[] {
  try {
    const raw = localStorage.getItem(LOGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveLogs(logs: WorkoutLog[]): void {
  try {
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  } catch {}
}

export function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_STREAK;
}

export function saveStreak(streak: StreakData): void {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  } catch {}
}

/**
 * Recalculates streak whenever a new workout is completed
 */
export function updateStreakOnWorkout(prevStreak: StreakData, newLog: WorkoutLog): StreakData {
  const todayStr = new Date(newLog.timestamp).toISOString().split('T')[0];
  const lastDate = prevStreak.lastWorkoutDate;

  let newCurrentStreak = prevStreak.currentStreak;

  if (!lastDate) {
    newCurrentStreak = 1;
  } else if (lastDate === todayStr) {
    // Already worked out today, keep current streak
    newCurrentStreak = Math.max(prevStreak.currentStreak, 1);
  } else {
    // Check if last workout was yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastDate === yesterdayStr) {
      newCurrentStreak = prevStreak.currentStreak + 1;
    } else {
      // Streak broken, reset to 1
      newCurrentStreak = 1;
    }
  }

  const newBestStreak = Math.max(prevStreak.bestStreak, newCurrentStreak);

  return {
    currentStreak: newCurrentStreak,
    bestStreak: newBestStreak,
    lastWorkoutDate: todayStr,
    totalWorkouts: prevStreak.totalWorkouts + 1,
    totalDurationSeconds: prevStreak.totalDurationSeconds + newLog.durationSeconds,
    totalCalories: prevStreak.totalCalories + newLog.caloriesBurned,
  };
}
