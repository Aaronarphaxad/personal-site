"use client"

import { profile as defaultProfile } from "@/lib/profile"
import Image from "next/image"

type Props = {
  profile?: typeof defaultProfile
}

export default function Hero({ profile = defaultProfile }: Props) {
  const now = profile.notes?.[0]

  return (
    <section aria-labelledby="hero-title" id="top" className="relative isolate">
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.5] dark:opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--muted-foreground)/0.06) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--muted-foreground)/0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-15%] -z-10 h-[460px] w-[780px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--accent) 35%, white) 0%, transparent 60%)",
          opacity: 0.5,
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-8 py-16 sm:py-24">
          {/* Avatar + availability pill */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/avatar.png"
                alt={profile.name}
                width={250}
                height={250}
                priority
                className="h-24 w-24 rounded-2xl object-cover shadow-sm sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-80 blur-md"
                style={{
                  background:
                    "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 55%, transparent) 0%, transparent 70%)",
                }}
              />
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-xs text-foreground/70 backdrop-blur">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              {profile.availability === "open"
                ? "Open to opportunities"
                : profile.availability === "selective"
                ? "Selective opportunities"
                : "Not looking"}
            </span>
          </div>

          {/* Title + role */}
          <h1
            id="hero-title"
            className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            {profile.name}
            <span className="block text-foreground/60">
              {profile.role} · {profile.current}
            </span>
          </h1>

          {/* Tagline */}
          <p className="max-w-2xl text-pretty text-base leading-7 text-foreground/70 sm:text-lg">
            {profile.tagline}
          </p>

          {/* Now strip: common in designer portfolios */}
          {now ? (
            <div className="rounded-xl border border-foreground/10 bg-background/60 p-3 text-sm text-foreground/80 backdrop-blur">
              <span className="mr-2 rounded-md border border-foreground/10 px-2 py-0.5 text-xs text-foreground/60">
                Now
              </span>
              <span className="font-medium">{now.title}</span>
              <span className="text-foreground/60">{' — '}{now.tags?.slice(0, 2).join(" · ")}</span>
            </div>
          ) : null}

          {/* Facts */}
          <FactsBar profile={profile} />
        </div>
      </div>
    </section>
  )
}

function FactsBar({ profile = defaultProfile }: Props) {
  return (
    <div className="w-full">
      <ul className="flex flex-wrap items-center gap-3 rounded-xl border border-foreground/10 bg-background/50 p-3 text-xs sm:text-sm">
        <li className="inline-flex items-center gap-2 rounded-md border border-foreground/10 px-3 py-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
          {profile.location}
        </li>
        <li className="inline-flex items-center gap-2 rounded-md border border-foreground/10 px-3 py-2 font-mono text-foreground/80">
          self_taught=true
        </li>
        <li className="inline-flex items-center gap-2 rounded-md border border-foreground/10 px-3 py-2 font-mono text-foreground/80">
          systems-mindset
        </li>
      </ul>
    </div>
  )
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  const letters = parts.map((p) => p[0]?.toUpperCase()).filter(Boolean)
  return letters.slice(0, 2).join("")
}
