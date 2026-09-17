import React, { useState, useId } from 'react';
import { UserProfile, FitnessGoal, FitnessLevel, Gender } from '../types';
import { Target, Zap, Dumbbell, Heart, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

interface OnboardingModalProps {
  initialProfile: UserProfile;
  onComplete: (profile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  initialProfile,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [goal, setGoal] = useState<FitnessGoal>(initialProfile.goal || 'tone');
  const [level, setLevel] = useState<FitnessLevel>(initialProfile.level || 'beginner');
  const [gender, setGender] = useState<Gender>(initialProfile.gender || 'male');
  const [age, setAge] = useState<number>(initialProfile.age || 26);
  const [weightKg, setWeightKg] = useState<number>(initialProfile.weightKg || 68);
  const [heightCm, setHeightCm] = useState<number>(initialProfile.heightCm || 172);
  const [voiceCoach, setVoiceCoach] = useState<boolean>(initialProfile.voiceCoachEnabled ?? true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(initialProfile.soundEnabled ?? true);

  const nextBtnId = useId();
  const backBtnId = useId();
  const finishBtnId = useId();

  // Instant BMI calculator
  const heightMeters = heightCm / 100;
  const bmi = heightMeters > 0 ? (weightKg / (heightMeters * heightMeters)).toFixed(1) : '22.0';
  const bmiNumber = parseFloat(bmi);
  let bmiCategory = 'Normal';
  let bmiColor = 'text-emerald-400';
  if (bmiNumber < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-amber-400';
  } else if (bmiNumber >= 25 && bmiNumber < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-400';
  } else if (bmiNumber >= 30) {
    bmiCategory = 'Obese';
    bmiColor = 'text-rose-400';
  }

  const handleFinish = () => {
    onComplete({
      ...initialProfile,
      goal,
      level,
      gender,
      age,
      weightKg,
      heightCm,
      voiceCoachEnabled: voiceCoach,
      soundEnabled,
      onboardingCompleted: true,
    });
  };

  const goalsList: { id: FitnessGoal; title: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'lose_weight',
      title: 'Lose Weight & Belly Fat',
      desc: 'High burn intervals to shed calories and trim waistline',
      icon: <Zap className="w-5 h-5 text-amber-400" />
    },
    {
      id: 'tone',
      title: 'Tone & Build Definition',
      desc: 'Sculpt abs, arms, and legs with bodyweight tension',
      icon: <Target className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 'build_muscle',
      title: 'Build Bodyweight Strength',
      desc: 'Progressive push-ups, squats, and core overload',
      icon: <Dumbbell className="w-5 h-5 text-blue-400" />
    },
    {
      id: 'stay_fit',
      title: 'Stay Active & Healthy',
      desc: 'Quick daily 5-10 minute routines for daily vitality',
      icon: <Heart className="w-5 h-5 text-rose-400" />
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between min-h-[540px]">
        {/* Step indicator pills */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
                Setup · Step {step} of 3
              </span>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step
                      ? 'w-7 bg-emerald-500'
                      : s < step
                      ? 'w-3 bg-emerald-700'
                      : 'w-3 bg-neutral-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ================= STEP 1: FITNESS GOAL ================= */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-black text-white tracking-tight mb-1">
                What is your main goal?
              </h2>
              <p className="text-xs text-neutral-400 mb-5">
                We'll personalize your daily routines based on your selection.
              </p>

              <div className="space-y-3">
                {goalsList.map((item) => {
                  const isSelected = goal === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setGoal(item.id)}
                      className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500 shadow-md shadow-emerald-500/10'
                          : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-emerald-500/20' : 'bg-neutral-800'}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-bold ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                            {item.title}
                          </h4>
                          {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= STEP 2: FITNESS LEVEL ================= */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-black text-white tracking-tight mb-1">
                Your current fitness level?
              </h2>
              <p className="text-xs text-neutral-400 mb-5">
                Routines will be paced with appropriate rest intervals.
              </p>

              <div className="space-y-3">
                {[
                  {
                    id: 'beginner' as FitnessLevel,
                    title: 'Beginner',
                    desc: 'Little to no workout experience. Looking for zero-equipment basics.',
                    badge: 'Recommended for starters'
                  },
                  {
                    id: 'intermediate' as FitnessLevel,
                    title: 'Intermediate',
                    desc: 'Can comfortably do 15+ pushups and 25+ bodyweight squats.',
                    badge: 'Moderate burn'
                  },
                  {
                    id: 'advanced' as FitnessLevel,
                    title: 'Advanced',
                    desc: 'Experienced with high-intensity HIIT and endurance circuits.',
                    badge: 'Max intensity'
                  }
                ].map((item) => {
                  const isSelected = level === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setLevel(item.id)}
                      className={`w-full p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500 shadow-md shadow-emerald-500/10'
                          : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-bold ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                          {item.title}
                        </h4>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <p className="text-xs text-neutral-400 mb-2">{item.desc}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {item.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= STEP 3: METRICS & BMI ================= */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-black text-white tracking-tight mb-1">
                Body Metrics & Profile
              </h2>
              <p className="text-xs text-neutral-400 mb-4">
                Helps calculate precise calorie expenditure and track BMI progress.
              </p>

              {/* Gender selector */}
              <div className="mb-4">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['male', 'female', 'other'] as Gender[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`py-2 rounded-xl text-xs font-bold capitalize border transition ${
                        gender === g
                          ? 'bg-emerald-500 text-black border-emerald-500 font-extrabold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age, Weight, Height inputs */}
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    min="14"
                    max="90"
                    value={age}
                    onChange={(e) => setAge(Math.max(14, parseInt(e.target.value) || 14))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-center text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="35"
                    max="220"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.max(35, parseInt(e.target.value) || 60))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-center text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min="120"
                    max="230"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Math.max(120, parseInt(e.target.value) || 170))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-center text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Instant BMI Card */}
              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Calculated Baseline BMI
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-white">{bmi}</span>
                    <span className={`text-xs font-bold ${bmiColor}`}>
                      {bmiCategory}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-neutral-400 text-right">
                  Target Healthy Range<br />
                  <span className="text-neutral-200 font-semibold">18.5 – 24.9</span>
                </div>
              </div>

              {/* Voice & Sound toggles */}
              <div className="flex items-center justify-between px-1 py-1">
                <span className="text-xs text-neutral-300 font-medium">Voice Coach Audio</span>
                <button
                  type="button"
                  onClick={() => setVoiceCoach(!voiceCoach)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${voiceCoach ? 'bg-emerald-500' : 'bg-neutral-800'}`}
                >
                  <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${voiceCoach ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-neutral-800/80 mt-4">
          {step > 1 && (
            <button
              id={backBtnId}
              onClick={() => setStep((s) => (s - 1) as 1 | 2)}
              className="p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
              title="Previous Step"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {step < 3 ? (
            <button
              id={nextBtnId}
              onClick={() => setStep((s) => (s + 1) as 2 | 3)}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-[0.99]"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id={finishBtnId}
              onClick={handleFinish}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4" /> Start Workout Journey
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
