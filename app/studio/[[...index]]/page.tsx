"use client"

import { NextStudio } from "next-sanity/studio"
import config from "../../../sanity.config"

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) {
    return (
      <main className="mx-auto max-w-xl px-4 py-12">
        <h1 className="text-2xl font-semibold tracking-tight">Sanity Studio</h1>
        <p className="mt-2 text-sm text-foreground/70">
          Missing <code>SANITY_PROJECT_ID</code>. Add it to your environment and restart the dev
          server.
        </p>
      </main>
    )
  }
  return <NextStudio config={config} />
}
