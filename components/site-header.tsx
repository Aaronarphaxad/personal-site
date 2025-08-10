"use client"

import Link from "next/link"
import { profile as defaultProfile } from "@/lib/profile"
import ThemeToggle from "./theme-toggle"
import { toggleBaselineGrid } from "@/components/baseline-grid"
import { cn } from "@/lib/utils"
import { Circle } from 'lucide-react'

type Props = {
  minimal?: boolean
  sticky?: boolean
  profile?: typeof defaultProfile
}

export default function SiteHeader({
  minimal = false,
  sticky = true,
  profile = defaultProfile,
}: Props) {
  return (
    <header
      className={cn(
        "w-full top-0 z-30 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        sticky && "sticky"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/#about"
            className="flex items-center gap-2 text-sm font-medium"
            aria-label="Go to home"
          >
            <div className="relative">
              <div className="h-5 w-5 rounded-[6px] border border-foreground/15" />
              <div className="absolute -right-1 -top-1">
                <PresenceDot status={profile.availability} />
              </div>
            </div>
            <span className="tracking-tight">{profile.name}</span>
            <span className="text-foreground/40">/</span>
            <span className="text-foreground/70">{profile.current}</span>
          </Link>

          {/* Always minimal: we move primary nav to the Orb */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBaselineGrid()}
              className="hidden rounded border border-foreground/10 bg-background/60 px-2 py-1 text-[10px] text-foreground/60 backdrop-blur transition-colors hover:border-[var(--accent)] md:inline-block"
              aria-label="Toggle baseline grid (press b)"
            >
              Grid
            </button>
            <kbd className="hidden rounded border border-foreground/10 bg-background/60 px-2 py-1 text-[10px] text-foreground/60 sm:inline-block">
              g
            </kbd>
            <kbd className="hidden rounded border border-foreground/10 bg-background/60 px-2 py-1 text-[10px] text-foreground/60 sm:inline-block">
              b
            </kbd>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

function PresenceDot({ status }: { status: "open" | "selective" | "closed" }) {
  const map = {
    open: ["bg-[var(--accent)]", "text-[var(--accent)]"],
    selective: ["bg-amber-400", "text-amber-400"],
    closed: ["bg-foreground/30", "text-foreground/30"],
  } as const
  const [bg, stroke] = map[status]
  return (
    <span className="relative inline-flex items-center">
      <span className={cn("h-2.5 w-2.5 rounded-full", bg)} />
      <Circle className={cn("absolute -left-[3px] -top-[3px] h-4 w-4", stroke)} />
      <span className="sr-only">
        {status === "open"
          ? "Open to opportunities"
          : status === "selective"
          ? "Selective opportunities"
          : "Not looking"}
      </span>
    </span>
  )
}
