"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { heroData } from "@/data/fitnessData";
import Badge from "./ui/Badge";

const toneMap = {
  good: "text-emerald-400",
  warn: "text-amber-400",
  bad: "text-rose-400",
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 pb-20 sm:px-6"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.22),transparent_40%),linear-gradient(135deg,#080d0b_0%,#0f1713_60%,#101614_100%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute -z-10 h-[36rem] w-[36rem] rounded-full border border-emerald-500/15"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <Badge>
            <span className="me-2 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            {heroData.badge}
          </Badge>
        </motion.div>

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto mb-4 max-w-4xl text-balance text-4xl font-black leading-tight text-zinc-100 sm:text-6xl"
        >
          {heroData.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-pretty text-sm text-zinc-400 sm:text-lg"
        >
          {heroData.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mb-8"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-zinc-950 transition hover:bg-emerald-400"
          >
            افتح داشبورد التتبع
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {heroData.stats.map((stat) => {
            const toneKey = (stat.tone in toneMap ? stat.tone : "good") as keyof typeof toneMap;

            return (
              <article
                key={stat.label}
                className="rounded-2xl border border-emerald-500/15 bg-zinc-900/75 p-4 ring-1 ring-inset ring-emerald-500/10"
              >
                <p className={`text-2xl font-extrabold ${toneMap[toneKey]}`}>
                  {stat.value}
                  {stat.unit}
                </p>
                <p className="mt-1 text-xs text-zinc-400">{stat.label}</p>
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
