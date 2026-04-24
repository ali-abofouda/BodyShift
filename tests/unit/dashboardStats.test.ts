import { describe, expect, it } from "vitest";
import { filterLogsByRange, getMonthlyStats, getWeeklyStats } from "@/lib/dashboardStats";
import type { DailyLogRecord } from "@/lib/dailyLogsSchema";

const logs: DailyLogRecord[] = [
  {
    id: "1",
    user_id: "user",
    date: "2026-04-20",
    calories: 2200,
    weight: 85.1,
    notes: "",
    created_at: "2026-04-20T00:00:00.000Z",
  },
  {
    id: "2",
    user_id: "user",
    date: "2026-04-22",
    calories: 2100,
    weight: 84.9,
    notes: "",
    created_at: "2026-04-22T00:00:00.000Z",
  },
];

describe("dashboard stats", () => {
  it("filters logs by date range", () => {
    const result = filterLogsByRange(logs, "2026-04-21", "2026-04-23");
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("2");
  });

  it("returns numeric weekly stats shape", () => {
    const weekly = getWeeklyStats(logs);
    expect(typeof weekly.days).toBe("number");
    expect(typeof weekly.totalCalories).toBe("number");
    expect(typeof weekly.avgWeight).toBe("number");
  });

  it("returns numeric monthly stats shape", () => {
    const monthly = getMonthlyStats(logs);
    expect(typeof monthly.days).toBe("number");
    expect(typeof monthly.totalCalories).toBe("number");
    expect(typeof monthly.avgWeight).toBe("number");
  });
});
