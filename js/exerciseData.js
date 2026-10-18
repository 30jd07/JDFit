/**
 * JDFit Exercise & Muscle Data Repository
 * Domain-specific, immutable fitness catalog.
 */

export const MUSCLES = {
  chest: {
    id: 'chest',
    name: 'Chest (Pectorals)',
    commonName: 'Pectorals',
    category: 'upper',
    primaryFunction: 'Horizontal adduction and flexion of the shoulder joint.'
  },
  lats: {
    id: 'lats',
    name: 'Lats (Latissimus Dorsi)',
    commonName: 'Lats',
    category: 'upper',
    primaryFunction: 'Shoulder extension, adduction, and internal rotation.'
  },
  upper_back: {
    id: 'upper_back',
    name: 'Upper Back & Rhomboids',
    commonName: 'Upper Back',
    category: 'upper',
    primaryFunction: 'Scapular retraction, elevation, and downward rotation.'
  },
  traps: {
    id: 'traps',
    name: 'Traps (Trapezius)',
    commonName: 'Trapezius',
    category: 'upper',
    primaryFunction: 'Scapular elevation, upward rotation, and thoracic extension.'
  },
  shoulders: {
    id: 'shoulders',
    name: 'Deltoids (Shoulders)',
    commonName: 'Shoulders',
    category: 'upper',
    primaryFunction: 'Multi-planar arm abduction, flexion, and horizontal abduction.'
  },
  biceps: {
    id: 'biceps',
    name: 'Biceps Brachii',
    commonName: 'Biceps',
    category: 'upper',
    primaryFunction: 'Elbow flexion and forearm supination.'
  },
  triceps: {
    id: 'triceps',
    name: 'Triceps Brachii',
    commonName: 'Triceps',
    category: 'upper',
    primaryFunction: 'Elbow extension and long head shoulder extension.'
  },
  forearms: {
    id: 'forearms',
    name: 'Forearms & Grip',
    commonName: 'Forearms',
    category: 'upper',
    primaryFunction: 'Wrist flexion, extension, and grip isometric strength.'
  },
  abs: {
    id: 'abs',
    name: 'Abdominals & Core',
    commonName: 'Abs',
    category: 'core',
    primaryFunction: 'Spinal flexion, anti-extension, and intra-abdominal bracing.'
  },
  obliques: {
    id: 'obliques',
    name: 'Obliques',
    commonName: 'Obliques',
    category: 'core',
    primaryFunction: 'Thoracic rotation and lateral spinal flexion.'
  },
  lower_back: {
    id: 'lower_back',
    name: 'Lower Back (Erectors)',
    commonName: 'Lower Back',
    category: 'core',
    primaryFunction: 'Spinal extension and pelvic-lumbar stabilization.'
  },
  glutes: {
    id: 'glutes',
    name: 'Glutes (Maximus & Medius)',
    commonName: 'Glutes',
    category: 'lower',
    primaryFunction: 'Hip extension, abduction, and external rotation.'
  },
  quadriceps: {
    id: 'quadriceps',
    name: 'Quadriceps',
    commonName: 'Quads',
    category: 'lower',
    primaryFunction: 'Knee extension and hip flexion (rectus femoris).'
  },
  hamstrings: {
    id: 'hamstrings',
    name: 'Hamstrings',
    commonName: 'Hamstrings',
    category: 'lower',
    primaryFunction: 'Knee flexion and hip extension.'
  },
  calves: {
    id: 'calves',
    name: 'Calves (Gastrocnemius & Soleus)',
    commonName: 'Calves',
    category: 'lower',
    primaryFunction: 'Ankle plantarflexion and knee stabilization.'
  }
};

export const EQUIPMENT_OPTIONS = [
  {
    key: 'Bodyweight',
    label: 'Bodyweight (At-Home / Zero Equipment)',
    sub: 'Floor & zero accessories — 100% home friendly',
    isHomeFriendly: true,
    requiresHardware: false
  },
  {
    key: 'Pull-Up Bar',
    label: 'Pull-Up Bar & Dip Station',
    sub: 'Calisthenics fixtures (uncheck for pure zero-equipment home)',
    isHomeFriendly: false,
    requiresHardware: true
  },
  {
    key: 'Dumbbell',
    label: 'Dumbbells',
    sub: 'Adjustable or fixed hex dumbbells',
    isHomeFriendly: true,
    requiresHardware: true
  },
  {
    key: 'Barbell',
    label: 'Barbell & Rack',
    sub: 'Olympic barbell, bench, and squat rack',
    isHomeFriendly: false,
    requiresHardware: true
  },
  {
    key: 'Cable',
    label: 'Cable Machine',
    sub: 'Dual adjustable pulleys & cables',
    isHomeFriendly: false,
    requiresHardware: true
  },
  {
    key: 'Machine',
    label: 'Gym Machines',
    sub: 'Plate-loaded & selectorized machines',
    isHomeFriendly: false,
    requiresHardware: true
  }
];

