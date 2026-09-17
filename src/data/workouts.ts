import { WorkoutRoutine } from '../types';

export const WORKOUT_ROUTINES: WorkoutRoutine[] = [
  // ================= FULL BODY =================
  {
    id: 'full_body_classic_7min',
    title: 'Full Body 7-Min Quick Burn',
    subtitle: 'High-intensity scientific 7-minute bodyweight routine',
    category: 'full_body',
    difficulty: 'beginner',
    durationMinutes: 7,
    estimatedCalories: 65,
    colorGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    badge: 'Popular',
    description: 'The proven quick home circuit designed to jumpstart your metabolism and activate every major muscle group with zero equipment.',
    exerciseIds: [
      'jumping_jacks',
      'wall_sit',
      'push_ups',
      'crunches',
      'bodyweight_squats',
      'tricep_dips',
      'standard_plank',
      'high_knees',
      'forward_lunges'
    ]
  },
  {
    id: 'full_body_hiit_fatburn',
    title: 'Full Body HIIT Fat Destroyer',
    subtitle: 'Calorie torching endurance & cardio builder',
    category: 'full_body',
    difficulty: 'intermediate',
    durationMinutes: 12,
    estimatedCalories: 110,
    colorGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    badge: 'High Burn',
    description: 'Dynamic intervals alternating explosive bodyweight jumps with core stability to maximize afterburn calories.',
    exerciseIds: [
      'jumping_jacks',
      'mountain_climbers',
      'burpees',
      'bodyweight_squats',
      'push_ups',
      'plank_jacks',
      'jump_squats',
      'russian_twists',
      'inchworm',
      'standard_plank'
    ]
  },
  {
    id: 'full_body_morning_wake',
    title: 'Morning Energy & Mobility',
    subtitle: 'Gentle wake-up to boost focus & loosen joints',
    category: 'full_body',
    difficulty: 'beginner',
    durationMinutes: 6,
    estimatedCalories: 45,
    colorGradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    badge: 'Daily Start',
    description: 'A smooth, zero-impact series to wake up tired muscles, improve circulation, and start your morning energized.',
    exerciseIds: [
      'arm_circles',
      'bodyweight_squats',
      'inchworm',
      'glute_bridges',
      'knee_push_ups',
      'cobra_stretch'
    ]
  },

  // ================= ABS & CORE =================
  {
    id: 'abs_beginner_core',
    title: 'Six-Pack Abs Beginner',
    subtitle: 'Target upper, lower abs and build core stability',
    category: 'abs',
    difficulty: 'beginner',
    durationMinutes: 8,
    estimatedCalories: 60,
    colorGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    badge: 'Core Basic',
    description: 'Essential abdominal work to strengthen the core wall, flatten the belly, and improve posture without neck strain.',
    exerciseIds: [
      'crunches',
      'heel_touches',
      'standard_plank',
      'leg_raises',
      'russian_twists',
      'flutter_kicks',
      'cobra_stretch'
    ]
  },
  {
    id: 'abs_oblique_crusher',
    title: 'Intense Core & Oblique Sculpt',
    subtitle: 'Carve side waistline and deep transverse abs',
    category: 'abs',
    difficulty: 'intermediate',
    durationMinutes: 10,
    estimatedCalories: 85,
    colorGradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    badge: 'Chiseled',
    description: 'Advanced rotational and isometric core exercises targeting stubborn love handles and building a tight waist.',
    exerciseIds: [
      'bicycle_crunches',
      'mountain_climbers',
      'russian_twists',
      'side_plank',
      'leg_raises',
      'plank_jacks',
      'standard_plank',
      'heel_touches'
    ]
  },

  // ================= CHEST =================
  {
    id: 'chest_beginner_starter',
    title: 'Chest Builder Beginner',
    subtitle: 'Learn push-up mechanics & build pectoral definition',
    category: 'chest',
    difficulty: 'beginner',
    durationMinutes: 7,
    estimatedCalories: 55,
    colorGradient: 'from-rose-500/20 via-red-500/10 to-transparent',
    badge: 'Strength',
    description: 'Progressive zero-equipment chest routine starting from accessible knee/incline variations up to standard form.',
    exerciseIds: [
      'incline_push_ups',
      'knee_push_ups',
      'push_ups',
      'wide_arm_push_ups',
      'plank_shoulder_taps',
      'cobra_stretch'
    ]
  },
  {
    id: 'chest_power_pump',
    title: 'Chest & Push Power Blast',
    subtitle: 'Comprehensive upper body push power',
    category: 'chest',
    difficulty: 'intermediate',
    durationMinutes: 10,
    estimatedCalories: 85,
    colorGradient: 'from-orange-500/20 via-rose-500/10 to-transparent',
    badge: 'Hypertrophy',
    description: 'Multi-angle push-up variations that sculpt upper, inner, and lower chest fibers with high time-under-tension.',
    exerciseIds: [
      'push_ups',
      'wide_arm_push_ups',
      'diamond_push_ups',
      'incline_push_ups',
      'standard_plank',
      'push_ups',
      'cobra_stretch'
    ]
  },

  // ================= ARMS & SHOULDERS =================
  {
    id: 'arms_triceps_delts',
    title: 'Arm Sculpt & Shoulder Tone',
    subtitle: 'Tone flabby arms and build rounded shoulders',
    category: 'arms',
    difficulty: 'beginner',
    durationMinutes: 8,
    estimatedCalories: 60,
    colorGradient: 'from-violet-500/20 via-fuchsia-500/10 to-transparent',
    badge: 'Toned Arms',
    description: 'High-rep bodyweight movements isolating the triceps horseshoe, shoulder caps, and upper back posture.',
    exerciseIds: [
      'arm_circles',
      'tricep_dips',
      'punches',
      'plank_shoulder_taps',
      'diamond_push_ups',
      'tricep_dips',
      'arm_circles'
    ]
  },
  {
    id: 'arms_upper_power',
    title: 'Pike & Shoulder Strength',
    subtitle: 'Inverted vertical pressing without weights',
    category: 'arms',
    difficulty: 'intermediate',
    durationMinutes: 9,
    estimatedCalories: 75,
    colorGradient: 'from-fuchsia-500/20 via-purple-500/10 to-transparent',
    badge: 'Upper Power',
    description: 'Challenging geometric bodyweight levers including pike push-ups and diamond holds for serious arm definition.',
    exerciseIds: [
      'punches',
      'pike_push_ups',
      'tricep_dips',
      'plank_shoulder_taps',
      'diamond_push_ups',
      'inchworm',
      'standard_plank'
    ]
  },

  // ================= LEGS & GLUTES =================
  {
    id: 'legs_glutes_sculpt',
    title: 'Thighs & Glutes Sculpt',
    subtitle: 'Firm buttocks, tighten hamstrings, and shape quads',
    category: 'legs',
    difficulty: 'beginner',
    durationMinutes: 9,
    estimatedCalories: 70,
    colorGradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    badge: 'Lower Body',
    description: 'Targeted lower body conditioning designed to build powerful, toned legs and lifted glutes at home.',
    exerciseIds: [
      'bodyweight_squats',
      'forward_lunges',
      'glute_bridges',
      'wall_sit',
      'sumo_squats',
      'donkey_kicks',
      'calf_raises'
    ]
  },
  {
    id: 'legs_quad_burner',
    title: 'Lower Body Power & Burn',
    subtitle: 'Explosive jump squats and quad endurance',
    category: 'legs',
    difficulty: 'intermediate',
    durationMinutes: 11,
    estimatedCalories: 95,
    colorGradient: 'from-red-500/20 via-amber-500/10 to-transparent',
    badge: 'Leg Burn',
    description: 'A sweat-inducing burner combining isometric wall holds with explosive jump squats to build lean leg power.',
    exerciseIds: [
      'bodyweight_squats',
      'jump_squats',
      'forward_lunges',
      'wall_sit',
      'sumo_squats',
      'jump_squats',
      'glute_bridges',
      'calf_raises'
    ]
  }
];

export const WORKOUT_CATEGORIES_CONFIG = [
  { id: 'all', label: 'All Workouts', count: WORKOUT_ROUTINES.length },
  { id: 'full_body', label: 'Full Body', count: WORKOUT_ROUTINES.filter(w => w.category === 'full_body').length },
  { id: 'abs', label: 'Abs & Core', count: WORKOUT_ROUTINES.filter(w => w.category === 'abs').length },
  { id: 'chest', label: 'Chest', count: WORKOUT_ROUTINES.filter(w => w.category === 'chest').length },
  { id: 'arms', label: 'Arms', count: WORKOUT_ROUTINES.filter(w => w.category === 'arms').length },
  { id: 'legs', label: 'Legs', count: WORKOUT_ROUTINES.filter(w => w.category === 'legs').length }
] as const;
