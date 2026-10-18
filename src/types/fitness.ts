/**
 * Core fitness and anatomical data types for AtlasFit
 */

export type MuscleId =
  | 'chest'
  | 'lats'
  | 'upper_back'
  | 'lower_back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'traps'
  | 'forearms'
  | 'abs'
  | 'obliques'
  | 'quadriceps'
  | 'hamstrings'
  | 'glutes'
  | 'calves';

export type BodyRegion = 'upper' | 'lower' | 'core';
export type ViewSide = 'front' | 'back';

export type Equipment =
  | 'Barbell'
  | 'Dumbbell'
  | 'Cable'
  | 'Machine'
  | 'Bodyweight'
  | 'Pull-Up Bar'
  | 'Kettlebell'
  | 'Resistance Band';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

// Training modes including cardio
export type TrainingMode = 'strength' | 'endurance' | 'both' | 'cardio';

export type WorkoutDuration = 30 | 45 | 60;

export interface MuscleInfo {
  id: MuscleId;
  name: string;
  latinName: string;
  region: BodyRegion;
  viewSide: ViewSide | 'both';
  description: string;
  primaryAction: string;
}

export interface GoalProtocol {
  sets: number;
  reps: string;
  isTimed?: boolean;
  durationSeconds?: number;
  durationDisplay?: string;
  restSeconds: number;
  description: string;
}

export type ExerciseAnimationType =
  | 'bench_press'
  | 'incline_bench'
  | 'pushup'
  | 'chest_fly'
  | 'dip'
  | 'pullup'
  | 'lat_pulldown'
  | 'bent_over_row'
  | 'seated_cable_row'
  | 'deadlift'
  | 'squat'
  | 'leg_press'
  | 'lunges'
  | 'rdl'
  | 'leg_curl'
  | 'hip_thrust'
  | 'overhead_press'
  | 'lateral_raise'
  | 'face_pull'
  | 'bicep_curl'
  | 'hammer_curl'
  | 'tricep_pushdown'
  | 'overhead_tricep'
  | 'plank'
  | 'hanging_leg_raise'
  | 'woodchopper'
  | 'calf_raise'
  | 'farmers_walk'
  | 'jumping_jacks'
  | 'mountain_climbers'
  | 'burpees'
  | 'high_knees'
  | 'jump_squats'
  | 'superman'
  | 'glute_bridge'
  | 'doorframe_row'
  | 'bear_crawl'
  | 'wall_sit'
  | 'russian_twist'
  | 'diamond_pushup'
  | 'floor_dips'
  | 'lying_leg_raise'
  | 'generic';

export interface Exercise {
  id: string;
  name: string;
  primaryMuscles: MuscleId[];
  secondaryMuscles: MuscleId[];
  equipment: Equipment;
  difficulty: Difficulty;
  mechanics: 'Compound' | 'Isolation';
  isCardio?: boolean;
  requiresBarOrFixture?: boolean; // If true, requires pull-up bar / dip station (not zero-equipment home)
  animationType: ExerciseAnimationType;
  goalProtocols: {
    strength: GoalProtocol;
    endurance: GoalProtocol;
    hypertrophy?: GoalProtocol;
    cardio?: GoalProtocol;
  };
  setupSteps: string[];
  executionSteps: string[];
  coachingCues: string[];
  commonMistakes: string[];
}

export interface RoutineExercise {
  id: string;
  exercise: Exercise;
  customSets: number;
  customReps: string;
  isTimed?: boolean;
  durationSeconds?: number;
  customRestSeconds: number;
  completedSets: boolean[];
  weightLbs?: number;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  description: string;
  splitType: 'PPL' | 'UpperLower' | 'FullBody' | 'Arnold' | 'Custom';
  targetMuscles: MuscleId[];
  durationMinutes?: WorkoutDuration | number;
  estimatedMinutes: number;
  exercises: RoutineExercise[];
  createdAt: string;
}
