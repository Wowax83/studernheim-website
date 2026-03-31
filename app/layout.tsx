import type { Metadata } from 'next'
// import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

export const dynamic = 'force-dynamic'

// ❌ Fonts deaktiviert (wegen Build Problem)
// const spaceGrotesk = Space_Grotesk({...})
// const inter = Inter({...})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  title: 'Studernheim - Ein Dorf',
  description: 'Entdecken Sie Studernheim - ein lebendiges Dorf mit Tradition, Gemeinschaft und Charme in der Pfalz.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Studernheim - Ein Dorf',
    description: 'Entdecken Sie Studernheim - ein lebendiges Dorf mit Tradition, Gemeinschaft und Charme in der Pfalz.',
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
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
   <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
