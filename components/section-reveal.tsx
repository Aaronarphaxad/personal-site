"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

type SectionRevealState = {
  active: string
  open: (id: string) => void
}

const SectionRevealContext = createContext<SectionRevealState | null>(null)

export function SectionRevealProvider({ children }: { children: React.ReactNode }) {
  // Hydration-safe default; update from URL hash after mount
  const [active, setActive] = useState<string>("about")

  // Update active and URL hash without triggering a jump
  const open = useCallback((id: string) => {
    setActive(id)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.hash = id
      window.history.pushState({}, "", url.toString())
    }
  }, [])

  // Listen to browser back/forward and manual hash changes
  useEffect(() => {
    function applyHash() {
      const id = window.location.hash?.replace("#", "")
      if (id) setActive(id)
    }
    function onPop() {
      applyHash()
    }
    function onHashChange() {
      applyHash()
    }
    // Initialize from current hash once to avoid SSR/CSR mismatch
    applyHash()
    window.addEventListener("popstate", onPop)
    window.addEventListener("hashchange", onHashChange)
    return () => {
      window.removeEventListener("popstate", onPop)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [])

  const value = useMemo(() => ({ active, open }), [active, open])

  return (
    <SectionRevealContext.Provider value={value}>
      {children}
    </SectionRevealContext.Provider>
  )
}

export function useSectionReveal() {
  const ctx = useContext(SectionRevealContext)
  if (!ctx) throw new Error("useSectionReveal must be used within SectionRevealProvider")
  return ctx
}

type SectionProps = {
  id: string
  children: React.ReactNode
}

/**
 * Section wrapper:
 * - Hidden until active
 * - When activated, moves keyboard focus to the first heading for accessibility
 */
export function Section({ id, children }: SectionProps) {
  const { active } = useSectionReveal()
  const isActive = active === id
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return
    // Focus first h2/h1 for better accessibility, else focus the container
    const heading = ref.current?.querySelector("h2, h1") as HTMLElement | null
    const focusTarget = heading ?? ref.current
    if (focusTarget) {
      if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1")
      focusTarget.focus({ preventScroll: true })
    }
  }, [isActive])

  return (
    <div
      id={id}
      ref={ref}
      aria-hidden={!isActive}
      hidden={!isActive}
    >
      {children}
    </div>
  )
}
