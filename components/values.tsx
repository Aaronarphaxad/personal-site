import { profile as defaultProfile } from "@/lib/profile"

export default function Values({
  profile = defaultProfile,
}: {
  profile?: typeof defaultProfile
}) {
  return (
    <section id="about" aria-labelledby="values-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <h2
            id="values-title"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            A bit about me
          </h2>
          <p className="mt-3 max-w-3xl text-pretty text-foreground/70">
            {profile.about}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {profile.values.map((v) => (
            <article
              key={v.title}
              className="group relative rounded-xl border border-foreground/10 p-4 transition-colors hover:border-[var(--accent)]"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-2xl transition-opacity group-hover:opacity-20"
                style={{
                  background:
                    "radial-gradient(400px 120px at 20% 0%, var(--accent) 0%, transparent 60%)",
                }}
              />
              <h3 className="text-base font-medium">{v.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{v.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
