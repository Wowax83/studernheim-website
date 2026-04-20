import dynamic from 'next/dynamic'
import Hero from './components/hero'
import NextFestHero from './components/NextFestHero'
import SAG from './components/sag'
import Footer from './components/footer'

import { getFeste, getUpcomingFeste } from '@/lib/queries'

// 🔥 Lazy Loaded Sections (großer Performance Boost)
const FesteClient = dynamic(() => import('./components/feste-client'), {
  ssr: false,
  loading: () => <div className="py-20 text-center text-gray-500">Lade Feste...</div>
})

const Vereine = dynamic(() => import('./components/vereine'), {
  ssr: false,
  loading: () => <div className="py-20 text-center text-gray-500">Lade Vereine...</div>
})

const Termine = dynamic(() => import('./components/termine'), {
  ssr: false,
  loading: () => <div className="py-20 text-center text-gray-500">Lade Termine...</div>
})

const Ortsverwaltung = dynamic(() => import('./components/ortsverwaltung'), {
  ssr: false,
  loading: () => <div className="py-20 text-center text-gray-500">Lade Ortsverwaltung...</div>
})

const ContactForm = dynamic(() => import('./components/contact-form'), {
  ssr: false,
  loading: () => <div className="py-20 text-center text-gray-500">Lade Kontaktformular...</div>
})

export default async function Home() {
  // 🔥 optional: limit später möglich → getFeste(6)
  const feste = await getFeste()
  const upcoming = await getUpcomingFeste(1)

  return (
    <main className="relative">

      {/* 🔥 ABOVE THE FOLD (immer direkt laden) */}
      <Hero />

      {Array.isArray(upcoming) && upcoming.length > 0 && (
        <NextFestHero feste={upcoming} />
      )}

      <SAG />

      {/* 🔥 SEO STRUKTUR (sehr wichtig für Google) */}
      <section id="feste">
        <h2 className="sr-only">Feste in Studernheim</h2>

        {Array.isArray(feste) && feste.length > 0 ? (
          <FesteClient feste={feste} />
        ) : (
          <div className="py-20 text-center text-gray-500">
            Keine Feste vorhanden
          </div>
        )}
      </section>

      <section id="vereine">
        <h2 className="sr-only">Vereine in Studernheim</h2>
        <Vereine />
      </section>

      <section id="termine">
        <h2 className="sr-only">Termine in Studernheim</h2>
        <Termine />
      </section>

      <section id="ortsverwaltung">
        <h2 className="sr-only">Ortsverwaltung Studernheim</h2>
        <Ortsverwaltung />
      </section>

      <section id="kontakt">
        <h2 className="sr-only">Kontakt Studernheim</h2>
        <ContactForm />
      </section>

      {/* 🔥 Footer bleibt leicht */}
      <Footer />

    </main>
  )
}
