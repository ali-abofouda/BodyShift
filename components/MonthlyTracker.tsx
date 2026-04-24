"use client";

import { MonthlyProgress } from "@/data/fitnessData";

type MonthlyTrackerProps = {
  monthly: MonthlyProgress[];
  onAddMonth: () => void;
  onClear: () => void;
};

export default function MonthlyTracker({ monthly, onAddMonth, onClear }: MonthlyTrackerProps) {
  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-extrabold text-zinc-100">سجل الشهور</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onAddMonth}
            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400"
          >
            سجّل الشهر الحالي
          </button>
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs font-bold text-zinc-300 transition hover:border-zinc-400"
          >
            مسح السجل
          </button>
        </div>
      </div>

      {monthly.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-700 px-4 py-6 text-center text-sm text-zinc-400">
          لسه مفيش بيانات - ابدأ سجل أول شهر
        </p>
      ) : (
        <ul className="space-y-2">
          {monthly.map((item) => (
            <li key={item.month} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
              <div>
                <p className="text-sm font-bold text-zinc-200">{item.label}</p>
                <p className="text-xs text-zinc-500">بادج الشهر</p>
              </div>
              <div className="text-end text-xs text-zinc-300">
                <p>{item.weight} كجم</p>
                <p>{item.bodyFat}% دهون</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
