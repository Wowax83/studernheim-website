import Hero from './components/hero'
import SAG from './components/sag'
import Feste from './components/feste'
import Vereine from './components/vereine'
import Termine from './components/termine'
import Ortsverwaltung from './components/ortsverwaltung'
import Testimonials from './components/testimonials'
import ContactForm from './components/contact-form'
import Footer from './components/footer'

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <SAG />
      <Feste />
      <Vereine />
      <Termine />
      <Ortsverwaltung />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  )
}
