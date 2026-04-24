import { DashboardState, MonthlyProgress } from "@/data/fitnessData";
import { DailyEntry } from "@/lib/localStore";

export function getLastMonthProgress(monthly: MonthlyProgress[]) {
  if (monthly.length < 2) {
    return null;
  }
  return monthly[monthly.length - 2];
}

export function getCurrentMonthProgress(monthly: MonthlyProgress[], fallback: DashboardState) {
  if (monthly.length === 0) {
    return {
      month: "",
      label: "",
      weight: fallback.currentWeight,
      bodyFat: fallback.currentBodyFat,
      muscleMass: fallback.muscleMass,
      visceralFat: fallback.visceralFat,
    };
  }
  return monthly[monthly.length - 1];
}

export function calculateOverview(state: DashboardState) {
  const last = getLastMonthProgress(state.monthly);
  const current = getCurrentMonthProgress(state.monthly, state);

  const weightDiff = last ? Number((current.weight - last.weight).toFixed(1)) : 0;
  const fatDiff = last ? Number((current.bodyFat - last.bodyFat).toFixed(1)) : 0;

  const remainingToGoal = Number((state.currentWeight - state.goalWeight).toFixed(1));
  const estimatedMonths =
    remainingToGoal > 0 && state.targetMonthlyLossKg > 0
      ? Math.ceil(remainingToGoal / state.targetMonthlyLossKg)
      : 0;

  const fatLossPercent =
    last && last.bodyFat > 0
      ? Number((((last.bodyFat - state.currentBodyFat) / last.bodyFat) * 100).toFixed(1))
      : 0;

  return {
    current,
    last,
    weightDiff,
    fatDiff,
    remainingToGoal,
    estimatedMonths,
    fatLossPercent,
  };
}

export function formatDiff(value: number, suffix = "") {
  if (value > 0) {
    return `↑ +${value}${suffix}`;
  }
  if (value < 0) {
    return `↓ ${value}${suffix}`;
  }
  return `0${suffix}`;
}

export function calculateDailyAdherence(entries: DailyEntry[], targetCalories: number) {
  if (entries.length === 0 || targetCalories <= 0) {
    return 0;
  }

  const withinTarget = entries.filter((entry) => {
    const diff = Math.abs(entry.calories - targetCalories);
    return diff <= targetCalories * 0.1;
  }).length;

  return Math.round((withinTarget / entries.length) * 100);
}
