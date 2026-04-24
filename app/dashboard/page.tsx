"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Navbar from "@/components/Navbar";
import { DailyLogInput, DailyLogRecord, dailyLogSchema } from "@/lib/dailyLogsSchema";
import { buildChartData, filterLogsByRange, getMonthlyStats, getWeeklyStats } from "@/lib/dashboardStats";
import { createDailyLog, deleteDailyLog, getCurrentUser, getDailyLogs, signOut, updateDailyLog } from "@/lib/dailyLogsService";

function NumberInput({
  id,
  label,
  value,
  onChange,
  step = 0.1,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}) {
  return (
    <label htmlFor={id} className="space-y-1 text-xs text-zinc-300">
      <span>{label}</span>
      <input
        id={id}
        type="number"
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-emerald-400"
      />
    </label>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<DailyLogRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [form, setForm] = useState<DailyLogInput>({
    date: new Date().toISOString().slice(0, 10),
    calories: 0,
    weight: 0,
    notes: "",
  });
  const [userEmail, setUserEmail] = useState("");

  const filteredLogs = useMemo(() => filterLogsByRange(logs, startDate, endDate), [endDate, logs, startDate]);
  const chartData = useMemo(() => buildChartData(filteredLogs), [filteredLogs]);
  const weekly = useMemo(() => getWeeklyStats(logs), [logs]);
  const monthly = useMemo(() => getMonthlyStats(logs), [logs]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/auth");
        return;
      }

      setUserEmail(user.email ?? "User");
      const data = await getDailyLogs();
      setLogs(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load dashboard data.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadData]);

  function clearForm() {
    setEditingId(null);
    setFormError("");
    setForm({
      date: new Date().toISOString().slice(0, 10),
      calories: 0,
      weight: 0,
      notes: "",
    });
  }

  async function onSave() {
    setFormError("");
    const parsed = dailyLogSchema.safeParse(form);
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Invalid input.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const updated = await updateDailyLog(editingId, parsed.data);
        setLogs((prev) => prev.map((log) => (log.id === editingId ? updated : log)));
        toast.success("Log updated.");
      } else {
        const created = await createDailyLog(parsed.data);
        setLogs((prev) => [created, ...prev]);
        toast.success("Daily log added.");
      }
      clearForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Save failed.";
      setFormError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  function onEdit(log: DailyLogRecord) {
    setEditingId(log.id);
    setFormError("");
    setForm({
      date: log.date,
      calories: log.calories,
      weight: log.weight,
      notes: log.notes ?? "",
    });
  }

  async function onDelete(id: string) {
    try {
      await deleteDailyLog(id);
      setLogs((prev) => prev.filter((log) => log.id !== id));
      toast.success("Log deleted.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Delete failed.";
      toast.error(message);
    }
  }

  async function onLogout() {
    try {
      await signOut();
      toast.success("Logged out.");
      router.push("/auth");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Logout failed.";
      toast.error(message);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main className="min-h-screen px-4 pt-24 pb-14 sm:px-6">
        <section className="mx-auto mb-6 flex w-full max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black">Daily Tracking Dashboard</h1>
            <p className="text-sm text-zinc-400">{userEmail || "Loading user..."}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={loadData}
              className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs font-bold transition hover:border-emerald-500"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400"
            >
              Logout
            </button>
          </div>
        </section>

        {loading ? (
          <section className="mx-auto w-full max-w-6xl rounded-2xl border border-zinc-700 bg-zinc-900/70 p-8 text-center text-zinc-400">
            Loading dashboard...
          </section>
        ) : (
          <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5">
                <h3 className="mb-3 text-base font-extrabold">Daily Input</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="space-y-1 text-xs text-zinc-300">
                    <span>Date</span>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-emerald-400"
                    />
                  </label>
                  <NumberInput
                    id="calories"
                    label="Calories"
                    value={Number(form.calories)}
                    onChange={(value) => setForm((prev) => ({ ...prev, calories: value }))}
                    step={1}
                  />
                  <NumberInput
                    id="weight"
                    label="Weight (kg)"
                    value={Number(form.weight)}
                    onChange={(value) => setForm((prev) => ({ ...prev, weight: value }))}
                    step={0.1}
                  />
                  <label className="space-y-1 text-xs text-zinc-300 sm:col-span-3">
                    <span>Notes</span>
                    <input
                      type="text"
                      value={form.notes}
                      onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-emerald-400"
                    />
                  </label>
                </div>
                {formError ? <p className="mt-3 text-xs font-semibold text-rose-300">{formError}</p> : null}
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={onSave}
                    disabled={saving}
                    className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-black text-zinc-950 transition hover:bg-emerald-400 disabled:opacity-60"
                  >
                    {saving ? "Saving..." : editingId ? "Update Log" : "Save Log"}
                  </button>
                  {editingId ? (
                    <button
                      type="button"
                      onClick={clearForm}
                      className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-bold text-zinc-200 transition hover:border-zinc-400"
                    >
                      Cancel
                    </button>
                  ) : null}
                </div>
              </section>

              <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5">
                <div className="mb-4 flex flex-wrap gap-3">
                  <label className="space-y-1 text-xs text-zinc-300">
                    <span>Start date</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(event) => setStartDate(event.target.value)}
                      className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="space-y-1 text-xs text-zinc-300">
                    <span>End date</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(event) => setEndDate(event.target.value)}
                      className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
                    />
                  </label>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" stroke="#a1a1aa" />
                      <YAxis stroke="#a1a1aa" />
                      <Tooltip />
                      <Line type="monotone" dataKey="weight" stroke="#34d399" strokeWidth={2} />
                      <Line type="monotone" dataKey="calories" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </div>

            <div className="space-y-4">
              <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5">
                <h3 className="mb-3 text-base font-extrabold">Weekly Stats</h3>
                <p className="text-sm text-zinc-300">Days logged: {weekly.days}</p>
                <p className="text-sm text-zinc-300">Avg weight: {weekly.avgWeight} kg</p>
                <p className="text-sm text-zinc-300">Calories total: {weekly.totalCalories}</p>
              </section>
              <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5">
                <h3 className="mb-3 text-base font-extrabold">Monthly Stats</h3>
                <p className="text-sm text-zinc-300">Days logged: {monthly.days}</p>
                <p className="text-sm text-zinc-300">Avg weight: {monthly.avgWeight} kg</p>
                <p className="text-sm text-zinc-300">Calories total: {monthly.totalCalories}</p>
              </section>
              <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5">
                <h3 className="mb-3 text-base font-extrabold">Logs Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[540px] text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400">
                        <th className="px-2 py-2 text-start">Date</th>
                        <th className="px-2 py-2 text-start">Weight</th>
                        <th className="px-2 py-2 text-start">Calories</th>
                        <th className="px-2 py-2 text-start">Notes</th>
                        <th className="px-2 py-2 text-start">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className="border-b border-zinc-900/70 text-zinc-200">
                          <td className="px-2 py-2">{log.date}</td>
                          <td className="px-2 py-2">{log.weight} kg</td>
                          <td className="px-2 py-2">{log.calories}</td>
                          <td className="px-2 py-2">{log.notes || "-"}</td>
                          <td className="px-2 py-2">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => onEdit(log)}
                                className="rounded-md border border-emerald-500/40 px-2 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-500/10"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => onDelete(log.id)}
                                className="rounded-md border border-rose-500/40 px-2 py-1 text-xs font-bold text-rose-300 hover:bg-rose-500/10"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredLogs.length === 0 ? <p className="mt-3 text-xs text-zinc-400">No logs found in this filter.</p> : null}
              </section>
              <section className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-5 text-xs text-zinc-400">
                Data is cached in memory for the session to reduce repeated requests. Use Refresh for manual sync.
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
