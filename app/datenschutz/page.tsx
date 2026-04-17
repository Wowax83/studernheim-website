export default function Datenschutz() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-semibold">1. Allgemeine Hinweise</h2>
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen.
            Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend
            den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>
          <p>
            Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
            werden können.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-xl font-semibold">2. Verantwortlicher</h2>
          <p>
            Studernheimer Arbeitsgemeinschaft (SAG) e.V.<br />
            Oggersheimer Str. 14<br />
            67227 Frankenthal<br />
            Deutschland<br />
            E-Mail:{' '}
            <a
              href="mailto:studernheim.ag@gmail.com"
              className="text-green-600 hover:underline"
            >
              studernheim.ag@gmail.com
            </a>
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-semibold">3. Hosting</h2>
          <p>
            Diese Website wird bei folgendem Anbieter gehostet:
          </p>
          <p>
            Hetzner Online GmbH<br />
            Industriestr. 25<br />
            91710 Gunzenhausen
          </p>
          <p>
            Beim Besuch dieser Website erfasst der Hostinganbieter automatisch Daten
            (z. B. IP-Adresse, Browsertyp, Betriebssystem, Uhrzeit).
          </p>
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an einer sicheren und stabilen Bereitstellung).
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-semibold">4. Server-Log-Dateien</h2>
          <p>
            Der Provider erhebt und speichert automatisch Informationen in sogenannten
            Server-Log-Dateien.
          </p>
          <p>
            Diese Daten sind nicht bestimmten Personen zuordenbar und werden nicht mit
            anderen Datenquellen zusammengeführt.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-semibold">5. Kontaktaufnahme</h2>
          <p>
            Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben zur Bearbeitung
            der Anfrage gespeichert.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertrag/Anfrage).
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-semibold">6. Kontaktformular</h2>
          <p>
            Wenn Sie uns über das Kontaktformular Anfragen senden, werden Ihre Angaben
            (Name, E-Mail-Adresse und Nachricht) zur Bearbeitung Ihrer Anfrage gespeichert.
          </p>
          <p>
            Für den Versand nutzen wir den Dienst{' '}
            <strong>Resend (Resend Inc., USA)</strong>.
          </p>
          <p>
            Dabei kann es zur Übertragung personenbezogener Daten in die USA kommen.
            Die Übermittlung erfolgt auf Grundlage geeigneter Garantien gemäß Art. 46 DSGVO.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-semibold">7. Externe Links & Social Media</h2>
          <p>
            Auf unserer Website befinden sich Links zu externen Plattformen wie
            Instagram, Facebook und WhatsApp.
          </p>
          <p>
            Beim Anklicken dieser Links verlassen Sie unsere Website. Es gelten dann
            die Datenschutzbestimmungen des jeweiligen Anbieters.
          </p>

          <div className="mt-3 space-y-1">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline block"
            >
              Instagram
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline block"
            >
              Facebook
            </a>

            <a
              href="https://www.whatsapp.com/legal/privacy-policy-eea"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline block"
            >
              WhatsApp Datenschutz
            </a>
          </div>

          <p className="mt-3">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-xl font-semibold">8. Cookies</h2>
          <p>
            Diese Website verwendet ausschließlich technisch notwendige Cookies,
            um die Funktionalität sicherzustellen.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-xl font-semibold">9. Ihre Rechte</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Auskunft über Ihre gespeicherten Daten</li>
            <li>Berichtigung unrichtiger Daten</li>
            <li>Löschung Ihrer Daten</li>
            <li>Einschränkung der Verarbeitung</li>
            <li>Datenübertragbarkeit</li>
            <li>Widerruf einer Einwilligung</li>
          </ul>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-xl font-semibold">10. Beschwerderecht</h2>
          <p>
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
          </p>
          <p>
            Zuständig ist z. B.:<br />
            Landesbeauftragter für den Datenschutz Rheinland-Pfalz
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-xl font-semibold">11. Widerspruchsrecht</h2>
          <p>
            Wenn die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO erfolgt,
            haben Sie das Recht, Widerspruch einzulegen.
          </p>
        </section>

      </div>
    </main>
  )
}
