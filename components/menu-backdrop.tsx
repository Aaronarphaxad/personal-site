"use client"

import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { useMenu } from "./menu-state"

export default function MenuBackdrop() {
  const { open, setOpen } = useMenu()

  // Close on Escape at the global level too
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [setOpen])

  return (
    <button
      aria-hidden={!open}
      tabIndex={-1}
      className={cn(
        "fixed inset-0 z-[80] transition-opacity",
        "bg-background/20 backdrop-blur-sm",
        open ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      onClick={() => setOpen(false)}
    />
  )
}

