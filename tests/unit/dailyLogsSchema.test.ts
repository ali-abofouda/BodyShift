import { describe, expect, it } from "vitest";
import { dailyLogSchema } from "@/lib/dailyLogsSchema";

describe("dailyLogSchema", () => {
  it("accepts valid daily log input", () => {
    const parsed = dailyLogSchema.safeParse({
      date: "2026-04-24",
      calories: 2200,
      weight: 84.6,
      notes: "Solid day",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects non-positive numbers", () => {
    const parsed = dailyLogSchema.safeParse({
      date: "2026-04-24",
      calories: 0,
      weight: -1,
      notes: "",
    });
    expect(parsed.success).toBe(false);
  });
});
