"use client";

import { ReactNode } from "react";

type EditableCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function EditableCard({ title, subtitle, children }: EditableCardProps) {
  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5 transition hover:border-emerald-400/35 hover:shadow-[0_0_0_1px_rgba(16,185,129,0.2)]">
      <header className="mb-4">
        <h3 className="text-base font-extrabold text-zinc-100">{title}</h3>
        {subtitle ? <p className="text-xs text-zinc-400">{subtitle}</p> : null}
      </header>
      {children}
    </section>
  );
}
