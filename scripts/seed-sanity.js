// Node.js script to seed initial Sanity content (ESM JavaScript)
// How to run in v0: open this file in the Scripts panel and click "Run".
// Required env vars: SANITY_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID), SANITY_DATASET, SANITY_API_WRITE_TOKEN

import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'

// Lightweight .env loader so you can keep values in .env.local without extra deps
function loadEnvFile(filename) {
  const filePath = path.resolve(process.cwd(), filename)
  if (!fs.existsSync(filePath)) return
  const raw = fs.readFileSync(filePath, 'utf8')
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

// Load from common env files if present
loadEnvFile('.env.local')
loadEnvFile('.env')

const PROJECT_ID =
  process.env.SANITY_PROJECT_ID ||
  process.env.SANITY_API_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  ''
const DATASET =
  process.env.SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  process.env.SANITY_API_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production'
const TOKEN =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_WRITE_TOKEN ||
  ''

if (!PROJECT_ID || !DATASET) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_DATASET environment variables.')
  process.exit(1)
}
if (!TOKEN) {
  console.error('Missing a write token. Please set SANITY_API_WRITE_TOKEN with write permissions.')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2025-05-01',
  token: TOKEN,
  useCdn: false,
})

async function main() {
  console.log('Seeding Sanity content...')
  const ops = []

  // Settings (singleton-like)
  ops.push(
    client.createIfNotExists({
      _id: 'settings.site',
      _type: 'settings',
      name: 'Your Name',
      role: 'Self‑taught Software Developer',
      current: 'System Administrator',
      location: 'City, Country',
      email: 'you@domain.com',
      availability: 'open',
      socials: [
        { label: 'GitHub', href: 'https://github.com/yourhandle' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yourhandle' },
        { label: 'X / Twitter', href: 'https://x.com/yourhandle' },
      ],
      tagline:
        'I automate the boring stuff, craft calm UIs, and love turning messy systems into reliable tools.',
      about:
        'I’m a self‑taught developer with a systems mindset. By day I wrangle servers and networks; by night I build clean, human‑centered apps.',
      values: [
        { title: 'Self‑taught and relentless', detail: 'I learn in public, ship small, iterate fast, and share the journey.' },
        { title: 'Systems thinking', detail: 'I connect dots between infrastructure, product, and people to keep things simple and resilient.' },
        { title: 'Calm craft', detail: 'Minimalist by default. Intentional typography, subtle motion, and just enough color.' },
      ],
      accent: '#7CFF6B',
      footballTeam: 'Your Favorite Club',
      // teamBadge is an image; upload via Studio later
    })
  )

  // Projects
  ops.push(
    client.createIfNotExists({
      _id: 'project.uptime-whisper',
      _type: 'project',
      title: 'Uptime Whisper',
      slug: { _type: 'slug', current: 'uptime-whisper' },
      year: '2025',
      description:
        'Tiny status dashboard with incident journaling. Built to keep teams honest and calm under pressure.',
      role: 'Designer‑Developer',
      tags: ['Next.js', 'TypeScript', 'Cron', 'Tailwind'],
      highlights: [
        'Incident timeline with plain‑language journal',
        'Cron heartbeat monitoring; zero third‑party lock‑in',
        'Accessible charts and reduced‑motion animations',
      ],
      problem: 'Teams lacked a calm, truthful source of uptime truth.',
      solution: 'Designed a minimalist dashboard with journaling and health signals.',
      outcome: 'Reduced time‑to‑context during incidents by ~30% in tests.',
      order: 1,
    }),
    client.createIfNotExists({
      _id: 'project.workbench',
      _type: 'project',
      title: 'Workbench',
      slug: { _type: 'slug', current: 'workbench' },
      year: '2024',
      description:
        'A personal UI starter—accessible components, motion primitives, and tasteful defaults.',
      role: 'Creator',
      tags: ['Design System', 'shadcn/ui', 'Framer Motion'],
      highlights: [
        'Baseline grid + spacing scale baked in',
        'Keyboard‑first interactions with robust focus states',
      ],
      order: 2,
    })
  )

  // Experience
  ops.push(
    // Work Experience (most recent first)
    client.createIfNotExists({
      _id: 'experience.artefactual-2024',
      _type: 'experience',
      title: 'Deployment & Tech Support Engineer',
      org: 'Artefactual Systems, Surrey, BC',
      period: 'May 2024 – Present',
      blurb:
        'Automated SaaS and Linux deployments with Ansible and Bash (−40% manual work). Deployed and maintained customer instances across AWS, OVH, and Azure. Built Grafana dashboards and performance metrics for proactive incident response. Resolved escalations and trained support teams (−30% resolution time).',
      order: 1,
    }),
    client.createIfNotExists({
      _id: 'experience.peacegeeks-2023',
      _type: 'experience',
      title: 'Software Developer (Volunteer)',
      org: 'Peace Geeks, Vancouver, BC',
      period: 'May 2023 – July 2023',
      blurb:
        'Collaborated across functions to enhance the Welcome to Canada mobile app with TypeScript and React Native. Translated stakeholder feedback into actionable updates. Resolved bugs and optimized performance to improve user satisfaction.',
      order: 2,
    }),
    client.createIfNotExists({
      _id: 'experience.traders-eco-2021-2022',
      _type: 'experience',
      title: 'Front‑End Engineer',
      org: 'Traders Eco, Vancouver, BC',
      period: 'Nov 2021 – Nov 2022',
      blurb:
        'Led development of the Bagley Tools web app and maintained CI/CD pipelines on AWS Amplify. Increased test coverage by ~50% with Jest and improved email templates and UI, boosting user interaction by ~10%.',
      order: 3,
    }),
    client.createIfNotExists({
      _id: 'experience.upwork-2021',
      _type: 'experience',
      title: 'Independent Developer',
      org: 'Upwork (Remote)',
      period: 'Apr 2021 – Nov 2021',
      blurb:
        'Developed and deployed custom websites for startups, improving online visibility and sales (~10%). Built a Python/Django security system for the Nigerian Airforce Base, increasing resident data coverage to ~90%.',
      order: 4,
    }),
    client.createIfNotExists({
      _id: 'experience.nda-2019-2020',
      _type: 'experience',
      title: 'IT Support Technician',
      org: 'Nigerian Defense Academy, Nigeria',
      period: 'Feb 2019 – Feb 2020',
      blurb:
        'Provided first‑line technical support for faculty, troubleshooting and resolving issues promptly. Implemented hardware and software configurations, improved operational efficiency, and created technical documentation with staff training.',
      order: 5,
    }),
    // Education
    client.createIfNotExists({
      _id: 'experience.douglas-college-2025',
      _type: 'experience',
      title: 'Post‑Degree Diploma: Emerging Tech — Computing and Information Systems',
      org: 'Douglas College, New Westminster',
      period: '2025*',
      blurb: 'Post‑Degree Diploma program focused on emerging technologies within computing and information systems.',
      order: 6,
    }),
    client.createIfNotExists({
      _id: 'experience.futminna-2018',
      _type: 'experience',
      title: 'Bachelor of Technology: Remote Sensing (Geography)',
      org: 'Federal University of Technology, Niger, Nigeria',
      period: '2018',
      blurb: 'B.Tech with concentration in Remote Sensing (Geography).',
      order: 7,
    })
  )

  // Notes
  ops.push(
    client.createIfNotExists({
      _id: 'note.cron-health-2025-07-12',
      _type: 'note',
      title: 'Cron health with heartbeats',
      content:
        'Swapped blind cron jobs for heartbeat‑checked runners. If a job misses its window, pager goes. Fewer silent failures; easier post‑mortems.',
      date: '2025-07-12',
      tags: ['ops', 'reliability'],
    }),
    client.createIfNotExists({
      _id: 'note.type-safe-actions-2025-06-30',
      _type: 'note',
      title: 'Type‑safe server actions',
      content:
        'Using zod + action patterns to validate inputs at the boundary. Small ergonomic cost, huge reduction in edge bugs.',
      date: '2025-06-30',
      tags: ['typescript', 'nextjs'],
    })
  )

  // Quotes
  ops.push(
    client.createIfNotExists({
      _id: 'quote.simplicity-reliability',
      _type: 'quote',
      text: 'Simplicity is a prerequisite for reliability.',
      author: 'Edsger W. Dijkstra',
    }),
    client.createIfNotExists({
      _id: 'quote.learn-by-writing',
      _type: 'quote',
      text: 'The only way to learn a new programming language is by writing programs in it.',
      author: 'Dennis Ritchie',
    })
  )

  // Favorites (books, music, shows)
  ops.push(
    client.createIfNotExists({
      _id: 'book.pragmatic-programmer',
      _type: 'book',
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt, David Thomas',
    }),
    client.createIfNotExists({
      _id: 'music.odesza-moment-apart',
      _type: 'music',
      artist: 'ODESZA',
      track: 'A Moment Apart',
    }),
    client.createIfNotExists({
      _id: 'show.arrival-2016',
      _type: 'show',
      title: 'Arrival',
      year: '2016',
    })
  )

  const results = await Promise.allSettled(ops)
  const summary = results.reduce(
    (acc, r) => {
      if (r.status === 'fulfilled') acc.created += 1
      else {
        acc.failed += 1
        acc.errors.push(r.reason)
      }
      return acc
    },
    { created: 0, failed: 0, errors: [] }
  )

  console.log('Seed complete:', summary)
  if (summary.failed > 0) {
    console.error('Some items failed to seed:', summary.errors)
    process.exit(2)
  } else {
    console.log('You can now open /studio and publish or edit your content.')
  }
}

main().catch((err) => {
  console.error('Seeding error:', err)
  process.exit(1)
})
