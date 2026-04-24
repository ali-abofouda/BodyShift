import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  return NextResponse.json({
    hasUrl: Boolean(url),
    hasAnonKey: Boolean(key),
    urlHost: url ? new URL(url).host : null,
    isPlaceholder: url.includes("your-project-ref"),
    keyPrefix: key ? `${key.slice(0, 12)}...` : null,
  });
}
