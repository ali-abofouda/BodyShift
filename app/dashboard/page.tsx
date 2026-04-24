"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardStats from "@/components/DashboardStats";
import EditableCard from "@/components/EditableCard";
import GoalTracker from "@/components/GoalTracker";
import MonthlyTracker from "@/components/MonthlyTracker";
import ProgressChart from "@/components/ProgressChart";
import DailyEntriesTable from "@/components/DailyEntriesTable";
import DailyInputPanel from "@/components/DailyInputPanel";
import { DashboardState, defaultDashboardState } from "@/data/fitnessData";
import {
  DailyEntry,
  LOGIN_STORAGE_KEY,
  THEME_STORAGE_KEY,
  readDailyEntries,
  readDashboardState,
  writeDailyEntries,
  writeDashboardState,
} from "@/lib/localStore";
import { calculateDailyAdherence, calculateOverview } from "@/lib/progressLogic";

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
  const [state, setState] = useState<DashboardState>(() => readDashboardState() ?? defaultDashboardState);
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>(() => readDailyEntries());
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dailyForm, setDailyForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    weight: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    workoutDone: false,
    note: "",
  });
  const [displayName, setDisplayName] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }
    return window.localStorage.getItem(LOGIN_STORAGE_KEY) ?? "";
  });
  const [nameInput, setNameInput] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }
    return window.localStorage.getItem(LOGIN_STORAGE_KEY) ?? "";
  });
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  });

  useEffect(() => {
    writeDashboardState(state);
  }, [state]);

  useEffect(() => {
    writeDailyEntries(dailyEntries);
  }, [dailyEntries]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!successMessage) {
      return;
    }
    const timeout = window.setTimeout(() => setSuccessMessage(""), 2500);
    return () => window.clearTimeout(timeout);
  }, [successMessage]);

  const overview = useMemo(() => calculateOverview(state), [state]);
  const sortedEntries = useMemo(
    () => [...dailyEntries].sort((a, b) => b.date.localeCompare(a.date)),
    [dailyEntries],
  );
  const recentEntries = useMemo(() => sortedEntries.slice(0, 7), [sortedEntries]);
  const derivedAdherence = useMemo(
    () => calculateDailyAdherence(recentEntries, state.dailyCalories),
    [recentEntries, state.dailyCalories],
  );
  const workoutCompletion = useMemo(
    () => recentEntries.filter((entry) => entry.workoutDone).length,
    [recentEntries],
  );
  const latestWeight = useMemo(() => {
    if (sortedEntries.length === 0) {
      return null;
    }
    return sortedEntries[0].weight;
  }, [sortedEntries]);

  const workoutProgress = useMemo(() => {
    const target = Math.max(state.workoutCompletion.target, recentEntries.length || state.workoutCompletion.target);
    if (target <= 0) {
      return 0;
    }
    return Math.round((workoutCompletion / target) * 100);
  }, [recentEntries.length, state.workoutCompletion.target, workoutCompletion]);

  const updateField = <K extends keyof DashboardState>(key: K, value: DashboardState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const updateMacro = (key: keyof DashboardState["macros"], value: number) => {
    setState((prev) => ({
      ...prev,
      macros: {
        ...prev.macros,
        [key]: value,
      },
    }));
  };

  const addCurrentMonth = () => {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const label = now.toLocaleDateString("ar-EG", { month: "long", year: "numeric" });

    setState((prev) => {
      const withoutCurrent = prev.monthly.filter((item) => item.month !== month);
      return {
        ...prev,
        monthly: [
          ...withoutCurrent,
          {
            month,
            label,
            weight: prev.currentWeight,
            bodyFat: prev.currentBodyFat,
            muscleMass: prev.muscleMass,
            visceralFat: prev.visceralFat,
          },
        ],
      };
    });
  };

  const clearMonthly = () => {
    setState((prev) => ({ ...prev, monthly: [] }));
  };

  const clearDailyForm = () => {
    setDailyForm({
      date: new Date().toISOString().slice(0, 10),
      weight: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      workoutDone: false,
      note: "",
    });
    setEditingId(null);
  };

  const submitDailyEntry = () => {
    setFormError("");
    setSuccessMessage("");

    if (!dailyForm.date) {
      setFormError("لازم تختار تاريخ اليوم.");
      return;
    }

    const payload = {
      weight: Number(dailyForm.weight),
      calories: Number(dailyForm.calories),
      protein: Number(dailyForm.protein),
      carbs: Number(dailyForm.carbs),
      fat: Number(dailyForm.fat),
    };

    if (Object.values(payload).some((value) => Number.isNaN(value) || value <= 0)) {
      setFormError("كل القيم الرقمية لازم تكون أكبر من صفر.");
      return;
    }

    const nextEntry: DailyEntry = {
      id: editingId ?? crypto.randomUUID(),
      date: dailyForm.date,
      weight: Number(payload.weight.toFixed(1)),
      calories: Math.round(payload.calories),
      protein: Math.round(payload.protein),
      carbs: Math.round(payload.carbs),
      fat: Math.round(payload.fat),
      workoutDone: dailyForm.workoutDone,
      note: dailyForm.note.trim(),
    };

    setDailyEntries((prev) => {
      if (!editingId) {
        return [...prev, nextEntry];
      }
      return prev.map((item) => (item.id === editingId ? nextEntry : item));
    });

    if (!editingId) {
      setState((prev) => ({ ...prev, currentWeight: nextEntry.weight }));
    }
    clearDailyForm();
    setSuccessMessage(editingId ? "تم تحديث اليوم بنجاح." : "تم حفظ اليوم بنجاح.");
  };

  const startEditEntry = (entry: DailyEntry) => {
    setFormError("");
    setSuccessMessage("");
    setEditingId(entry.id);
    setDailyForm({
      date: entry.date,
      weight: String(entry.weight),
      calories: String(entry.calories),
      protein: String(entry.protein),
      carbs: String(entry.carbs),
      fat: String(entry.fat),
      workoutDone: entry.workoutDone,
      note: entry.note,
    });
  };

  const deleteEntry = (id: string) => {
    setDailyEntries((prev) => prev.filter((entry) => entry.id !== id));
    if (editingId === id) {
      clearDailyForm();
    }
    setSuccessMessage("تم حذف اليوم من السجل.");
  };

  const submitLogin = () => {
    const cleaned = nameInput.trim();
    if (!cleaned) {
      return;
    }
    setDisplayName(cleaned);
    window.localStorage.setItem(LOGIN_STORAGE_KEY, cleaned);
  };

  if (!displayName) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <Navbar />
        <main className="px-4 py-20 sm:px-6">
          <section className="mx-auto w-full max-w-md rounded-2xl border border-emerald-500/20 bg-zinc-900/80 p-6">
            <h1 className="mb-2 text-2xl font-black">أهلا بيك 👋</h1>
            <p className="mb-4 text-sm text-zinc-400">اكتب اسمك عشان نفتحلك الداشبورد الشخصية.</p>
            <input
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              placeholder="اكتب اسمك"
              className="mb-3 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
            <button
              type="button"
              onClick={submitLogin}
              className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-black text-zinc-950 transition hover:bg-emerald-400"
            >
              دخول
            </button>
          </section>
        </main>
      </div>
    );
  }

  const rootTone =
    theme === "dark"
      ? "bg-zinc-950 text-zinc-100"
      : "bg-zinc-100 text-zinc-900 [&_article]:bg-white [&_section]:bg-white";

  return (
    <div className={rootTone}>
      <Navbar />
      <main className="min-h-screen px-4 pt-24 pb-14 sm:px-6">
        <section className="mx-auto mb-6 flex w-full max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black">داشبورد تقدمك يا {displayName}</h1>
            <p className="text-sm text-zinc-400">كل الأرقام دي قابلة للتعديل وبتتحفظ تلقائي</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs font-bold transition hover:border-emerald-500"
            >
              {theme === "dark" ? "الوضع الفاتح" : "الوضع الغامق"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400"
            >
              تصدير PDF
            </button>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <DashboardStats
              currentWeight={latestWeight ?? state.currentWeight}
              currentBodyFat={state.currentBodyFat}
              goalWeight={state.goalWeight}
              weightDiff={overview.weightDiff}
              fatDiff={overview.fatDiff}
            />

            <DailyInputPanel
              form={dailyForm}
              formError={formError}
              successMessage={successMessage}
              editing={Boolean(editingId)}
              onChange={setDailyForm}
              onSubmit={submitDailyEntry}
              onCancelEdit={clearDailyForm}
            />

            <DailyEntriesTable entries={sortedEntries} onEdit={startEditEntry} onDelete={deleteEntry} />

            <ProgressChart data={state.monthly} />

            <div className="grid gap-4 sm:grid-cols-2">
              <EditableCard title="تعديل القياسات" subtitle="غير القيم والواجهة هتتحدث فورًا">
                <div className="grid gap-3 sm:grid-cols-2">
                  <NumberInput
                    id="current-weight"
                    label="وزنك دلوقتي (كجم)"
                    value={state.currentWeight}
                    onChange={(value) => updateField("currentWeight", value)}
                  />
                  <NumberInput
                    id="goal-weight"
                    label="هدفك اللي جاي (كجم)"
                    value={state.goalWeight}
                    onChange={(value) => updateField("goalWeight", value)}
                  />
                  <NumberInput
                    id="body-fat"
                    label="دهون جسمك (%)"
                    value={state.currentBodyFat}
                    onChange={(value) => updateField("currentBodyFat", value)}
                  />
                  <NumberInput
                    id="muscle-mass"
                    label="الكتلة العضلية (كجم)"
                    value={state.muscleMass}
                    onChange={(value) => updateField("muscleMass", value)}
                  />
                </div>
              </EditableCard>

              <EditableCard title="الأكل والسعرات" subtitle="عدل السعرات والماكروز على مزاج خطتك">
                <div className="grid gap-3 sm:grid-cols-2">
                  <NumberInput
                    id="daily-calories"
                    label="سعراتك اليومية"
                    value={state.dailyCalories}
                    onChange={(value) => updateField("dailyCalories", value)}
                    step={1}
                  />
                  <NumberInput
                    id="macro-protein"
                    label="بروتين (جم)"
                    value={state.macros.protein}
                    onChange={(value) => updateMacro("protein", value)}
                    step={1}
                  />
                  <NumberInput
                    id="macro-carbs"
                    label="كارب (جم)"
                    value={state.macros.carbs}
                    onChange={(value) => updateMacro("carbs", value)}
                    step={1}
                  />
                  <NumberInput
                    id="macro-fat"
                    label="دهون (جم)"
                    value={state.macros.fat}
                    onChange={(value) => updateMacro("fat", value)}
                    step={1}
                  />
                </div>
              </EditableCard>
            </div>
          </div>

          <div className="space-y-4">
            <GoalTracker
              currentWeight={latestWeight ?? state.currentWeight}
              goalWeight={state.goalWeight}
              remainingToGoal={overview.remainingToGoal}
              estimatedMonths={overview.estimatedMonths}
            />

            <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5">
              <h3 className="mb-3 text-base font-extrabold">نسبة التزامك (آخر 7 أيام)</h3>

              <div className="mb-3 space-y-2">
                <p className="flex justify-between text-xs text-zinc-400">
                  <span>التمرين</span>
                  <span>
                    {workoutCompletion}/{Math.max(recentEntries.length, state.workoutCompletion.target)}
                  </span>
                </p>
                <div className="h-2.5 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full bg-emerald-400 transition-all" style={{ width: `${workoutProgress}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <p className="flex justify-between text-xs text-zinc-400">
                  <span>الأكل</span>
                  <span>{derivedAdherence}%</span>
                </p>
                <div className="h-2.5 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full bg-amber-400 transition-all" style={{ width: `${derivedAdherence}%` }} />
                </div>
              </div>
            </section>

            <MonthlyTracker monthly={state.monthly} onAddMonth={addCurrentMonth} onClear={clearMonthly} />

            <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5 text-sm">
              <h3 className="mb-2 text-base font-extrabold">حسابات سريعة</h3>
              <p className="text-zinc-300">فرق الوزن عن الشهر اللي فات: {overview.weightDiff} كجم</p>
              <p className="text-zinc-300">تغيير الدهون: {overview.fatDiff}%</p>
              <p className="text-zinc-300">نسبة نزول الدهون: {overview.fatLossPercent}%</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
