import { MuscleInfo, MuscleId } from '../types/fitness';

export const MUSCLES: Record<MuscleId, MuscleInfo> = {
  chest: {
    id: 'chest',
    name: 'Chest',
    latinName: 'Pectoralis Major & Minor',
    region: 'upper',
    viewSide: 'front',
    description: 'The anterior chest wall responsible for pushing movements and arm adduction across the torso.',
    primaryAction: 'Horizontal adduction, internal rotation, and shoulder flexion.'
  },
  shoulders: {
    id: 'shoulders',
    name: 'Shoulders',
    latinName: 'Deltoids (Anterior, Lateral, Posterior)',
    region: 'upper',
    viewSide: 'both',
    description: 'Three distinct muscular heads capping the shoulder joint providing 3D overhead stability and arm elevation.',
    primaryAction: 'Arm abduction, flexion, and horizontal abduction.'
  },
  biceps: {
    id: 'biceps',
    name: 'Biceps',
    latinName: 'Biceps Brachii & Brachialis',
    region: 'upper',
    viewSide: 'front',
    description: 'The two-headed anterior arm muscle essential for pulling movements and forearm supination.',
    primaryAction: 'Elbow flexion and forearm supination.'
  },
  triceps: {
    id: 'triceps',
    name: 'Triceps',
    latinName: 'Triceps Brachii (Lateral, Long, Medial)',
    region: 'upper',
    viewSide: 'back',
    description: 'Constitutes approximately 60% of upper arm mass, driving elbow extension in pressing movements.',
    primaryAction: 'Elbow extension and shoulder extension.'
  },
  traps: {
    id: 'traps',
    name: 'Traps',
    latinName: 'Trapezius (Upper, Middle, Lower)',
    region: 'upper',
    viewSide: 'back',
    description: 'Diamond-shaped kite muscle spanning from the cervical spine across the scapula to the mid-back.',
    primaryAction: 'Scapular elevation, retraction, and upward rotation.'
  },
  lats: {
    id: 'lats',
    name: 'Lats',
    latinName: 'Latissimus Dorsi',
    region: 'upper',
    viewSide: 'back',
    description: 'Broadest muscle of the back creating the signature athletic V-taper aesthetic and pull-down power.',
    primaryAction: 'Shoulder adduction, extension, and internal rotation.'
  },
  upper_back: {
    id: 'upper_back',
    name: 'Upper Back / Rhomboids',
    latinName: 'Rhomboids Major/Minor & Infraspinatus',
    region: 'upper',
    viewSide: 'back',
    description: 'Crucial postural muscles securing the shoulder blades tightly against the posterior ribcage.',
    primaryAction: 'Scapular retraction, downward rotation, and external rotation.'
  },
  lower_back: {
    id: 'lower_back',
    name: 'Lower Back',
    latinName: 'Erector Spinae & Quadratus Lumborum',
    region: 'upper',
    viewSide: 'back',
    description: 'Deep lumbar spine stabilizers that resist flexion and support axial loads in deadlifts and squats.',
    primaryAction: 'Spinal extension, lateral flexion, and postural stabilization.'
  },
  forearms: {
    id: 'forearms',
    name: 'Forearms',
    latinName: 'Brachioradialis, Wrist Flexors & Extensors',
    region: 'upper',
    viewSide: 'both',
    description: 'Muscles controlling grip strength, wrist flexion, extension, and fine hand dexterity.',
    primaryAction: 'Grip closure, wrist flexion, extension, and pronation.'
  },
  abs: {
    id: 'abs',
    name: 'Abs / Core',
    latinName: 'Rectus Abdominis & Transverse Abdominis',
    region: 'core',
    viewSide: 'front',
    description: 'The anterior abdominal wall providing core stiffness, spine flexion, and intra-abdominal pressure.',
    primaryAction: 'Spinal flexion, anti-extension, and trunk stability.'
  },
  obliques: {
    id: 'obliques',
    name: 'Obliques',
    latinName: 'External & Internal Obliques',
    region: 'core',
    viewSide: 'front',
    description: 'Lateral core stabilizers driving rotational rotational torque and anti-rotational bracing.',
    primaryAction: 'Torso rotation, lateral flexion, and abdominal compression.'
  },
  quadriceps: {
    id: 'quadriceps',
    name: 'Quadriceps',
    latinName: 'Rectus Femoris, Vastus Lateralis, Medialis, Intermedius',
    region: 'lower',
    viewSide: 'front',
    description: 'Four-headed muscular powerhouse on the anterior thigh that powers knee extension and sprinting.',
    primaryAction: 'Knee extension and hip flexion.'
  },
  hamstrings: {
    id: 'hamstrings',
    name: 'Hamstrings',
    latinName: 'Biceps Femoris, Semitendinosus, Semimembranosus',
    region: 'lower',
    viewSide: 'back',
    description: 'Posterior thigh complex essential for explosive hip hinges, sprint deceleration, and knee flexion.',
    primaryAction: 'Knee flexion and hip extension.'
  },
  glutes: {
    id: 'glutes',
    name: 'Glutes',
    latinName: 'Gluteus Maximus, Medius, Minimus',
    region: 'lower',
    viewSide: 'back',
    description: 'Largest and most powerful muscle in the human body, generating primary hip extension drive.',
    primaryAction: 'Hip extension, abduction, external rotation, and pelvic stability.'
  },
  calves: {
    id: 'calves',
    name: 'Calves',
    latinName: 'Gastrocnemius & Soleus',
    region: 'lower',
    viewSide: 'both',
    description: 'Lower leg plantar flexors powering ankle push-off, jumping explosiveness, and balance.',
    primaryAction: 'Plantar flexion and ankle stabilization.'
  }
};

export const MUSCLE_GROUPS_LIST: MuscleInfo[] = Object.values(MUSCLES);
