"use client";

import { DashboardState } from "@/data/fitnessData";

export const DASHBOARD_STORAGE_KEY = "bodyshift.dashboard.v1";
export const LOGIN_STORAGE_KEY = "bodyshift.login.v1";
export const THEME_STORAGE_KEY = "bodyshift.theme.v1";
export const DAILY_ENTRIES_STORAGE_KEY = "bodyshift.daily-entries.v1";

export type DailyEntry = {
  id: string;
  date: string;
  weight: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  workoutDone: boolean;
  note: string;
};

export function readDashboardState(): DashboardState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(DASHBOARD_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as DashboardState;
  } catch {
    return null;
  }
}

export function writeDashboardState(value: DashboardState) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(value));
}

export function readDailyEntries(): DailyEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(DAILY_ENTRIES_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as DailyEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeDailyEntries(value: DailyEntry[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(DAILY_ENTRIES_STORAGE_KEY, JSON.stringify(value));
}
