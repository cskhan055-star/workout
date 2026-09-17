import React, { useState, useId } from 'react';
import { WorkoutRoutine, WorkoutCategory, UserProfile, StreakData } from '../types';
import { WORKOUT_ROUTINES, WORKOUT_CATEGORIES_CONFIG } from '../data/workouts';
import { EXERCISE_MAP } from '../data/exercises';
import { ExerciseVisual } from './ExerciseVisual';
import { 
  Play, Flame, Clock, Zap, ChevronRight, Dumbbell, ShieldCheck, 
  Sparkles, Award, ArrowRight, X 
} from 'lucide-react';

interface HomeWorkoutsViewProps {
  userProfile: UserProfile;
  streak: StreakData;
  onSelectRoutine: (routine: WorkoutRoutine) => void;
}

export const HomeWorkoutsView: React.FC<HomeWorkoutsViewProps> = ({
  userProfile,
  streak,
  onSelectRoutine,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [inspectingRoutine, setInspectingRoutine] = useState<WorkoutRoutine | null>(null);

  const filterRoutines = WORKOUT_ROUTINES.filter((r) => {
    if (activeCategory === 'all') return true;
    return r.category === activeCategory;
  });

  // Determine hero recommended routine based on user goal
  const recommendedRoutine = WORKOUT_ROUTINES.find((r) => {
    if (userProfile.goal === 'lose_weight') return r.id === 'full_body_hiit_fatburn';
    if (userProfile.goal === 'tone') return r.id === 'abs_beginner_core';
    if (userProfile.goal === 'build_muscle') return r.id === 'chest_power_pump';
    return r.id === 'full_body_classic_7min';
  }) || WORKOUT_ROUTINES[0];

  return (
    <div className="pb-24 pt-4 px-4 max-w-lg mx-auto w-full animate-fadeIn space-y-5">
      {/* Top Welcome & Streak Banner */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
            <span>Welcome back</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-emerald-400 font-bold capitalize">
              {userProfile.goal.replace('_', ' ')}
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            No-Equipment Workouts
          </h1>
        </div>

        {/* Streak counter pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold text-amber-400">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>{streak.currentStreak} Day{streak.currentStreak === 1 ? '' : 's'}</span>
        </div>
      </div>

      {/* Hero: Today's Recommended Routine */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/60 via-neutral-900 to-neutral-950 border border-emerald-500/30 p-5 shadow-lg shadow-emerald-500/5">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" /> Daily Pick for You
          </span>
          <span className="text-xs text-neutral-400 font-semibold capitalize">
            {recommendedRoutine.difficulty}
          </span>
        </div>

        <h2 className="text-xl font-black text-white mb-1">
          {recommendedRoutine.title}
        </h2>
        <p className="text-xs text-neutral-300 mb-4 line-clamp-2 leading-relaxed">
          {recommendedRoutine.description}
        </p>

        {/* Specs bar */}
        <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-neutral-200 font-bold">{recommendedRoutine.durationMinutes} Min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-neutral-200 font-bold">{recommendedRoutine.estimatedCalories} Kcal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-neutral-200 font-bold">{recommendedRoutine.exerciseIds.length} Exercises</span>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={() => onSelectRoutine(recommendedRoutine)}
          className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-[0.99]"
        >
          <Play className="w-4 h-4 fill-current" /> Start Today's Routine
        </button>
      </div>

      {/* Category Pills Slider */}
      <div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {WORKOUT_CATEGORIES_CONFIG.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-black shadow-sm shadow-emerald-500/20'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Workout Routines List */}
      <div className="space-y-3.5">
        {filterRoutines.map((routine) => (
          <div
            key={routine.id}
            onClick={() => setInspectingRoutine(routine)}
            className="group p-4 rounded-3xl bg-neutral-900/90 border border-neutral-800/80 hover:border-emerald-500/40 transition-all cursor-pointer shadow-sm active:scale-[0.99]"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {routine.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                      {routine.badge}
                    </span>
                  )}
                  <span className="text-[10px] uppercase font-semibold text-neutral-400">
                    {routine.category.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">
                  {routine.title}
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-semibold capitalize shrink-0">
                {routine.difficulty}
              </span>
            </div>

            <p className="text-xs text-neutral-400 line-clamp-1 mb-3">
              {routine.subtitle}
            </p>

            {/* Exercise preview pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {routine.exerciseIds.slice(0, 3).map((exId) => {
                const ex = EXERCISE_MAP.get(exId);
                return (
                  <span
                    key={exId}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-950 text-neutral-400 border border-neutral-800/80"
                  >
                    {ex?.name || exId}
                  </span>
                );
              })}
              {routine.exerciseIds.length > 3 && (
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-950 text-neutral-500">
                  +{routine.exerciseIds.length - 3} more
                </span>
              )}
            </div>

            {/* Footer metrics */}
            <div className="pt-2.5 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  {routine.durationMinutes} min
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  ~{routine.estimatedCalories} kcal
                </span>
              </div>

              <div className="flex items-center gap-1 text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">
                <span>View & Start</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Routine Inspection / Preview Modal */}
      {inspectingRoutine && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-2xl max-h-[90vh] flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider">
                  {inspectingRoutine.category.replace('_', ' ')} · {inspectingRoutine.difficulty}
                </span>
                <button
                  onClick={() => setInspectingRoutine(null)}
                  className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl font-black text-white mb-1">
                {inspectingRoutine.title}
              </h2>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                {inspectingRoutine.description}
              </p>

              {/* Routine Summary Grid */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-center mb-4">
                <div>
                  <span className="text-xs font-black text-white">{inspectingRoutine.durationMinutes} Min</span>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Duration</p>
                </div>
                <div>
                  <span className="text-xs font-black text-white">~{inspectingRoutine.estimatedCalories} Kcal</span>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Calories</p>
                </div>
                <div>
                  <span className="text-xs font-black text-white">{inspectingRoutine.exerciseIds.length}</span>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Exercises</p>
                </div>
              </div>

              {/* Exercise List in this Routine */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Exercise Sequence ({inspectingRoutine.exerciseIds.length})
                </span>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {inspectingRoutine.exerciseIds.map((exId, idx) => {
                    const ex = EXERCISE_MAP.get(exId);
                    if (!ex) return null;
                    return (
                      <div
                        key={`${exId}_${idx}`}
                        className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-neutral-800 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                            {idx + 1}
                          </span>
                          <div className="truncate">
                            <h4 className="text-xs font-bold text-white truncate">{ex.name}</h4>
                            <p className="text-[10px] text-neutral-400">{ex.primaryMuscle}</p>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-neutral-400 shrink-0">
                          {ex.defaultDurationSec}s
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-3 border-t border-neutral-800 flex items-center gap-2">
              <button
                onClick={() => setInspectingRoutine(null)}
                className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold transition"
              >
                Back
              </button>
              <button
                onClick={() => {
                  const r = inspectingRoutine;
                  setInspectingRoutine(null);
                  onSelectRoutine(r);
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition"
              >
                <Play className="w-4 h-4 fill-current" /> Start Routine Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
