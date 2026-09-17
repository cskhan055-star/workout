import { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  // ===================== FULL BODY =====================
  {
    id: 'jumping_jacks',
    name: 'Jumping Jacks',
    category: 'full_body',
    primaryMuscle: 'Calves & Quads',
    secondaryMuscles: ['Shoulders', 'Cardio Core', 'Glutes'],
    equipment: 'None',
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Start standing upright with your feet together and arms resting at your sides.',
      'Bend your knees slightly and jump your feet out to the sides while raising your arms overhead in an arc.',
      'Immediately reverse the motion, jumping back to the starting position.',
      'Keep a light, rhythmic bounce on the balls of your feet.'
    ],
    breathingTip: 'Inhale as your feet jump outward and arms go up; exhale as you jump back together.',
    commonMistake: 'Landing heavily on flat feet or locking your knees upon impact.',
    animationKey: 'jumping_jacks'
  },
  {
    id: 'burpees',
    name: 'Classic Burpees',
    category: 'full_body',
    primaryMuscle: 'Full Body & Heart Rate',
    secondaryMuscles: ['Chest', 'Quads', 'Abs', 'Shoulders'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Stand with feet shoulder-width apart, then drop into a low squat placing hands on the floor.',
      'Kick your feet back smoothly into a high plank position.',
      'Perform a quick push-up (or keep body straight in plank), then jump feet back to hands.',
      'Explode upward into a vertical jump, clapping hands overhead.'
    ],
    breathingTip: 'Exhale forcefully as you jump upward to the ceiling.',
    commonMistake: 'Letting your hips sag into the floor when kicking back into plank.',
    animationKey: 'burpees'
  },
  {
    id: 'mountain_climbers',
    name: 'Mountain Climbers',
    category: 'full_body',
    primaryMuscle: 'Core & Abs',
    secondaryMuscles: ['Shoulders', 'Hip Flexors', 'Quads'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Start in a push-up plank position with hands directly below shoulders and core rigid.',
      'Drive your right knee up toward your chest without touching the floor with your right toes.',
      'Quickly switch legs, driving the left knee up while extending the right leg back.',
      'Maintain a fast, running tempo while keeping your hips level.'
    ],
    breathingTip: 'Breathe evenly and rhythmically throughout the sprint.',
    commonMistake: 'Bouncing hips high in the air rather than staying in a flat horizontal line.',
    animationKey: 'mountain_climbers'
  },
  {
    id: 'high_knees',
    name: 'High Knees',
    category: 'full_body',
    primaryMuscle: 'Hip Flexors & Quads',
    secondaryMuscles: ['Calves', 'Cardio Core'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Stand tall with feet hip-width apart and arms bent at 90 degrees.',
      'Drive one knee up toward your chest until the thigh is parallel to the floor.',
      'Quickly switch to the opposite knee, landing lightly on the balls of your feet.',
      'Pump your arms in coordination with your legs.'
    ],
    breathingTip: 'Take short rhythmic breaths in sync with foot strikes.',
    commonMistake: 'Leaning backward while driving knees up.',
    animationKey: 'high_knees'
  },
  {
    id: 'plank_jacks',
    name: 'Plank Jacks',
    category: 'full_body',
    primaryMuscle: 'Core & Stabilizers',
    secondaryMuscles: ['Shoulders', 'Glutes', 'Calves'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Begin in a high plank position with feet together and palms flat on the ground.',
      'Jump your feet wide apart, similar to a jumping jack motion, while keeping torso stiff.',
      'Jump your feet back together quickly.',
      'Keep your upper body completely stable and hands steady.'
    ],
    breathingTip: 'Exhale each time you jump your feet out wide.',
    commonMistake: 'Arching or sagging the lower back.',
    animationKey: 'plank_jacks'
  },
  {
    id: 'inchworm',
    name: 'Inchworms',
    category: 'full_body',
    primaryMuscle: 'Hamstrings & Shoulders',
    secondaryMuscles: ['Core', 'Triceps', 'Lower Back'],
    difficulty: 'beginner',
    defaultDurationSec: 35,
    instructions: [
      'Stand straight, hinge at your hips, and place palms on the floor in front of your toes.',
      'Walk your hands forward step-by-step until you reach a high plank.',
      'Pause for a second with engaged core, then walk your feet forward to meet your hands.',
      'Stand all the way up and repeat.'
    ],
    breathingTip: 'Inhale walking out; exhale pulling forward.',
    commonMistake: 'Bending knees excessively during the hinge.',
    animationKey: 'inchworm'
  },

  // ===================== ABS & CORE =====================
  {
    id: 'crunches',
    name: 'Abdominal Crunches',
    category: 'abs',
    primaryMuscle: 'Rectus Abdominis (Upper Abs)',
    secondaryMuscles: ['Core'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Lie flat on your back with knees bent and feet planted flat on the floor.',
      'Place fingertips lightly behind your head or cross arms across your chest.',
      'Contract your abdominal muscles to curl your shoulder blades 3-4 inches off the mat.',
      'Pause for a beat at the peak contraction, then slowly lower back down under control.'
    ],
    breathingTip: 'Exhale deeply as you curl upward; inhale as you lower down.',
    commonMistake: 'Yanking on your neck with your hands instead of contracting your abs.',
    animationKey: 'crunches'
  },
  {
    id: 'bicycle_crunches',
    name: 'Bicycle Crunches',
    category: 'abs',
    primaryMuscle: 'Obliques & Lower Abs',
    secondaryMuscles: ['Hip Flexors', 'Rectus Abdominis'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Lie on your back, knees bent, hands behind head, with shoulder blades lifted.',
      'Bring your right elbow across to touch your left knee while extending the right leg straight.',
      'Switch smoothly, bringing left elbow to right knee while extending the left leg.',
      'Maintain continuous rotational tension on your abdominal wall.'
    ],
    breathingTip: 'Exhale on each diagonal twist; inhale as you pass through center.',
    commonMistake: 'Rushing with jerky elbow flapping instead of rotating from the ribcage.',
    animationKey: 'bicycle_crunches'
  },
  {
    id: 'standard_plank',
    name: 'Forearm Plank',
    category: 'abs',
    primaryMuscle: 'Transverse Abdominis (Deep Core)',
    secondaryMuscles: ['Shoulders', 'Glutes', 'Lower Back'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Lie face down, resting on your forearms with elbows aligned directly under shoulders.',
      'Tuck your toes and elevate your body off the floor so you form a straight line from head to heels.',
      'Squeeze your glutes, brace your core like preparing for a punch, and keep neck neutral.',
      'Hold rigidly without letting your lower back sag or hips poke upwards.'
    ],
    breathingTip: 'Take slow, steady abdominal breaths while bracing your midsection tight.',
    commonMistake: 'Holding your breath or dropping your hips toward the mat.',
    animationKey: 'standard_plank'
  },
  {
    id: 'russian_twists',
    name: 'Russian Twists',
    category: 'abs',
    primaryMuscle: 'Obliques (Side Abs)',
    secondaryMuscles: ['Lower Abs', 'Hip Flexors'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Sit on the floor with knees bent, lean torso back at a 45-degree angle.',
      'Optionally lift your heels 2 inches off the ground for an added challenge.',
      'Clasp hands together and rotate your torso smoothly from side to side, touching near the floor.',
      'Keep your chest proud and spine long as you rotate.'
    ],
    breathingTip: 'Exhale as you twist to the side; inhale across center.',
    commonMistake: 'Only moving your arms rather than rotating your entire ribcage and shoulders.',
    animationKey: 'russian_twists'
  },
  {
    id: 'leg_raises',
    name: 'Lying Leg Raises',
    category: 'abs',
    primaryMuscle: 'Lower Abdominals',
    secondaryMuscles: ['Hip Flexors', 'Transverse Core'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Lie on your back with legs straight together and hands placed under your lower glutes for lumbar support.',
      'Slowly lift both legs upward until they are perpendicular to the floor (90 degrees).',
      'Pause briefly, then lower your legs slowly back down until they hover 2 inches above the floor.',
      'Prevent your lower back from arching away from the ground.'
    ],
    breathingTip: 'Exhale as you lift legs up; inhale as you control the descent.',
    commonMistake: 'Letting your lower back hyper-extend off the ground on the way down.',
    animationKey: 'leg_raises'
  },
  {
    id: 'heel_touches',
    name: 'Alternate Heel Touches',
    category: 'abs',
    primaryMuscle: 'Obliques & Side Waist',
    secondaryMuscles: ['Upper Abs'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Lie on your back with knees bent, feet flat on the floor slightly wider than shoulder-width.',
      'Raise your chest and shoulders slightly off the ground with arms extended straight down at sides.',
      'Side-bend to the right and touch your right heel with your right fingertips.',
      'Return to center and side-bend left to touch your left heel. Alternate in smooth rhythm.'
    ],
    breathingTip: 'Exhale each time you crunch to touch your heel.',
    commonMistake: 'Lifting shoulders too high off the floor instead of gliding sideways.',
    animationKey: 'heel_touches'
  },
  {
    id: 'flutter_kicks',
    name: 'Flutter Kicks',
    category: 'abs',
    primaryMuscle: 'Lower Abs',
    secondaryMuscles: ['Hip Flexors', 'Quads'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Lie on your back with hands tucked beneath your hips and lower back pressed firmly into the floor.',
      'Lift both legs 4-6 inches off the ground, pointing your toes.',
      'Make small, rapid up-and-down scissor kicks with alternating legs.',
      'Keep knees mostly straight and core tightly clamped.'
    ],
    breathingTip: 'Maintain continuous rhythmic breathing throughout the flutter movement.',
    commonMistake: 'Kicking too high in the air instead of keeping legs low and tension high.',
    animationKey: 'flutter_kicks'
  },
  {
    id: 'side_plank',
    name: 'Side Plank Hold',
    category: 'abs',
    primaryMuscle: 'Lateral Obliques & Quadratus',
    secondaryMuscles: ['Shoulders', 'Glute Medius'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Lie on your right side with feet stacked and elbow resting directly beneath your shoulder.',
      'Lift your hips off the floor until your body forms an unbroken diagonal line from head to feet.',
      'Extend your left arm straight up toward the ceiling.',
      'Hold steady, engaging your side abdominals, then repeat on opposite side.'
    ],
    breathingTip: 'Breathe deeply and hold the lateral tension.',
    commonMistake: 'Letting your bottom hip dip down toward the floor.',
    animationKey: 'side_plank'
  },

  // ===================== CHEST =====================
  {
    id: 'push_ups',
    name: 'Standard Push-Ups',
    category: 'chest',
    primaryMuscle: 'Pectoralis Major (Chest)',
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Core'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Start in a high plank position with hands slightly wider than shoulder-width and body rigid.',
      'Lower your chest toward the floor by bending your elbows at a 45-degree angle to your ribs.',
      'Lower until your chest is an inch above the floor.',
      'Press firmly through your palms to return to full extension at the top.'
    ],
    breathingTip: 'Inhale as you lower down; exhale forcefully as you push back up.',
    commonMistake: 'Flaring elbows out at 90 degrees or letting hips sag.',
    animationKey: 'push_ups'
  },
  {
    id: 'knee_push_ups',
    name: 'Knee Push-Ups',
    category: 'chest',
    primaryMuscle: 'Chest (Beginner Progression)',
    secondaryMuscles: ['Triceps', 'Shoulders', 'Core'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Start in a modified plank resting on your knees, ankles crossed and hands beneath shoulders.',
      'Form a straight line from your knees through your hips to the top of your head.',
      'Lower your chest toward the ground, keeping your elbows tucked at 45 degrees.',
      'Push back up to starting position, keeping the spine aligned.'
    ],
    breathingTip: 'Inhale lowering down; exhale pressing back up.',
    commonMistake: 'Bending at the waist and leaving hips behind in the air.',
    animationKey: 'knee_push_ups'
  },
  {
    id: 'wide_arm_push_ups',
    name: 'Wide Arm Push-Ups',
    category: 'chest',
    primaryMuscle: 'Outer Pectorals',
    secondaryMuscles: ['Front Shoulders', 'Biceps tendon'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Set your hands about 1.5 times shoulder-width apart on the floor.',
      'Keep your core tight and body in a rigid straight line.',
      'Lower your chest straight down between your hands until it approaches the floor.',
      'Press through the outer edges of your palms to return to the starting position.'
    ],
    breathingTip: 'Exhale on the push upward.',
    commonMistake: 'Shrugging shoulders up toward your ears.',
    animationKey: 'wide_arm_push_ups'
  },
  {
    id: 'incline_push_ups',
    name: 'Incline Push-Ups (Hands Elevated)',
    category: 'chest',
    primaryMuscle: 'Lower Pectorals',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Place your hands shoulder-width apart on an elevated sturdy surface (chair, couch, or bench).',
      'Step feet back until body is in an inclined straight line.',
      'Bend elbows to lower your chest toward the edge of the elevated surface.',
      'Push away firmly until arms are straight.'
    ],
    breathingTip: 'Inhale going down; exhale pushing up.',
    commonMistake: 'Bending at the waist instead of keeping whole body straight.',
    animationKey: 'incline_push_ups'
  },
  {
    id: 'cobra_stretch',
    name: 'Cobra Chest Opener',
    category: 'chest',
    primaryMuscle: 'Chest Expansion & Spinal Flexibility',
    secondaryMuscles: ['Lower Back', 'Abdominals'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Lie flat on your stomach with tops of feet flat and hands beneath shoulders.',
      'Gently press into your hands, lifting your chest and collarbones off the floor.',
      'Roll your shoulders back and down, opening your chest forward without straining neck.',
      'Hold the stretch comfortably and breathe deeply.'
    ],
    breathingTip: 'Take slow, deep, lung-expanding breaths.',
    commonMistake: 'Crunching into the lumbar spine instead of elongating through the crown.',
    animationKey: 'cobra_stretch'
  },

  // ===================== ARMS & SHOULDERS =====================
  {
    id: 'tricep_dips',
    name: 'Bodyweight Tricep Dips',
    category: 'arms',
    primaryMuscle: 'Triceps Brachii',
    secondaryMuscles: ['Anterior Deltoids', 'Upper Chest'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Sit on the floor (or edge of a sturdy chair) with palms planted next to your hips, fingers pointing forward.',
      'Slide your hips slightly forward off the surface with knees bent at 90 degrees.',
      'Bend your elbows straight back to lower your hips toward the floor until elbows reach 90 degrees.',
      'Press through the heels of your hands to lock out triceps at the top.'
    ],
    breathingTip: 'Inhale on the dip; exhale as you push back up.',
    commonMistake: 'Letting your elbows flare outwards instead of tracking straight back.',
    animationKey: 'tricep_dips'
  },
  {
    id: 'diamond_push_ups',
    name: 'Diamond Push-Ups',
    category: 'arms',
    primaryMuscle: 'Triceps',
    secondaryMuscles: ['Inner Chest', 'Front Deltoids'],
    difficulty: 'advanced',
    defaultDurationSec: 30,
    instructions: [
      'Assume a push-up position, bringing index fingers and thumbs together to form a diamond shape under your chest.',
      'Lower your chest down toward the center of the diamond, keeping elbows tucked close to your ribcage.',
      'Press through your triceps back to the top position.',
      'Can be performed on knees if needed.'
    ],
    breathingTip: 'Inhale lowering; exhale pressing back up.',
    commonMistake: 'Spreading elbows out wide to the sides.',
    animationKey: 'diamond_push_ups'
  },
  {
    id: 'arm_circles',
    name: 'Arm Circles & Pulses',
    category: 'arms',
    primaryMuscle: 'Deltoids (Shoulders)',
    secondaryMuscles: ['Trapezius', 'Upper Back'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Stand upright with feet shoulder-width apart and extend arms straight out to the sides at shoulder height.',
      'Make small, controlled forward circles with your arms for 15 seconds.',
      'Reverse direction and make small backward circles for the remaining 15 seconds.',
      'Keep shoulders drawn down and back, not hunched up.'
    ],
    breathingTip: 'Keep your breath smooth and relaxed.',
    commonMistake: 'Letting arms droop below shoulder height as shoulders fatigue.',
    animationKey: 'arm_circles'
  },
  {
    id: 'pike_push_ups',
    name: 'Pike Push-Ups',
    category: 'arms',
    primaryMuscle: 'Overhead Deltoids (Shoulders)',
    secondaryMuscles: ['Triceps', 'Upper Traps', 'Core'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Start in a standard push-up position, then walk your feet forward and lift hips high into an inverted V-shape.',
      'Keep legs and back straight, looking toward your toes.',
      'Bend elbows to lower the crown of your head diagonally toward the floor between your hands.',
      'Push through your shoulders to return to the pike position.'
    ],
    breathingTip: 'Inhale lowering head; exhale pushing back to pike.',
    commonMistake: 'Flattening out into a standard push-up rather than staying in an inverted V.',
    animationKey: 'pike_push_ups'
  },
  {
    id: 'punches',
    name: 'Shadow Boxing Punches',
    category: 'arms',
    primaryMuscle: 'Shoulders & Biceps',
    secondaryMuscles: ['Core', 'Cardio'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Stand in a balanced boxing stance with knees soft and fists protecting your chin.',
      'Extend right arm in a crisp jab, rotating fist slightly so knuckles are horizontal at full extension.',
      'Retract quickly while throwing the left cross with hip rotation.',
      'Keep punches snappy, fast, and controlled.'
    ],
    breathingTip: 'Sharp exhale on every punch strike.',
    commonMistake: 'Hyperextending elbows at the end of punches.',
    animationKey: 'punches'
  },
  {
    id: 'plank_shoulder_taps',
    name: 'Plank Shoulder Taps',
    category: 'arms',
    primaryMuscle: 'Shoulder Stability & Core',
    secondaryMuscles: ['Triceps', 'Obliques'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Assume a high plank with feet slightly wider than shoulder-width for stability.',
      'Slowly lift your right hand and tap your left shoulder without twisting your hips.',
      'Return right hand to the ground, then lift left hand to tap your right shoulder.',
      'Maintain total stillness in your torso throughout.'
    ],
    breathingTip: 'Exhale with each tap; inhale as hand touches down.',
    commonMistake: 'Rocking hips from side to side during the tap.',
    animationKey: 'plank_shoulder_taps'
  },

  // ===================== LEGS & GLUTES =====================
  {
    id: 'bodyweight_squats',
    name: 'Bodyweight Squats',
    category: 'legs',
    primaryMuscle: 'Quadriceps & Glutes',
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Stand with feet shoulder-width apart, toes pointing slightly outward (5-15 degrees).',
      'Send your hips back and bend knees, lowering thighs until they are parallel to the ground.',
      'Keep your chest lifted, spine neutral, and knees tracking over your second toe.',
      'Drive forcefully through your heels and midfoot to return to full standing.'
    ],
    breathingTip: 'Inhale on the way down; exhale as you push the ground away to stand.',
    commonMistake: 'Caving knees inward or lifting heels off the floor.',
    animationKey: 'bodyweight_squats'
  },
  {
    id: 'forward_lunges',
    name: 'Alternating Forward Lunges',
    category: 'legs',
    primaryMuscle: 'Quadriceps & Gluteus Maximus',
    secondaryMuscles: ['Hamstrings', 'Calves', 'Balance Core'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Stand tall with hands on hips or clasped at chest.',
      'Take a controlled, generous step forward with your right leg.',
      'Lower your hips until both front and back knees form 90-degree angles (back knee hovering above floor).',
      'Push off the front heel to return to standing, then repeat with left leg.'
    ],
    breathingTip: 'Inhale stepping forward; exhale driving back to starting position.',
    commonMistake: 'Letting your front knee shoot far past your toes or bang back knee into the ground.',
    animationKey: 'forward_lunges'
  },
  {
    id: 'glute_bridges',
    name: 'Glute Bridges',
    category: 'legs',
    primaryMuscle: 'Gluteus Maximus',
    secondaryMuscles: ['Hamstrings', 'Lower Back', 'Core'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Lie on your back with knees bent, feet flat on the floor hip-width apart and close to glutes.',
      'Arms resting by your sides with palms down.',
      'Drive through your heels to lift hips toward ceiling until thighs and torso align.',
      'Squeeze glutes hard at the peak for 1 second, then lower back down with control.'
    ],
    breathingTip: 'Exhale driving hips up; inhale lowering down.',
    commonMistake: 'Arching your lower back at the top instead of squeezing your glutes.',
    animationKey: 'glute_bridges'
  },
  {
    id: 'wall_sit',
    name: 'Wall Sit Hold',
    category: 'legs',
    primaryMuscle: 'Quadriceps Isometric Endurance',
    secondaryMuscles: ['Glutes', 'Calves'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Stand with your back flat against a wall, feet shoulder-width and about 2 feet out from the wall.',
      'Slide your back down the wall until your thighs are parallel to the floor (90-degree knee bend).',
      'Keep your knees directly over your ankles and hands resting on your chest or sides (not on thighs).',
      'Hold this position steadily for the duration.'
    ],
    breathingTip: 'Focus on slow, calm, even breaths to push through quad burn.',
    commonMistake: 'Resting hands heavily on knees to cheat the quad load.',
    animationKey: 'wall_sit'
  },
  {
    id: 'calf_raises',
    name: 'Standing Calf Raises',
    category: 'legs',
    primaryMuscle: 'Gastrocnemius & Soleus (Calves)',
    secondaryMuscles: ['Ankle Stabilizers'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Stand upright with feet hip-width apart. Rest fingertips on a wall for balance if needed.',
      'Press through the balls of both feet to raise your heels as high as possible.',
      'Hold the peak contraction at the top for 1 full second.',
      'Slowly lower heels back down until they gently kiss the floor.'
    ],
    breathingTip: 'Exhale rising up onto toes; inhale lowering heels down.',
    commonMistake: 'Rocking back onto heels or rushing through reps without pausing at the top.',
    animationKey: 'calf_raises'
  },
  {
    id: 'sumo_squats',
    name: 'Sumo Squats',
    category: 'legs',
    primaryMuscle: 'Inner Thighs (Adductors) & Glutes',
    secondaryMuscles: ['Quads', 'Hamstrings'],
    difficulty: 'intermediate',
    defaultDurationSec: 30,
    instructions: [
      'Stand with feet substantially wider than shoulder-width, toes turned outward at a 45-degree angle.',
      'Push your hips back and bend knees, sinking deep into a wide squat.',
      'Keep your torso upright and knees pushed outward in line with toes.',
      'Squeeze your inner thighs and glutes to stand back up.'
    ],
    breathingTip: 'Inhale descending; exhale driving upward.',
    commonMistake: 'Letting knees collapse inward toward each other.',
    animationKey: 'sumo_squats'
  },
  {
    id: 'donkey_kicks',
    name: 'Donkey Kicks',
    category: 'legs',
    primaryMuscle: 'Glute Isolation',
    secondaryMuscles: ['Hamstrings', 'Core Stability'],
    difficulty: 'beginner',
    defaultDurationSec: 30,
    instructions: [
      'Start on all fours with hands under shoulders and knees under hips.',
      'Keeping your right knee bent at 90 degrees and foot flexed, lift right leg upward until thigh is parallel to floor.',
      'Squeeze the right glute at the top, then lower back down without letting knee touch the floor.',
      'Switch sides halfway through the timer.'
    ],
    breathingTip: 'Exhale kicking up; inhale returning.',
    commonMistake: 'Sagging or rotating the lower back to kick higher.',
    animationKey: 'donkey_kicks'
  },
  {
    id: 'jump_squats',
    name: 'Explosive Jump Squats',
    category: 'legs',
    primaryMuscle: 'Leg Power (Quads & Glutes)',
    secondaryMuscles: ['Calves', 'Cardiovascular System'],
    difficulty: 'advanced',
    defaultDurationSec: 30,
    instructions: [
      'Stand with feet shoulder-width apart, sink into a regular squat.',
      'From the bottom of the squat, explode upward into a jump, extending legs fully.',
      'Land softly on the balls of your feet, immediately absorbing the impact by sinking into the next squat.',
      'Keep movements continuous and fluid.'
    ],
    breathingTip: 'Exhale explosively on the jump; inhale landing into squat.',
    commonMistake: 'Landing with stiff, locked knees.',
    animationKey: 'jump_squats'
  }
];

export const EXERCISE_MAP = new Map<string, Exercise>(
  EXERCISES.map(ex => [ex.id, ex])
);
