import { workoutViewData } from "@/data/fitnessData";
import AnimatedReveal from "./ui/AnimatedReveal";
import Badge from "./ui/Badge";
import SectionHeader from "./ui/SectionHeader";

export default function Gym() {
  return (
    <section id="gym" className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <AnimatedReveal>
        <SectionHeader label="التمارين" title="جدول الجيم" accent="4 أيام" />
      </AnimatedReveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {workoutViewData.planDays.map((day, idx) => (
          <AnimatedReveal key={day.badge} delay={idx * 0.05}>
            <article className="rounded-2xl border border-emerald-500/15 bg-zinc-900/75 p-5 transition hover:-translate-y-1 hover:border-emerald-400/35">
              <Badge>{day.badge}</Badge>
              <h3 className="mt-3 text-lg font-black text-zinc-100">{day.title}</h3>
              <p className="mb-3 text-sm text-zinc-500">{day.focus}</p>

              <ul className="space-y-2">
                {day.exercises.map((exercise) => (
                  <li key={exercise.name} className="border-b border-zinc-800 pb-2 last:border-none">
                    <p className="text-sm font-semibold text-zinc-200">{exercise.name}</p>
                    <p className="text-xs text-zinc-400">{exercise.sets}</p>
                  </li>
                ))}
              </ul>
            </article>
          </AnimatedReveal>
        ))}
      </div>

      <AnimatedReveal className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm leading-7 text-zinc-300">
        <strong className="text-emerald-300">نصيحة:</strong> {workoutViewData.proTip}
      </AnimatedReveal>
    </section>
  );
}
