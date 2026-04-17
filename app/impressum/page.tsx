export default function Impressum() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Impressum</h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-semibold">Angaben gemäß § 5 TMG</h2>
          <p>
            Studernheimer Arbeitsgemeinschaft (SAG) e.V.<br />
            Oggersheimer Str. 14<br />
            67227 Frankenthal<br />
            Deutschland
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-xl font-semibold">Registereintrag</h2>
          <p>
            Eingetragen im Vereinsregister<br />
            Registergericht: Amtsgericht Ludwigshafen<br />
            Registernummer: VR 61466
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-semibold">Vertreten durch den Vorstand</h2>
          <p>
            Der Vorstand des Vereins gemäß § 26 BGB
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-semibold">Kontakt</h2>
          <p>
            E-Mail:{' '}
            <a
              href="mailto:studernheim.ag@gmail.com"
              className="text-green-600 hover:underline"
            >
              studernheim.ag@gmail.com
            </a>
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-semibold">Social Media</h2>
          <p className="space-y-1">
            <a
              href="https://www.instagram.com/sag.studernheim?igsh=MWV0a3lzbm5temwyNA%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline block"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/deinprofil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline block"
            >
              Facebook
            </a>
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-semibold">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p>
            Studernheimer Arbeitsgemeinschaft (SAG) e.V.<br />
            Oggersheimer Str. 14<br />
            67227 Frankenthal
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-semibold">Haftung für Inhalte</h2>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
            Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
            können wir jedoch keine Gewähr übernehmen.
          </p>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-xl font-semibold">Haftung für Links</h2>
          <p>
            Unsere Website enthält Links zu externen Websites Dritter,
            auf deren Inhalte wir keinen Einfluss haben.
          </p>
          <p>
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-xl font-semibold">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht.
          </p>
          <p>
            Beiträge Dritter sind als solche gekennzeichnet.
          </p>
          <p>
            Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
            außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung
            des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>

      </div>
    </main>
  )
}
