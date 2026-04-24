import { dietViewData } from "@/data/fitnessData";
import AnimatedReveal from "./ui/AnimatedReveal";
import SectionHeader from "./ui/SectionHeader";

const ringTone = {
  good: "border-emerald-400 text-emerald-300 bg-emerald-500/10",
  warn: "border-amber-400 text-amber-300 bg-amber-500/10",
  bad: "border-rose-400 text-rose-300 bg-rose-500/10",
};

export default function Diet() {
  return (
    <section id="diet" className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <AnimatedReveal>
        <SectionHeader label="النظام الغذائي" title="اكلك يبقى" accent="سلاحك" />
      </AnimatedReveal>

      <AnimatedReveal className="mb-6 rounded-2xl border border-rose-500/35 bg-rose-500/10 p-5">
        <h3 className="mb-1 text-sm font-bold text-rose-300">تنبيه مهم - البروتين</h3>
        <p className="text-sm text-rose-200/90">{dietViewData.warning}</p>
      </AnimatedReveal>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {dietViewData.macroCards.map((macro, idx) => {
          const toneKey = (macro.tone in ringTone ? macro.tone : "good") as keyof typeof ringTone;

          return (
            <AnimatedReveal key={macro.label} delay={idx * 0.05}>
              <article className="rounded-2xl border border-emerald-500/15 bg-zinc-900/75 p-5 text-center">
                <div
                  className={`mx-auto mb-3 flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 ${ringTone[toneKey]}`}
                >
                  <p className="text-3xl font-black leading-none">{macro.grams}</p>
                  <p className="text-xs text-zinc-300">جم</p>
                </div>
                <h3 className="text-sm font-bold text-zinc-100">{macro.label}</h3>
                <p className="text-xs text-zinc-400">{macro.percentage}</p>
              </article>
            </AnimatedReveal>
          );
        })}
      </div>

      <AnimatedReveal className="rounded-2xl border border-emerald-500/30 bg-gradient-to-l from-zinc-900 to-emerald-950/30 p-6">
        <p className="mb-2 text-xs text-zinc-400">السعرات الكلية اليومية</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-4xl font-black text-emerald-300">{dietViewData.dailyCalories} kcal</p>
          <p className="max-w-xl text-sm text-zinc-300">{dietViewData.caloriesNote}</p>
        </div>
      </AnimatedReveal>
    </section>
  );
}
