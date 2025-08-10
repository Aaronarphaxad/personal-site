import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"

function env(name: string) {
  return (
    process.env[name] ||
    // provide a few sane fallbacks for different env var names
    (name === "SANITY_API_WRITE_TOKEN" ? process.env.SANITY_WRITE_TOKEN : undefined)
  )
}

export async function POST() {
  const projectId =
    process.env.SANITY_PROJECT_ID ||
    process.env.SANITY_API_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset =
    process.env.SANITY_DATASET ||
    process.env.SANITY_API_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    "production"
  const token = env("SANITY_API_WRITE_TOKEN")

  if (!projectId || !dataset) {
    return NextResponse.json(
      { ok: false, error: "Missing SANITY_PROJECT_ID or SANITY_DATASET" },
      { status: 400 }
    )
  }
  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Missing SANITY_API_WRITE_TOKEN (or SANITY_WRITE_TOKEN) with write permissions.",
      },
      { status: 400 }
    )
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2025-05-01",
    token,
    useCdn: false,
  })

  const ops: Array<Promise<any>> = []

  // Settings (singleton-like)
  ops.push(
    client.createIfNotExists({
      _id: "settings.site",
      _type: "settings",
      name: "Aaron Omale",
      role: "Self‑taught Software Developer",
      current: "System Administrator",
      location: "City, Country",
      email: "you@domain.com",
      availability: "open",
      socials: [
        { label: "GitHub", href: "https://github.com/yourhandle" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/yourhandle" },
        { label: "X / Twitter", href: "https://x.com/yourhandle" },
      ],
      tagline:
        "I automate the boring stuff, craft calm UIs, and love turning messy systems into reliable tools.",
      about:
        "I’m a self‑taught developer with a systems mindset. By day I wrangle servers and networks; by night I build clean, human‑centered apps.",
      values: [
        {
          title: "Self‑taught and relentless",
          detail:
            "I learn in public, ship small, iterate fast, and share the journey.",
        },
        {
          title: "Systems thinking",
          detail:
            "I connect dots between infrastructure, product, and people to keep things simple and resilient.",
        },
        {
          title: "Calm craft",
          detail:
            "Minimalist by default. Intentional typography, subtle motion, and just enough color.",
        },
      ],
      accent: "#7CFF6B",
      footballTeam: "Your Favorite Club",
    })
  )

  // Projects
  ops.push(
    client.createIfNotExists({
      _id: "project.uptime-whisper",
      _type: "project",
      title: "Uptime Whisper",
      slug: { _type: "slug", current: "uptime-whisper" },
      year: "2025",
      description:
        "Tiny status dashboard with incident journaling. Built to keep teams honest and calm under pressure.",
      role: "Designer‑Developer",
      tags: ["Next.js", "TypeScript", "Cron", "Tailwind"],
      highlights: [
        "Incident timeline with plain‑language journal",
        "Cron heartbeat monitoring; zero third‑party lock‑in",
        "Accessible charts and reduced‑motion animations",
      ],
      problem: "Teams lacked a calm, truthful source of uptime truth.",
      solution:
        "Designed a minimalist dashboard with journaling and health signals.",
      outcome: "Reduced time‑to‑context during incidents by ~30% in tests.",
      order: 1,
    }),
    client.createIfNotExists({
      _id: "project.workbench",
      _type: "project",
      title: "Workbench",
      slug: { _type: "slug", current: "workbench" },
      year: "2024",
      description:
        "A personal UI starter—accessible components, motion primitives, and tasteful defaults.",
      role: "Creator",
      tags: ["Design System", "shadcn/ui", "Framer Motion"],
      highlights: [
        "Baseline grid + spacing scale baked in",
        "Keyboard‑first interactions with robust focus states",
      ],
      order: 2,
    })
  )

  // Experience
  ops.push(
    client.createIfNotExists({
      _id: "experience.sysadmin-2023",
      _type: "experience",
      title: "System Administrator",
      org: "Current Role",
      period: "2023 — Present",
      blurb:
        "Keeping services reliable, automating deployments, and closing the loop between incidents and improvements.",
      order: 1,
    }),
    client.createIfNotExists({
      _id: "experience.freelance",
      _type: "experience",
      title: "Freelance / Side Projects",
      period: "2021 — Present",
      blurb:
        "Built tools and micro‑services for small teams. Focus on Next.js, TypeScript, and automation scripts.",
      order: 2,
    })
  )

  // Notes
  ops.push(
    client.createIfNotExists({
      _id: "note.cron-health-2025-07-12",
      _type: "note",
      title: "Cron health with heartbeats",
      content:
        "Swapped blind cron jobs for heartbeat‑checked runners. If a job misses its window, pager goes. Fewer silent failures; easier post‑mortems.",
      date: "2025-07-12",
      tags: ["ops", "reliability"],
    }),
    client.createIfNotExists({
      _id: "note.type-safe-actions-2025-06-30",
      _type: "note",
      title: "Type‑safe server actions",
      content:
        "Using zod + action patterns to validate inputs at the boundary. Small ergonomic cost, huge reduction in edge bugs.",
      date: "2025-06-30",
      tags: ["typescript", "nextjs"],
    })
  )

  // Quotes
  ops.push(
    client.createIfNotExists({
      _id: "quote.simplicity-reliability",
      _type: "quote",
      text: "Simplicity is a prerequisite for reliability.",
      author: "Edsger W. Dijkstra",
    }),
    client.createIfNotExists({
      _id: "quote.learn-by-writing",
      _type: "quote",
      text:
        "The only way to learn a new programming language is by writing programs in it.",
      author: "Dennis Ritchie",
    })
  )

  // Favorites
  ops.push(
    client.createIfNotExists({
      _id: "book.pragmatic-programmer",
      _type: "book",
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt, David Thomas",
    }),
    client.createIfNotExists({
      _id: "music.odesza-moment-apart",
      _type: "music",
      artist: "ODESZA",
      track: "A Moment Apart",
    }),
    client.createIfNotExists({
      _id: "show.arrival-2016",
      _type: "show",
      title: "Arrival",
      year: "2016",
    })
  )

  const results = await Promise.allSettled(ops)
  const summary = results.reduce(
    (acc, r) => {
      if (r.status === "fulfilled") acc.created += 1
      else {
        acc.failed += 1
        acc.errors.push(String((r as any).reason || "unknown error"))
      }
      return acc
    },
    { created: 0, failed: 0, errors: [] as string[] }
  )

  const status = summary.failed > 0 ? 207 /* Multi-Status */ : 200
  return NextResponse.json({ ok: summary.failed === 0, summary }, { status })
}
