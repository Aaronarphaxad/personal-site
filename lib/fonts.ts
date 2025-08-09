import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'

export const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})
