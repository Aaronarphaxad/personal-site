import SiteHeader from "@/components/site-header"
import Hero from "@/components/hero"
import Values from "@/components/values"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Notes from "@/components/notes"
import Philosophy from "@/components/philosophy"
import RandomStuff from "@/components/random"
import Contact from "@/components/contact"
import SiteFooter from "@/components/site-footer"
import { grotesk, plexMono } from "@/lib/fonts"
import { profile as fallbackProfile } from "@/lib/profile"
import NavOrb from "@/components/nav-orb"
import { SectionRevealProvider, Section } from "@/components/section-reveal"
import BaselineGrid from "@/components/baseline-grid"
import { fetchProfileFromSanity } from "@/lib/sanity/fetch-site"

export default async function Page() {
  // Try to load from Sanity; fall back to local profile.ts
  const fetched = await fetchProfileFromSanity()
  const profile = fetched ?? fallbackProfile

  // If you set an accent color in Sanity settings, it will override the default below.
  const accent = (fetched as any)?.accent || "#7CFF6B"

  return (
    <main
      className={`${grotesk.variable} ${plexMono.variable} font-sans`}
      style={
        {
          "--accent": accent,
        } as React.CSSProperties
      }
    >
      <div className="min-h-[100dvh] bg-background text-foreground pb-24 md:pb-0 overflow-x-clip">
        <SectionRevealProvider>
          <SiteHeader profile={profile} minimal />

          {/* About (default): Hero + Values + Contact */}
          <Section id="about">
            <Hero profile={profile} />
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <hr className="my-8 border-foreground/10" />
            </div>
            <Values profile={profile} />
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <hr className="my-8 border-foreground/10" />
            </div>
            <Contact profile={profile} />
          </Section>

          <Section id="projects">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <hr className="my-8 border-foreground/10" />
            </div>
            <Projects profile={profile} />
          </Section>

          <Section id="experience">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <hr className="my-8 border-foreground/10" />
            </div>
            <Experience profile={profile} />
          </Section>

          <Section id="notes">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <hr className="my-8 border-foreground/10" />
            </div>
            <Notes profile={profile} />
          </Section>

          <Section id="philosophy">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <hr className="my-8 border-foreground/10" />
            </div>
            <Philosophy profile={profile} />
          </Section>

          <Section id="random">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <hr className="my-8 border-foreground/10" />
            </div>
            <RandomStuff profile={profile} />
          </Section>

          <NavOrb />
          <SiteFooter />
          <BaselineGrid />
        </SectionRevealProvider>
      </div>
    </main>
  )
}
