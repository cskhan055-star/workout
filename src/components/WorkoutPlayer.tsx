import React, { useState, useEffect, useRef, useId } from 'react';
import { WorkoutRoutine, Exercise, UserProfile, WorkoutLog } from '../types';
import { EXERCISE_MAP } from '../data/exercises';
import { ExerciseVisual } from './ExerciseVisual';
import { playTickSound, playStartSound, playRestSound, playVictorySound, speakCoach } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X, 
  RotateCcw, CheckCircle, Flame, Clock, Zap, ArrowRight, Plus
} from 'lucide-react';

interface WorkoutPlayerProps {
  routine: WorkoutRoutine;
  userProfile: UserProfile;
  onFinishWorkout: (log: WorkoutLog) => void;
  onClose: () => void;
}

type PlayerPhase = 'ready' | 'active' | 'rest' | 'completed';

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({
  routine,
  userProfile,
  onFinishWorkout,
  onClose,
}) => {
  const readyBtnId = useId();
  const pauseBtnId = useId();
  const skipBtnId = useId();
  const prevBtnId = useId();
  const soundBtnId = useId();
  const closeBtnId = useId();
  const addRestBtnId = useId();
  const skipRestBtnId = useId();
  const doneBtnId = useId();

  // Load exercises for routine
  const routineExercises: Exercise[] = routine.exerciseIds
    .map(id => EXERCISE_MAP.get(id))
    .filter((ex): ex is Exercise => Boolean(ex));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<PlayerPhase>('ready');
  const [readyCountdown, setReadyCountdown] = useState(5);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalExerciseSec, setTotalExerciseSec] = useState(30);
  const [restTimeLeft, setRestTimeLeft] = useState(20);
  const [totalRestSec, setTotalRestSec] = useState(20);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(userProfile.soundEnabled);
  const [voiceEnabled, setVoiceEnabled] = useState(userProfile.voiceCoachEnabled);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Cumulative workout metrics tracking
  const [elapsedActiveSeconds, setElapsedActiveSeconds] = useState(0);
  const [completedExercisesCount, setCompletedExercisesCount] = useState(0);

  const currentExercise: Exercise | undefined = routineExercises[currentIndex];
  const nextExercise: Exercise | undefined = routineExercises[currentIndex + 1];

  // Ref to track phase and time for interval logic without stale state closures
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound helper wrapper
  const triggerTick = () => {
    if (soundEnabled) playTickSound();
  };
  const triggerStart = () => {
    if (soundEnabled) playStartSound();
  };
  const triggerRest = () => {
    if (soundEnabled) playRestSound();
  };
  const triggerVoice = (phrase: string) => {
    if (voiceEnabled) speakCoach(phrase);
  };

  // Initialize countdown for exercise
  useEffect(() => {
    if (!currentExercise) return;
    const duration = currentExercise.defaultDurationSec || 30;
    setTimeLeft(duration);
    setTotalExerciseSec(duration);
  }, [currentIndex, currentExercise]);

  // Initial Get Ready speech
  useEffect(() => {
    if (currentExercise) {
      triggerVoice(`Get ready for ${currentExercise.name}`);
    }
  }, []);

  // Main countdown timer loop
  useEffect(() => {
    if (isPaused || phase === 'completed') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      // 1. GET READY PHASE (5s countdown before first exercise or resume)
      if (phase === 'ready') {
        setReadyCountdown(prev => {
          if (prev <= 1) {
            setPhase('active');
            triggerStart();
            triggerVoice('Go!');
            return 5;
          }
          if (prev <= 4) triggerTick();
          return prev - 1;
        });
      }
      // 2. ACTIVE EXERCISE PHASE
      else if (phase === 'active') {
        setElapsedActiveSeconds(prev => prev + 1);
        setTimeLeft(prev => {
          // Halfway notification
          if (prev === Math.floor(totalExerciseSec / 2)) {
            triggerVoice('Halfway there! Keep pushing');
          }
          // 3, 2, 1 tick
          if (prev <= 4 && prev > 1) {
            triggerTick();
          }

          if (prev <= 1) {
            // Exercise complete!
            setCompletedExercisesCount(c => c + 1);
            if (currentIndex + 1 < routineExercises.length) {
              // Move to REST phase
              setPhase('rest');
              setRestTimeLeft(20);
              setTotalRestSec(20);
              triggerRest();
              const nextEx = routineExercises[currentIndex + 1];
              triggerVoice(`Rest time! Next up: ${nextEx.name}`);
            } else {
              // Final exercise complete! Celebrate!
              handleWorkoutCompletion();
            }
            return 0;
          }
          return prev - 1;
        });
      }
      // 3. REST COUNTDOWN PHASE
      else if (phase === 'rest') {
        setRestTimeLeft(prev => {
          if (prev <= 4 && prev > 1) {
            triggerTick();
          }
          if (prev <= 1) {
            // Move to next exercise
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);
            setPhase('active');
            triggerStart();
            const nextEx = routineExercises[nextIdx];
            triggerVoice(`Start ${nextEx.name}`);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, isPaused, currentIndex, totalExerciseSec, routineExercises.length]);

  const handleWorkoutCompletion = () => {
    setPhase('completed');
    if (timerRef.current) clearInterval(timerRef.current);
    if (soundEnabled) playVictorySound();
    triggerVoice('Awesome job! Workout completed!');

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleSaveAndFinish = () => {
    const finalSeconds = Math.max(elapsedActiveSeconds, 30);
    // Rough estimate: ~7-9 kcal per minute for bodyweight high intensity, scaled with user weight
    const weightFactor = (userProfile.weightKg || 65) / 65;
    const estimatedBurned = Math.round((finalSeconds / 60) * 8.5 * weightFactor);

    const log: WorkoutLog = {
      id: 'log_' + Date.now(),
      routineId: routine.id,
      routineTitle: routine.title,
      category: routine.category,
      timestamp: Date.now(),
      dateString: new Date().toISOString().split('T')[0],
      durationSeconds: finalSeconds,
      caloriesBurned: Math.max(estimatedBurned, 15),
      exercisesCompletedCount: completedExercisesCount + 1
    };

    onFinishWorkout(log);
  };

  const handleSkipExercise = () => {
    if (currentIndex + 1 < routineExercises.length) {
      setCurrentIndex(prev => prev + 1);
      setPhase('active');
      const nextEx = routineExercises[currentIndex + 1];
      const duration = nextEx.defaultDurationSec || 30;
      setTimeLeft(duration);
      setTotalExerciseSec(duration);
      triggerStart();
      triggerVoice(`Next: ${nextEx.name}`);
    } else {
      handleWorkoutCompletion();
    }
  };

  const handlePreviousExercise = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setPhase('active');
      const prevEx = routineExercises[prevIdx];
      const duration = prevEx.defaultDurationSec || 30;
      setTimeLeft(duration);
      setTotalExerciseSec(duration);
    }
  };

  const handleSkipRest = () => {
    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    setPhase('active');
    triggerStart();
    const nextEx = routineExercises[nextIdx];
    triggerVoice(`Start ${nextEx.name}`);
  };

  const handleAddRestTime = () => {
    setRestTimeLeft(prev => prev + 20);
    setTotalRestSec(prev => prev + 20);
  };

  if (!currentExercise && phase !== 'completed') {
    return null;
  }

  // Calculate circular progress for active exercise
  const progressPercent = totalExerciseSec > 0 ? (timeLeft / totalExerciseSec) : 0;
  const strokeDashoffset = 283 * (1 - progressPercent);

  // Overall workout progress
  const overallProgress = Math.round(((currentIndex) / routineExercises.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 flex flex-col justify-between text-neutral-100 select-none overflow-hidden">
      {/* Top Header Bar */}
      <div className="px-4 py-3 border-b border-neutral-800/80 flex items-center justify-between bg-neutral-950/80 backdrop-blur-md">
        <button
          id={closeBtnId}
          onClick={() => setShowExitConfirm(true)}
          className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          title="Quit workout"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            {routine.title}
          </p>
          <p className="text-sm font-bold text-neutral-200">
            Exercise {currentIndex + 1} of {routineExercises.length}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            id={soundBtnId}
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-full transition-colors ${
              soundEnabled ? 'text-emerald-400 hover:bg-neutral-800' : 'text-neutral-500 hover:bg-neutral-800'
            }`}
            title={soundEnabled ? 'Sound On' : 'Sound Muted'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full bg-neutral-900 h-1.5">
        <div 
          className="bg-emerald-500 h-1.5 transition-all duration-300"
          style={{ width: `${Math.max(overallProgress, 3)}%` }}
        />
      </div>

      {/* Main Content Area Based on Phase */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-lg w-full mx-auto relative overflow-y-auto">
        {/* ================= PHASE 1: GET READY ================= */}
        {phase === 'ready' && currentExercise && (
          <div className="text-center w-full flex flex-col items-center py-6 animate-fadeIn">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
              Get Ready
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-2">
              {currentExercise.name}
            </h2>
            <p className="text-neutral-400 text-sm mb-6">
              Target: <span className="text-neutral-200 font-medium">{currentExercise.primaryMuscle}</span>
            </p>

            <div className="relative w-44 h-44 flex items-center justify-center my-4">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="80"
                  stroke="#262626"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="88"
                  cy="88"
                  r="80"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeDasharray={502}
                  strokeDashoffset={502 * (1 - readyCountdown / 5)}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <span className="absolute text-6xl font-black text-white font-mono">
                {readyCountdown}
              </span>
            </div>

            <div className="w-full max-w-xs mt-4">
              <ExerciseVisual animationKey={currentExercise.animationKey} className="h-40" />
            </div>

            <button
              id={readyBtnId}
              onClick={() => {
                setPhase('active');
                triggerStart();
              }}
              className="mt-6 px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-semibold transition"
            >
              Skip Countdown
            </button>
          </div>
        )}

        {/* ================= PHASE 2: ACTIVE EXERCISE ================= */}
        {phase === 'active' && currentExercise && (
          <div className="w-full flex flex-col items-center justify-between h-full py-2">
            {/* Exercise Title & Muscle */}
            <div className="text-center mb-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentExercise.name}
              </h2>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">
                  {currentExercise.primaryMuscle}
                </span>
                <span className="text-xs text-neutral-400">
                  {currentExercise.equipment}
                </span>
              </div>
            </div>

            {/* Visual Vector Animation */}
            <div className="w-full max-w-sm my-1">
              <ExerciseVisual 
                animationKey={currentExercise.animationKey} 
                className="h-44 sm:h-52"
                isPaused={isPaused}
              />
            </div>

            {/* Circular Countdown Timer */}
            <div className="relative w-36 h-36 flex items-center justify-center my-2">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  stroke="#262626"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  stroke={timeLeft <= 5 ? '#f43f5e' : '#10b981'}
                  strokeWidth="8"
                  strokeDasharray={390}
                  strokeDashoffset={390 * (1 - (timeLeft / totalExerciseSec))}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                  {timeLeft}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Seconds
                </span>
              </div>
            </div>

            {/* Form Tip / Breathing strip */}
            <div className="w-full bg-neutral-900/70 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-300 text-center flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="line-clamp-1 italic">"{currentExercise.breathingTip}"</p>
            </div>
          </div>
        )}

        {/* ================= PHASE 3: REST TIME ================= */}
        {phase === 'rest' && nextExercise && (
          <div className="w-full flex flex-col items-center justify-center py-4 text-center animate-fadeIn">
            <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
              Take a Rest
            </span>

            <div className="relative w-36 h-36 flex items-center justify-center my-2">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  stroke="#262626"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  stroke="#38bdf8"
                  strokeWidth="8"
                  strokeDasharray={390}
                  strokeDashoffset={390 * (1 - (restTimeLeft / totalRestSec))}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-white font-mono">
                  00:{restTimeLeft < 10 ? `0${restTimeLeft}` : restTimeLeft}
                </span>
                <span className="text-[11px] uppercase text-neutral-400 font-semibold">
                  Rest
                </span>
              </div>
            </div>

            {/* Rest control buttons */}
            <div className="flex items-center gap-3 my-3">
              <button
                id={addRestBtnId}
                onClick={handleAddRestTime}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 text-xs font-bold transition"
              >
                <Plus className="w-3.5 h-3.5" /> +20s
              </button>
              <button
                id={skipRestBtnId}
                onClick={handleSkipRest}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition"
              >
                Skip Rest <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Next Exercise Preview Card */}
            <div className="w-full max-w-sm mt-4 p-3 rounded-2xl bg-neutral-900 border border-neutral-800/90 flex items-center gap-3 text-left">
              <div className="w-16 h-16 rounded-xl bg-neutral-950 overflow-hidden shrink-0 border border-neutral-800">
                <ExerciseVisual animationKey={nextExercise.animationKey} className="w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Next Exercise
                </span>
                <h4 className="text-base font-bold text-white truncate">
                  {nextExercise.name}
                </h4>
                <p className="text-xs text-neutral-400">
                  {nextExercise.defaultDurationSec} seconds · {nextExercise.primaryMuscle}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= PHASE 4: COMPLETED SUMMARY ================= */}
        {phase === 'completed' && (
          <div className="w-full max-w-sm text-center py-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-lg shadow-emerald-500/20">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-black text-white mb-1">
              Workout Complete!
            </h2>
            <p className="text-neutral-400 text-sm mb-6">
              You crushed every rep. Keep the momentum going!
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800/80">
                <div className="flex items-center justify-center text-amber-400 mb-1">
                  <Flame className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold text-white">
                  {Math.round((elapsedActiveSeconds / 60) * 8.5 * ((userProfile.weightKg || 65) / 65))}
                </span>
                <p className="text-[10px] text-neutral-400 uppercase font-semibold mt-0.5">
                  Est. Kcal
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800/80">
                <div className="flex items-center justify-center text-blue-400 mb-1">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold text-white">
                  {Math.floor(elapsedActiveSeconds / 60)}:{(elapsedActiveSeconds % 60).toString().padStart(2, '0')}
                </span>
                <p className="text-[10px] text-neutral-400 uppercase font-semibold mt-0.5">
                  Duration
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800/80">
                <div className="flex items-center justify-center text-emerald-400 mb-1">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold text-white">
                  {completedExercisesCount || routineExercises.length}
                </span>
                <p className="text-[10px] text-neutral-400 uppercase font-semibold mt-0.5">
                  Exercises
                </p>
              </div>
            </div>

            {/* Routine summary badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-left mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{routine.title}</h4>
                  <p className="text-xs text-neutral-400 capitalize">{routine.category.replace('_', ' ')} · Zero Equipment</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-black text-xs font-bold">
                  +1 Streak Day
                </span>
              </div>
            </div>

            <button
              id={doneBtnId}
              onClick={handleSaveAndFinish}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-base shadow-lg shadow-emerald-500/20 transition active:scale-[0.99]"
            >
              Save & View Progress
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls Bar (Only in Active / Rest phases) */}
      {(phase === 'active' || phase === 'rest') && (
        <div className="p-4 border-t border-neutral-800/80 bg-neutral-950/95 flex items-center justify-center gap-6">
          <button
            id={prevBtnId}
            onClick={handlePreviousExercise}
            disabled={currentIndex === 0}
            className="p-3 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/60 disabled:opacity-30 disabled:pointer-events-none transition"
            title="Previous Exercise"
          >
            <SkipBack className="w-6 h-6" />
          </button>

          <button
            id={pauseBtnId}
            onClick={() => setIsPaused(!isPaused)}
            className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-lg shadow-emerald-500/20 transition active:scale-95"
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? (
              <Play className="w-7 h-7 fill-current ml-0.5" />
            ) : (
              <Pause className="w-7 h-7 fill-current" />
            )}
          </button>

          <button
            id={skipBtnId}
            onClick={handleSkipExercise}
            className="p-3 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition"
            title="Skip to Next"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Quit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-neutral-900 border border-neutral-800 rounded-3xl p-5 text-center shadow-2xl animate-scaleIn">
            <h3 className="text-lg font-bold text-white mb-2">Quit Workout?</h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Are you sure you want to stop? Your current routine progress won't be saved to today's streak.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold transition"
              >
                Resume Workout
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-semibold transition"
              >
                Quit Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
