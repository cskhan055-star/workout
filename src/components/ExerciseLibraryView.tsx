import React, { useState, useId } from 'react';
import { Exercise, WorkoutCategory } from '../types';
import { EXERCISES } from '../data/exercises';
import { ExerciseVisual } from './ExerciseVisual';
import { Search, Info, X, Sparkles, Play, CheckCircle2, AlertCircle, Wind } from 'lucide-react';

interface ExerciseLibraryViewProps {
  onStartSingleExercise?: (exercise: Exercise) => void;
}

export const ExerciseLibraryView: React.FC<ExerciseLibraryViewProps> = ({
  onStartSingleExercise
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

  const searchInputId = useId();

  const categories = [
    { id: 'all', label: 'All (32)' },
    { id: 'full_body', label: 'Full Body' },
    { id: 'abs', label: 'Abs & Core' },
    { id: 'chest', label: 'Chest' },
    { id: 'arms', label: 'Arms' },
    { id: 'legs', label: 'Legs' },
  ];

  // Filter exercises
  const filtered = EXERCISES.filter((ex) => {
    const matchesCategory = selectedCategory === 'all' || ex.category === selectedCategory;
    const matchesQuery =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.primaryMuscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.secondaryMuscles.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="pb-24 pt-4 px-4 max-w-lg mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Exercise Library
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Zero-equipment bodyweight movements with animated form guides
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id={searchInputId}
          type="text"
          placeholder="Search by exercise name or target muscle..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-black shadow-sm shadow-emerald-500/20'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Exercise Cards Grid */}
      <div className="space-y-3">
        {filtered.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => setActiveExercise(exercise)}
            className="group p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 hover:border-emerald-500/40 transition-all cursor-pointer flex items-center gap-3.5 shadow-sm active:scale-[0.99]"
          >
            {/* Thumbnail animated preview */}
            <div className="w-18 h-18 rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden shrink-0 flex items-center justify-center relative">
              <ExerciseVisual animationKey={exercise.animationKey} className="w-full h-full" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <h3 className="text-sm font-extrabold text-white truncate group-hover:text-emerald-400 transition-colors">
                  {exercise.name}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-semibold capitalize shrink-0">
                  {exercise.difficulty}
                </span>
              </div>

              <p className="text-xs text-emerald-400 font-medium truncate mb-1">
                {exercise.primaryMuscle}
              </p>

              <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                <span>{exercise.defaultDurationSec}s standard</span>
                <span>•</span>
                <span className="text-neutral-500 capitalize">{exercise.category.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-neutral-400">
            <p className="text-sm font-semibold">No exercises match "{searchQuery}"</p>
            <p className="text-xs text-neutral-500 mt-1">Try clearing your search or picking another category</p>
          </div>
        )}
      </div>

      {/* ================= EXERCISE DETAIL MODAL ================= */}
      {activeExercise && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-2xl max-h-[90vh] flex flex-col justify-between overflow-y-auto">
            {/* Modal Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider">
                  {activeExercise.category.replace('_', ' ')} · {activeExercise.difficulty}
                </span>
                <button
                  onClick={() => setActiveExercise(null)}
                  className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl font-black text-white mb-1">
                {activeExercise.name}
              </h2>
              <p className="text-xs text-neutral-400 mb-3">
                Primary: <strong className="text-emerald-400">{activeExercise.primaryMuscle}</strong>
              </p>

              {/* Large Vector Animation Preview */}
              <div className="w-full mb-4">
                <ExerciseVisual animationKey={activeExercise.animationKey} className="h-44 w-full" />
              </div>

              {/* Target Muscles Badges */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                  Muscles Worked
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                    {activeExercise.primaryMuscle} (Target)
                  </span>
                  {activeExercise.secondaryMuscles.map((m) => (
                    <span key={m} className="px-2.5 py-1 rounded-xl bg-neutral-800 text-neutral-300 text-xs">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  How To Perform
                </span>
                <div className="space-y-2">
                  {activeExercise.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-neutral-800 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tips: Breathing & Form check */}
              <div className="space-y-2 mb-4">
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-2 text-xs">
                  <Wind className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-200">Breathing Guide: </span>
                    <span className="text-neutral-400">{activeExercise.breathingTip}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-200">Avoid this mistake: </span>
                    <span className="text-neutral-400">{activeExercise.commonMistake}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-neutral-800 flex items-center gap-2">
              <button
                onClick={() => setActiveExercise(null)}
                className="flex-1 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition"
              >
                Close
              </button>
              {onStartSingleExercise && (
                <button
                  onClick={() => {
                    const ex = activeExercise;
                    setActiveExercise(null);
                    onStartSingleExercise(ex);
                  }}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Practice (30s)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
