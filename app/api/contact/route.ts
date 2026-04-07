import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = body.name || 'Unbekannt'
    const email = body.email || 'Keine E-Mail'
    const message = body.message || 'Keine Nachricht'
    const interests = body.interests || []
    const company = body.company // 🛡️ Honeypot
    const formStartTime = body.formStartTime // ⏱️ Zeitcheck

    // 🛑 SPAM SCHUTZ

    // 1. Honeypot
    if (company) {
      console.log('🚫 Spam erkannt (Honeypot)')
      return Response.json({ success: true })
    }

    // 2. Zeitcheck
    const now = Date.now()
    if (formStartTime && now - formStartTime < 2000) {
      console.log('🚫 Spam erkannt (zu schnell)')
      return Response.json({ success: true })
    }

    // 📩 E-Mail senden
    const result = await resend.emails.send({
      from: 'SAG Studernheim <onboarding@resend.dev>', // später ändern!
      to: 'studernheim.ag@gmail.com',
      subject: `📩 Neue Nachricht von ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333">
          
          <h2 style="color:#16a34a;">Neue Anfrage über Website</h2>

          <p><strong>Name:</strong><br/>${name}</p>
          <p><strong>E-Mail:</strong><br/>${email}</p>

          ${
            interests.length > 0
              ? `<p><strong>Interessen:</strong><br/>${interests.join(', ')}</p>`
              : ''
          }

          <p><strong>Nachricht:</strong></p>
          <div style="
            background:#f3f4f6;
            padding:12px;
            border-radius:8px;
            margin-top:8px;
          ">
            ${message}
          </div>

          <hr style="margin:20px 0"/>

          <p style="font-size:12px;color:#888">
            Diese Nachricht wurde über das Kontaktformular der SAG Studernheim Website gesendet.
          </p>

        </div>
      `
    })

    // ❗ wichtig: Fehler von Resend prüfen
    if (result.error) {
      console.error('❌ Resend API Fehler:', result.error)
      return Response.json(
        { error: result.error.message || 'Mail konnte nicht gesendet werden' },
        { status: 500 }
      )
    }

    console.log('✅ Resend success:', result)

    return Response.json({ success: true })

  } catch (error) {
    console.error('❌ Server error:', error)

    return Response.json(
      { error: 'Fehler beim Senden der Nachricht' },
      { status: 500 }
    )
  }
}