export const EXERCISES = [
  // ==========================================
  // CHEST
  // ==========================================
  {
    id: 'barbell-bench-press',
    name: 'Barbell Flat Bench Press',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    animationType: 'bench_press',
    goalProtocols: {
      strength: { sets: 5, reps: '3-5 reps', restSeconds: 180, description: 'Heavy explosive intent with full neurological recovery.' },
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'Sustained cadence with continuous pectoral tension.' },
      hypertrophy: { sets: 4, reps: '8-10 reps', restSeconds: 90, description: 'Controlled 2-second negative for maximum pectoral tension.' }
    },
    setupSteps: [
      'Lie flat on the bench with eyes directly underneath the racked barbell.',
      'Plant both feet firmly flat on the floor, pinching shoulder blades back and down.',
      'Grip the bar slightly wider than shoulder-width with wrists stacked straight over elbows.'
    ],
    executionSteps: [
      'Unrack the bar and stabilize it directly over your upper chest.',
      'Inhale deeply into your belly and lower the bar under control to the mid-sternum.',
      'Lightly touch your chest without bouncing, then drive aggressively upward until arms are extended.'
    ],
    coachingCues: ['Bend the bar in half to engage lats', 'Drive heels into the floor', 'Keep elbows at a 45-degree angle'],
    commonMistakes: ['Flaring elbows out to 90 degrees', 'Bouncing bar off sternum', 'Lifting hips off the bench']
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    animationType: 'incline_bench',
    goalProtocols: {
      strength: { sets: 4, reps: '6-8 reps', restSeconds: 120, description: 'Heavy dumbbells kicked up with knees safely.' },
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'Continuous burn with full range of motion.' },
      hypertrophy: { sets: 3, reps: '10-12 reps', restSeconds: 90, description: 'Deep stretch at the bottom targeting the clavicular head.' }
    },
    setupSteps: [
      'Set an adjustable bench to approximately a 30-to-45-degree angle.',
      'Sit back holding dumbbells on your thighs, then kick them up to shoulder height one at a time.',
      'Retract your scapulae and keep your feet planted firmly.'
    ],
    executionSteps: [
      'Lower the dumbbells slowly until you feel a comfortable stretch in your upper chest.',
      'Keep palms slightly angled inward (semi-neutral) to relieve anterior shoulder stress.',
      'Press the dumbbells up and slightly inward in an arc without clanking weights together at the peak.'
    ],
    coachingCues: ['Lead with the upper sternum', 'Maintain a slight arch in the mid-spine', 'Squeeze upper chest at apex'],
    commonMistakes: ['Bench angle too steep (>45 deg shifts load to front delts)', 'Dropping elbows too fast']
  },
  {
    id: 'pushup-classic',
    name: 'Bodyweight Push-Up (Zero Equipment)',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders', 'abs'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'pushup',
    goalProtocols: {
      strength: { sets: 4, reps: '12-15 reps', restSeconds: 90, description: 'Strict tempo pushups with pause at bottom.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, restSeconds: 45, description: 'Continuous uninterrupted push-up cadence for 1 full minute.' },
      cardio: { sets: 3, reps: '1 min timed', isTimed: true, durationSeconds: 60, restSeconds: 25, description: 'High-pace chest pumping interval.' }
    },
    setupSteps: [
      'Place hands on the floor slightly wider than shoulder-width apart.',
      'Extend legs straight back, resting on toes, creating a rigid straight line from head to heels.',
      'Squeeze glutes and draw navel toward your spine to brace core.'
    ],
    executionSteps: [
      'Lower your entire body in unison until your chest hovers 1 inch above the floor.',
      'Keep elbows tracking back at approximately 45 degrees relative to your torso.',
      'Push the ground away forcefully through your palms until arms are fully extended.'
    ],
    coachingCues: ['Keep your spine rigid like a steel plank', 'Spread fingers wide for ground grip', 'Neck neutral'],
    commonMistakes: ['Sagging hips', 'Head poking forward toward ground', 'Flaring elbows outward']
  },
  {
    id: 'wide-pushups',
    name: 'Wide Hands Floor Push-Up (Chest Bias)',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'pushup',
    goalProtocols: {
      strength: { sets: 4, reps: '12-15 strict reps', restSeconds: 75, description: 'Deep pectoral stretch at bottom.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, restSeconds: 30, description: 'Continuous chest burn.' },
      cardio: { sets: 3, reps: '45s interval', isTimed: true, durationSeconds: 45, restSeconds: 20, description: 'High tempo push-ups.' }
    },
    setupSteps: ['Set palms on floor 1.5x shoulder width apart.', 'Form a straight plank line.'],
    executionSteps: ['Lower chest toward floor until deep chest stretch is reached.', 'Drive palms into floor to lock out.'],
    coachingCues: ['Focus on pulling elbows inward at apex', 'No hip sag'],
    commonMistakes: ['Flaring elbows 90 degrees', 'Shrugging shoulders']
  },
  {
    id: 'cable-chest-fly',
    name: 'Standing Cable Chest Fly',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'chest_fly',
    goalProtocols: {
      strength: { sets: 4, reps: '8-10 reps', restSeconds: 90, description: 'Controlled heavy fly with stable staggered stance.' },
      endurance: { sets: 3, reps: '20-25 reps', restSeconds: 30, description: 'High metabolic burn with continuous cable tension.' },
      hypertrophy: { sets: 3, reps: '12-15 reps', restSeconds: 60, description: 'Peak contraction hold at center for 1 full second.' }
    },
    setupSteps: ['Set pulleys at chest height.', 'Step forward into a staggered stance, core braced.'],
    executionSteps: ['Hug arms forward in a wide arc until hands meet.', 'Squeeze chest for 1 second, then control back.'],
    coachingCues: ['Touch inner biceps together', 'Elbows slightly soft throughout'],
    commonMistakes: ['Pressing instead of flying', 'Swinging torso']
  },
  {
    id: 'dips-chest-focus',
    name: 'Parallel Bar Dips',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: 'Pull-Up Bar',
    requiresBarOrFixture: true,
    difficulty: 'Advanced',
    mechanics: 'Compound',
    animationType: 'dip',
    goalProtocols: {
      strength: { sets: 4, reps: '6-8 reps', restSeconds: 150, description: 'Weighted dip belt or strict deep bodyweight reps.' },
      endurance: { sets: 3, reps: '1 min timed set', isTimed: true, durationSeconds: 60, restSeconds: 60, description: 'Pacing dips across 1 minute.' }
    },
    setupSteps: ['Grip parallel dip bars and press to lockout.', 'Tilt torso forward 30 degrees.'],
    executionSteps: ['Descend until elbows reach 90 degrees.', 'Drive through palms to lockout.'],
    coachingCues: ['Maintain forward lean', 'Keep shoulders packed down'],
    commonMistakes: ['Staying vertical', 'Dumping shoulders forward']
  },

  // ==========================================
  // BACK & LATS
  // ==========================================
  {
    id: 'lat-pulldown',
    name: 'Wide-Grip Lat Pulldown',
    primaryMuscles: ['lats'],
    secondaryMuscles: ['biceps', 'upper_back', 'forearms'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'lat_pulldown',
    goalProtocols: {
      strength: { sets: 4, reps: '6-8 reps', restSeconds: 120, description: 'Heavy controlled pulldown with locked torso posture.' },
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'High volume lat pump.' }
    },
    setupSteps: ['Secure thighs under pads.', 'Grip wide bar with overhand grip.'],
    executionSteps: ['Pull bar down to clavicle by driving elbows down and back.', 'Slowly control bar back to full overhead stretch.'],
    coachingCues: ['Lead with elbows, not hands', 'Chest tall toward ceiling'],
    commonMistakes: ['Swinging torso excessively', 'Pulling bar behind neck']
  },
  {
    id: 'pullups',
    name: 'Strict Pull-Up (Requires Bar)',
    primaryMuscles: ['lats'],
    secondaryMuscles: ['biceps', 'upper_back', 'forearms'],
    equipment: 'Pull-Up Bar',
    requiresBarOrFixture: true,
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    animationType: 'pullup',
    goalProtocols: {
      strength: { sets: 4, reps: '4-6 reps', restSeconds: 150, description: 'Dead hang pause at bottom, chin clearing bar.' },
      endurance: { sets: 3, reps: '1 min max unbroken', isTimed: true, durationSeconds: 60, restSeconds: 60, description: 'Paced pull-ups.' }
    },
    setupSteps: ['Hang from bar with overhand grip wider than shoulders.', 'Start from dead hang with straight arms.'],
    executionSteps: ['Depress scapulae and pull chest toward bar.', 'Lower smoothly into full dead hang.'],
    coachingCues: ['Pull elbows down into back pockets', 'Legs motionless'],
    commonMistakes: ['Kipping or swinging', 'Incomplete lockout']
  },
  {
    id: 'superman-pull',
    name: 'Prone Floor Superman Lat Rows (Zero Equipment)',
    primaryMuscles: ['lats', 'upper_back'],
    secondaryMuscles: ['lower_back', 'glutes', 'shoulders'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'superman',
    goalProtocols: {
      strength: { sets: 4, reps: '12-15 reps with 3s hold', restSeconds: 60, description: 'Isometric back contraction on the floor.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, restSeconds: 30, description: 'Floor lat squeeze repetitions.' },
      cardio: { sets: 3, reps: '45s interval', isTimed: true, durationSeconds: 45, restSeconds: 20, description: 'Continuous back extensions.' }
    },
    setupSteps: ['Lie face down on the floor with legs extended behind you.', 'Reach arms straight overhead.'],
    executionSteps: ['Lift chest and thighs by squeezing glutes and back.', 'Pull elbows down and back toward ribs.', 'Extend arms forward and lower smoothly.'],
    coachingCues: ['Pinch shoulder blades down and back', 'Keep neck neutral'],
    commonMistakes: ['Craning neck', 'Lifting arms without engaging back']
  },
  {
    id: 'doorframe-rows',
    name: 'Doorframe Bodyweight Rows (At-Home No Bar)',
    primaryMuscles: ['lats', 'upper_back'],
    secondaryMuscles: ['biceps', 'forearms'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'superman',
    goalProtocols: {
      strength: { sets: 4, reps: '12-15 strict reps', restSeconds: 60, description: 'Deep horizontal pull.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, restSeconds: 30, description: 'Continuous doorframe rows.' }
    },
    setupSteps: ['Stand in a doorframe, gripping door jamb with hands at chest height.', 'Walk feet forward to lean back.'],
    executionSteps: ['Pull chest forward between hands by driving elbows back.', 'Squeeze back tightly, then lower with straight arms.'],
    coachingCues: ['Keep body in a rigid plank', 'Pinch shoulder blades'],
    commonMistakes: ['Bending at hips', 'Yanking neck forward']
  },
  {
    id: 'bent-over-barbell-row',
    name: 'Bent-Over Barbell Row',
    primaryMuscles: ['upper_back', 'lats'],
    secondaryMuscles: ['biceps', 'lower_back', 'forearms'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    animationType: 'bent_over_row',
    goalProtocols: {
      strength: { sets: 4, reps: '5-6 reps', restSeconds: 150, description: 'Strict hip hinge angle with heavy barbell pull.' },
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'Continuous fluid rhythm and scapular squeeze.' }
    },
    setupSteps: ['Stand hip-width apart holding barbell with overhand grip.', 'Hinge hips back until torso is 45 degrees.'],
    executionSteps: ['Pull bar to navel by driving elbows to ceiling.', 'Squeeze scapulae at top, lower slowly.'],
    coachingCues: ['Lead with elbows', 'Keep chest proud and spine neutral'],
    commonMistakes: ['Standing too upright', 'Jerking with lower back']
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row',
    primaryMuscles: ['upper_back', 'lats'],
    secondaryMuscles: ['biceps', 'traps'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'seated_cable_row',
    goalProtocols: {
      strength: { sets: 4, reps: '6-8 reps', restSeconds: 120, description: 'Heavy neutral V-bar row with locked upright posture.' },
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'Scapular protraction and retraction pump.' }
    },
    setupSteps: ['Sit with feet braced on footrests, knees soft.', 'Grip V-handle, sit upright.'],
    executionSteps: ['Pull handle to abdomen driving elbows straight back.', 'Squeeze shoulder blades for 1 second, control back.'],
    coachingCues: ['Pinch a pencil between shoulder blades', 'Stay within 10 degrees of vertical'],
    commonMistakes: ['Swinging torso back and forth', 'Shrugging shoulders']
  },

  // ==========================================
  // SHOULDERS & TRAPS
  // ==========================================
  {
    id: 'overhead-barbell-press',
    name: 'Standing Overhead Barbell Press (OHP)',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'traps', 'abs'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    animationType: 'overhead_press',
    goalProtocols: {
      strength: { sets: 5, reps: '3-5 reps', restSeconds: 180, description: 'Total body tension and lockout overhead.' },
      endurance: { sets: 3, reps: '12-15 reps', restSeconds: 60, description: 'Unbroken pressing reps.' }
    },
    setupSteps: ['Bar resting at collarbone, hands just outside shoulders.', 'Squeeze glutes and brace core.'],
    executionSteps: ['Tilt chin back and press bar straight overhead.', 'Push head forward through the window at lockout.'],
    coachingCues: ['Tight glutes protect lower back', 'Press straight up in a phone booth'],
    commonMistakes: ['Arching lower back heavily', 'Pressing forward in an arc']
  },
  {
    id: 'dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['traps'],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'lateral_raise',
    goalProtocols: {
      strength: { sets: 3, reps: '8-10 reps', restSeconds: 90, description: 'Heavy strict lateral raises.' },
      endurance: { sets: 3, reps: '20-25 reps', restSeconds: 30, description: 'Metabolic deltoid pump.' }
    },
    setupSteps: ['Stand tall holding dumbbells at sides, slight 10-degree hip hinge.'],
    executionSteps: ['Raise arms out to sides in scapular plane to shoulder height.', 'Pause briefly and lower under 2-second control.'],
    coachingCues: ['Lead with elbows', 'Keep traps relaxed'],
    commonMistakes: ['Swinging weights with hips', 'Raising higher than shoulder line']
  },
  {
    id: 'pike-pushups',
    name: 'Pike Push-Ups (At-Home Shoulder Press)',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'traps', 'upper_back'],
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    animationType: 'pushup',
    goalProtocols: {
      strength: { sets: 4, reps: '8-10 reps', restSeconds: 90, description: 'Vertical pushing mechanics simulating overhead press.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, restSeconds: 45, description: 'Shoulder endurance burn.' },
      cardio: { sets: 3, reps: '45s interval', isTimed: true, durationSeconds: 45, restSeconds: 30, description: 'Paced pike pressing.' }
    },
    setupSteps: ['Start in pushup position, walk feet forward into inverted V-shape.'],
    executionSteps: ['Lower crown of head diagonally forward between hands.', 'Press back up to full pike lockout.'],
    coachingCues: ['Lower diagonally forward, not straight down', 'Keep hips high in the air'],
    commonMistakes: ['Flattening out into regular push-up', 'Flaring elbows wide']
  },
  {
    id: 'face-pull',
    name: 'Rope Cable Face Pull',
    primaryMuscles: ['shoulders', 'traps', 'upper_back'],
    secondaryMuscles: ['forearms'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'face_pull',
    goalProtocols: {
      strength: { sets: 3, reps: '8-10 reps', restSeconds: 90, description: 'Controlled pull to ears.' },
      endurance: { sets: 3, reps: '20-25 reps', restSeconds: 45, description: 'High repetition postural restorative sets.' }
    },
    setupSteps: ['Attach rope to cable at eye level, step back into staggered stance.'],
    executionSteps: ['Pull rope toward face, flaring rope ends outside ears.', 'Hold 1-second rear delt squeeze, extend smoothly.'],
    coachingCues: ['Pull thumbs past ears', 'Make double bicep pose at apex'],
    commonMistakes: ['Pulling down to chest', 'Leaning torso excessively back']
  },

  // ==========================================
  // LEGS: QUADS, HAMSTRINGS, GLUTES, CALVES
  // ==========================================
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['hamstrings', 'lower_back', 'abs', 'calves'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    mechanics: 'Compound',
    animationType: 'squat',
    goalProtocols: {
      strength: { sets: 5, reps: '3-5 reps', restSeconds: 180, description: 'Heavy structural drive out of the bottom hole.' },
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 90, description: 'High-rep breathing squats.' }
    },
    setupSteps: ['Rest bar across upper traps, step back with feet shoulder-width, toes out 15 degrees.'],
    executionSteps: ['Descend hips and knees together until hip crease is below knee level.', 'Drive through full foot to stand tall.'],
    coachingCues: ['Knees track over second toe', 'Spread floor with your feet'],
    commonMistakes: ['Knees caving inward', 'Heels lifting off floor']
  },
  {
    id: 'air-squats',
    name: 'Bodyweight Air Squats (Zero Equipment)',
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['hamstrings', 'calves'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'squat',
    goalProtocols: {
      strength: { sets: 4, reps: '20 deep tempo reps', restSeconds: 60, description: 'Deep below-parallel squats.' },
      endurance: { sets: 4, reps: '1 min unbroken', isTimed: true, durationSeconds: 60, restSeconds: 30, description: 'Sustained continuous bodyweight squats.' },
      cardio: { sets: 4, reps: '1 min interval', isTimed: true, durationSeconds: 60, restSeconds: 20, description: 'Paced rapid air squats.' }
    },
    setupSteps: ['Stand with feet shoulder-width, toes turned slightly out.'],
    executionSteps: ['Sit back and down into hips until thighs are parallel.', 'Drive through whole foot to stand, squeezing glutes.'],
    coachingCues: ['Chest proud', 'Weight balanced over midfoot'],
    commonMistakes: ['Knees caving', 'Heels lifting']
  },
  {
    id: 'romanian-deadlift',
    name: 'Barbell Romanian Deadlift (RDL)',
    primaryMuscles: ['hamstrings', 'glutes'],
    secondaryMuscles: ['lower_back', 'forearms', 'upper_back'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    animationType: 'rdl',
    goalProtocols: {
      strength: { sets: 4, reps: '5-6 reps', restSeconds: 150, description: 'Heavy hip hinge loading posterior chain.' },
      endurance: { sets: 3, reps: '15 reps', restSeconds: 60, description: 'Deep hamstring stretch with moderate weight.' }
    },
    setupSteps: ['Stand holding barbell at thighs, feet hip-width, knees soft.'],
    executionSteps: ['Hinge hips backward toward the wall, lowering bar past knees.', 'Drive hips forward to stand tall.'],
    coachingCues: ['Touch butt to wall behind you', 'Bar skims thighs'],
    commonMistakes: ['Squatting instead of hinging', 'Rounding lumbar spine']
  },
  {
    id: 'glute-bridges',
    name: 'Floor Glute Bridges (Zero Equipment)',
    primaryMuscles: ['glutes', 'hamstrings'],
    secondaryMuscles: ['lower_back', 'abs'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'glute_bridge',
    goalProtocols: {
      strength: { sets: 4, reps: '15 reps with 2s hold', restSeconds: 60, description: 'Maximum glute contraction at apex of bridge.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, restSeconds: 30, description: 'High rep posterior chain burn.' },
      cardio: { sets: 3, reps: '45s pulse', isTimed: true, durationSeconds: 45, restSeconds: 20, description: 'Pulsing bridge tempo.' }
    },
    setupSteps: ['Lie flat on back with knees bent, feet flat on floor hip-width apart.'],
    executionSteps: ['Drive through heels to raise hips into straight diagonal line.', 'Squeeze glutes hard at top for 2 seconds, lower slowly.'],
    coachingCues: ['Drive through heels', 'Do not overarch lower back'],
    commonMistakes: ['Arching back instead of hinging hips', 'Feet too far out']
  },
  {
    id: 'barbell-deadlift',
    name: 'Conventional Barbell Deadlift',
    primaryMuscles: ['lower_back', 'hamstrings', 'glutes'],
    secondaryMuscles: ['lats', 'traps', 'forearms', 'upper_back'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    mechanics: 'Compound',
    animationType: 'deadlift',
    goalProtocols: {
      strength: { sets: 5, reps: '3-5 reps', restSeconds: 180, description: 'Maximum pulling power from dead-stop reset on floor.' },
      endurance: { sets: 3, reps: '10-12 reps', restSeconds: 90, description: 'Moderate weight with meticulous spinal posture.' }
    },
    setupSteps: ['Bar over mid-foot, feet hip-width. Hinge down to grip bar just outside knees.', 'Pull slack out, flatten lumbar spine, pack lats.'],
    executionSteps: ['Drive floor away, keeping bar against shins.', 'Extend hips forward to stand tall, then hinge down to floor.'],
    coachingCues: ['Push earth away through heels', 'Squeeze oranges under armpits'],
    commonMistakes: ['Rounding lower back', 'Jerking bar before pulling slack']
  },
  {
    id: 'dumbbell-walking-lunges',
    name: 'Dumbbell Walking Lunges',
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['hamstrings', 'calves', 'abs'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    animationType: 'lunges',
    goalProtocols: {
      strength: { sets: 4, reps: '6-8 reps per leg', restSeconds: 120, description: 'Heavy dumbbells in farmer carry grip.' },
      endurance: { sets: 3, reps: '1 min walking track', isTimed: true, durationSeconds: 60, restSeconds: 60, description: 'Continuous lunge strides for 1 minute.' }
    },
    setupSteps: ['Hold dumbbells at sides with tall posture.'],
    executionSteps: ['Step forward 2-3 feet, lowering back knee to hover 1 inch above floor.', 'Drive through front heel directly into next stride.'],
    coachingCues: ['Step like on railroad tracks', 'Front shin vertical'],
    commonMistakes: ['Steps too short', 'Banging rear knee']
  },
  {
    id: 'leg-press',
    name: '45-Degree Incline Leg Press',
    primaryMuscles: ['quadriceps'],
    secondaryMuscles: ['glutes', 'hamstrings'],
    equipment: 'Machine',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'leg_press',
    goalProtocols: {
      strength: { sets: 4, reps: '6-8 reps', restSeconds: 120, description: 'Heavy progressive loading without lumbar flexion.' },
      endurance: { sets: 3, reps: '20-25 reps', restSeconds: 60, description: 'High repetition burn.' }
    },
    setupSteps: ['Hips and lower back pinned to seat, feet shoulder-width on platform.'],
    executionSteps: ['Lower sled smoothly to 90 degrees knee flexion.', 'Press through full foot without locking knees violently.'],
    coachingCues: ['Never snap knees straight', 'Keep tailbone down'],
    commonMistakes: ['Violent knee lockout', 'Tailbone curling up']
  },
  {
    id: 'standing-calf-raise',
    name: 'Standing Machine Calf Raise',
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    equipment: 'Machine',
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'calf_raise',
    goalProtocols: {
      strength: { sets: 4, reps: '8-10 reps', restSeconds: 90, description: 'Heavy loading on balls of feet.' },
      endurance: { sets: 3, reps: '25-30 reps', restSeconds: 30, description: 'High repetition burn.' }
    },
    setupSteps: ['Balls of feet on edge of platform, shoulder pads on shoulders.'],
    executionSteps: ['Lower heels into deep calf stretch, pause 2s.', 'Drive onto big toes and squeeze apex for 2s.'],
    coachingCues: ['Pause at bottom stretch', 'Push through big toes'],
    commonMistakes: ['Bouncing fast without pausing', 'Bending knees']
  },

  // ==========================================
  // ARMS: BICEPS & TRICEPS
  // ==========================================
  {
    id: 'barbell-bicep-curl',
    name: 'Standing Barbell Bicep Curl',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    equipment: 'Barbell',
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'bicep_curl',
    goalProtocols: {
      strength: { sets: 4, reps: '6-8 reps', restSeconds: 90, description: 'Heavy straight bar curl with locked core.' },
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'Continuous pump tempo.' }
    },
    setupSteps: ['Stand upright holding barbell underhand shoulder-width, elbows by ribs.'],
    executionSteps: ['Curl bar up by flexing biceps without swinging torso.', 'Squeeze top, lower under 2-3s control.'],
    coachingCues: ['Elbows pinned at sides like hinges', 'No rocking torso'],
    commonMistakes: ['Swinging torso backwards', 'Elbows drifting forward']
  },
  {
    id: 'hammer-curl',
    name: 'Dumbbell Hammer Curl',
    primaryMuscles: ['biceps', 'forearms'],
    secondaryMuscles: [],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'hammer_curl',
    goalProtocols: {
      strength: { sets: 4, reps: '6-8 reps', restSeconds: 90, description: 'Heavy neutral grip curls.' },
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'Alternating continuous tempo.' }
    },
    setupSteps: ['Hold dumbbells with neutral palms-facing-each-other grip.'],
    executionSteps: ['Curl dumbbells up toward shoulders maintaining neutral grip.', 'Pause at top, lower slowly.'],
    coachingCues: ['Keep palms facing each other throughout', 'Elbows locked by sides'],
    commonMistakes: ['Rotating wrists', 'Swinging shoulders']
  },
  {
    id: 'cable-tricep-pushdown',
    name: 'Cable Tricep Rope Pushdown',
    primaryMuscles: ['triceps'],
    secondaryMuscles: ['forearms'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'tricep_pushdown',
    goalProtocols: {
      strength: { sets: 4, reps: '8-10 reps', restSeconds: 90, description: 'Heavy rope pushdowns.' },
      endurance: { sets: 3, reps: '20-25 reps', restSeconds: 30, description: 'Fast metabolic burn with locked elbows.' }
    },
    setupSteps: ['Grip rope from high pulley, pin elbows against ribcage.'],
    executionSteps: ['Extend arms downward by contracting triceps.', 'Spread rope ends outward at bottom, hold 1s, return to 90 degrees.'],
    coachingCues: ['Only forearms move', 'Spread rope at bottom'],
    commonMistakes: ['Elbows riding forward and back', 'Using body weight to press']
  },
  {
    id: 'diamond-pushups',
    name: 'Diamond Tricep Push-Ups (Zero Equipment)',
    primaryMuscles: ['triceps'],
    secondaryMuscles: ['chest', 'shoulders', 'abs'],
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    animationType: 'pushup',
    goalProtocols: {
      strength: { sets: 4, reps: '10-12 strict reps', restSeconds: 90, description: 'Slow negative targeting tricep extension.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, restSeconds: 45, description: 'Tricep pump to technical fatigue.' },
      cardio: { sets: 3, reps: '45s interval', isTimed: true, durationSeconds: 45, restSeconds: 30, description: 'Paced pushup reps.' }
    },
    setupSteps: ['Get into pushup plank with index fingers and thumbs touching in a diamond shape under sternum.'],
    executionSteps: ['Lower chest toward diamond with elbows tucked at 30 degrees.', 'Drive up through palms to full lockout.'],
    coachingCues: ['Keep elbows tucked', 'Maintain rigid straight plank'],
    commonMistakes: ['Flaring elbows 90 degrees', 'Hips sagging']
  },

  // ==========================================
  // CORE & CARDIO
  // ==========================================
  {
    id: 'plank-classic',
    name: 'Forearm Core Plank Hold',
    primaryMuscles: ['abs'],
    secondaryMuscles: ['obliques', 'shoulders', 'glutes'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'plank',
    goalProtocols: {
      strength: { sets: 4, reps: '45s hard brace', isTimed: true, durationSeconds: 45, restSeconds: 60, description: 'Maximum voluntary full-body contraction plank.' },
      endurance: { sets: 3, reps: '2 mins continuous', isTimed: true, durationSeconds: 120, restSeconds: 60, description: 'Endurance isometric core bracing.' },
      cardio: { sets: 3, reps: '1 min hold', isTimed: true, durationSeconds: 60, restSeconds: 30, description: 'Aerobic core brace.' }
    },
    setupSteps: ['Forearms on floor, elbows under shoulders, legs straight back on toes.'],
    executionSteps: ['Hold static posture with neutral spine, glutes and abs tight.'],
    coachingCues: ['Pull elbows toward toes', 'Squeeze glutes to protect lower back'],
    commonMistakes: ['Sagging lower back', 'Holding breath']
  },
  {
    id: 'bicycle-crunches',
    name: 'Floor Bicycle Crunches (Zero Equipment)',
    primaryMuscles: ['abs', 'obliques'],
    secondaryMuscles: [],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'plank',
    goalProtocols: {
      strength: { sets: 3, reps: '20 controlled reps', restSeconds: 45, description: 'Slow 2-second squeeze at elbow-to-knee contact.' },
      endurance: { sets: 4, reps: '1 min continuous', isTimed: true, durationSeconds: 60, restSeconds: 30, description: 'Rhythmic rotational core burn.' },
      cardio: { sets: 4, reps: '1 min interval', isTimed: true, durationSeconds: 60, restSeconds: 20, description: 'Fast aerobic core pedaling.' }
    },
    setupSteps: ['Lie on back, fingertips behind ears, shoulders slightly off floor.'],
    executionSteps: ['Pedal right knee in while twisting left shoulder across to meet it.', 'Alternate smoothly in continuous pedaling motion.'],
    coachingCues: ['Rotate armpit toward knee, not just elbow', 'Lower back glued to floor'],
    commonMistakes: ['Yanking head forward', 'Moving too fast without range']
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks (Cardio Burst)',
    primaryMuscles: ['calves', 'shoulders'],
    secondaryMuscles: ['quadriceps', 'abs'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    isCardio: true,
    animationType: 'jumping_jacks',
    goalProtocols: {
      strength: { sets: 3, reps: '1 min', isTimed: true, durationSeconds: 60, restSeconds: 30, description: 'Moderate cadence warmup.' },
      endurance: { sets: 4, reps: '2 mins', isTimed: true, durationSeconds: 120, restSeconds: 30, description: 'Sustained aerobic conditioning.' },
      cardio: { sets: 4, reps: '1 min max speed', isTimed: true, durationSeconds: 60, restSeconds: 20, description: 'High intensity interval burst.' }
    },
    setupSteps: ['Stand with feet together and arms at sides.'],
    executionSteps: ['Jump feet out while raising arms overhead.', 'Immediately jump back to starting position.'],
    coachingCues: ['Land softly on balls of feet', 'Rhythmic breathing'],
    commonMistakes: ['Heavy flat-footed landings', 'Partial arm range']
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers (Cardio & Core)',
    primaryMuscles: ['abs', 'shoulders'],
    secondaryMuscles: ['quadriceps', 'calves'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    isCardio: true,
    animationType: 'mountain_climber',
    goalProtocols: {
      strength: { sets: 3, reps: '45s strict tempo', isTimed: true, durationSeconds: 45, restSeconds: 45, description: 'Controlled knee drive.' },
      endurance: { sets: 4, reps: '1 min continuous', isTimed: true, durationSeconds: 60, restSeconds: 30, description: 'Continuous pacing.' },
      cardio: { sets: 4, reps: '1 min high speed', isTimed: true, durationSeconds: 60, restSeconds: 20, description: 'Sprinting climber intervals.' }
    },
    setupSteps: ['Start in a solid high push-up plank, hands under shoulders.'],
    executionSteps: ['Drive one knee forward toward chest, quickly switch legs in running motion.'],
    coachingCues: ['Keep hips level with shoulders', 'Hands firmly planted'],
    commonMistakes: ['Bouncing hips high in air', 'Short choppy strides']
  },
  {
    id: 'burpees',
    name: 'Full Body Burpees (High Intensity Cardio)',
    primaryMuscles: ['quadriceps', 'chest', 'abs'],
    secondaryMuscles: ['glutes', 'shoulders', 'calves'],
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    isCardio: true,
    animationType: 'burpee',
    goalProtocols: {
      strength: { sets: 3, reps: '10 strict reps with push-up', restSeconds: 60, description: 'Deliberate explosive burpees.' },
      endurance: { sets: 4, reps: '1 min continuous', isTimed: true, durationSeconds: 60, restSeconds: 40, description: 'Aerobic pacing.' },
      cardio: { sets: 4, reps: '1 min max effort', isTimed: true, durationSeconds: 60, restSeconds: 30, description: 'Full anaerobic heart rate surge.' }
    },
    setupSteps: ['Stand tall with feet shoulder-width apart.'],
    executionSteps: ['Drop hands to floor and kick feet back into plank.', 'Perform pushup, jump feet back to hands, explode up into vertical jump with clap.'],
    coachingCues: ['Land with knees soft', 'Maintain core brace during kickback'],
    commonMistakes: ['Sagging back during plank', 'Skipping vertical jump']
  }
];

export function getExerciseById(id) {
  return EXERCISES.find(ex => ex.id === id) || null;
}

export function getExercisesByMuscle(muscleId) {
  return EXERCISES.filter(ex => ex.primaryMuscles.includes(muscleId) || ex.secondaryMuscles.includes(muscleId));
}

export function getExercisesByEquipment(equipmentList) {
  return EXERCISES.filter(ex => equipmentList.includes(ex.equipment));
}
