import { z } from "zod";

export const dailyLogSchema = z.object({
  date: z.string().min(1, "Date is required"),
  calories: z.coerce.number().positive("Calories must be greater than 0"),
  weight: z.coerce.number().positive("Weight must be greater than 0"),
  notes: z.string().max(300, "Notes must be 300 chars or less").optional().default(""),
});

export type DailyLogInput = z.infer<typeof dailyLogSchema>;

export type DailyLogRecord = {
  id: string;
  user_id: string;
  date: string;
  calories: number;
  weight: number;
  notes: string | null;
  created_at: string;
};
