import { profile as defaultProfile } from "@/lib/profile"

export default function Experience({
  profile = defaultProfile,
}: {
  profile?: typeof defaultProfile
}) {
  return (
    <section id="experience" aria-labelledby="exp-title" className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="exp-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Path so far
        </h2>
        <ol className="mt-6 grid gap-6">
          {profile.experience.map((e, idx) => (
            <li key={idx} className="relative pl-6">
              <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
              <div className="rounded-lg border border-foreground/10 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-medium">
                    {e.title}
                    {e.org ? <span className="text-foreground/50"> · {e.org}</span> : null}
                  </div>
                  <div className="text-xs text-foreground/60">{e.period}</div>
                </div>
                <p className="mt-2 text-sm text-foreground/70">{e.blurb}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
