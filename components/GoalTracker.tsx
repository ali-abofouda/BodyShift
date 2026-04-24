"use client";

type GoalTrackerProps = {
  currentWeight: number;
  goalWeight: number;
  remainingToGoal: number;
  estimatedMonths: number;
};

export default function GoalTracker({
  currentWeight,
  goalWeight,
  remainingToGoal,
  estimatedMonths,
}: GoalTrackerProps) {
  const totalDistance = Math.max(currentWeight - goalWeight, 1);
  const progress = Math.min(Math.max(((totalDistance - remainingToGoal) / totalDistance) * 100, 0), 100);

  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-extrabold text-zinc-100">هدفك وتوقع الوصول</h3>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
          {progress.toFixed(0)}%
        </span>
      </div>

      <div className="mb-3 h-2.5 overflow-hidden rounded-full bg-zinc-800">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" style={{ width: `${progress}%` }} />
      </div>

      <div className="grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
        <p>فاضلك: {remainingToGoal > 0 ? `${remainingToGoal} كجم` : "وصلت للهدف"}</p>
        <p>الوقت المتوقع: {estimatedMonths > 0 ? `${estimatedMonths} شهر` : "تقدر تثبّت نتيجتك"}</p>
      </div>
    </section>
  );
}
