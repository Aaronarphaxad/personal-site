export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-foreground/10 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-xs text-foreground/60">
        <p>
          Built with Next.js and thoughtful defaults. Typography by Space Grotesk and IBM Plex Mono.
        </p>
        <p className="mt-2">
          {new Date().getFullYear()} © Your Name
        </p>
      </div>
    </footer>
  )
}
