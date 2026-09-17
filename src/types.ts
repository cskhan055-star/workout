export type FitnessGoal = 'lose_weight' | 'tone' | 'build_muscle' | 'stay_fit';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export type Gender = 'male' | 'female' | 'other';

export type MuscleGroup = 
  | 'Full Body'
  | 'Chest'
  | 'Abs & Core'
  | 'Arms & Shoulders'
  | 'Legs & Glutes'
  | 'Back';

export type WorkoutCategory = 'full_body' | 'abs' | 'chest' | 'arms' | 'legs';

export interface UserProfile {
  age: number;
  gender: Gender;
  goal: FitnessGoal;
  level: FitnessLevel;
  weightKg: number;
  heightCm: number;
  soundEnabled: boolean;
  voiceCoachEnabled: boolean;
  unit: 'metric' | 'imperial';
  reminderTime: string; // e.g. "07:30"
  reminderEnabled: boolean;
  onboardingCompleted: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  category: WorkoutCategory;
  primaryMuscle: string;
  secondaryMuscles: string[];
  equipment?: string; // "None (Bodyweight)"
  difficulty: FitnessLevel;
  defaultDurationSec: number;
  isRepBased?: boolean;
  defaultReps?: number;
  instructions: string[];
  breathingTip: string;
  commonMistake: string;
  animationKey: string; // key for visual demo
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  subtitle: string;
  category: WorkoutCategory;
  difficulty: FitnessLevel;
  durationMinutes: number;
  estimatedCalories: number;
  exerciseIds: string[];
  description: string;
  colorGradient: string;
  badge?: string;
}

export interface WorkoutLog {
  id: string;
  routineId: string;
  routineTitle: string;
  category: WorkoutCategory;
  timestamp: number; // Date.now()
  dateString: string; // YYYY-MM-DD
  durationSeconds: number;
  caloriesBurned: number;
  exercisesCompletedCount: number;
}

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastWorkoutDate: string | null; // YYYY-MM-DD
  totalWorkouts: number;
  totalDurationSeconds: number;
  totalCalories: number;
}

export interface WeightRecord {
  date: string; // YYYY-MM-DD
  weightKg: number;
}
