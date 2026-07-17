import type { Metadata } from "next";
import LoginForm from "./login-form";
import { siteName, siteTagline } from "@/lib/site-config";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-10"
      style={{ background: "#050a08" }}
    >
      {/* Animated aurora background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="aurora-blob aurora-blob-1"
          style={{
            top: "-10%",
            left: "-5%",
            width: "42rem",
            height: "42rem",
            background: "radial-gradient(circle, rgba(16,185,129,0.30) 0%, rgba(16,185,129,0) 70%)",
          }}
        />
        <div
          className="aurora-blob aurora-blob-2"
          style={{
            bottom: "-15%",
            right: "-8%",
            width: "38rem",
            height: "38rem",
            background: "radial-gradient(circle, rgba(45,212,191,0.24) 0%, rgba(45,212,191,0) 70%)",
          }}
        />
        <div
          className="aurora-blob aurora-blob-3"
          style={{
            top: "35%",
            left: "45%",
            width: "30rem",
            height: "30rem",
            background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0) 70%)",
          }}
        />
        <div className="auth-grid absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 0%, transparent 0%, #050a08 85%)" }}
        />
      </div>

      <div className="relative w-full max-w-sm animate-fade-scale-in">
        {/* Gradient border wrapper */}
        <div
          className="rounded-[28px] p-px"
          style={{
            background:
              "linear-gradient(160deg, rgba(52,211,153,0.45) 0%, rgba(45,212,191,0.15) 35%, rgba(255,255,255,0.06) 60%, rgba(52,211,153,0.25) 100%)",
          }}
        >
          <div
            className="glass-panel relative overflow-hidden rounded-[27px] p-7"
            style={{
              boxShadow: "0 30px 70px -25px rgba(0,0,0,0.7), 0 0 60px -20px rgba(16,185,129,0.18)",
            }}
          >
            {/* subtle top sheen line */}
            <div
              className="auth-sheen pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.7), transparent)" }}
            />

            <div className="mb-7 flex items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                <div
                  className="auth-glow-pulse absolute inset-0 rounded-2xl"
                  style={{ background: "radial-gradient(circle, rgba(16,185,129,0.55) 0%, transparent 75%)" }}
                />
                <div
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold tracking-wide text-emerald-950"
                  style={{
                    background: "linear-gradient(135deg, #6ee7b7 0%, #10b981 55%, #0d9488 100%)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.15) inset, 0 8px 20px -6px rgba(16,185,129,0.6)",
                  }}
                >
                  L
                </div>
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight leading-tight text-white">{siteName}</h1>
                <p className="text-xs leading-tight text-emerald-100/45">{siteTagline}</p>
              </div>
            </div>

            <p className="mb-5 text-sm text-emerald-50/60">Sign in to continue to your workspace.</p>

            <LoginForm next={next ?? "/"} />

            <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-emerald-100/35">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-70">
                <path
                  d="M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Encrypted connection · session-based authentication
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
