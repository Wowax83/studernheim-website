import Hero from './components/hero'
import NextFestHero from './components/NextFestHero'
import SAG from './components/sag'
import FesteClient from './components/feste-client'
import Vereine from './components/vereine'
import Termine from './components/termine'
import Ortsverwaltung from './components/ortsverwaltung'
import ContactForm from './components/contact-form'
import Footer from './components/footer'

import { getFeste, getUpcomingFeste } from '@/lib/queries'

export default async function Home() {
  const feste = await getFeste()
  const upcoming = await getUpcomingFeste(1)

  return (
    <main className="relative">
      <Hero />

      {/* 🔥 Countdown → nur nächstes Fest */}
      {Array.isArray(upcoming) && upcoming.length > 0 && (
        <NextFestHero feste={upcoming} />
      )}

      <SAG />

      {/* 🔥 Alle Feste */}
      {Array.isArray(feste) && feste.length > 0 ? (
        <FesteClient feste={feste} />
      ) : (
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Unsere <span className="text-green-600">Feste</span>
          </h2>
          <p className="text-gray-500">
            Aktuell sind keine Feste eingetragen.
          </p>
        </section>
      )}

      <Vereine />
      <Termine />
      <Ortsverwaltung />
      <ContactForm />
      <Footer />
    </main>
  )
}
