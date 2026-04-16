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

return ( <main className="relative"> <Hero />

```
  {/* 🔥 Countdown / nächstes Fest */}
  <NextFestHero feste={feste} />

  <SAG />

  {/* 🔥 Fest-Karten */}
  <FesteClient feste={feste} />

  <Vereine />
  <Termine />
  <Ortsverwaltung />
  <ContactForm />
  <Footer />
</main>
```

)
}
