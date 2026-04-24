"use client";

export type DailyEntry = {
  id: string;
  date: string;
  weight: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  workoutDone: boolean;
  note: string;
};

type DailyEntriesTableProps = {
  entries: DailyEntry[];
  onEdit: (entry: DailyEntry) => void;
  onDelete: (id: string) => void;
};

export default function DailyEntriesTable({ entries, onEdit, onDelete }: DailyEntriesTableProps) {
  if (entries.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/70 p-6 text-center text-sm text-zinc-400">
        لسه مفيش بيانات - ابدأ سجل أول يوم
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5">
      <h3 className="mb-4 text-base font-extrabold text-zinc-100">سجل الأيام</h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400">
              <th className="px-2 py-2 text-start">اليوم</th>
              <th className="px-2 py-2 text-start">الوزن</th>
              <th className="px-2 py-2 text-start">السعرات</th>
              <th className="px-2 py-2 text-start">P/C/F</th>
              <th className="px-2 py-2 text-start">التمرين</th>
              <th className="px-2 py-2 text-start">ملاحظة</th>
              <th className="px-2 py-2 text-start">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-b border-zinc-900/70 text-zinc-200 hover:bg-zinc-950/60">
                <td className="px-2 py-2">{entry.date}</td>
                <td className="px-2 py-2">{entry.weight} كجم</td>
                <td className="px-2 py-2">{entry.calories}</td>
                <td className="px-2 py-2">
                  {entry.protein}/{entry.carbs}/{entry.fat}
                </td>
                <td className="px-2 py-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-bold ${
                      entry.workoutDone ? "bg-emerald-500/20 text-emerald-300" : "bg-zinc-700/50 text-zinc-300"
                    }`}
                  >
                    {entry.workoutDone ? "تم" : "لأ"}
                  </span>
                </td>
                <td className="px-2 py-2 text-zinc-400">{entry.note || "-"}</td>
                <td className="px-2 py-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(entry)}
                      className="rounded-md border border-emerald-500/40 px-2 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-500/10"
                    >
                      تعديل
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(entry.id)}
                      className="rounded-md border border-rose-500/40 px-2 py-1 text-xs font-bold text-rose-300 hover:bg-rose-500/10"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
