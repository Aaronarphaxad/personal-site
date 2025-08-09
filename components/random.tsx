import { profile as defaultProfile } from "@/lib/profile"
import Link from "next/link"

export default function RandomStuff({
  profile = defaultProfile,
}: {
  profile?: typeof defaultProfile
}) {
  const { random, footballTeam } = profile
  return (
    <section id="random" aria-labelledby="random-title" className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 id="random-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Random stuff I love
          </h2>
          <span className="text-xs text-foreground/60">Signal over noise</span>
        </div>

        {/* Football */}
        <div className="mt-6 rounded-xl border border-foreground/10 p-5">
          <div className="flex items-center gap-3">
            <img
              src={random.teamBadge ?? "/placeholder.svg?height=64&width=64&query=football%20crest"}
              alt="Football club crest"
              className="h-10 w-10 rounded-md border border-foreground/10 object-cover"
            />
            <div>
              <div className="text-sm text-foreground/60">Favorite team</div>
              <div className="text-sm font-medium">{footballTeam}</div>
            </div>
          </div>
        </div>

        {/* Books */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-foreground/80">Books</h3>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {random.books.map((b) => (
              <li key={b.title} className="flex gap-3 rounded-xl border border-foreground/10 p-3">
                <img
                  src={b.cover ?? "/placeholder.svg?height=96&width=72&query=book%20cover"}
                  alt={`${b.title} cover`}
                  className="h-24 w-18 shrink-0 rounded border border-foreground/10 object-cover"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{b.title}</div>
                  <div className="text-xs text-foreground/60">{b.author}</div>
                  {b.link ? (
                    <Link href={b.link} className="mt-1 inline-block text-xs text-[var(--accent)]">
                      Details
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Music */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-foreground/80">Music</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {random.music.map((m) => (
              <li key={m.artist + m.track} className="flex items-center gap-3 rounded-xl border border-foreground/10 p-3">
                <img
                  src={m.art ?? "/placeholder.svg?height=64&width=64&query=album%20art"}
                  alt="Album art"
                  className="h-12 w-12 rounded border border-foreground/10 object-cover"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{m.track}</div>
                  <div className="truncate text-xs text-foreground/60">{m.artist}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Shows / Movies */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-foreground/80">Shows & movies</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {random.shows.map((s) => (
              <li key={s.title} className="rounded-md border border-foreground/10 px-3 py-2 text-sm">
                {s.title}
                {s.year ? <span className="text-foreground/60"> · {s.year}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
