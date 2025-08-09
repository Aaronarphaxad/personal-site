"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function SeedPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<null | { ok: boolean; summary: any; error?: string }>(null)

  async function run() {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/seed", { method: "POST" })
      const data = await res.json()
      setResult(data)
    } catch (e: any) {
      setResult({ ok: false, summary: null, error: e?.message || "Unknown error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Seed Sanity content</h1>
      <p className="mt-2 text-sm text-foreground/70">
        This will create initial Settings, Projects, Experience, Notes, Quotes, and Favorites
        if they don’t already exist.
      </p>
      <div className="mt-6">
        <Button onClick={run} disabled={loading}>
          {loading ? "Seeding..." : "Run seeder"}
        </Button>
      </div>
      {result ? (
        <div className="mt-6 rounded-lg border border-foreground/10 p-4 text-sm">
          {result.ok ? (
            <p className="text-green-600">Seed complete.</p>
          ) : (
            <p className="text-red-600">Seed finished with some errors.</p>
          )}
          <pre className="mt-3 overflow-auto rounded bg-foreground/5 p-3">
{JSON.stringify(result, null, 2)}
          </pre>
        </div>
      ) : null}
      <p className="mt-6 text-xs text-foreground/60">
        Tip: ensure SANITY_PROJECT_ID, SANITY_DATASET, and SANITY_API_WRITE_TOKEN are set.
      </p>
    </main>
  )
}
