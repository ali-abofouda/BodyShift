"use client";

import { PostgrestError, User } from "@supabase/supabase-js";
import { DailyLogInput, DailyLogRecord } from "@/lib/dailyLogsSchema";
import { createClient } from "@/lib/supabase/client";

function mapError(error: PostgrestError | null) {
  if (!error) {
    return "Unexpected error. Please try again.";
  }

  if (error.code === "23505") {
    return "A log for this date already exists.";
  }

  return error.message || "Unexpected database error.";
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data.user;
}

export async function getDailyLogs(): Promise<DailyLogRecord[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("daily_logs")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    throw new Error(mapError(error));
  }

  return data ?? [];
}

export async function createDailyLog(input: DailyLogInput): Promise<DailyLogRecord> {
  const supabase = createClient();
  const { data, error } = await supabase.from("daily_logs").insert(input).select("*").single();

  if (error) {
    throw new Error(mapError(error));
  }

  return data;
}

export async function updateDailyLog(id: string, input: DailyLogInput): Promise<DailyLogRecord> {
  const supabase = createClient();
  const { data, error } = await supabase.from("daily_logs").update(input).eq("id", id).select("*").single();

  if (error) {
    throw new Error(mapError(error));
  }

  return data;
}

export async function deleteDailyLog(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("daily_logs").delete().eq("id", id);
  if (error) {
    throw new Error(mapError(error));
  }
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
