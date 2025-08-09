"use client"

import * as React from "react"
import { profile as defaultProfile } from "@/lib/profile"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn, slugify } from "@/lib/utils"

export default function Notes({ profile = defaultProfile }: { profile?: typeof defaultProfile }) {
  const [query, setQuery] = React.useState("")
  const [selected, setSelected] = React.useState<string | undefined>(undefined)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return profile.notes
    return profile.notes.filter((n) => {
      const inTitle = n.title.toLowerCase().includes(q)
      const inContent = n.content.toLowerCase().includes(q)
      const inTags = n.tags.some((t) => t.toLowerCase().includes(q))
      return inTitle || inContent || inTags
    })
  }, [profile.notes, query])

  React.useEffect(() => {
    // Keep selection valid whenever the list changes
    if (!selected || !filtered.some((n) => slugify(n.title) === selected)) {
      setSelected(filtered.length > 0 ? slugify(filtered[0].title) : undefined)
    }
  }, [filtered, selected])

  const selectedNote = filtered.find((n) => slugify(n.title) === selected)

  return (
    <section id="notes" aria-labelledby="notes-title" className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="notes-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Notes
        </h2>
        <p className="mt-2 text-foreground/70">
          Scratchpad of what I’m learning or thinking about. Lightweight and honest.
        </p>

        <div className="mt-4 max-w-xl">
          <label htmlFor="notes-search" className="sr-only">
            Search notes
          </label>
          <Input
            id="notes-search"
            placeholder="Search notes (title, content, tags)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className={cn("space-y-2", selected ? "hidden md:block" : "block")} aria-label="Notes list">
            <div className="-mx-2 flex flex-col">
              {filtered.map((n) => {
                const slug = slugify(n.title)
                const isActive = slug === selected
                return (
                  <button
                    key={slug}
                    onClick={() => setSelected(slug)}
                    className={cn(
                      "mx-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                      "hover:bg-foreground/5",
                      isActive ? "bg-foreground/10" : "bg-transparent"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-medium">{n.title}</span>
                      <time className="shrink-0 text-xs text-foreground/60">{n.date}</time>
                    </div>
                  </button>
                )
              })}
              {filtered.length === 0 && (
                <div className="mx-2 rounded-md border border-foreground/10 px-3 py-2 text-sm text-foreground/60">
                  No results.
                </div>
              )}
            </div>
          </aside>

          {/* Detail */}
          <div>
            {/* Mobile note picker */}
            {filtered.length > 0 && (
              <div className="mb-3 md:hidden">
                <label htmlFor="notes-picker" className="sr-only">
                  Choose note
                </label>
                <Select value={selected} onValueChange={setSelected}>
                  <SelectTrigger id="notes-picker" className="w-full">
                    <SelectValue placeholder="Choose a note" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {filtered.map((n) => {
                      const slug = slugify(n.title)
                      return (
                        <SelectItem key={slug} value={slug}>
                          {n.title}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            )}
            {selectedNote ? (
              <article className="relative rounded-xl border border-foreground/10 p-5 sm:p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-2xl"
                  style={{
                    background: "radial-gradient(600px 120px at 20% 0%, var(--accent) 0%, transparent 60%)",
                  }}
                />
                <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{selectedNote.title}</h3>
                  <div className="flex items-center gap-3">
                    <time className="text-xs text-foreground/60">{selectedNote.date}</time>
                    <div className="hidden flex-wrap gap-1.5 sm:flex">
                      {selectedNote.tags.map((t) => (
                        <Badge key={t} variant="outline" className="border-foreground/15 text-foreground/60">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </header>
                <div className="mt-4 sm:mt-6">{renderParagraphs(selectedNote.content)}</div>
                {selectedNote.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-1.5 sm:hidden">
                    {selectedNote.tags.map((t) => (
                      <Badge key={t} variant="outline" className="border-foreground/15 text-foreground/60">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </article>
            ) : (
              <div className="rounded-xl border border-foreground/10 p-6 text-sm text-foreground/70">No notes yet.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function renderParagraphs(text: string) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return paragraphs.map((p, idx) => (
    <p key={idx} className="mb-4 leading-7 text-foreground/80">
      {renderLineBreaks(p)}
    </p>
  ))
}

function renderLineBreaks(text: string) {
  const parts = text.split(/\n/g)
  return parts.map((line, i) => (
    <span key={i}>
      {line}
      {i < parts.length - 1 ? <br /> : null}
    </span>
  ))
}
