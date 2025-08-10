"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { useSectionReveal } from "./section-reveal"
import { User, FolderGit2, Briefcase, StickyNote, Quote, Shuffle } from 'lucide-react'
import { useMenu } from "./menu-state"

type SectionLink = {
  id: string
  label: string
  hotkey: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const LINKS: SectionLink[] = [
  { id: "about", label: "About", hotkey: "1", icon: User },
  { id: "projects", label: "Projects", hotkey: "2", icon: FolderGit2 },
  { id: "experience", label: "Experience", hotkey: "3", icon: Briefcase },
  { id: "notes", label: "Notes", hotkey: "4", icon: StickyNote },
  { id: "philosophy", label: "Philosophy", hotkey: "5", icon: Quote },
  { id: "random", label: "Random", hotkey: "6", icon: Shuffle },
]

export default function NavOrb() {
  const { open, setOpen } = useMenu()
  const { open: openSection, active } = useSectionReveal()
  // Initialize to a deterministic value to avoid SSR/CSR mismatch; compute real value on mount
  const [radius, setRadius] = useState<number>(220)

  // Keyboard: toggle and hotkeys
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "g") setOpen((o) => !o)
      if (open) {
        if (e.key === "Escape") {
          e.preventDefault()
          setOpen(false)
          return
        }
        const hit = LINKS.find((l) => l.hotkey === e.key)
        if (hit) {
          e.preventDefault()
          go(hit.id)
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, setOpen])

  // Recalculate radius on mount and on resize for better spacing/alignment
  useEffect(() => {
    const onResize = () => setRadius(calcRadius())
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  function go(id: string) {
    openSection(id)
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
      }
    })
    setOpen(false)
  }

  const positions = useMemo(() => {
    // Widen arc slightly to add spacing between neighboring items
    const startDeg = -25
    const endDeg = -155
    // Push items outward so their inner edges align with the arc stroke
    const itemOffsetPx = 16
    const effectiveRadius = radius + itemOffsetPx
    return [...LINKS].reverse().map((_, idx) => {
      const t = LINKS.length === 1 ? 0 : idx / (LINKS.length - 1)
      const deg = startDeg + t * (endDeg - startDeg)
      const rad = (deg * Math.PI) / 180
      return { x: Math.cos(rad) * effectiveRadius, y: Math.sin(rad) * effectiveRadius }
    })
  }, [radius])

  const svgW = radius * 2 + 60
  const svgH = radius + 60
  const viewBox = `${-radius} ${-radius} ${radius * 2} ${radius}`

  // For desktop, we want About at the left end of the arc, so render links in reverse order
  const renderLinks = useMemo(() => [...LINKS].reverse(), [])

  return (
    <nav
      aria-label="Floating menu"
      className="pointer-events-none fixed left-1/2 z-[90] -translate-x-1/2 flex items-end justify-center"
      style={{ bottom: "max(16px, env(safe-area-inset-bottom))" }}
    >
      {/* Overlay removed; handled globally by MenuBackdrop */}

      <div className="relative pointer-events-auto group">
        {/* Decorative arc (desktop) - simplified stroke */}
        <svg
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-[calc(50%+2px)] md:block transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
          width={svgW}
          height={svgH}
          viewBox={viewBox}
          fill="none"
        >
          <path
            d={`M ${-radius} 0 A ${radius} ${radius} 0 0 1 ${radius} 0`}
            stroke="currentColor"
            className="text-foreground/10"
            strokeWidth="1"
          />
        </svg>

        {/* Desktop arc items (minimal style) */}
        <ul
          aria-hidden={!open}
          className={cn(
            "absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
        >
          {renderLinks.map((l, i) => {
            const pos = positions[i]
            const Icon = l.icon
            const isActive = active === l.id
            return (
              <li
                key={l.id}
                style={{
                  transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 50%))`,
                }}
                className="absolute"
              >
                <button
                  onClick={() => go(l.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2",
                    "border-foreground/10 bg-background/80 text-foreground focus-visible:ring-[var(--accent)]",
                    isActive ? "border-[var(--accent)]" : "hover:border-[var(--accent)]"
                  )}
                  aria-label={`${l.label} (press ${l.hotkey})`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="rounded bg-foreground/5 px-1.5 py-0.5 text-[10px] text-foreground/60">{l.hotkey}</span>
                  <Icon className="h-4 w-4" />
                  <span>{l.label}</span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* Mobile list (persistent orb; list only when open) */}
        <div
          className={cn(
            "fixed left-1/2 w-[min(92vw,440px)] -translate-x-1/2 rounded-xl border border-foreground/10 bg-background/90 p-2 shadow-lg backdrop-blur md:hidden",
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          style={{ bottom: 'calc(max(16px, env(safe-area-inset-bottom)) + 64px)' }}
          role="menu"
          aria-label="Sections"
        >
          <div className="grid grid-cols-2 gap-1.5">
            {LINKS.map((l) => {
              const Icon = l.icon
              const isActive = active === l.id
              return (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2",
                    "border-foreground/10 bg-background text-foreground/90 focus-visible:ring-[var(--accent)]",
                    isActive ? "border-[var(--accent)]" : "hover:border-[var(--accent)]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="rounded bg-foreground/5 px-1.5 py-0.5 text-[10px] text-foreground/60">{l.hotkey}</span>
                  <Icon className="h-4 w-4" />
                  <span className="truncate">{l.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Orb */}
        <button
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "peer relative inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full border border-foreground/15 bg-background/80 text-foreground shadow-lg ring-0 backdrop-blur transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] hover:ring-1 hover:ring-[var(--accent)] cursor-pointer",
            open && "scale-105"
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-70 md:opacity-90 blur-md md:animate-pulse motion-reduce:animate-none"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 50%, transparent) 0%, transparent 80%)",
            }}
          />
          <span className="text-xs font-medium">Menu</span>
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>

        {/* Desktop tooltip on hover/focus */}
        <div
          className={cn(
            "pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 md:block opacity-0 transition-opacity duration-200",
            "peer-hover:opacity-100 peer-focus-visible:opacity-100"
          )}
          aria-hidden="true"
        >
          <span className="rounded-full border border-foreground/10 bg-background/80 px-3 py-1 text-xs text-foreground/70 shadow-sm backdrop-blur">
            Menu · press “g”
          </span>
        </div>

        {/* Hint */}
        <div className="mt-2 hidden justify-center md:flex" aria-hidden>
          <span className="rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-xs text-foreground/60 backdrop-blur">
            Press “g” · 1–6
          </span>
        </div>
      </div>
    </nav>
  )
}

function calcRadius() {
  if (typeof window === "undefined") return 220
  // Responsive radius to avoid overlap: scales with viewport width
  const vw = window.innerWidth
  const r = vw * 0.28 // 28% of viewport width
  return Math.max(180, Math.min(320, Math.round(r)))
}
