import Hero from './components/hero'
import NextFestHero from './components/NextFestHero'
import SAG from './components/sag'
import FesteClient from './components/feste-client'
import Vereine from './components/vereine'
import Termine from './components/termine'
import Ortsverwaltung from './components/ortsverwaltung'
import ContactForm from './components/contact-form'
import Footer from './components/footer'

import { getFeste } from '@/lib/queries'

export default async function Home() {
  const feste = await getFeste()

  // 🔍 DEBUG (wichtig!)
  console.log('FESTE DATA:', feste)

  return (
    <main className="relative">
      <Hero />

      {/* 🔥 Countdown */}
      {Array.isArray(feste) && feste.length > 0 && (
        <NextFestHero feste={feste} />
      )}

      <SAG />

      {/* 🔥 Feste */}
      {Array.isArray(feste) && feste.length > 0 ? (
        <FesteClient feste={feste} />
      ) : (
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Unsere Feste</h2>
          <p className="text-gray-500">Keine Feste vorhanden</p>
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
