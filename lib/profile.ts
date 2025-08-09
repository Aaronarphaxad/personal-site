export type Project = {
  title: string
  description: string
  href: string
  year: string
  tags: string[]
  image?: string
  role?: string
  highlights?: string[]
  problem?: string
  solution?: string
  outcome?: string
}

export type Experience = {
  title: string
  org?: string
  period: string
  blurb: string
}

export type Note = {
  title: string
  content: string
  date: string
  tags: string[]
}

export type Quote = {
  text: string
  author: string
}

export type Book = {
  title: string
  author: string
  cover?: string
  link?: string
}

export type Music = {
  artist: string
  track: string
  art?: string
}

export type Show = {
  title: string
  year?: string
}

export type RandomStuff = {
  books: Book[]
  music: Music[]
  shows: Show[]
  teamBadge?: string
}

export type Profile = {
  name: string
  role: string
  current: string
  location: string
  email: string
  socials: { label: string; href: string }[]
  values: { title: string; detail: string }[]
  experience: Experience[]
  projects: Project[]
  stack: string[] // kept for future use
  tagline: string
  about: string
  availability: "open" | "selective" | "closed"
  notes: Note[]
  quotes: Quote[]
  footballTeam: string
  random: RandomStuff
}

export const profile: Profile = {
  name: "Your Name",
  role: "Self‑taught Software Developer",
  current: "System Administrator",
  location: "City, Country",
  email: "you@domain.com",
  tagline:
    "I automate the boring stuff, craft calm UIs, and love turning messy systems into reliable tools.",
  about:
    "I’m a self‑taught developer with a systems mindset. By day I wrangle servers and networks; by night I build clean, human‑centered apps. I value curiosity, consistency, and the tiny details that make software feel delightful.",
  availability: "open",
  socials: [
    { label: "GitHub", href: "https://github.com/yourhandle" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yourhandle" },
    { label: "X / Twitter", href: "https://x.com/yourhandle" },
  ],
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
  experience: [
    {
      title: "System Administrator",
      org: "Current Role",
      period: "2023 — Present",
      blurb:
        "Keeping services reliable, automating deployments, and closing the loop between incidents and improvements.",
    },
    {
      title: "Freelance / Side Projects",
      period: "2021 — Present",
      blurb:
        "Built tools and micro‑services for small teams. Focus on Next.js, TypeScript, and automation scripts.",
    },
    {
      title: "The spark",
      period: "Earlier",
      blurb:
        "Got hooked by scripting away repetitive tasks. I’ve been building practical software ever since.",
    },
  ],
  projects: [
    {
      title: "Uptime Whisper",
      description:
        "Tiny status dashboard with incident journaling. Built to keep teams honest and calm under pressure.",
      href: "#",
      year: "2025",
      tags: ["Next.js", "TypeScript", "Cron", "Tailwind"],
      image: "/placeholder.svg?height=640&width=960",
      role: "Designer‑Developer",
      highlights: [
        "Incident timeline with plain‑language journal",
        "Cron heartbeat monitoring; zero third‑party lock‑in",
        "Accessible charts and reduced‑motion animations",
      ],
      problem: "Teams lacked a calm, truthful source of uptime truth.",
      solution: "Designed a minimalist dashboard with journaling and health signals.",
      outcome: "Reduced time‑to‑context during incidents by ~30% in tests.",
    },
    {
      title: "Dotfiles, but Friendly",
      description:
        "Opinionated dotfiles with a one‑command bootstrap. Reproducible, documented, and reversible.",
      href: "#",
      year: "2024",
      tags: ["Shell", "Neovim", "zsh", "Automation"],
      image: "/placeholder.svg?height=640&width=960",
      role: "Author",
      highlights: [
        "Idempotent setup script; safe rollback",
        "Readable docs and annotated configs",
      ],
      problem: "Onboarding new machines was fragile and slow.",
      solution: "Created a reproducible environment with clear docs.",
      outcome: "Cut setup time from hours to minutes.",
    },
    {
      title: "Workbench",
      description:
        "A personal UI starter—accessible components, motion primitives, and tasteful defaults.",
      href: "#",
      year: "2024",
      tags: ["Design System", "shadcn/ui", "Framer Motion"],
      image: "/placeholder.svg?height=640&width=960",
      role: "Creator",
      highlights: [
        "Baseline grid + spacing scale baked in",
        "Keyboard‑first interactions with robust focus states",
      ],
    },
  ],
  stack: ["TypeScript", "Next.js", "Node.js", "Tailwind", "Docker", "Bash", "Linux", "Git"],
  notes: [
    {
      title: "Cron health with heartbeats",
      content:
        "Swapped blind cron jobs for heartbeat‑checked runners. If a job misses its window, pager goes. Fewer silent failures; easier post‑mortems.",
      date: "2025‑07‑12",
      tags: ["ops", "reliability"],
    },
    {
      title: "Type‑safe server actions",
      content:
        "Using zod + action patterns to validate inputs at the boundary. Small ergonomic cost, huge reduction in edge bugs.",
      date: "2025‑06‑30",
      tags: ["typescript", "nextjs"],
    },
    {
      title: "Calm UIs > flashy UIs",
      content:
        "Trimmed animations, boosted contrast, more whitespace. Users move faster; support tickets dropped.",
      date: "2025‑06‑05",
      tags: ["design"],
    },
  ],
  quotes: [
    {
      text: "Simplicity is a prerequisite for reliability.",
      author: "Edsger W. Dijkstra",
    },
    {
      text: "Amateurs talk strategy; professionals talk logistics.",
      author: "Unknown",
    },
    {
      text: "The only way to learn a new programming language is by writing programs in it.",
      author: "Dennis Ritchie",
    },
  ],
  footballTeam: "Your Favorite Club",
  random: {
    teamBadge: "/placeholder.svg?height=64&width=64",
    books: [
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt, David Thomas",
        cover: "/placeholder.svg?height=128&width=96",
        link: "https://example.com",
      },
      {
        title: "Designing Data‑Intensive Applications",
        author: "Martin Kleppmann",
        cover: "/placeholder.svg?height=128&width=96",
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        cover: "/placeholder.svg?height=128&width=96",
      },
    ],
    music: [
      {
        artist: "ODESZA",
        track: "A Moment Apart",
        art: "/placeholder.svg?height=96&width=96",
      },
      {
        artist: "Hans Zimmer",
        track: "Time",
        art: "/placeholder.svg?height=96&width=96",
      },
      {
        artist: "Disclosure",
        track: "Latch",
        art: "/placeholder.svg?height=96&width=96",
      },
    ],
    shows: [
      { title: "Mr. Robot", year: "2015" },
      { title: "The Bear", year: "2022" },
      { title: "Arrival", year: "2016" },
    ],
  },
}
