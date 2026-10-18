import { Exercise } from '../types/fitness';

export const EXERCISES: Exercise[] = [
  // CHEST
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
    name: 'Bodyweight Push-Up',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders', 'abs'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'pushup',
    goalProtocols: {
      strength: { sets: 4, reps: '12-15 reps', restSeconds: 90, description: 'Strict tempo pushups with pause at bottom.' },
      endurance: { sets: 3, reps: '1 min hold / max reps', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 45, description: 'Continuous uninterrupted push-up cadence for 1 full minute.' },
      hypertrophy: { sets: 3, reps: '15-20 reps', restSeconds: 60, description: 'Controlled 3-second descent.' }
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
    setupSteps: [
      'Set cable pulleys at chest height or slightly higher with single D-handles.',
      'Grasp both handles, take a step forward into a staggered stance, and brace your core.',
      'Maintain a soft bend in the elbows that stays fixed throughout the movement.'
    ],
    executionSteps: [
      'Open your arms wide in a controlled hug motion until your chest feels a deep stretch.',
      'Contract your pectorals to bring hands together in front of your chest as if hugging a wide tree trunk.',
      'Pause for a 1-second squeeze at peak contraction before slowly releasing back.'
    ],
    coachingCues: ['Think about touching your inner biceps together', 'Keep elbows fixed at one angle', 'Chest up tall'],
    commonMistakes: ['Turning fly into a pressing motion', 'Over-extending shoulders behind plane of body']
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
      endurance: { sets: 3, reps: '1 min timed set', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 60, description: 'Sustained pacing dips or isometric dip hold for 1 min.' },
      hypertrophy: { sets: 3, reps: '8-12 reps', restSeconds: 90, description: 'Forward lean to bias lower pectoral fibers.' }
    },
    setupSteps: [
      'Grip the parallel dip bars firmly and press yourself up to arm lockout.',
      'Tilt your torso forward at a 30-degree angle and cross ankles behind you.'
    ],
    executionSteps: [
      'Lower yourself smoothly by bending elbows, allowing shoulders to descend until elbows hit 90 degrees.',
      'Keep torso tilted forward throughout descent to emphasize pectorals over triceps.',
      'Drive forcefully through palms to return to the starting position.'
    ],
    coachingCues: ['Maintain forward torso angle throughout', 'Keep shoulders packed down', 'Do not drop past comfort zone'],
    commonMistakes: ['Staying completely vertical (shifts stress to triceps)', 'Excessive shoulder dumping']
  },

  // BACK & LATS
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
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'High repetition volume focusing on continuous pump.' },
      hypertrophy: { sets: 4, reps: '10-12 reps', restSeconds: 90, description: 'Full stretch at top and hard lat squeeze at clavicle.' }
    },
    setupSteps: [
      'Adjust thigh pads snugly so knees cannot lift during the movement.',
      'Grasp wide curved bar with an overhand grip slightly wider than shoulder-width.',
      'Sit down with arms fully extended overhead and a slight arch in upper thoracic spine.'
    ],
    executionSteps: [
      'Depress scapulae downward and initiate pull with your lats.',
      'Pull elbows down and slightly back until the bar reaches your upper chest/collarbone.',
      'Control the bar back up to the top stretch position with arms reaching overhead.'
    ],
    coachingCues: ['Pull with your elbows, not your hands', 'Chest high toward the ceiling', 'Feel the wings flare on ascent'],
    commonMistakes: ['Swinging torso excessively backwards', 'Pulling bar behind the neck', 'Rounding shoulders forward']
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
      strength: { sets: 4, reps: '4-6 reps', restSeconds: 150, description: 'Dead hang pause at bottom, chin clearly clearing bar.' },
      endurance: { sets: 3, reps: '1 min max unbroken', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 60, description: 'Paced pull-ups across 1 minute.' },
      hypertrophy: { sets: 3, reps: '8-12 reps', restSeconds: 90, description: 'Smooth 3-second negative descent.' }
    },
    setupSteps: [
      'Hang from overhead pull-up bar with overhand grip slightly wider than shoulders.',
      'Start from a dead hang with arms fully straight and core engaged.'
    ],
    executionSteps: [
      'Engage shoulder blades down and back, then pull chest toward the bar.',
      'Drive elbows down toward hips until your chin clears the bar.',
      'Lower yourself smoothly back down into full dead hang stretch.'
    ],
    coachingCues: ['Pull elbows down into back pockets', 'Legs motionless and toes pointed', 'Chest high to bar'],
    commonMistakes: ['Kicking legs or kipping', 'Cutting range of motion at bottom', 'Craning neck forward over bar']
  },
  {
    id: 'superman-pull',
    name: 'Prone Floor Superman Lat Rows (At-Home No Equipment)',
    primaryMuscles: ['lats', 'upper_back'],
    secondaryMuscles: ['lower_back', 'glutes', 'shoulders'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'superman',
    goalProtocols: {
      strength: { sets: 4, reps: '12-15 reps with 3s hold', restSeconds: 60, description: 'Isometric back contraction on the floor.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Floor back and lat squeeze repetitions.' },
      cardio: { sets: 3, reps: '45s', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 20, description: 'Continuous back extensions.' }
    },
    setupSteps: [
      'Lie face down on the floor or exercise mat with legs extended behind you.',
      'Reach arms straight overhead with thumbs pointing toward the ceiling.'
    ],
    executionSteps: [
      'Lift your chest, arms, and thighs off the floor by squeezing glutes and back muscles.',
      'Pull elbows down and back toward your ribs, engaging your lats as if pulling a bar.',
      'Extend arms back overhead and lower smoothly to the floor.'
    ],
    coachingCues: ['Pinch shoulder blades down and back', 'Keep neck neutral looking at the floor', 'Squeeze glutes to protect lower spine'],
    commonMistakes: ['Craning neck back too hard', 'Only lifting arms without engaging mid-back']
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
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'Continuous fluid rhythm and scapular squeeze.' },
      hypertrophy: { sets: 4, reps: '8-10 reps', restSeconds: 90, description: 'Pause 1 second against the abdomen.' }
    },
    setupSteps: [
      'Stand hip-width apart holding barbell with overhand shoulder-width grip.',
      'Hinge hips backwards until torso is angled at approximately 45 degrees.',
      'Engage core and keep spine neutral with knees softly bent.'
    ],
    executionSteps: [
      'Pull the bar upward toward your lower belly/navel by driving elbows back toward ceiling.',
      'Retract your shoulder blades tightly at the top of the stroke.',
      'Lower the bar slowly under complete control until arms reach full extension.'
    ],
    coachingCues: ['Lead with the elbows', 'Keep chest proud and neck neutral', 'Do not bounce hips to generate momentum'],
    commonMistakes: ['Standing too upright', 'Yanking weights with lower back', 'Wrist curling at top']
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
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'High cadence pump with scapular protraction and retraction.' },
      hypertrophy: { sets: 3, reps: '10-12 reps', restSeconds: 90, description: 'Deep stretch forward followed by full scapular retraction.' }
    },
    setupSteps: [
      'Sit at the low cable pulley with feet braced on footrests and knees slightly bent.',
      'Grasp V-grip handle, sit upright with spine neutral and chest elevated.'
    ],
    executionSteps: [
      'Pull handle into lower abdomen by driving elbows straight back.',
      'Squeeze shoulder blades together forcefully for 1 second.',
      'Slowly extend arms, allowing scapulae to protract and stretch lats.'
    ],
    coachingCues: ['Do not lean back beyond 10 degrees', 'Pinch a pencil between shoulder blades at peak', 'Keep shoulders down away from ears'],
    commonMistakes: ['Excessive swinging back and forth with lower spine', 'Shrugging shoulders upward']
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
      endurance: { sets: 3, reps: '10-12 reps', restSeconds: 90, description: 'Moderate weight with meticulous spinal posture.' },
      hypertrophy: { sets: 3, reps: '6-8 reps', restSeconds: 120, description: 'Controlled eccentric lowering to maintain tension.' }
    },
    setupSteps: [
      'Stand with feet hip-width apart, barbell cutting across mid-foot.',
      'Hinge at hips to grip bar just outside knees with double overhand or hook grip.',
      'Pull slack out of bar, flatten lumbar spine, pack lats, and wedge hips down.'
    ],
    executionSteps: [
      'Drive the floor away with your legs, keeping the bar glued against your shins.',
      'As bar passes knees, extend hips forward to stand tall with shoulders locked back.',
      'Hinge hips backwards first, lowering bar under control back to the dead floor position.'
    ],
    coachingCues: ['Push the earth away through your heels', 'Lats tight like squeezing oranges under armpits', 'Bar stays shaved against shins'],
    commonMistakes: ['Rounding the lumbar spine (cat-back)', 'Jerking the bar before pulling slack', 'Hyperextending spine at lockout']
  },

  // SHOULDERS / DELTOIDS
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
      endurance: { sets: 3, reps: '12-15 reps', restSeconds: 60, description: 'Unbroken pressing reps with solid core brace.' },
      hypertrophy: { sets: 4, reps: '8-10 reps', restSeconds: 90, description: 'Strict vertical bar path under full control.' }
    },
    setupSteps: [
      'Rack bar at collarbone height. Grip bar just outside shoulders with vertical forearms.',
      'Unrack bar resting across front clavicle, feet shoulder-width apart.',
      'Squeeze glutes, quads, and abs tight to form an unbending column.'
    ],
    executionSteps: [
      'Tilt head slightly back to clear chin, and press bar vertically overhead.',
      'Once bar clears forehead, push head back through the window between arms.',
      'Lock out elbows overhead with shrug at top, then reverse path back down to collarbone.'
    ],
    coachingCues: ['Tight glutes protect your lower back', 'Press bar straight up in a phone booth', 'Stack wrists directly over elbows'],
    commonMistakes: ['Excessive lumbar hyper-extension', 'Flaring elbows outward', 'Pressing forward in an arc']
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
      strength: { sets: 3, reps: '8-10 reps', restSeconds: 90, description: 'Heavy partial raises combined with strict negatives.' },
      endurance: { sets: 3, reps: '20-25 reps', restSeconds: 30, description: 'Brutal metabolic delt pump.' },
      hypertrophy: { sets: 4, reps: '12-15 reps', restSeconds: 60, description: 'Controlled 2-second negative to build shoulder boulder width.' }
    },
    setupSteps: [
      'Stand tall holding dumbbells at your sides, palms facing inward.',
      'Hinge forward slightly (10 degrees) with soft knees and chest open.'
    ],
    executionSteps: [
      'Raise arms out to sides in scapular plane (30 degrees forward of direct lateral).',
      'Lift until dumbbells reach shoulder height with pinkies slightly higher or level with thumbs.',
      'Pause briefly, then lower dumbbells under strict 2-second control.'
    ],
    coachingCues: ['Pour water from a pitcher at top', 'Lead with your elbows', 'Keep traps relaxed down'],
    commonMistakes: ['Swinging torso or using momentum', 'Shrugging shoulders into ears', 'Raising arms way above shoulder line']
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
      endurance: { sets: 3, reps: '20-25 reps', restSeconds: 45, description: 'High repetition postural restorative sets.' },
      hypertrophy: { sets: 4, reps: '12-15 reps', restSeconds: 60, description: 'Crucial for rear delts and rotator cuff health.' }
    },
    setupSteps: [
      'Attach rope to cable pulley set at eye height.',
      'Grip ends of rope with thumbs pointing backward or overhand grip.',
      'Step back with feet staggered, leaning slightly away from stack.'
    ],
    executionSteps: [
      'Pull rope towards face, separating rope ends as you pull.',
      'Drive elbows back and externally rotate hands until knuckles align with ears.',
      'Hold peak rear-delt squeeze for 1 second, then extend arms smoothly.'
    ],
    coachingCues: ['Pull thumbs past ears', 'Squeeze back of shoulders, not upper traps', 'Make a double bicep pose at apex'],
    commonMistakes: ['Pulling rope down to neck or chest', 'Leaning torso excessively back and forth']
  },

  // LEGS - QUADS
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
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 90, description: 'High-rep breathing squats building lactic threshold.' },
      hypertrophy: { sets: 4, reps: '8-10 reps', restSeconds: 120, description: 'Deep below parallel squat targeting maximum quad growth.' }
    },
    setupSteps: [
      'Position bar on upper traps (high bar) or across rear delts (low bar).',
      'Step back, placing feet shoulder-width apart with toes angled out 15-30 degrees.',
      'Take a deep belly breath into diaphragm, expand 360-degree core brace.'
    ],
    executionSteps: [
      'Break at hips and knees simultaneously, descending under control.',
      'Squat down until hip crease is below top of knees while keeping chest proud.',
      'Drive out of the hole through midfoot and heels, standing fully tall at top.'
    ],
    coachingCues: ['Knees track over second toe', 'Spread the floor with your feet', 'Chest up proud like a silverback gorilla'],
    commonMistakes: ['Knees caving inward (valgus collapse)', 'Rounding lower back (butt wink)', 'Heels lifting off floor']
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
      endurance: { sets: 3, reps: '20-25 reps', restSeconds: 60, description: 'Leg burning metabolic pump candidate.' },
      hypertrophy: { sets: 4, reps: '10-12 reps', restSeconds: 90, description: 'Foot placement low and shoulder-width for quad overload.' }
    },
    setupSteps: [
      'Sit into machine, pressing hips and lower back firmly against backrest pad.',
      'Place feet flat on footplate shoulder-width apart, toes pointing slightly outward.',
      'Release safety handles and extend legs without locking knees out violently.'
    ],
    executionSteps: [
      'Lower sled smoothly by bending knees until they reach approximately 90 degrees.',
      'Ensure tailbone stays pinned to the seat without curling upward.',
      'Press through full foot to return sled to near lockout.'
    ],
    coachingCues: ['Never hyperextend or snap knees straight', 'Keep lower back glued to pad', 'Full deep range of motion'],
    commonMistakes: ['Locking knees hard at top', 'Letting lower back curl off pad at bottom', 'Hands pushing on knees']
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
      endurance: { sets: 3, reps: '1 min walking track', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 60, description: 'Continuous unbroken lunge strides for 1 minute.' },
      hypertrophy: { sets: 3, reps: '12 reps per leg', restSeconds: 90, description: 'Deep knee drop with upright torso posture.' }
    },
    setupSteps: [
      'Hold a dumbbell in each hand by sides with shoulders pinned back.',
      'Stand tall with core braced and eyes focused on a forward horizon point.'
    ],
    executionSteps: [
      'Step forward approximately 2 to 3 feet with leading leg.',
      'Lower rear knee toward floor until it gently hovers 1 inch above surface.',
      'Drive upward and forward through the front heel to step directly into the next stride.'
    ],
    coachingCues: ['Step like on railroad tracks, not a tightrope', 'Front shin nearly vertical', 'Keep torso steady without wobbling'],
    commonMistakes: ['Taking steps too short (crowds knees)', 'Letting front knee cave inward', 'Banging back knee on floor']
  },

  // LEGS - HAMSTRINGS & GLUTES
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
      endurance: { sets: 3, reps: '15 reps', restSeconds: 60, description: 'High hamstring stretch with moderate weight.' },
      hypertrophy: { sets: 4, reps: '8-10 reps', restSeconds: 90, description: 'Accentuate 3-second eccentric stretch across hamstrings.' }
    },
    setupSteps: [
      'Stand holding barbell with overhand shoulder-width grip at hip height.',
      'Feet hip-width apart, knees soft with very slight 10-degree unlock.',
      'Shoulder blades pulled back, core braced firmly.'
    ],
    executionSteps: [
      'Push your hips backwards toward the wall behind you while keeping bar close to legs.',
      'Lower bar just below knees until you feel a profound stretch across hamstrings.',
      'Drive hips forcefully forward to stand tall, squeezing glutes hard at the top.'
    ],
    coachingCues: ['Think about touching your butt to the wall behind you', 'Do not bend knees further as you descend', 'Keep bar skimming down your thighs'],
    commonMistakes: ['Squatting instead of hinging', 'Rounding lumbar spine', 'Letting bar drift away from shins']
  },
  {
    id: 'lying-leg-curl',
    name: 'Lying Hamstring Leg Curl',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: ['calves'],
    equipment: 'Machine',
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'leg_curl',
    goalProtocols: {
      strength: { sets: 3, reps: '6-8 reps', restSeconds: 90, description: 'Heavy controlled curls.' },
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'Continuous burn with 2-second negative.' },
      hypertrophy: { sets: 4, reps: '10-12 reps', restSeconds: 60, description: 'Dorsiflex ankles (toes toward shins) to isolate hamstring heads.' }
    },
    setupSteps: [
      'Lie face down on machine with knee axis aligned directly with machine pivot point.',
      'Set roller pad so it rests across lower calves, just above Achilles tendons.',
      'Grasp handles firmly to anchor hips down onto pad.'
    ],
    executionSteps: [
      'Curl the roller pad upward toward your glutes in a smooth powerful arc.',
      'Hold contraction at the top for 1 full second, squeezing hamstrings.',
      'Lower roller pad slowly under control until knees reach full extension.'
    ],
    coachingCues: ['Keep hips pressed down into pad', 'Pull toes toward shins', 'Do not jerk weight with lower back'],
    commonMistakes: ['Lifting hips off bench during curl', 'Using momentum to slam weights']
  },
  {
    id: 'hip-thrust',
    name: 'Barbell Glute Hip Thrust',
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['hamstrings', 'quadriceps', 'abs'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    animationType: 'hip_thrust',
    goalProtocols: {
      strength: { sets: 4, reps: '6-8 reps', restSeconds: 150, description: 'Heavy barbell padded with foam bar protector.' },
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 60, description: 'High volume burn to technical fatigue.' },
      hypertrophy: { sets: 4, reps: '10-12 reps', restSeconds: 90, description: '2-second glute squeeze at full horizontal hip extension.' }
    },
    setupSteps: [
      'Sit on floor with upper back resting against a sturdy flat gym bench (around shoulder blade level).',
      'Roll a padded barbell over legs until it rests securely across your hip crease.',
      'Bend knees and plant feet flat on floor about shoulder-width apart.'
    ],
    executionSteps: [
      'Drive down through your heels to extend hips vertically upward.',
      'At top, thighs and torso should form a straight horizontal tabletop line, shins vertical.',
      'Tuck chin to chest slightly, squeeze glutes hard for 2 seconds, then lower under control.'
    ],
    coachingCues: ['Drive through heels', 'Tuck chin and gaze forward, not at ceiling', 'Ribcage down to prevent hyperextending back'],
    commonMistakes: ['Arching lower back instead of hinging hips', 'Feet too far out or too close in']
  },

  // ARMS - BICEPS
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
      strength: { sets: 4, reps: '6-8 reps', restSeconds: 90, description: 'Heavy EZ-bar or straight bar with solid core brace.' },
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'Continuous pump tempo.' },
      hypertrophy: { sets: 4, reps: '10-12 reps', restSeconds: 60, description: 'Strict elbows pinned to ribs for peak bicep peak.' }
    },
    setupSteps: [
      'Stand upright holding barbell with an underhand (supinated) shoulder-width grip.',
      'Elbows close to torso, shoulders retracted, feet shoulder-width apart.'
    ],
    executionSteps: [
      'While keeping upper arms stationary, curl barbell upward by flexing biceps.',
      'Continue lifting until biceps are fully contracted and bar is at shoulder level.',
      'Squeeze hard at top, then lower bar slowly back to full elbow extension over 2-3 seconds.'
    ],
    coachingCues: ['Keep elbows pinned at your sides like on hinges', 'Do not rock your back', 'Squeeze the bar tight'],
    commonMistakes: ['Swinging torso backwards to throw weight up', 'Elbows drifting forward during lift']
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
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'Alternating reps with continuous tempo.' },
      hypertrophy: { sets: 3, reps: '10-12 reps', restSeconds: 60, description: 'Targets brachialis and brachioradialis for arm thickness.' }
    },
    setupSteps: [
      'Stand tall holding dumbbells with a neutral grip (palms facing each other).',
      'Shoulders back and core engaged.'
    ],
    executionSteps: [
      'Curl dumbbells toward shoulders while maintaining the neutral hammer grip.',
      'Pause and squeeze at the top of the movement.',
      'Lower weights under control back to side of thighs.'
    ],
    coachingCues: ['Keep palms facing each other the whole time', 'Do not rotate wrists', 'Elbows locked by side'],
    commonMistakes: ['Swinging dumbbells', 'Flaring elbows outward']
  },

  // ARMS - TRICEPS
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
      strength: { sets: 4, reps: '8-10 reps', restSeconds: 90, description: 'Heavy straight-bar or rope pushdowns.' },
      endurance: { sets: 3, reps: '20-25 reps', restSeconds: 30, description: 'Fast metabolic burn with locked elbows.' },
      hypertrophy: { sets: 4, reps: '12-15 reps', restSeconds: 60, description: 'Spread rope apart at bottom for lateral head peak.' }
    },
    setupSteps: [
      'Attach rope accessory to high cable pulley.',
      'Grasp rope near ends with thumbs pointing up, step back slightly.',
      'Pin elbows securely against ribcage and lean forward 10 degrees at hips.'
    ],
    executionSteps: [
      'Extend arms downward by contracting triceps.',
      'At full extension, flare wrists and spread rope ends outward past thighs.',
      'Hold peak squeeze for 1 second, then let forearms return to 90 degrees under control.'
    ],
    coachingCues: ['Only your forearms should move', 'Spread the rope at the bottom', 'Keep elbows glued to ribs'],
    commonMistakes: ['Allowing elbows to ride forward and back', 'Using shoulders to press down']
  },
  {
    id: 'overhead-dumbbell-tricep-extension',
    name: 'Overhead Seated Dumbbell Tricep Extension',
    primaryMuscles: ['triceps'],
    secondaryMuscles: ['forearms'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    mechanics: 'Isolation',
    animationType: 'overhead_tricep',
    goalProtocols: {
      strength: { sets: 3, reps: '8 reps', restSeconds: 90, description: 'Heavy dumbbell cupped in both hands.' },
      endurance: { sets: 3, reps: '15-20 reps', restSeconds: 45, description: 'High repetition pump.' },
      hypertrophy: { sets: 3, reps: '10-12 reps', restSeconds: 60, description: 'Full stretch of long head behind head.' }
    },
    setupSteps: [
      'Sit on low-back bench holding dumbbell with both hands forming a diamond under top plate.',
      'Press dumbbell overhead with arms fully extended.'
    ],
    executionSteps: [
      'Lower dumbbell behind head by bending elbows while keeping upper arms close to ears.',
      'Descend until forearms hit biceps in deep stretch.',
      'Drive dumbbell overhead until elbows are fully extended.'
    ],
    coachingCues: ['Keep elbows tucked in', 'Feel deep stretch in back of arm', 'Maintain neutral spine without rib flare'],
    commonMistakes: ['Flaring elbows wide to sides', 'Arching lower back heavily']
  },

  // CORE / ABS / OBLIQUES
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg / Knee Raise (Requires Bar)',
    primaryMuscles: ['abs'],
    secondaryMuscles: ['forearms', 'obliques'],
    equipment: 'Pull-Up Bar',
    requiresBarOrFixture: true,
    difficulty: 'Intermediate',
    mechanics: 'Isolation',
    animationType: 'hanging_leg_raise',
    goalProtocols: {
      strength: { sets: 4, reps: '8-10 reps', restSeconds: 90, description: 'Straight leg raises with toes touching bar.' },
      endurance: { sets: 3, reps: '1 min max reps', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 45, description: 'Paced knee tucks sustained for 1 minute.' },
      hypertrophy: { sets: 3, reps: '12-15 reps', restSeconds: 60, description: 'Curl pelvis upward at top to isolate lower rectus abdominis.' }
    },
    setupSteps: [
      'Hang from overhead pull-up bar with overhand grip and dead hang posture.',
      'Engage lats slightly to prevent body swing.'
    ],
    executionSteps: [
      'Without swinging, raise legs or knees upward towards chest.',
      'Crucially, tilt pelvis upward at the top (posterior pelvic tilt) to contract abs fully.',
      'Lower legs slowly under complete control without swinging back.'
    ],
    coachingCues: ['Roll pelvis up toward ribcage', 'No swinging or momentum', 'Exhale hard as legs rise'],
    commonMistakes: ['Swinging body like a pendulum', 'Using hip flexors only without rounding pelvis']
  },
  {
    id: 'bicycle-crunches',
    name: 'Floor Bicycle Crunches (At-Home No Equipment)',
    primaryMuscles: ['abs', 'obliques'],
    secondaryMuscles: [],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'plank',
    goalProtocols: {
      strength: { sets: 3, reps: '20 controlled reps', restSeconds: 45, description: 'Slow 2-second squeeze at diagonal elbow-to-knee contact.' },
      endurance: { sets: 4, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Rhythmic rotational abdominal burn.' },
      cardio: { sets: 4, reps: '1 min interval', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 20, description: 'Fast aerobic core pedaling.' }
    },
    setupSteps: [
      'Lie flat on your back on the floor with knees bent and feet flat.',
      'Place fingertips gently behind ears without pulling on your neck.',
      'Lift shoulders slightly off the ground and elevate legs.'
    ],
    executionSteps: [
      'Pedal your right knee in toward chest while twisting left shoulder across to meet it.',
      'Simultaneously extend left leg straight out hovering just above the floor.',
      'Switch sides smoothly in a continuous pedaling rotation.'
    ],
    coachingCues: ['Rotate your armpit toward the knee, not just the elbow', 'Lower back stays glued to floor', 'Breathe steadily'],
    commonMistakes: ['Yanking the head and neck forward', 'Moving too fast with poor range']
  },
  {
    id: 'air-squats',
    name: 'Bodyweight Air Squats (At-Home No Equipment)',
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['hamstrings', 'calves'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'squat',
    goalProtocols: {
      strength: { sets: 4, reps: '20 deep tempo reps', restSeconds: 60, description: 'Deep below-parallel squats with 3s descent.' },
      endurance: { sets: 4, reps: '1 min unbroken', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Sustained continuous bodyweight squats.' },
      cardio: { sets: 4, reps: '1 min interval', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 20, description: 'Paced rapid air squats.' }
    },
    setupSteps: [
      'Stand with feet shoulder-width apart, toes turned slightly out 15 degrees.',
      'Keep chest tall and arms extended in front for counterbalance.'
    ],
    executionSteps: [
      'Sit back and down into hips and knees as if sitting into a low chair.',
      'Descend until thighs are at least parallel to floor.',
      'Drive through whole foot to stand tall, squeezing glutes at top.'
    ],
    coachingCues: ['Knees track over toes', 'Keep weight balanced over midfoot', 'Chest stays proud'],
    commonMistakes: ['Knees collapsing inward', 'Heels coming off floor']
  },
  {
    id: 'glute-bridges',
    name: 'Floor Glute Bridges (At-Home No Equipment)',
    primaryMuscles: ['glutes', 'hamstrings'],
    secondaryMuscles: ['lower_back', 'abs'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'glute_bridge',
    goalProtocols: {
      strength: { sets: 4, reps: '15 reps with 2s hold', restSeconds: 60, description: 'Maximum glute contraction at apex of bridge.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'High rep posterior chain burn.' },
      cardio: { sets: 3, reps: '45s pulse', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 20, description: 'Pulsing bridge tempo.' }
    },
    setupSteps: [
      'Lie flat on back with knees bent and feet flat on the floor hip-width apart.',
      'Arms resting by sides on the floor.'
    ],
    executionSteps: [
      'Drive through your heels to raise hips off floor toward ceiling.',
      'Create a straight diagonal line from knees to shoulders.',
      'Squeeze glutes hard at the top for 2 seconds, then lower under control.'
    ],
    coachingCues: ['Drive through heels', 'Do not overarch lumbar spine', 'Squeeze glutes like holding a coin'],
    commonMistakes: ['Arching lower back instead of hinging hips', 'Feet too far away from hips']
  },
  {
    id: 'diamond-pushups',
    name: 'Diamond Tricep Push-Ups (At-Home No Equipment)',
    primaryMuscles: ['triceps'],
    secondaryMuscles: ['chest', 'shoulders', 'abs'],
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    animationType: 'pushup',
    goalProtocols: {
      strength: { sets: 4, reps: '10-12 strict reps', restSeconds: 90, description: 'Slow negative targeting tricep extension.' },
      endurance: { sets: 3, reps: '1 min', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 45, description: 'Tricep pump to technical fatigue.' },
      cardio: { sets: 3, reps: '45s', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 30, description: 'Paced pushup reps.' }
    },
    setupSteps: [
      'Get into a push-up plank with hands directly beneath center of chest.',
      'Form a diamond/triangle shape between thumbs and index fingers.'
    ],
    executionSteps: [
      'Lower your chest toward the center of the diamond while keeping elbows tucked near sides.',
      'Pause for a split second hovering above hands.',
      'Push forcefully through palms to full elbow extension.'
    ],
    coachingCues: ['Keep elbows tucked at 30-45 degrees', 'Maintain rigid straight plank', 'Squeeze triceps at top'],
    commonMistakes: ['Flaring elbows perpendicular', 'Hips sagging toward floor']
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
      endurance: { sets: 3, reps: '1 min', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 45, description: 'Shoulder endurance burn.' },
      cardio: { sets: 3, reps: '45s', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 30, description: 'Paced pike pressing.' }
    },
    setupSteps: [
      'Start in a standard push-up position, then walk your feet forward toward your hands.',
      'Pike hips upward into an inverted V-shape (downward dog posture) with arms straight.'
    ],
    executionSteps: [
      'Lower crown of head diagonally forward toward the floor between your hands.',
      'Pause just before touching the floor.',
      'Press the floor away diagonally back to the full pike lockout.'
    ],
    coachingCues: ['Look slightly back between feet', 'Lower diagonally forward, not straight down', 'Keep hips high in the air'],
    commonMistakes: ['Flat push-up angle', 'Flaring elbows excessively']
  },
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
      strength: { sets: 4, reps: '45 sec RKC hard brace', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 60, description: 'Maximum voluntary full-body contraction plank.' },
      endurance: { sets: 3, reps: '2 mins continuous hold', isTimed: true, durationSeconds: 120, durationDisplay: '2 mins', restSeconds: 60, description: 'Endurance isometric core bracing for 2 full minutes.' },
      hypertrophy: { sets: 3, reps: '1 min hold', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 60, description: 'Controlled continuous core tension.' }
    },
    setupSteps: [
      'Place forearms on the floor with elbows directly under shoulders.',
      'Extend legs straight back on toes, body forming a straight rigid line.',
      'Contract quads, glutes, and draw belly button in.'
    ],
    executionSteps: [
      'Hold the static position with neutral spine and level pelvis.',
      'Breathe steadily through your nose while maintaining intra-abdominal pressure.',
      'Do not let hips sag or pike toward the ceiling.'
    ],
    coachingCues: ['Pull elbows toward toes to engage lats and core', 'Squeeze glutes to protect lower spine', 'Neck neutral'],
    commonMistakes: ['Sagging lower back', 'Piking hips into the air', 'Holding breath']
  },
  {
    id: 'cable-woodchopper',
    name: 'Standing Cable Woodchopper',
    primaryMuscles: ['obliques'],
    secondaryMuscles: ['abs', 'shoulders'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'woodchopper',
    goalProtocols: {
      strength: { sets: 3, reps: '8-10 reps per side', restSeconds: 60, description: 'Rotational power development.' },
      endurance: { sets: 3, reps: '20 reps per side', restSeconds: 30, description: 'Core rotational endurance circuit.' },
      hypertrophy: { sets: 3, reps: '12-15 reps per side', restSeconds: 45, description: 'Explosive rotation followed by slow return.' }
    },
    setupSteps: [
      'Set cable pulley at high shoulder height with single handle.',
      'Stand perpendicular to cable tower, feet wider than shoulder-width.',
      'Grasp handle with both hands, arms extended.'
    ],
    executionSteps: [
      'In a smooth diagonal motion, rotate torso downward and across body toward opposite hip.',
      'Pivot on rear foot as you rotate, keeping arms extended.',
      'Return handle to high starting position under controlled resistance.'
    ],
    coachingCues: ['Rotate with torso and hips, not arms', 'Pivot on the back toe', 'Keep core braced like taking a punch'],
    commonMistakes: ['Bending elbows and pulling with arms', 'Losing balance or stance']
  },

  // CALVES
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
      endurance: { sets: 3, reps: '25-30 reps', restSeconds: 30, description: 'High repetition burn.' },
      hypertrophy: { sets: 4, reps: '12-15 reps', restSeconds: 60, description: 'Full 2-second stretch at bottom and 2-second hold at peak.' }
    },
    setupSteps: [
      'Place balls of feet on edge of step, heels hanging freely in air.',
      'Shoulder pads resting comfortably on tops of shoulders.',
      'Stand with legs straight and knees slightly soft (never hyperextended).'
    ],
    executionSteps: [
      'Lower heels as far as comfortably possible to achieve a deep calf stretch.',
      'Pause for 1-2 seconds in the stretched position to eliminate elastic recoil.',
      'Drive aggressively onto balls of feet as high as possible, squeezing calves at apex.'
    ],
    coachingCues: ['Pause at the absolute bottom stretch', 'Push through your big toes', 'Do not bounce on the tendon'],
    commonMistakes: ['Bouncing fast without pausing', 'Bending knees to assist calf extension']
  },

  // CARDIO BODYWEIGHT EXERCISES
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    primaryMuscles: ['calves', 'shoulders'],
    secondaryMuscles: ['quadriceps', 'abs'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    isCardio: true,
    animationType: 'jumping_jacks',
    goalProtocols: {
      strength: { sets: 3, reps: '1 min', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Moderate cadence aerobic warmup.' },
      endurance: { sets: 4, reps: '2 mins', isTimed: true, durationSeconds: 120, durationDisplay: '2 mins', restSeconds: 30, description: 'Sustained cardiovascular conditioning.' },
      cardio: { sets: 4, reps: '1 min interval', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 20, description: 'High-cadence rhythmic jumping jacks.' }
    },
    setupSteps: [
      'Stand upright with feet together and arms resting comfortably by your sides.',
      'Engage your core lightly and soften knees.'
    ],
    executionSteps: [
      'Jump feet out to slightly wider than shoulder-width apart while swinging arms overhead in an arc.',
      'Immediately reverse motion, jumping feet back together and bringing arms back down.',
      'Maintain a light, springy bounce on the balls of your feet in a fluid continuous cadence.'
    ],
    coachingCues: ['Stay light on balls of feet', 'Clap or touch hands overhead', 'Keep a steady breathing rhythm'],
    commonMistakes: ['Landing flat-footed with jarring knees', 'Slumping shoulders forward']
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    primaryMuscles: ['abs', 'shoulders'],
    secondaryMuscles: ['quadriceps', 'chest'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    isCardio: true,
    animationType: 'mountain_climbers',
    goalProtocols: {
      strength: { sets: 3, reps: '45s rapid pace', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 45, description: 'Strict locked plank position with explosive knee drives.' },
      endurance: { sets: 4, reps: '1 min sustained', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Continuous heart rate elevation and core stabilization.' },
      cardio: { sets: 4, reps: '1 min interval', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 20, description: 'Sprint tempo mountain climbers.' }
    },
    setupSteps: [
      'Start in a solid high push-up plank with hands directly beneath shoulders.',
      'Keep body in a straight line from crown to heels with core braced.'
    ],
    executionSteps: [
      'Drive your right knee up toward your chest without letting hips pike into the air.',
      'Quickly switch legs, extending right leg back while simultaneously driving left knee forward.',
      'Alternate legs in a rapid running motion while maintaining a rock-solid upper body.'
    ],
    coachingCues: ['Keep hips level with shoulders', 'Drive knees straight like running a sprint', 'Keep palms pressing into the floor'],
    commonMistakes: ['Bouncing hips way up in the air', 'Letting lower back sag into lumbar arch']
  },
  {
    id: 'burpees-classic',
    name: 'Full Body Burpees',
    primaryMuscles: ['chest', 'quadriceps'],
    secondaryMuscles: ['shoulders', 'abs', 'calves', 'triceps'],
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    isCardio: true,
    animationType: 'burpees',
    goalProtocols: {
      strength: { sets: 4, reps: '45s max effort', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 60, description: 'Full chest-to-floor drop and explosive jump.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 45, description: 'Paced metabolic full-body conditioning.' },
      cardio: { sets: 4, reps: '1 min interval', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Maximum calorie burn dynamic burpee reps.' }
    },
    setupSteps: [
      'Stand feet shoulder-width apart with arms by sides.',
      'Prepare to drop hips into squat position.'
    ],
    executionSteps: [
      'Squat down and plant both hands firmly on the floor inside feet.',
      'Jump feet back into a push-up plank, immediately dropping chest to touch the floor.',
      'Push off floor and jump feet back forward toward hands.',
      'Explode upward in a vertical jump, reaching arms overhead with a clap.'
    ],
    coachingCues: ['Smooth transition from floor to jump', 'Land softly on balls of feet', 'Breathe out on the explosive jump'],
    commonMistakes: ['Sagging spine on the drop', 'Landing heavy on stiff legs']
  },
  {
    id: 'high-knees',
    name: 'High Knees Sprint in Place',
    primaryMuscles: ['quadriceps', 'calves'],
    secondaryMuscles: ['abs', 'glutes'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    mechanics: 'Compound',
    isCardio: true,
    animationType: 'high_knees',
    goalProtocols: {
      strength: { sets: 3, reps: '30s sprint', isTimed: true, durationSeconds: 30, durationDisplay: '30s', restSeconds: 45, description: 'Max sprint speed driving knees above hips.' },
      endurance: { sets: 4, reps: '1 min', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Consistent knee drive cadence.' },
      cardio: { sets: 4, reps: '1 min interval', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 20, description: 'Fast aerobic high knees.' }
    },
    setupSteps: [
      'Stand tall with feet hip-width apart and elbows bent at 90 degrees in running stance.'
    ],
    executionSteps: [
      'Drive one knee up toward chest until thigh is parallel to floor.',
      'Quickly switch, pumping opposite arm as opposite knee drives up.',
      'Sprint in place with fast, springy foot turnover on the balls of your feet.'
    ],
    coachingCues: ['Get thighs up to hip level', 'Pump arms vigorously', 'Stay light and fast on toes'],
    commonMistakes: ['Leaning backwards', 'Barely lifting knees off floor']
  },
  {
    id: 'bodyweight-jump-squats',
    name: 'Bodyweight Jump Squats',
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['calves', 'hamstrings'],
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    isCardio: true,
    animationType: 'jump_squats',
    goalProtocols: {
      strength: { sets: 4, reps: '45s plyometrics', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 60, description: 'Maximum vertical jump height from deep squat.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 45, description: 'Uninterrupted jump squat rhythm.' },
      cardio: { sets: 4, reps: '1 min interval', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'High tempo explosive leg burn.' }
    },
    setupSteps: [
      'Stand feet shoulder-width apart, toes turned slightly out.',
      'Chest up and hands clasped at chest or in athletic stance.'
    ],
    executionSteps: [
      'Lower hips into a full squat until thighs are parallel to ground.',
      'Immediately explode upward through midfoot, jumping vertically into the air.',
      'Land softly on the balls of feet, rolling to heels and smoothly absorbing directly into the next squat.'
    ],
    coachingCues: ['Land like a feather and sink immediately into next rep', 'Knees stay tracking over toes', 'Drive arms up for momentum'],
    commonMistakes: ['Stiff-legged landing', 'Knees collapsing inward']
  },

  // TRAPS & FOREARMS
  {
    id: 'farmers-walk',
    name: 'Farmer’s Walk / Carry',
    primaryMuscles: ['forearms', 'traps'],
    secondaryMuscles: ['abs', 'upper_back', 'calves', 'glutes'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    animationType: 'farmers_walk',
    goalProtocols: {
      strength: { sets: 4, reps: '30s heavy carry', isTimed: true, durationSeconds: 30, durationDisplay: '30s', restSeconds: 120, description: 'Maximum tolerable dumbbell or trap bar weight for 30s.' },
      endurance: { sets: 3, reps: '1-2 mins loaded walk', isTimed: true, durationSeconds: 90, durationDisplay: '1.5 mins', restSeconds: 60, description: 'Grip burn and cardiovascular stamina.' },
      hypertrophy: { sets: 3, reps: '45s carry', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 90, description: 'Heavy grip endurance and trap hypertrophy.' }
    },
    setupSteps: [
      'Deadlift two heavy dumbbells or kettlebells from the floor.',
      'Stand tall with ribs down, shoulders pulled back and down, core tight.'
    ],
    executionSteps: [
      'Walk forward with short, smooth, deliberate heel-to-toe steps.',
      'Maintain an upright posture without leaning forward or swaying side to side.',
      'Carefully squat down to return weights to floor upon completing distance or time.'
    ],
    coachingCues: ['Crush the handles like you are trying to bend them', 'Stand tall like a monument', 'Small fast steps'],
    commonMistakes: ['Slumping shoulders forward', 'Swinging dumbbells against thighs']
  },

  // =========================================================================
  // ZERO-EQUIPMENT AT-HOME BODYWEIGHT EXERCISES (NO BARS, NO FIXTURES, NO WEIGHTS)
  // =========================================================================

  // BACK & LATS (HOME ZERO EQUIPMENT)
  {
    id: 'doorframe-rows',
    name: 'Doorframe Bodyweight Rows (At-Home No Equipment)',
    primaryMuscles: ['lats', 'upper_back'],
    secondaryMuscles: ['biceps', 'forearms'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'doorframe_row',
    goalProtocols: {
      strength: { sets: 4, reps: '12-15 reps with 2s hold', restSeconds: 60, description: 'Hold doorframe molding with feet walked forward, pull chest firmly to frame.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Rhythmic doorframe pulling for full 1 minute.' },
      cardio: { sets: 3, reps: '45s rapid rows', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 20, description: 'High tempo bodyweight pulling.' }
    },
    setupSteps: [
      'Stand facing an open doorway molding or sturdy doorframe.',
      'Grip the frame firmly with both hands at chest height and walk your feet forward so your body leans back.'
    ],
    executionSteps: [
      'Pull your chest toward the doorframe by driving your elbows back and retracting shoulder blades.',
      'Squeeze your lats and middle back for 1 second at full contraction.',
      'Smoothly lower back to arms-extended starting position.'
    ],
    coachingCues: ['Keep your spine straight as a board', 'Lead with your elbows', 'Pull with your back, not just hands'],
    commonMistakes: ['Bending at hips instead of leaning whole body', 'Jerking with lower back']
  },
  {
    id: 'prone-cobra',
    name: 'Prone Cobra Floor Lat & Scapular Squeeze',
    primaryMuscles: ['upper_back', 'lats'],
    secondaryMuscles: ['lower_back', 'traps', 'shoulders'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'superman',
    goalProtocols: {
      strength: { sets: 4, reps: '12-15 reps with 3s hold', restSeconds: 60, description: 'External rotation and deep thoracic back contraction on floor.' },
      endurance: { sets: 3, reps: '1 min hold / pulses', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Isometric middle back posture hold.' },
      cardio: { sets: 3, reps: '45s', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 20, description: 'Rhythmic cobra pulses.' }
    },
    setupSteps: [
      'Lie face down on the floor or mat with legs extended straight behind you.',
      'Place arms at your sides, palms facing downward.'
    ],
    executionSteps: [
      'Lift your chest and head off the floor while externally rotating your arms so thumbs point to the ceiling.',
      'Pinch your shoulder blades tightly together and down toward back pockets.',
      'Hold the peak contraction, then lower slowly back to the floor.'
    ],
    coachingCues: ['Turn thumbs up to the ceiling', 'Keep chin tucked without hyper-extending neck', 'Squeeze glutes lightly'],
    commonMistakes: ['Craning neck backward', 'Lifting legs excessively instead of engaging upper back']
  },
  {
    id: 'back-widow',
    name: 'Floor Back Widows (Scapular Lat Drives)',
    primaryMuscles: ['upper_back', 'lats'],
    secondaryMuscles: ['traps', 'triceps'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'glute_bridge',
    goalProtocols: {
      strength: { sets: 4, reps: '15 strict floor drives', restSeconds: 60, description: 'Drive elbows hard into floor lifting upper back off ground.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Continuous scapular floor drive repetitions.' }
    },
    setupSteps: [
      'Lie on your back on the floor with knees bent and feet flat on the ground.',
      'Bend elbows to 90 degrees with fists facing ceiling, elbows pressed firmly against the floor.'
    ],
    executionSteps: [
      'Drive elbows forcefully down into the floor to elevate your upper back and shoulders off the ground.',
      'Contract your upper back and lat muscles hard at the top for 1 full second.',
      'Lower yourself back down with complete control.'
    ],
    coachingCues: ['Push the floor away through your elbows', 'Pinch shoulder blades hard at top', 'Keep neck relaxed'],
    commonMistakes: ['Using abdominal crunch motion instead of elbow drive', 'Holding breath']
  },

  // BICEPS & FOREARMS (HOME ZERO EQUIPMENT)
  {
    id: 'doorframe-bicep-curls',
    name: 'Doorframe Single-Arm Bicep Curls (At-Home No Equipment)',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'doorframe_row',
    goalProtocols: {
      strength: { sets: 4, reps: '10-12 reps per arm', restSeconds: 60, description: 'Body-angle resisted single arm bicep pull.' },
      endurance: { sets: 3, reps: '1 min per arm', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Sustained continuous bicep curling on doorframe.' }
    },
    setupSteps: [
      'Stand inside a doorway and grip the frame with one hand underhand (palm facing you).',
      'Walk your feet slightly forward and lean back so bodyweight is supported by your arm.'
    ],
    executionSteps: [
      'Curl your body toward the doorframe exclusively by flexing your elbow and engaging your bicep.',
      'Squeeze the bicep peak contraction tightly at the top.',
      'Lower yourself smoothly back to arm extension.'
    ],
    coachingCues: ['Keep elbow pinned near your ribs', 'Pull through the palm and bicep', 'Control the lowering phase'],
    commonMistakes: ['Twisting your torso to cheat', 'Using hip swing momentum']
  },
  {
    id: 'isometric-bicep-curl',
    name: 'Self-Resisted Isometric Bicep Curl & Squeeze',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'bicep_curl',
    goalProtocols: {
      strength: { sets: 4, reps: '8-10 max-tension squeezes', restSeconds: 60, description: 'Use opposite palm to resist bicep flexion with maximum voluntary force.' },
      endurance: { sets: 3, reps: '1 min timed tension', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Continuous self-resisted slow curls for 1 minute.' }
    },
    setupSteps: [
      'Stand tall with one arm bent at 90 degrees, palm facing up.',
      'Place your opposite hand on top of your working wrist, pushing down.'
    ],
    executionSteps: [
      'Attempt to curl working arm upward while pushing down forcefully with opposite hand.',
      'Move through the full curl range of motion against your own maximum resistance.',
      'Maintain peak tension for 2 seconds at the top before slowly reversing down.'
    ],
    coachingCues: ['Actively fight your own resistance', 'Flex bicep hard as a rock', 'Breathe steadily'],
    commonMistakes: ['Not applying sufficient downward counter-force', 'Slumping shoulders']
  },
  {
    id: 'floor-wrist-extensions',
    name: 'Forearm Plank Pulses & Wrist Extensions (At-Home No Equipment)',
    primaryMuscles: ['forearms'],
    secondaryMuscles: ['abs', 'shoulders'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'plank',
    goalProtocols: {
      strength: { sets: 3, reps: '15-20 slow pulses', restSeconds: 45, description: 'Forearm flexor and extensor floor pulses.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Endurance forearm and wrist burn.' }
    },
    setupSteps: [
      'Kneel on the floor in a quadruped or plank position with palms flat on the ground.',
      'Distribute weight forward slightly over your wrists.'
    ],
    executionSteps: [
      'Rock forward and backward gently to stretch and flex forearms.',
      'Press through fingertips to raise palms slightly off the ground, engaging forearm flexors.',
      'Lower palms smoothly back down.'
    ],
    coachingCues: ['Control the pressure through fingertips', 'Keep elbows soft', 'Move with smooth rhythm'],
    commonMistakes: ['Putting too much violent impact on wrists', 'Rushing reps']
  },

  // TRICEPS (HOME ZERO EQUIPMENT)
  {
    id: 'floor-tricep-dips',
    name: 'Seated Floor Tricep Dips (At-Home No Equipment)',
    primaryMuscles: ['triceps'],
    secondaryMuscles: ['shoulders', 'chest'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'floor_dips',
    goalProtocols: {
      strength: { sets: 4, reps: '15-20 reps with 1s lockout', restSeconds: 60, description: 'Hands flat on floor behind hips, no benches or bars needed.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Fast tricep lockout pump for 1 full minute.' },
      cardio: { sets: 3, reps: '45s rapid pace', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 20, description: 'High tempo tricep pulsing.' }
    },
    setupSteps: [
      'Sit on the floor with knees bent, feet flat on the floor hip-width apart.',
      'Place hands on the floor directly behind your hips, fingers pointing toward your heels.',
      'Lift hips a few inches off the floor to suspend your bodyweight.'
    ],
    executionSteps: [
      'Bend elbows to lower your hips toward the floor until elbows reach 90 degrees.',
      'Press through the heels of your palms forcefully to extend arms and lock out triceps.',
      'Squeeze triceps hard at top lockout.'
    ],
    coachingCues: ['Keep elbows tracking straight back, not flared out', 'Lock out elbows fully at top', 'Chest stays open'],
    commonMistakes: ['Moving hips instead of bending elbows', 'Flaring elbows wide']
  },
  {
    id: 'bodyweight-tricep-extensions',
    name: 'Floor Tiger-Bend Tricep Extensions (At-Home No Equipment)',
    primaryMuscles: ['triceps'],
    secondaryMuscles: ['abs', 'chest'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Intermediate',
    mechanics: 'Isolation',
    animationType: 'pushup',
    goalProtocols: {
      strength: { sets: 4, reps: '8-12 strict reps', restSeconds: 75, description: 'From knee plank or full plank, lower forearms to floor and press up.' },
      endurance: { sets: 3, reps: '1 min', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 45, description: 'Tricep extension repetitions.' }
    },
    setupSteps: [
      'Start in a push-up plank or kneeling plank with hands placed slightly ahead of shoulders.'
    ],
    executionSteps: [
      'Lower both forearms simultaneously to touch the floor by bending only at your elbows.',
      'Press through your palms to extend elbows and push back up into the high plank position.',
      'Lock out triceps at the peak.'
    ],
    coachingCues: ['Keep core braced rigid', 'Press through both palms at once', 'Focus all effort into triceps'],
    commonMistakes: ['Flaring elbows out to sides', 'Sagging hips']
  },

  // SHOULDERS & TRAPS (HOME ZERO EQUIPMENT)
  {
    id: 'bear-crawl-holds',
    name: 'Bear Crawl Shoulder Taps (At-Home No Equipment)',
    primaryMuscles: ['shoulders', 'abs'],
    secondaryMuscles: ['traps', 'quadriceps', 'chest'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'bear_crawl',
    goalProtocols: {
      strength: { sets: 4, reps: '16-20 total taps', restSeconds: 60, description: 'Knees hovering 1 inch off floor, slow anti-rotation shoulder taps.' },
      endurance: { sets: 3, reps: '1 min unbroken', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Sustained bear crawl hold and shoulder tapping.' },
      cardio: { sets: 4, reps: '45s rapid taps', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 20, description: 'Fast rhythm bear crawl taps.' }
    },
    setupSteps: [
      'Start on all fours with hands under shoulders and knees under hips.',
      'Tuck toes and hover knees just 1 to 2 inches off the floor, engaging core.'
    ],
    executionSteps: [
      'Lift right hand to tap left shoulder while keeping hips completely square to floor.',
      'Return hand to ground and immediately tap left hand to right shoulder.',
      'Alternate taps smoothly without rocking hips side-to-side.'
    ],
    coachingCues: ['Imagine balancing a glass of water on your lower back', 'Keep knees low to floor', 'Press ground away'],
    commonMistakes: ['Piking hips up high', 'Excessive hip rocking']
  },
  {
    id: 'prone-y-t-w',
    name: 'Prone Floor Y-T-W Shoulder Raises (At-Home No Equipment)',
    primaryMuscles: ['shoulders', 'upper_back'],
    secondaryMuscles: ['traps'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'superman',
    goalProtocols: {
      strength: { sets: 3, reps: '6 reps each (Y, T, W)', restSeconds: 60, description: 'Thorough rear and lateral deltoid stimulation.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Continuous floor scapular raises.' }
    },
    setupSteps: [
      'Lie face down on the floor with arms extended in a Y-position, thumbs up.'
    ],
    executionSteps: [
      'Raise arms in Y-formation for reps, then reposition to direct lateral T-formation.',
      'Finish in W-formation with elbows tucked toward ribs.',
      'Squeeze shoulder blades and deltoids at each peak hold.'
    ],
    coachingCues: ['Thumbs lead the movement toward ceiling', 'Pinch shoulder blades back', 'Neck stays neutral looking down'],
    commonMistakes: ['Using momentum', 'Lifting head instead of arms']
  },

  // LEGS - QUADS, HAMSTRINGS, GLUTES, CALVES (HOME ZERO EQUIPMENT)
  {
    id: 'bodyweight-walking-lunges',
    name: 'Bodyweight Walking Lunges (At-Home No Equipment)',
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['hamstrings', 'calves'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Compound',
    animationType: 'lunges',
    goalProtocols: {
      strength: { sets: 4, reps: '12 reps per leg', restSeconds: 60, description: 'Deep knee drop with tall proud torso.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Continuous forward or reverse lunging across 1 minute.' },
      cardio: { sets: 4, reps: '45s rapid pace', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 20, description: 'Dynamic stepping lunges.' }
    },
    setupSteps: [
      'Stand tall with feet hip-width apart and hands on hips or clasped at chest.'
    ],
    executionSteps: [
      'Step forward with right foot and bend both knees to lower into a lunge.',
      'Lower until front thigh is parallel to floor and back knee hovers 1 inch above floor.',
      'Drive through front heel to stand up and step directly into the next lunge.'
    ],
    coachingCues: ['Keep front knee tracking over middle toes', 'Torso stays upright', 'Push through front heel'],
    commonMistakes: ['Front knee collapsing inward', 'Banging back knee on floor']
  },
  {
    id: 'wall-sit',
    name: 'Timed Isometric Wall Sit (At-Home No Equipment)',
    primaryMuscles: ['quadriceps'],
    secondaryMuscles: ['glutes', 'calves'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'wall_sit',
    goalProtocols: {
      strength: { sets: 4, reps: '45s deep hold', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 60, description: '90-degree thigh angle against wall with maximum quad tension.' },
      endurance: { sets: 3, reps: '1.5 mins hold', isTimed: true, durationSeconds: 90, durationDisplay: '1.5 mins', restSeconds: 60, description: 'Sustained isometric quad endurance burn for 90 seconds.' },
      cardio: { sets: 3, reps: '1 min hold', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Solid 60-second isometric wall sit.' }
    },
    setupSteps: [
      'Stand with back flat against a wall, feet shoulder-width apart and about 2 feet away from wall.'
    ],
    executionSteps: [
      'Slide your back down the wall until thighs are parallel to the floor (knees at 90 degrees).',
      'Press your lower back firmly into the wall and rest hands at sides (not on knees).',
      'Hold the static position, breathing smoothly.'
    ],
    coachingCues: ['Thighs must be parallel to ground', 'Do not rest hands on thighs', 'Weight evenly balanced on feet'],
    commonMistakes: ['Sitting too high (>90 degrees)', 'Resting elbows or hands on knees']
  },
  {
    id: 'single-leg-glute-bridge',
    name: 'Single-Leg Floor Glute Bridge (At-Home No Equipment)',
    primaryMuscles: ['glutes', 'hamstrings'],
    secondaryMuscles: ['lower_back', 'abs'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Intermediate',
    mechanics: 'Isolation',
    animationType: 'glute_bridge',
    goalProtocols: {
      strength: { sets: 3, reps: '10-12 reps per leg', restSeconds: 60, description: 'Intense single-leg glute contraction at apex of bridge.' },
      endurance: { sets: 3, reps: '45s per leg', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 30, description: 'Continuous single-leg glute bridge burn.' }
    },
    setupSteps: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Extend one leg straight out in the air or crossed over opposite knee.'
    ],
    executionSteps: [
      'Drive through the heel of the planted foot to lift hips toward ceiling.',
      'Squeeze the working glute hard at top lockout for 1-2 seconds.',
      'Lower hips slowly back to hovering over floor.'
    ],
    coachingCues: ['Drive purely through working heel', 'Keep hips level without dipping to one side', 'Squeeze glute hard at apex'],
    commonMistakes: ['Arching lower back excessively', 'Letting hips tilt sideways']
  },
  {
    id: 'single-leg-calf-raise-bw',
    name: 'Floor Standing Single-Leg Calf Raises (At-Home No Equipment)',
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'calf_raise',
    goalProtocols: {
      strength: { sets: 4, reps: '15-20 reps per leg', restSeconds: 45, description: 'Full extension on ball of foot with 2s squeeze.' },
      endurance: { sets: 3, reps: '1 min per leg', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Continuous calf elevation for 1 full minute.' }
    },
    setupSteps: [
      'Stand barefoot or in sneakers on the floor, fingertips touching a wall for balance.',
      'Lift one foot off the floor so all weight is on the working leg.'
    ],
    executionSteps: [
      'Press through the ball of your foot to raise your heel as high as possible.',
      'Pause at peak contraction for 1 second, squeezing the calf.',
      'Lower heel under control back to the floor.'
    ],
    coachingCues: ['Push through the big toe', 'Get maximum height at top', 'Pause at the peak'],
    commonMistakes: ['Bouncing fast without peak hold', 'Bending working knee']
  },

  // ABS & CORE (HOME ZERO EQUIPMENT)
  {
    id: 'lying-leg-raises-floor',
    name: 'Lying Floor Leg Raises (At-Home No Equipment)',
    primaryMuscles: ['abs'],
    secondaryMuscles: ['obliques', 'quadriceps'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'lying_leg_raise',
    goalProtocols: {
      strength: { sets: 4, reps: '12-15 slow reps', restSeconds: 60, description: 'Lower back glued to floor, slow controlled leg lift.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Sustained lower abdominal cadence for 1 minute.' }
    },
    setupSteps: [
      'Lie flat on your back on the floor, placing hands under your glutes for lumbar support.',
      'Extend legs straight out with heels hovering 2 inches off floor.'
    ],
    executionSteps: [
      'Engage lower abdominals to raise straight legs up until perpendicular to floor (90 degrees).',
      'Pause briefly, then lower legs slowly until heels hover just above floor.',
      'Keep lower back pressed flat into floor throughout.'
    ],
    coachingCues: ['Keep lower back glued to the floor', 'Lower legs with control', 'Do not let heels rest at bottom'],
    commonMistakes: ['Arching lower back off floor', 'Swinging legs fast']
  },
  {
    id: 'russian-twists-bw',
    name: 'Floor Seated Russian Twists (At-Home No Equipment)',
    primaryMuscles: ['obliques'],
    secondaryMuscles: ['abs'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Isolation',
    animationType: 'russian_twist',
    goalProtocols: {
      strength: { sets: 4, reps: '20 total twists with pause', restSeconds: 60, description: 'Seated V-sit rotational core brace.' },
      endurance: { sets: 3, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Rotational abdominal endurance for 1 minute.' },
      cardio: { sets: 3, reps: '45s rapid pace', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 20, description: 'Dynamic tempo Russian twists.' }
    },
    setupSteps: [
      'Sit on floor with knees bent and feet elevated slightly off ground (or heels resting lightly).',
      'Lean torso back at 45-degree angle, clasping hands at chest.'
    ],
    executionSteps: [
      'Rotate torso smoothly to the right, tapping fingertips to floor beside right hip.',
      'Rotate back across to the left, tapping fingertips beside left hip.',
      'Maintain tight core brace throughout rotational arc.'
    ],
    coachingCues: ['Rotate with your shoulders and torso, not just arms', 'Keep chest proud', 'Breathe continuously'],
    commonMistakes: ['Rounding back into slouch', 'Only waving hands across body without rotating torso']
  },
  {
    id: 'skater-hops',
    name: 'Lateral Skater Cardio Hops (At-Home No Equipment)',
    primaryMuscles: ['glutes', 'calves'],
    secondaryMuscles: ['quadriceps', 'abs'],
    equipment: 'Bodyweight',
    requiresBarOrFixture: false,
    difficulty: 'Beginner',
    mechanics: 'Compound',
    isCardio: true,
    animationType: 'jumping_jacks',
    goalProtocols: {
      strength: { sets: 3, reps: '45s explosive hops', isTimed: true, durationSeconds: 45, durationDisplay: '45s', restSeconds: 45, description: 'Maximum lateral jump distance and single-leg balance.' },
      endurance: { sets: 4, reps: '1 min continuous', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 30, description: 'Rhythmic lateral skating bounding.' },
      cardio: { sets: 4, reps: '1 min interval', isTimed: true, durationSeconds: 60, durationDisplay: '1 min', restSeconds: 20, description: 'Aerobic speed skater hops.' }
    },
    setupSteps: [
      'Stand on right foot with knees soft, athletic semi-squat position.'
    ],
    executionSteps: [
      'Bound laterally to the left, landing softly on your left foot while sweeping right leg behind you.',
      'Immediately bound back laterally to the right, landing on right foot.',
      'Swing arms in running motion for counterbalance.'
    ],
    coachingCues: ['Land like a spring and push off immediately', 'Stay low in an athletic stance', 'Absorb impact with knee and hip'],
    commonMistakes: ['Landing stiff-legged', 'Losing balance']
  }
];

export const SPLIT_PRESETS = [
  {
    id: 'ppl-push',
    name: 'Push Day (PPL)',
    category: 'PPL',
    description: 'Chest, Shoulders (Front & Lateral Delts), and Triceps pressing power.',
    targetMuscles: ['chest', 'shoulders', 'triceps'] as const,
    defaultMinutes: 60,
    recommendedExerciseIds: ['barbell-bench-press', 'incline-dumbbell-press', 'pushup-classic', 'overhead-barbell-press', 'dumbbell-lateral-raise', 'cable-tricep-pushdown', 'dips-chest-focus']
  },
  {
    id: 'ppl-pull',
    name: 'Pull Day (PPL)',
    category: 'PPL',
    description: 'Back, Lats, Traps, Rear Delts, and Biceps pulling strength.',
    targetMuscles: ['lats', 'upper_back', 'traps', 'biceps', 'forearms'] as const,
    defaultMinutes: 60,
    recommendedExerciseIds: ['lat-pulldown', 'pullups', 'bent-over-barbell-row', 'seated-cable-row', 'face-pull', 'barbell-bicep-curl', 'hammer-curl']
  },
  {
    id: 'ppl-legs',
    name: 'Leg Day (PPL)',
    category: 'PPL',
    description: 'Quadriceps, Hamstrings, Glutes, and Calves complete lower-body drive.',
    targetMuscles: ['quadriceps', 'hamstrings', 'glutes', 'calves'] as const,
    defaultMinutes: 65,
    recommendedExerciseIds: ['barbell-back-squat', 'leg-press', 'dumbbell-walking-lunges', 'romanian-deadlift', 'lying-leg-curl', 'hip-thrust', 'standing-calf-raise']
  },
  {
    id: 'upper-body',
    name: 'Upper Body Power & Endurance',
    category: 'UpperLower',
    description: 'Full upper torso hitting Chest, Back, Shoulders, and Arms.',
    targetMuscles: ['chest', 'lats', 'shoulders', 'biceps', 'triceps'] as const,
    defaultMinutes: 55,
    recommendedExerciseIds: ['barbell-bench-press', 'pullups', 'bent-over-barbell-row', 'overhead-barbell-press', 'dumbbell-lateral-raise', 'cable-tricep-pushdown']
  },
  {
    id: 'lower-body',
    name: 'Lower Body & Core',
    category: 'UpperLower',
    description: 'Quads, Posterior Chain, Calves, and Core stability.',
    targetMuscles: ['quadriceps', 'hamstrings', 'glutes', 'calves', 'abs'] as const,
    defaultMinutes: 55,
    recommendedExerciseIds: ['barbell-back-squat', 'romanian-deadlift', 'dumbbell-walking-lunges', 'hanging-leg-raise', 'plank-classic', 'standing-calf-raise']
  },
  {
    id: 'full-body',
    name: 'Full Body Compound Protocol',
    category: 'FullBody',
    description: 'Major compound lifts hitting all key muscle groups in a single efficient session.',
    targetMuscles: ['chest', 'lats', 'quadriceps', 'hamstrings', 'shoulders', 'abs'] as const,
    defaultMinutes: 50,
    recommendedExerciseIds: ['barbell-back-squat', 'barbell-bench-press', 'bent-over-barbell-row', 'barbell-deadlift', 'overhead-barbell-press', 'plank-classic']
  }
];
