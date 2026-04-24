import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-bold text-emerald-300 ring-1 ring-emerald-500/25">
      {children}
    </span>
  );
}
