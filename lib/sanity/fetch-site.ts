import { sanityClient, urlForImage } from "./client"
import { SANITY_PROJECT_ID } from "./env"
import { SETTINGS, PROJECTS, EXPERIENCE, NOTES, QUOTES, BOOKS, MUSIC, SHOWS } from "./queries"
import { profile as fallbackProfile, type Profile } from "@/lib/profile"

export async function fetchProfileFromSanity(): Promise<Profile | null> {
  if (!SANITY_PROJECT_ID) {
    return null
  }

  try {
    const [settings, projects, experience, notes, quotes, books, music, shows] = await Promise.all([
      sanityClient.fetch(SETTINGS),
      sanityClient.fetch(PROJECTS),
      sanityClient.fetch(EXPERIENCE),
      sanityClient.fetch(NOTES),
      sanityClient.fetch(QUOTES),
      sanityClient.fetch(BOOKS),
      sanityClient.fetch(MUSIC),
      sanityClient.fetch(SHOWS),
    ])

    const mapped: Profile = {
      name: settings?.name || fallbackProfile.name,
      role: settings?.role || fallbackProfile.role,
      current: settings?.current || fallbackProfile.current,
      location: settings?.location || fallbackProfile.location,
      email: settings?.email || fallbackProfile.email,
      availability: settings?.availability || fallbackProfile.availability,
      socials: settings?.socials || fallbackProfile.socials,
      tagline: settings?.tagline || fallbackProfile.tagline,
      about: settings?.about || fallbackProfile.about,
      values: settings?.values || fallbackProfile.values,
      experience: experience || fallbackProfile.experience,
      projects:
        (projects || []).map((p: any) => ({
          title: p.title,
          description: p.description,
          href: p.slug ? `/work/${p.slug}` : "#",
          year: p.year || "",
          tags: p.tags || [],
          image: p.image ? urlForImage(p.image) : undefined,
          role: p.role,
          highlights: p.highlights,
          problem: p.problem,
          solution: p.solution,
          outcome: p.outcome,
        })) || fallbackProfile.projects,
      stack: fallbackProfile.stack, // you can model this later if you want
      notes: notes || fallbackProfile.notes,
      quotes: quotes || fallbackProfile.quotes,
      footballTeam: settings?.footballTeam || fallbackProfile.footballTeam,
      random: {
        teamBadge: settings?.teamBadge ? urlForImage(settings.teamBadge) : fallbackProfile.random.teamBadge,
        books:
          (books || []).map((b: any) => ({
            title: b.title,
            author: b.author,
            cover: b.cover ? urlForImage(b.cover) : undefined,
            link: b.link,
          })) || fallbackProfile.random.books,
        music:
          (music || []).map((m: any) => ({
            artist: m.artist,
            track: m.track,
            art: m.art ? urlForImage(m.art) : undefined,
          })) || fallbackProfile.random.music,
        shows: shows || fallbackProfile.random.shows,
      },
    }

    return mapped
  } catch (err) {
    console.warn("Sanity fetch failed, using fallback profile:", err)
    return null
  }
}
