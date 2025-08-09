"use client"

import Link from "next/link"
import { profile as defaultProfile } from "@/lib/profile"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Clipboard, Mail } from 'lucide-react'
import { useState } from "react"

export default function Contact({
  profile = defaultProfile,
}: {
  profile?: typeof defaultProfile
}) {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6">
          <h2 id="contact-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Say hi
          </h2>
          <p className="mt-2 text-foreground/70">
            Whether you have a role in mind, want to collaborate, or just want to chat shop—my inbox is open.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild>
            <a href={`mailto:${profile.email}`} aria-label="Send email">
              <Mail className="mr-2 h-4 w-4" />
              Email {profile.email}
            </a>
          </Button>
          <Button variant="outline" onClick={copyEmail} aria-label="Copy email address">
            <Clipboard className="mr-2 h-4 w-4" />
            {copied ? "Copied!" : "Copy email"}
          </Button>
          {profile.socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="inline-flex items-center gap-1.5 rounded-md border border-foreground/10 px-3 py-2 text-sm text-foreground/80 hover:border-[var(--accent)]"
            >
              {s.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
