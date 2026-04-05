import Navbar from './components/navbar'

export default function Datenschutz() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold">1. Allgemeine Hinweise</h2>
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns wichtig. Personenbezogene Daten sind alle Daten,
            mit denen Sie persönlich identifiziert werden können.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Verantwortlicher</h2>
          <p>
            Studernheimer Arbeitsgemeinschaft (SAG) e.V.<br />
            Oggersheimer Str. 14<br />
            67227 Frankenthal<br />
            E-Mail: studernheim.ag@gmail.com
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Hosting</h2>
          <p>
            Diese Website wird bei folgendem Anbieter gehostet:
            Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen.
          </p>
          <p>
            Beim Besuch der Website werden automatisch Daten (z. B. IP-Adresse, Browser,
            Uhrzeit) erfasst. Dies erfolgt zur Sicherstellung eines störungsfreien Betriebs.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Server-Log-Dateien</h2>
          <p>
            Der Hostinganbieter erhebt automatisch Informationen in sogenannten Server-Log-Dateien.
            Diese Daten sind nicht bestimmten Personen zuordenbar und dienen ausschließlich der technischen Überwachung.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Kontaktaufnahme</h2>
          <p>
            Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben zur Bearbeitung der Anfrage gespeichert.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO sowie Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Cookies</h2>
          <p>
            Diese Website verwendet ausschließlich technisch notwendige Cookies, um die Funktionalität der Seite sicherzustellen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht auf:
          </p>
          <ul className="list-disc ml-6">
            <li>Auskunft über Ihre gespeicherten Daten</li>
            <li>Berichtigung unrichtiger Daten</li>
            <li>Löschung Ihrer Daten</li>
            <li>Einschränkung der Verarbeitung</li>
            <li>Widerruf einer Einwilligung</li>
          </ul>
          <p>
            Außerdem haben Sie ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.
          </p>
        </section>

      </div>
    </main>
  )
}
