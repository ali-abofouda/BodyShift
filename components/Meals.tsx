import { dietViewData } from "@/data/fitnessData";
import AnimatedReveal from "./ui/AnimatedReveal";
import Pill from "./ui/Pill";

export default function Meals() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6" aria-label="مثال يوم غذائي كامل">
      <AnimatedReveal>
        <h3 className="mb-6 text-xl font-extrabold text-zinc-200">مثال يوم كامل</h3>
      </AnimatedReveal>

      <div className="relative space-y-4 before:absolute before:top-0 before:bottom-0 before:right-5 before:w-px before:bg-gradient-to-b before:from-emerald-500 before:to-transparent">
        {dietViewData.meals.map((meal, idx) => (
          <AnimatedReveal key={meal.name} delay={idx * 0.06}>
            <article className="relative flex gap-3 sm:gap-5">
              <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 bg-zinc-900 text-lg">
                {meal.icon}
              </div>
              <div className="flex-1 rounded-2xl border border-emerald-500/15 bg-zinc-900/75 p-4 transition hover:border-emerald-400/40">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-zinc-100">{meal.name}</h4>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/20">
                    {meal.time}
                  </span>
                </div>

                <p className="mb-3 text-sm text-zinc-400">{meal.food}</p>

                <div className="flex flex-wrap gap-2">
                  <Pill tone="protein">بروتين {meal.macros.protein}</Pill>
                  <Pill tone="carb">كارب {meal.macros.carbs}</Pill>
                  <Pill tone="cal">{meal.macros.calories}</Pill>
                </div>

                <p className="mt-3 border-t border-emerald-500/10 pt-3 text-xs text-zinc-500">{meal.alternative}</p>
              </div>
            </article>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
