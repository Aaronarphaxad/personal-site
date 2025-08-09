"use client"

import { createContext, useContext, useMemo, useState } from "react"

type MenuContextValue = {
  open: boolean
  setOpen: (next: boolean) => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const value = useMemo(() => ({ open, setOpen }), [open])
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export function useMenu(): MenuContextValue {
  const ctx = useContext(MenuContext)
  if (!ctx) throw new Error("useMenu must be used within MenuProvider")
  return ctx
}

