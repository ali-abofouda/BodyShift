import { workoutViewData } from "@/data/fitnessData";
import AnimatedReveal from "./ui/AnimatedReveal";
import SectionHeader from "./ui/SectionHeader";

export default function Cardio() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6" aria-labelledby="cardio-heading">
      <AnimatedReveal>
        <SectionHeader label="الكارديو" title="الكارديو" accent="ضروري ليك" />
      </AnimatedReveal>

      <div className="grid gap-4 sm:grid-cols-2">
        <AnimatedReveal>
          <article className="rounded-2xl border border-emerald-500/15 bg-zinc-900/75 p-6 text-center">
            <p className="text-5xl font-black text-emerald-300">{workoutViewData.cardio.sessions}</p>
            <p className="mt-2 text-sm text-zinc-400">مرات أسبوعياً</p>
          </article>
        </AnimatedReveal>

        <AnimatedReveal delay={0.05}>
          <article className="rounded-2xl border border-emerald-500/15 bg-zinc-900/75 p-6 text-center">
            <p className="text-5xl font-black text-emerald-300">{workoutViewData.cardio.duration}</p>
            <p className="mt-2 text-sm text-zinc-400">دقيقة كل مرة</p>
          </article>
        </AnimatedReveal>

        <AnimatedReveal className="sm:col-span-2">
          <article className="rounded-2xl border border-emerald-500/25 bg-zinc-900/80 p-5 text-sm leading-7 text-zinc-300">
            {workoutViewData.cardio.note}
          </article>
        </AnimatedReveal>
      </div>
    </section>
  );
}
