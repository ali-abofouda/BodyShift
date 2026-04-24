import { defaultDashboardState, dietViewData } from "@/data/fitnessData";
import AnimatedReveal from "./ui/AnimatedReveal";
import SectionHeader from "./ui/SectionHeader";

export default function Summary() {
  return (
    <section id="summary" className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <AnimatedReveal>
        <SectionHeader label="الملخص اليومي" title="روتينك" accent="كل يوم" />
      </AnimatedReveal>

      <ol className="space-y-3">
        {dietViewData.summarySteps.map((step, idx) => (
          <AnimatedReveal key={step} delay={idx * 0.03}>
            <li className="flex items-start gap-3 rounded-2xl border border-emerald-500/15 bg-zinc-900/70 p-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-zinc-950">
                {idx + 1}
              </span>
              <p className="text-sm text-zinc-300">{step}</p>
            </li>
          </AnimatedReveal>
        ))}
      </ol>

      <AnimatedReveal className="mt-8 rounded-3xl border border-emerald-500/35 bg-gradient-to-l from-emerald-500/15 to-transparent p-8 text-center">
        <p className="text-sm text-zinc-400">الهدف الواقعي</p>
        <p className="mt-2 text-5xl font-black text-emerald-300">{defaultDashboardState.goalWeight} كجم</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-300">
          معدل نزول تقريبي {defaultDashboardState.targetMonthlyLossKg} كجم كل شهر بشكل عملي ومستمر.
        </p>
      </AnimatedReveal>
    </section>
  );
}
