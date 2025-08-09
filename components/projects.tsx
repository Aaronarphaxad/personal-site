"use client"

import Link from "next/link"
import { profile as defaultProfile, type Project } from "@/lib/profile"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import CaseStudyDialog from "./case-study-dialog"

export default function Projects({
  profile = defaultProfile,
}: {
  profile?: typeof defaultProfile
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)

  function openCase(p: Project) {
    setSelected(p)
    setOpen(true)
  }

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="projects-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Selected work
          </h2>
          <span className="text-xs text-foreground/60">Case studies</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {profile.projects.map((p) => (
            <button
              key={p.title}
              onClick={() => openCase(p)}
              className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                <img
                  src={p.image ?? "/placeholder.svg?height=640&width=960&query=Minimal%20project%20cover"}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity motion-safe:group-hover:opacity-20"
                  style={{
                    background:
                      "radial-gradient(600px 160px at 20% 0%, var(--accent) 0%, transparent 60%)",
                  }}
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">{p.title}</h3>
                  <span className="text-xs text-foreground/60">{p.year}</span>
                </div>
                <p className="line-clamp-3 text-sm text-foreground/70">
                  {p.description}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-foreground/60">
                  {p.role ? <span className="rounded border border-foreground/10 px-2 py-1">{p.role}</span> : null}
                  {p.tags.slice(0, 3).map((t) => (
                    <Badge key={t} variant="outline" className="border-foreground/15 text-foreground/60">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Optional external link list for full archive */}
        {profile.projects.length > 0 && (
          <div className="mt-6 text-sm text-foreground/60">
            Prefer deep dives? Open any card. For a quick skim,{" "}
            <Link href="#notes" className="text-[var(--accent)] underline-offset-4 hover:underline">
              read recent notes
            </Link>
            .
          </div>
        )}
      </div>

      <CaseStudyDialog project={selected} open={open} onOpenChange={setOpen} />
    </section>
  )
}
