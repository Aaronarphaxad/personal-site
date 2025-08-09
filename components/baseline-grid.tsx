"use client"

import { useEffect, useState } from "react"

// Toggle via keyboard "b" or call toggleBaselineGrid() from anywhere
export function toggleBaselineGrid() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("baseline-grid:toggle"))
  }
}

export default function BaselineGrid() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "b") setOn((v) => !v)
    }
    function onToggle() {
      setOn((v) => !v)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("baseline-grid:toggle", onToggle as EventListener)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("baseline-grid:toggle", onToggle as EventListener)
    }
  }, [])

  if (!on) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-multiply"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(127,127,127,0.18) 1px, transparent 1px), linear-gradient(to right, rgba(127,127,127,0.12) 1px, transparent 1px)",
        backgroundSize: "8px 8px, 64px 64px",
      }}
    />
  )
}
