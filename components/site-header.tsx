"use client"

import Link from "next/link"
import { profile as defaultProfile } from "@/lib/profile"
import ThemeToggle from "./theme-toggle"
import { toggleBaselineGrid } from "@/components/baseline-grid"
import { cn } from "@/lib/utils"
import { Circle } from 'lucide-react'
import { useSectionReveal } from "@/components/section-reveal"
import { useMenu } from "@/components/menu-state"
import { DEFAULT_SECTION_ID } from "@/lib/sections"

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
  const { open: openSection } = useSectionReveal()
  const { setOpen: setMenuOpen } = useMenu()

  function goHome(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    openSection(DEFAULT_SECTION_ID)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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
            onClick={goHome}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--accent)]"
            aria-label="Back to about"
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
