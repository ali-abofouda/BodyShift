import { tipsData } from "@/data/fitnessData";
import AnimatedReveal from "./ui/AnimatedReveal";
import SectionHeader from "./ui/SectionHeader";

export default function Tips() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6" aria-label="نصائح تطبيق الخطة">
      <AnimatedReveal>
        <SectionHeader label="نصائح مهمة" title="التفاصيل اللي" accent="بتفرق" />
      </AnimatedReveal>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tipsData.map((tip, idx) => (
          <AnimatedReveal key={tip.title} delay={idx * 0.04}>
            <article className="rounded-2xl border border-emerald-500/15 bg-zinc-900/75 p-4 transition hover:border-emerald-400/35">
              <p className="mb-2 text-2xl" aria-hidden="true">
                {tip.icon}
              </p>
              <h3 className="text-sm font-bold text-zinc-100">{tip.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{tip.text}</p>
            </article>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
