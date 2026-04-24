import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Results from "@/components/Results";
import Diet from "@/components/Diet";
import Summary from "@/components/Summary";
import { appText } from "@/data/fitnessData";

const Meals = dynamic(() => import("@/components/Meals"));
const Gym = dynamic(() => import("@/components/Gym"));
const Cardio = dynamic(() => import("@/components/Cardio"));
const Tips = dynamic(() => import("@/components/Tips"));

function SectionDivider() {
  return <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-l from-transparent via-emerald-500/30 to-transparent" />;
}

export default function Home() {
  return (
    <div className="bg-zinc-950 text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <Results />
        <SectionDivider />
        <Diet />
        <Meals />
        <SectionDivider />
        <Gym />
        <SectionDivider />
        <Cardio />
        <SectionDivider />
        <Tips />
        <SectionDivider />
        <Summary />
      </main>

      <footer className="border-t border-emerald-500/20 px-4 py-8 text-center text-xs text-zinc-500 sm:px-6">
        {appText.footerNote}
      </footer>
    </div>
  );
}
