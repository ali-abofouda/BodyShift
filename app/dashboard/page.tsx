"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardStats from "@/components/DashboardStats";
import EditableCard from "@/components/EditableCard";
import GoalTracker from "@/components/GoalTracker";
import MonthlyTracker from "@/components/MonthlyTracker";
import ProgressChart from "@/components/ProgressChart";
import { DashboardState, defaultDashboardState } from "@/data/fitnessData";
import { LOGIN_STORAGE_KEY, THEME_STORAGE_KEY, readDashboardState, writeDashboardState } from "@/lib/localStore";
import { calculateOverview } from "@/lib/progressLogic";

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
  const isBrowser = typeof window !== "undefined";
  const [state, setState] = useState<DashboardState>(() => readDashboardState() ?? defaultDashboardState);
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
    if (!isBrowser) {
      return;
    }
    writeDashboardState(state);
  }, [isBrowser, state]);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [isBrowser, theme]);

  const overview = useMemo(() => calculateOverview(state), [state]);

  const workoutProgress = useMemo(() => {
    if (state.workoutCompletion.target <= 0) {
      return 0;
    }
    return Math.round((state.workoutCompletion.completed / state.workoutCompletion.target) * 100);
  }, [state.workoutCompletion.completed, state.workoutCompletion.target]);

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

  const submitLogin = () => {
    const cleaned = nameInput.trim();
    if (!cleaned) {
      return;
    }
    setDisplayName(cleaned);
    window.localStorage.setItem(LOGIN_STORAGE_KEY, cleaned);
  };

  if (!isBrowser) {
    return <div className="min-h-screen bg-zinc-950" />;
  }

  if (!displayName) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-20 text-zinc-100 sm:px-6">
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
    );
  }

  const rootTone =
    theme === "dark"
      ? "bg-zinc-950 text-zinc-100"
      : "bg-zinc-100 text-zinc-900 [&_article]:bg-white [&_section]:bg-white";

  return (
    <main className={`min-h-screen px-4 pt-24 pb-14 sm:px-6 ${rootTone}`}>
      <section className="mx-auto mb-6 flex w-full max-w-6xl items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">داشبورد تقدمك يا {displayName}</h1>
          <p className="text-sm text-zinc-400">كل الأرقام دي قابلة للتعديل وبتتحفظ تلقائي</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs font-bold"
          >
            {theme === "dark" ? "الوضع الفاتح" : "الوضع الغامق"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-zinc-950"
          >
            تصدير PDF
          </button>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <DashboardStats
            currentWeight={state.currentWeight}
            currentBodyFat={state.currentBodyFat}
            goalWeight={state.goalWeight}
            weightDiff={overview.weightDiff}
            fatDiff={overview.fatDiff}
          />

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
                  id="diet-adherence"
                  label="التزامك بالأكل (%)"
                  value={state.dietAdherence}
                  onChange={(value) => updateField("dietAdherence", value)}
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
            currentWeight={state.currentWeight}
            goalWeight={state.goalWeight}
            remainingToGoal={overview.remainingToGoal}
            estimatedMonths={overview.estimatedMonths}
          />

          <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5">
            <h3 className="mb-3 text-base font-extrabold">نسبة التزامك</h3>

            <div className="mb-3 space-y-2">
              <p className="flex justify-between text-xs text-zinc-400">
                <span>التمرين</span>
                <span>
                  {state.workoutCompletion.completed}/{state.workoutCompletion.target}
                </span>
              </p>
              <div className="h-2.5 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full bg-emerald-400" style={{ width: `${workoutProgress}%` }} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="flex justify-between text-xs text-zinc-400">
                <span>الأكل</span>
                <span>{state.dietAdherence}%</span>
              </p>
              <div className="h-2.5 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full bg-amber-400" style={{ width: `${state.dietAdherence}%` }} />
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
  );
}
