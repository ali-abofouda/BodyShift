"use client";

import { formatDiff } from "@/lib/progressLogic";

type DashboardStatsProps = {
  currentWeight: number;
  currentBodyFat: number;
  goalWeight: number;
  weightDiff: number;
  fatDiff: number;
};

function DiffBadge({ value, suffix }: { value: number; suffix?: string }) {
  const text = formatDiff(value, suffix);
  const toneClass = value < 0 ? "text-emerald-300" : value > 0 ? "text-rose-300" : "text-zinc-300";

  return <span className={`text-xs font-bold ${toneClass}`}>{text}</span>;
}

export default function DashboardStats({
  currentWeight,
  currentBodyFat,
  goalWeight,
  weightDiff,
  fatDiff,
}: DashboardStatsProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-3">
      <article className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-4 transition hover:-translate-y-0.5 hover:border-emerald-400/40">
        <p className="text-xs text-zinc-400">وزنك دلوقتي</p>
        <p className="text-3xl font-black text-zinc-100">{currentWeight} كجم</p>
        <DiffBadge value={weightDiff} suffix=" كجم" />
      </article>

      <article className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-4 transition hover:-translate-y-0.5 hover:border-emerald-400/40">
        <p className="text-xs text-zinc-400">دهون جسمك</p>
        <p className="text-3xl font-black text-zinc-100">{currentBodyFat}%</p>
        <DiffBadge value={fatDiff} suffix="%" />
      </article>

      <article className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-4 transition hover:-translate-y-0.5 hover:border-emerald-400/40">
        <p className="text-xs text-zinc-400">هدفك اللي جاي</p>
        <p className="text-3xl font-black text-emerald-300">{goalWeight} كجم</p>
        <p className="text-xs text-zinc-400">كمل بنفس المعدل وانت هتوصل</p>
      </article>
    </section>
  );
}
