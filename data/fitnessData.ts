import userData from "@/data/user.json";
import progressData from "@/data/progress.json";
import dietData from "@/data/diet.json";
import workoutData from "@/data/workout.json";

export type Tone = "good" | "warn" | "bad";

export type MonthlyProgress = {
  month: string;
  label: string;
  weight: number;
  bodyFat: number;
  muscleMass: number;
  visceralFat: number;
};

export type DashboardState = {
  currentWeight: number;
  currentBodyFat: number;
  muscleMass: number;
  visceralFat: number;
  goalWeight: number;
  targetMonthlyLossKg: number;
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  workoutCompletion: {
    completed: number;
    target: number;
  };
  dietAdherence: number;
  monthly: MonthlyProgress[];
};

export const appText = {
  brand: userData.brand,
  footerNote: userData.footerNote,
};

export const navLinks = userData.navLinks;

export const heroData = {
  badge: userData.hero.badge,
  title: userData.hero.title,
  subtitle: userData.hero.subtitle,
  stats: userData.hero.stats,
};

export const resultsData = progressData.resultsCards;

export const dietViewData = {
  warning: dietData.warning,
  macroCards: dietData.macroCards,
  dailyCalories: dietData.dailyCalories,
  caloriesNote: dietData.caloriesNote,
  meals: dietData.meals,
  summarySteps: dietData.summarySteps,
};

export const workoutViewData = {
  planDays: workoutData.planDays,
  cardio: workoutData.cardio,
  proTip: workoutData.proTip,
};

export const tipsData = progressData.tips;

export const defaultDashboardState: DashboardState = {
  currentWeight: userData.hero.stats[1].value,
  currentBodyFat: userData.hero.stats[0].value,
  muscleMass: progressData.monthly[progressData.monthly.length - 1]?.muscleMass ?? 61,
  visceralFat: progressData.monthly[progressData.monthly.length - 1]?.visceralFat ?? 10,
  goalWeight: userData.profile.goalWeight,
  targetMonthlyLossKg: userData.profile.targetMonthlyLossKg,
  dailyCalories: dietData.dailyCalories,
  macros: {
    protein: dietData.macros.protein,
    carbs: dietData.macros.carbs,
    fat: dietData.macros.fat,
  },
  workoutCompletion: workoutData.workoutCompletion,
  dietAdherence: dietData.dietAdherence,
  monthly: progressData.monthly,
};
