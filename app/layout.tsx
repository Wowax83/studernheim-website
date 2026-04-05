import type { Metadata } from 'next'
import './globals.css'
import CookieBanner from '@/components/cookie-banner'
import Navbar from '@/components/Navbar'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  title: 'Studernheim - Ein Dorf',
  description:
    'Entdecken Sie Studernheim - ein lebendiges Dorf mit Tradition, Gemeinschaft und Charme in der Pfalz.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Studernheim - Ein Dorf',
    description:
      'Entdecken Sie Studernheim - ein lebendiges Dorf mit Tradition, Gemeinschaft und Charme in der Pfalz.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Studernheim - Ein Dorf',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="font-body antialiased">

        {/* ✅ Navbar */}
        <Navbar />

        {/* ✅ Seiteninhalt */}
        <main className="pt-20">
          {children}
        </main>

        {/* ✅ Cookie Banner */}
        <CookieBanner />

      </body>
    </html>
  )
}
