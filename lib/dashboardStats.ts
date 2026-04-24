import { DailyLogRecord } from "@/lib/dailyLogsSchema";
import { endOfMonth, endOfWeek, format, isWithinInterval, parseISO, startOfMonth, startOfWeek } from "date-fns";

export function filterLogsByRange(logs: DailyLogRecord[], startDate?: string, endDate?: string): DailyLogRecord[] {
  if (!startDate && !endDate) {
    return logs;
  }

  const start = startDate ? parseISO(startDate) : new Date("1970-01-01");
  const end = endDate ? parseISO(endDate) : new Date("2999-12-31");

  return logs.filter((log) => {
    const date = parseISO(log.date);
    return isWithinInterval(date, { start, end });
  });
}

export function getWeeklyStats(logs: DailyLogRecord[]) {
  const now = new Date();
  const start = startOfWeek(now);
  const end = endOfWeek(now);
  const weekLogs = logs.filter((log) => isWithinInterval(parseISO(log.date), { start, end }));
  return summarize(weekLogs);
}

export function getMonthlyStats(logs: DailyLogRecord[]) {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  const monthLogs = logs.filter((log) => isWithinInterval(parseISO(log.date), { start, end }));
  return summarize(monthLogs);
}

function summarize(logs: DailyLogRecord[]) {
  const totalCalories = logs.reduce((sum, log) => sum + log.calories, 0);
  const avgWeight = logs.length > 0 ? Number((logs.reduce((sum, log) => sum + log.weight, 0) / logs.length).toFixed(1)) : 0;
  return {
    days: logs.length,
    totalCalories,
    avgWeight,
  };
}

export function buildChartData(logs: DailyLogRecord[]) {
  return [...logs]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((item) => ({
      date: format(parseISO(item.date), "MMM d"),
      weight: item.weight,
      calories: item.calories,
    }));
}
