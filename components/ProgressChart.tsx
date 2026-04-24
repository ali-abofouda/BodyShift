"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MonthlyProgress } from "@/data/fitnessData";

type ProgressChartProps = {
  data: MonthlyProgress[];
};

export default function ProgressChart({ data }: ProgressChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/60 p-8 text-center text-sm text-zinc-400">
        لسه مفيش بيانات - ابدأ سجل أول شهر
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5">
      <h3 className="mb-4 text-base font-extrabold text-zinc-100">تقدمك شهريا</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis dataKey="label" stroke="#a1a1aa" tick={{ fontSize: 11 }} />
            <YAxis stroke="#a1a1aa" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #065f46",
                borderRadius: 12,
                color: "#f4f4f5",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="weight" name="الوزن" stroke="#34d399" strokeWidth={2.5} />
            <Line type="monotone" dataKey="bodyFat" name="الدهون %" stroke="#fb7185" strokeWidth={2.5} />
            <Line type="monotone" dataKey="muscleMass" name="العضل" stroke="#60a5fa" strokeWidth={2.5} />
            <Line type="monotone" dataKey="visceralFat" name="الدهون الحشوية" stroke="#fbbf24" strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
