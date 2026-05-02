import dynamic from 'next/dynamic'
import Hero from './components/hero'
import NextFestHero from './components/NextFestHero'
import SAG from './components/sag'
import Footer from './components/footer'

import { getFeste } from '@/lib/queries'

// 🔥 Lazy Loaded Sections
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
  const feste = await getFeste()

  return (
    <main className="relative">

      {/* HERO */}
      <Hero />

      {/* 🔥 WICHTIG: direkt ALLE Feste übergeben */}
      {Array.isArray(feste) && feste.length > 0 && (
        <NextFestHero feste={feste} />
      )}

      <SAG />

      {/* FESTE */}
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

      {/* VEREINE */}
      <section id="vereine">
        <h2 className="sr-only">Vereine in Studernheim</h2>
        <Vereine />
      </section>

      {/* TERMINE */}
      <section id="termine">
        <h2 className="sr-only">Termine in Studernheim</h2>
        <Termine />
      </section>

      {/* ORTSVERWALTUNG */}
      <section id="ortsverwaltung">
        <h2 className="sr-only">Ortsverwaltung Studernheim</h2>
        <Ortsverwaltung />
      </section>

      {/* KONTAKT */}
      <section id="kontakt">
        <h2 className="sr-only">Kontakt Studernheim</h2>
        <ContactForm />
      </section>

      <Footer />
    </main>
  )
}
