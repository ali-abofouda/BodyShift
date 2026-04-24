"use client";

type DailyFormState = {
  date: string;
  weight: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  workoutDone: boolean;
  note: string;
};

type DailyInputPanelProps = {
  form: DailyFormState;
  formError: string;
  successMessage: string;
  editing: boolean;
  onChange: (next: DailyFormState) => void;
  onSubmit: () => void;
  onCancelEdit: () => void;
};

function InputField({
  label,
  value,
  onChange,
  type = "number",
  step,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  step?: string;
}) {
  return (
    <label className="space-y-1 text-xs text-zinc-300">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        step={step}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-emerald-400"
      />
    </label>
  );
}

export default function DailyInputPanel({
  form,
  formError,
  successMessage,
  editing,
  onChange,
  onSubmit,
  onCancelEdit,
}: DailyInputPanelProps) {
  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-5">
      <h3 className="mb-1 text-base font-extrabold text-zinc-100">سجل يومك</h3>
      <p className="mb-4 text-xs text-zinc-400">اكتب بياناتك اليومية عشان تتابع تقدمك الحقيقي.</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InputField
          label="التاريخ"
          value={form.date}
          onChange={(value) => onChange({ ...form, date: value })}
          type="date"
        />
        <InputField
          label="الوزن (كجم)"
          value={form.weight}
          onChange={(value) => onChange({ ...form, weight: value })}
          step="0.1"
        />
        <InputField
          label="السعرات"
          value={form.calories}
          onChange={(value) => onChange({ ...form, calories: value })}
          step="1"
        />
        <InputField
          label="بروتين (جم)"
          value={form.protein}
          onChange={(value) => onChange({ ...form, protein: value })}
          step="1"
        />
        <InputField
          label="كارب (جم)"
          value={form.carbs}
          onChange={(value) => onChange({ ...form, carbs: value })}
          step="1"
        />
        <InputField
          label="دهون (جم)"
          value={form.fat}
          onChange={(value) => onChange({ ...form, fat: value })}
          step="1"
        />

        <label className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200">
          <input
            type="checkbox"
            checked={form.workoutDone}
            onChange={(event) => onChange({ ...form, workoutDone: event.target.checked })}
            className="h-4 w-4 accent-emerald-500"
          />
          خلصت تمرين النهاردة
        </label>

        <label className="space-y-1 text-xs text-zinc-300 lg:col-span-3">
          <span>ملاحظة سريعة</span>
          <input
            type="text"
            value={form.note}
            onChange={(event) => onChange({ ...form, note: event.target.value })}
            placeholder="مثلاً: الطاقة كانت كويسة"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-emerald-400"
          />
        </label>
      </div>

      {formError ? <p className="mt-3 text-xs font-semibold text-rose-300">{formError}</p> : null}
      {successMessage ? <p className="mt-3 text-xs font-semibold text-emerald-300">{successMessage}</p> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-black text-zinc-950 transition hover:bg-emerald-400"
        >
          {editing ? "تحديث اليوم" : "حفظ اليوم"}
        </button>

        {editing ? (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-bold text-zinc-200 transition hover:border-zinc-400"
          >
            إلغاء التعديل
          </button>
        ) : null}
      </div>
    </section>
  );
}
