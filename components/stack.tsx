import { profile as defaultProfile } from "@/lib/profile"

export default function Stack({
  profile = defaultProfile,
}: {
  profile?: typeof defaultProfile
}) {
  return (
    <section id="stack" aria-labelledby="stack-title" className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="stack-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Stack
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {profile.stack.map((s) => (
            <li
              key={s}
              className="rounded-md border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground/80"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
