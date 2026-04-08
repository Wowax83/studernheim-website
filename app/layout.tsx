
import type { Metadata } from 'next'
import './globals.css'
import CookieBanner from '@/components/cookie-banner'
import Navbar from '@/app/components/navbar'
import WhatsAppFloating from '@/app/components/whatsapp-floating'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'https://studrum.de'),

  title: {
    default: 'Studernheim – Feste, Vereine & Dorfleben',
    template: '%s | Studernheim',
  },

  description:
    'Alle Feste, Veranstaltungen und Vereine in Studernheim. Entdecke Kerwe, Maibaumstellen und das Dorfleben in der Pfalz.',

  keywords: [
    'Studernheim',
    'Feste Studernheim',
    'Kerwe Studernheim',
    'Maibaumstellen',
    'Veranstaltungen Frankenthal',
    'Dorfleben Pfalz'
  ],

  authors: [{ name: 'Studernheim' }],
  creator: 'Studernheim',
  publisher: 'Studernheim',

  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },

  openGraph: {
    title: 'Studernheim – Feste & Dorfleben',
    description:
      'Alle Veranstaltungen, Feste und Vereine in Studernheim. Jetzt entdecken!',
    type: 'website',
    locale: 'de_DE',
    url: 'https://studrum.de',
    siteName: 'Studernheim',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Studernheim Dorfleben',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Studernheim – Feste & Dorfleben',
    description:
      'Alle Veranstaltungen und Feste in Studernheim auf einen Blick.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: 'https://studrum.de',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="font-body antialiased bg-white text-gray-900">

        {/* 🔥 STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Place",
              "name": "Studernheim",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Frankenthal",
                "addressCountry": "DE"
              },
              "url": "https://studrum.de"
            })
          }}
        />

        {/* 🔥 ORGANIZATION SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Studernheim",
              "url": "https://studrum.de",
              "logo": "https://studrum.de/og-image.png"
            })
          }}
        />

        {/* Navbar */}
        <Navbar />

        {/* Inhalt */}
        <main className="pt-20">
          {children}
        </main>

        {/* 🔥 WHATSAPP FLOATING BUTTON */}
        <WhatsAppFloating />

        {/* Cookie Banner */}
        <CookieBanner />

      </body>
    </html>
  )
}
