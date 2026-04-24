import { resultsData } from "@/data/fitnessData";
import AnimatedReveal from "./ui/AnimatedReveal";
import SectionHeader from "./ui/SectionHeader";

const tone = {
  good: "text-emerald-300",
  warn: "text-amber-300",
  bad: "text-rose-300",
};

const barTone = {
  good: "before:bg-emerald-400",
  warn: "before:bg-amber-400",
  bad: "before:bg-rose-400",
};

export default function Results() {
  return (
    <section id="results" className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <AnimatedReveal>
        <SectionHeader label="تحليل النتائج" title="وين أنت" accent="دلوقتي؟" />
      </AnimatedReveal>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {resultsData.map((item, idx) => {
          const toneKey = (item.tone in tone ? item.tone : "good") as keyof typeof tone;

          return (
            <AnimatedReveal key={item.label} delay={idx * 0.05}>
              <article
                className={`relative overflow-hidden rounded-2xl border border-emerald-500/15 bg-zinc-900/70 p-5 transition hover:-translate-y-1 hover:border-emerald-400/40 before:absolute before:inset-x-0 before:top-0 before:h-0.5 ${
                  barTone[toneKey]
                }`}
              >
                <p className="mb-2 text-xs text-zinc-500">{item.label}</p>
                <p className={`text-3xl font-black ${tone[toneKey]}`}>{item.value}</p>
                <p className="mt-2 text-xs text-zinc-400">{item.status}</p>
              </article>
            </AnimatedReveal>
          );
        })}
      </div>
    </section>
  );
}
