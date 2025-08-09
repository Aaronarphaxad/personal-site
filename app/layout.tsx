import type { Metadata } from 'next'
import './globals.css'
import { grotesk, plexMono } from '@/lib/fonts'
import { ThemeProvider } from '@/components/theme-provider'
import { MenuProvider } from '@/components/menu-state'
import MenuBackdrop from '@/components/menu-backdrop'

export const metadata: Metadata = {
  title: 'Aaron Omale',
  description: 'Personal site',
  generator: 'v0.dev',
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
