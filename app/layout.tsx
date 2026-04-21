import type { Metadata } from 'next'
import './globals.css'
import CookieBanner from '@/components/cookie-banner'
import Navbar from '@/app/components/navbar'
import ConditionalWhatsApp from '@/app/components/ConditionalWhatsApp'

export const dynamic = 'force-dynamic'

const baseUrl = 'https://studernheim.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  alternates: {
    canonical: '/', // 🔥 wichtig: dynamisch pro Seite
  },

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
    'Dorfleben Pfalz',
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
    url: baseUrl,
    siteName: 'Studernheim',
    images: [
      {
        url: `${baseUrl}/og-image.webp`,
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
    images: [`${baseUrl}/og-image.webp`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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

        {/* 🔥 STRUCTURED DATA: PLACE */}
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
              "url": baseUrl
            })
          }}
        />

        {/* 🔥 STRUCTURED DATA: ORGANIZATION */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Studernheim",
              "url": baseUrl,
              "logo": `${baseUrl}/og-image.webp`
            })
          }}
        />

        {/* Navigation */}
        <Navbar />

        {/* Content */}
        <main className="pt-20">
          {children}
        </main>

        {/* WhatsApp (conditional) */}
        <ConditionalWhatsApp />

        {/* Cookie Banner */}
        <CookieBanner />

      </body>
    </html>
  )
}
