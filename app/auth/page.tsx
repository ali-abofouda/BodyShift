"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          throw error;
        }
        toast.success("Account created. Check your email for verification.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          throw error;
        }
        toast.success("Welcome back!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Authentication failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main className="px-4 py-20 sm:px-6">
        <section className="mx-auto w-full max-w-md rounded-2xl border border-emerald-500/20 bg-zinc-900/80 p-6">
          <h1 className="mb-2 text-2xl font-black">{mode === "login" ? "Login" : "Create account"}</h1>
          <p className="mb-4 text-sm text-zinc-400">
            {mode === "login" ? "Login to access your secure dashboard." : "Register a new account to start tracking."}
          </p>

          <form className="space-y-3" onSubmit={onSubmit}>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password (min 6 chars)"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-black text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setMode((prev) => (prev === "login" ? "register" : "login"))}
            className="mt-4 text-xs font-bold text-emerald-300 hover:text-emerald-200"
          >
            {mode === "login" ? "No account? Register" : "Already have an account? Login"}
          </button>
        </section>
      </main>
    </div>
  );
}
