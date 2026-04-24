import { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  tone?: "protein" | "carb" | "cal";
};

const toneClasses = {
  protein: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30",
  carb: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30",
  cal: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30",
};

export default function Pill({ children, tone = "protein" }: PillProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
