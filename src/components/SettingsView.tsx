import React, { useState, useId } from 'react';
import { UserProfile, FitnessGoal, FitnessLevel } from '../types';
import { 
  Bell, Volume2, Mic, Scale, User, RotateCcw, Check, Sparkles, AlertTriangle,
  Smartphone, Download, ChevronRight
} from 'lucide-react';

interface SettingsViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onResetData: () => void;
  onReopenOnboarding: () => void;
  onOpenAndroidModal?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userProfile,
  onUpdateProfile,
  onResetData,
  onReopenOnboarding,
  onOpenAndroidModal,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(userProfile.soundEnabled);
  const [voiceCoachEnabled, setVoiceCoachEnabled] = useState(userProfile.voiceCoachEnabled);
  const [unit, setUnit] = useState(userProfile.unit);
  const [reminderTime, setReminderTime] = useState(userProfile.reminderTime || '07:00');
  const [reminderEnabled, setReminderEnabled] = useState(userProfile.reminderEnabled ?? true);
  const [notificationTestStatus, setNotificationTestStatus] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const reminderTimeId = useId();

  // Save changes
  const saveChange = (updates: Partial<UserProfile>) => {
    const updated = { ...userProfile, ...updates };
    onUpdateProfile(updated);
  };

  // Test local notification
  const handleTestNotification = async () => {
    if (!('Notification' in window)) {
      setNotificationTestStatus('Notifications not supported in this browser');
      setTimeout(() => setNotificationTestStatus(null), 3000);
      return;
    }

    try {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        new Notification('Home Workout', {
          body: "⚡ Time to workout! Keep your streak alive today.",
          icon: '/favicon.ico'
        });
        setNotificationTestStatus('Notification sent successfully!');
      } else {
        setNotificationTestStatus('Permission denied in browser');
      }
    } catch {
      setNotificationTestStatus('Unable to request permission');
    }
    setTimeout(() => setNotificationTestStatus(null), 3000);
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-lg mx-auto w-full animate-fadeIn space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Settings & Profile
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Customize workout player audio, reminder schedules, and metrics
        </p>
      </div>

      {/* User Profile Card */}
      <div className="p-4 rounded-3xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-lg">
            {userProfile.gender === 'female' ? '👩' : userProfile.gender === 'male' ? '👨' : '💪'}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white capitalize">
              {userProfile.goal.replace('_', ' ')}
            </h3>
            <p className="text-xs text-neutral-400">
              {userProfile.age} yrs · {userProfile.weightKg} kg · {userProfile.level}
            </p>
          </div>
        </div>

        <button
          onClick={onReopenOnboarding}
          className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition"
        >
          Edit Goal
        </button>
      </div>

      {/* Android Testing APK & Installation Banner */}
      {onOpenAndroidModal && (
        <div 
          onClick={onOpenAndroidModal}
          className="p-4 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-neutral-900 to-neutral-900 border border-emerald-500/40 hover:border-emerald-400/60 transition cursor-pointer shadow-lg shadow-emerald-950/40 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black text-white">
                    Testing APK & Android Install
                  </h3>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-extrabold uppercase">
                    Android
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Install native WebAPK or download package
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold group-hover:translate-x-0.5 transition-transform">
              <span>Open</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Audio & Sound Preferences */}
      <div className="p-4 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-3.5">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
          Audio & Guidance
        </h3>

        {/* Sound FX */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="text-xs font-bold text-white">Timer Sound Cues</p>
              <p className="text-[11px] text-neutral-400">Countdown beeps, whistles & rest chimes</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const nextVal = !soundEnabled;
              setSoundEnabled(nextVal);
              saveChange({ soundEnabled: nextVal });
            }}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              soundEnabled ? 'bg-emerald-500' : 'bg-neutral-800'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                soundEnabled ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Voice Coach */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
          <div className="flex items-center gap-2.5">
            <Mic className="w-4 h-4 text-cyan-400" />
            <div>
              <p className="text-xs font-bold text-white">Voice Coach</p>
              <p className="text-[11px] text-neutral-400">Spoken exercise names and halfway reminders</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const nextVal = !voiceCoachEnabled;
              setVoiceCoachEnabled(nextVal);
              saveChange({ voiceCoachEnabled: nextVal });
            }}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              voiceCoachEnabled ? 'bg-emerald-500' : 'bg-neutral-800'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                voiceCoachEnabled ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Daily Reminder Notification */}
      <div className="p-4 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-amber-400" />
            <div>
              <p className="text-xs font-bold text-white">Daily Workout Reminder</p>
              <p className="text-[11px] text-neutral-400">Never miss a streak day</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const nextVal = !reminderEnabled;
              setReminderEnabled(nextVal);
              saveChange({ reminderEnabled: nextVal });
            }}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              reminderEnabled ? 'bg-emerald-500' : 'bg-neutral-800'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                reminderEnabled ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {reminderEnabled && (
          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
            <label htmlFor={reminderTimeId} className="text-xs text-neutral-300 font-medium">
              Reminder Time:
            </label>
            <input
              id={reminderTimeId}
              type="time"
              value={reminderTime}
              onChange={(e) => {
                setReminderTime(e.target.value);
                saveChange({ reminderTime: e.target.value });
              }}
              className="bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={handleTestNotification}
            className="w-full py-2 rounded-xl bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold transition flex items-center justify-center gap-1.5"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" /> Test Notification
          </button>
          {notificationTestStatus && (
            <p className="text-[11px] text-center text-emerald-400 mt-1.5 font-medium animate-fadeIn">
              {notificationTestStatus}
            </p>
          )}
        </div>
      </div>

      {/* Units & Measures */}
      <div className="p-4 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Scale className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="text-xs font-bold text-white">Unit System</p>
              <p className="text-[11px] text-neutral-400">Measurement standard</p>
            </div>
          </div>
          <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => {
                setUnit('metric');
                saveChange({ unit: 'metric' });
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                unit === 'metric' ? 'bg-emerald-500 text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Metric (kg)
            </button>
            <button
              onClick={() => {
                setUnit('imperial');
                saveChange({ unit: 'imperial' });
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                unit === 'imperial' ? 'bg-emerald-500 text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Imperial (lb)
            </button>
          </div>
        </div>
      </div>

      {/* Reset Application Data */}
      <div className="pt-2">
        <button
          onClick={() => setShowResetConfirm(true)}
          className="w-full py-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 text-xs font-bold transition flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset All Workout & Streak Data
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-neutral-900 border border-neutral-800 rounded-3xl p-5 text-center shadow-2xl animate-scaleIn">
            <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white mb-1">Reset All Progress?</h3>
            <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
              This will clear your workout history, reset your streaks, and restart onboarding.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
