/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useId } from 'react';
import { UserProfile, WorkoutLog, StreakData, WorkoutRoutine, Exercise } from './types';
import { 
  loadProfile, saveProfile, loadLogs, saveLogs, 
  loadStreak, saveStreak, updateStreakOnWorkout, DEFAULT_PROFILE, DEFAULT_STREAK 
} from './utils/storage';
import { HomeWorkoutsView } from './components/HomeWorkoutsView';
import { ExerciseLibraryView } from './components/ExerciseLibraryView';
import { ProgressView } from './components/ProgressView';
import { SettingsView } from './components/SettingsView';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { OnboardingModal } from './components/OnboardingModal';
import { AndroidInstallModal } from './components/AndroidInstallModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Dumbbell, BookOpen, Calendar, Settings, Smartphone, Maximize2, Minimize2, Download } from 'lucide-react';

type Tab = 'workouts' | 'library' | 'progress' | 'settings';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [logs, setLogs] = useState<WorkoutLog[]>(loadLogs);
  const [streak, setStreak] = useState<StreakData>(loadStreak);

  const [activeTab, setActiveTab] = useState<Tab>('workouts');
  const [activeRoutine, setActiveRoutine] = useState<WorkoutRoutine | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!profile.onboardingCompleted);
  const [showAndroidModal, setShowAndroidModal] = useState<boolean>(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  const tabWorkoutsId = useId();
  const tabLibraryId = useId();
  const tabProgressId = useId();
  const tabSettingsId = useId();
  const frameToggleId = useId();

  // Keep storage in sync
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  useEffect(() => {
    saveStreak(streak);
  }, [streak]);

  // Handle completing a workout from the WorkoutPlayer
  const handleFinishWorkout = (newLog: WorkoutLog) => {
    const updatedLogs = [newLog, ...logs];
    const updatedStreak = updateStreakOnWorkout(streak, newLog);

    setLogs(updatedLogs);
    setStreak(updatedStreak);
    setActiveRoutine(null);
    setActiveTab('progress'); // Auto-switch to progress to see celebration
  };

  // Launch single exercise practice routine
  const handleStartSingleExercise = (exercise: Exercise) => {
    const singleRoutine: WorkoutRoutine = {
      id: `practice_${exercise.id}`,
      title: `${exercise.name} Practice`,
      subtitle: `Target: ${exercise.primaryMuscle}`,
      category: exercise.category,
      difficulty: exercise.difficulty,
      durationMinutes: 1,
      estimatedCalories: 15,
      colorGradient: 'from-emerald-500/20 to-transparent',
      exerciseIds: [exercise.id],
      description: `Focused practice set to master form on ${exercise.name}.`
    };
    setActiveRoutine(singleRoutine);
  };

  const handleUpdateWeight = (newWeightKg: number) => {
    setProfile(prev => ({
      ...prev,
      weightKg: newWeightKg
    }));
  };

  const handleResetData = () => {
    localStorage.clear();
    setProfile(DEFAULT_PROFILE);
    setLogs([]);
    setStreak(DEFAULT_STREAK);
    setShowOnboarding(true);
    setActiveTab('workouts');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-start antialiased">
      {/* Top ambient bar for desktop view */}
      <header className="w-full max-w-lg mx-auto pt-2 px-4 flex items-center justify-between text-neutral-400 text-xs select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-neutral-300">Home Workout</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono">
            No Equipment
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAndroidModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition text-[11px] font-bold"
            title="Install App / Get Android APK"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Install / APK</span>
          </button>

          <button
            id={frameToggleId}
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="hidden sm:flex items-center gap-1 hover:text-white transition p-1 rounded"
            title={isPhoneFrame ? 'Full width view' : 'Mobile frame view'}
          >
            {isPhoneFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[10px]">Expand</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="text-[10px]">Mobile View</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container Shell */}
      <main className={`w-full transition-all duration-300 flex-1 flex flex-col ${
        isPhoneFrame 
          ? 'max-w-md my-1 sm:my-3 rounded-none sm:rounded-[36px] border-0 sm:border sm:border-neutral-800/90 shadow-2xl bg-neutral-950 overflow-hidden relative' 
          : 'max-w-3xl my-1'
      }`}>
        {/* Active Screen Content */}
        <div className="flex-1 w-full overflow-y-auto">
          {activeTab === 'workouts' && (
            <HomeWorkoutsView
              userProfile={profile}
              streak={streak}
              onSelectRoutine={(routine) => setActiveRoutine(routine)}
            />
          )}

          {activeTab === 'library' && (
            <ExerciseLibraryView
              onStartSingleExercise={handleStartSingleExercise}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressView
              logs={logs}
              streak={streak}
              userProfile={profile}
              onUpdateWeight={handleUpdateWeight}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              userProfile={profile}
              onUpdateProfile={(updated) => setProfile(updated)}
              onResetData={handleResetData}
              onReopenOnboarding={() => setShowOnboarding(true)}
              onOpenAndroidModal={() => setShowAndroidModal(true)}
            />
          )}
        </div>

        {/* Bottom Navigation Bar */}
        <nav className="fixed sm:sticky bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-800/80 px-4 py-2 flex items-center justify-around select-none">
          <button
            id={tabWorkoutsId}
            onClick={() => setActiveTab('workouts')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'workouts'
                ? 'text-emerald-400 font-bold'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Dumbbell className={`w-5 h-5 ${activeTab === 'workouts' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px]">Workouts</span>
          </button>

          <button
            id={tabLibraryId}
            onClick={() => setActiveTab('library')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'library'
                ? 'text-emerald-400 font-bold'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === 'library' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px]">Exercises</span>
          </button>

          <button
            id={tabProgressId}
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'progress'
                ? 'text-emerald-400 font-bold'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Calendar className={`w-5 h-5 ${activeTab === 'progress' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px]">Progress</span>
          </button>

          <button
            id={tabSettingsId}
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'settings'
                ? 'text-emerald-400 font-bold'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px]">Settings</span>
          </button>
        </nav>
      </main>

      {/* Active Guided Workout Player Overlay */}
      {activeRoutine && (
        <WorkoutPlayer
          routine={activeRoutine}
          userProfile={profile}
          onFinishWorkout={handleFinishWorkout}
          onClose={() => setActiveRoutine(null)}
        />
      )}

      {/* Onboarding Flow Modal (First-time or reopened) */}
      {showOnboarding && (
        <OnboardingModal
          initialProfile={profile}
          onComplete={(newProfile) => {
            setProfile(newProfile);
            setShowOnboarding(false);
          }}
        />
      )}

      {/* Android Testing APK & Installation Modal */}
      {showAndroidModal && (
        <AndroidInstallModal
          onClose={() => setShowAndroidModal(false)}
        />
      )}

      {/* Offline Connectivity Notification */}
      <OfflineIndicator />
    </div>
  );
}
