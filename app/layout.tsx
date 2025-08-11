import type { Metadata, Viewport } from 'next'
import './globals.css'
import { grotesk, plexMono } from '@/lib/fonts'
import { ThemeProvider } from '@/components/theme-provider'
import { MenuProvider } from '@/components/menu-state'
import MenuBackdrop from '@/components/menu-backdrop'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aaron Omale',
    template: '%s · Aaron Omale',
  },
  description: 'Self‑taught software developer and systems thinker. Notes, projects, and experiments.',
  keywords: ['Aaron Omale', 'software developer', 'systems', 'TypeScript', 'Next.js', 'portfolio', 'notes'],
  generator: 'v0.dev',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Aaron Omale',
    siteName: 'Aaron Omale',
    description: 'Software developer | Cloud Ops | Systems Analyst',
    images: [
      { url: '/avatar.png', width: 1200, height: 630, alt: 'Aaron Omale' },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aaron Omale',
    description: 'Self‑taught software developer and systems thinker.',
    images: ['/avatar.png'],
    creator: '@aaron_omale',
  },
  authors: [{ name: 'Aaron Omale' }],
  category: 'technology',
  icons: { icon: '/avatar.png' },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${grotesk.className} ${plexMono.variable}`}>
      <head />
      <body className="overflow-x-clip">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MenuProvider>
            <MenuBackdrop />
            {children}
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
