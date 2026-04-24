type SectionHeaderProps = {
  label: string;
  title: string;
  accent: string;
};

export default function SectionHeader({ label, title, accent }: SectionHeaderProps) {
  return (
    <header className="mb-8">
      <p className="mb-3 flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-emerald-400 uppercase">
        <span className="h-0.5 w-6 bg-emerald-400" aria-hidden="true" />
        {label}
      </p>
      <h2 className="text-3xl font-black leading-tight text-zinc-100 sm:text-4xl">
        {title} <span className="text-emerald-400">{accent}</span>
      </h2>
    </header>
  );
}
