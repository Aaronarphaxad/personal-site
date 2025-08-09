import { profile as defaultProfile } from "@/lib/profile"
import { Quote } from 'lucide-react'

export default function Philosophy({
  profile = defaultProfile,
}: {
  profile?: typeof defaultProfile
}) {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="philosophy-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Philosophy
        </h2>
        <p className="mt-2 text-foreground/70">
          Ideas that guide how I work and live.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {profile.quotes.map((q, idx) => (
            <figure
              key={idx}
              className="relative overflow-hidden rounded-xl border border-foreground/10 p-5"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-50 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at center, color-mix(in oklab, var(--accent) 40%, transparent) 0%, transparent 70%)",
                }}
              />
              <Quote className="mb-3 h-5 w-5 text-[var(--accent)]" />
              <blockquote className="text-pretty text-base text-foreground/80">
                {q.text}
              </blockquote>
              <figcaption className="mt-2 text-sm text-foreground/60">— {q.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
