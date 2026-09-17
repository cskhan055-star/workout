import React, { useState, useId } from 'react';
import { WorkoutLog, StreakData, UserProfile } from '../types';
import { 
  Flame, Calendar as CalendarIcon, Award, Clock, Zap, ChevronLeft, 
  ChevronRight, TrendingUp, Plus, Check, Scale
} from 'lucide-react';

interface ProgressViewProps {
  logs: WorkoutLog[];
  streak: StreakData;
  userProfile: UserProfile;
  onUpdateWeight: (newWeightKg: number) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  logs,
  streak,
  userProfile,
  onUpdateWeight,
}) => {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDayLog, setSelectedDayLog] = useState<WorkoutLog[] | null>(null);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [newWeightInput, setNewWeightInput] = useState(userProfile.weightKg.toString());

  const weightInputId = useId();

  // Month navigation
  const currentYear = calendarDate.getFullYear();
  const currentMonth = calendarDate.getMonth(); // 0-indexed

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCalendarDate(new Date(currentYear, currentMonth - 1, 1));
  };
  const handleNextMonth = () => {
    setCalendarDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Build calendar matrix
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Create a map of date string -> workout logs
  const logsByDate = new Map<string, WorkoutLog[]>();
  logs.forEach((log) => {
    const arr = logsByDate.get(log.dateString) || [];
    arr.push(log);
    logsByDate.set(log.dateString, arr);
  });

  const todayStr = new Date().toISOString().split('T')[0];

  // Calculate BMI
  const heightM = (userProfile.heightCm || 170) / 100;
  const bmi = heightM > 0 ? ((userProfile.weightKg || 65) / (heightM * heightM)).toFixed(1) : '22.5';
  const bmiNum = parseFloat(bmi);
  let bmiCategory = 'Normal Weight';
  let bmiColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  if (bmiNum < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  } else if (bmiNum >= 25 && bmiNum < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  } else if (bmiNum >= 30) {
    bmiCategory = 'Obese';
    bmiColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  }

  // Weekly last 7 days calculation
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    const dayLogs = logsByDate.get(dStr) || [];
    const totalMins = dayLogs.reduce((acc, curr) => acc + Math.round(curr.durationSeconds / 60), 0);
    return { dayName, dStr, totalMins, isToday: dStr === todayStr };
  });

  const maxWeeklyMins = Math.max(...last7Days.map(d => d.totalMins), 25);

  const handleSaveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newWeightInput);
    if (!isNaN(val) && val > 30 && val < 250) {
      onUpdateWeight(val);
      setShowWeightModal(false);
    }
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-lg mx-auto w-full animate-fadeIn space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Progress & Activity
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Track workouts, calendar consistency, streaks, and body metrics
        </p>
      </div>

      {/* Streak Highlight Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/20 via-neutral-900 to-neutral-900 border border-amber-500/30 flex items-center justify-between shadow-lg shadow-amber-500/5">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
            <Flame className="w-8 h-8 fill-amber-500 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
              Active Streak
            </span>
            <div className="flex items-baseline gap-1.5">
              <h2 className="text-3xl font-black text-white">{streak.currentStreak}</h2>
              <span className="text-xs text-neutral-400 font-bold">Days in a row</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Best record: <strong className="text-neutral-200">{streak.bestStreak} days</strong>
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-block px-2.5 py-1 rounded-full bg-neutral-800 text-[10px] font-bold text-amber-300">
            {streak.currentStreak > 0 ? '🔥 On Fire' : 'Ready for Day 1'}
          </span>
        </div>
      </div>

      {/* Overall Cumulative Stats Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-center">
          <div className="flex items-center justify-center text-emerald-400 mb-1">
            <Award className="w-4 h-4" />
          </div>
          <span className="text-xl font-black text-white">{streak.totalWorkouts}</span>
          <p className="text-[10px] uppercase font-bold text-neutral-400 mt-0.5">Workouts</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-center">
          <div className="flex items-center justify-center text-blue-400 mb-1">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-xl font-black text-white">
            {Math.round(streak.totalDurationSeconds / 60)}
          </span>
          <p className="text-[10px] uppercase font-bold text-neutral-400 mt-0.5">Minutes</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-center">
          <div className="flex items-center justify-center text-amber-400 mb-1">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-xl font-black text-white">{streak.totalCalories}</span>
          <p className="text-[10px] uppercase font-bold text-neutral-400 mt-0.5">Kcal Burned</p>
        </div>
      </div>

      {/* Last 7 Days Activity Visual Bars */}
      <div className="p-4 rounded-3xl bg-neutral-900/90 border border-neutral-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-300">
            Last 7 Days (Minutes)
          </span>
          <span className="text-[11px] text-neutral-500 font-medium">Daily Target: 15m</span>
        </div>

        <div className="flex items-end justify-between gap-2 h-24 pt-4 px-1">
          {last7Days.map((d, idx) => {
            const heightPercent = Math.min(100, Math.round((d.totalMins / maxWeeklyMins) * 100));
            const hasActivity = d.totalMins > 0;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-bold text-neutral-400">
                  {hasActivity ? `${d.totalMins}m` : ''}
                </span>
                <div className="w-full max-w-[28px] bg-neutral-800 rounded-t-lg h-full flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      hasActivity
                        ? d.isToday
                          ? 'bg-emerald-400 shadow-sm shadow-emerald-400/30'
                          : 'bg-emerald-600'
                        : 'bg-neutral-800'
                    }`}
                    style={{ height: `${Math.max(heightPercent, hasActivity ? 15 : 0)}%` }}
                  />
                </div>
                <span className={`text-[11px] font-bold ${d.isToday ? 'text-emerald-400' : 'text-neutral-500'}`}>
                  {d.dayName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Workout Calendar */}
      <div className="p-4 rounded-3xl bg-neutral-900/90 border border-neutral-800">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-extrabold text-white">
              {monthNames[currentMonth]} {currentYear}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <span key={i} className="text-[11px] font-bold text-neutral-500">
              {day}
            </span>
          ))}
        </div>

        {/* Calendar Day Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Leading empty cells */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty_${i}`} className="h-8" />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
            const dayLogs = logsByDate.get(dString);
            const hasWorkout = Boolean(dayLogs && dayLogs.length > 0);
            const isToday = dString === todayStr;

            return (
              <button
                key={dayNum}
                onClick={() => {
                  if (dayLogs && dayLogs.length > 0) {
                    setSelectedDayLog(dayLogs);
                  }
                }}
                className={`h-8 rounded-xl flex flex-col items-center justify-center relative text-xs font-semibold transition ${
                  hasWorkout
                    ? 'bg-emerald-500 text-black font-extrabold shadow-sm shadow-emerald-500/20 active:scale-95'
                    : isToday
                    ? 'border border-emerald-500 text-emerald-400'
                    : 'text-neutral-400 hover:bg-neutral-800/60'
                }`}
              >
                <span>{dayNum}</span>
                {hasWorkout && (
                  <span className="w-1 h-1 rounded-full bg-black -mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Workout Done</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-emerald-500" />
            <span>Today</span>
          </div>
          <span>Tap green day to view</span>
        </div>
      </div>

      {/* Selected Day Log Modal Preview */}
      {selectedDayLog && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-2xl animate-scaleIn">
            <h3 className="text-base font-bold text-white mb-2">
              Workouts on {selectedDayLog[0].dateString}
            </h3>
            <div className="space-y-2 mb-4">
              {selectedDayLog.map((l) => (
                <div key={l.id} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-left">
                  <h4 className="text-xs font-bold text-emerald-400">{l.routineTitle}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-1">
                    <span>{Math.round(l.durationSeconds / 60)} min</span>
                    <span>•</span>
                    <span>{l.caloriesBurned} kcal</span>
                    <span>•</span>
                    <span>{l.exercisesCompletedCount} exercises</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedDayLog(null)}
              className="w-full py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* BMI & Weight Card (Phase 2 Feature in PRD) */}
      <div className="p-4 rounded-3xl bg-neutral-900/90 border border-neutral-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-extrabold text-white">Body Mass Index (BMI)</h3>
          </div>
          <button
            onClick={() => setShowWeightModal(true)}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:underline font-bold"
          >
            <Plus className="w-3.5 h-3.5" /> Log Weight
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Current BMI
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{bmi}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${bmiColor}`}>
                {bmiCategory}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Current Weight
            </span>
            <p className="text-xl font-black text-white">
              {userProfile.weightKg} <span className="text-xs font-medium text-neutral-400">kg</span>
            </p>
          </div>
        </div>

        {/* Visual BMI Range Bar */}
        <div className="space-y-1">
          <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden flex">
            <div className="w-[18.5%] bg-amber-400/80" title="Underweight (<18.5)" />
            <div className="w-[30%] bg-emerald-400" title="Normal (18.5-24.9)" />
            <div className="w-[25%] bg-amber-400/80" title="Overweight (25-29.9)" />
            <div className="w-[26.5%] bg-rose-500" title="Obese (30+)" />
          </div>
          <div className="flex justify-between text-[10px] text-neutral-500 font-medium px-0.5">
            <span>&lt;18.5 Under</span>
            <span>18.5 - 24.9 Normal</span>
            <span>25+ Over</span>
          </div>
        </div>
      </div>

      {/* Recent Workout History List */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-300">
            Recent Workouts ({logs.length})
          </h3>
        </div>

        {logs.length > 0 ? (
          <div className="space-y-2">
            {logs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{log.routineTitle}</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {new Date(log.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <Flame className="w-3 h-3 fill-emerald-400" />
                    <span>{log.caloriesBurned} kcal</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">
                    {Math.round(log.durationSeconds / 60)} min · {log.exercisesCompletedCount} ex
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center">
            <p className="text-xs font-semibold text-neutral-400">No workout records yet.</p>
            <p className="text-[11px] text-neutral-500 mt-1">Complete your first workout to start your streak!</p>
          </div>
        )}
      </div>

      {/* Log Weight Dialog */}
      {showWeightModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Log New Weight</h3>
            <p className="text-xs text-neutral-400 mb-4">
              Enter your current bodyweight in kilograms (kg) to update your progress and BMI.
            </p>
            <form onSubmit={handleSaveWeight}>
              <div className="mb-4">
                <input
                  id={weightInputId}
                  type="number"
                  step="0.1"
                  min="30"
                  max="250"
                  value={newWeightInput}
                  onChange={(e) => setNewWeightInput(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2 px-3 text-center text-lg font-bold text-white focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowWeightModal(false)}
                  className="flex-1 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
