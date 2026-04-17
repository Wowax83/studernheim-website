import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/* ---------------- HELPERS ---------------- */

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/* ---------------- ROUTE ---------------- */

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = body.name || 'Unbekannt'
    const email = body.email || ''
    const message = body.message || 'Keine Nachricht'
    const interests = Array.isArray(body.interests) ? body.interests : []
    const company = body.company // Honeypot
    const formStartTime = body.formStartTime

    /* ---------------- SPAM SCHUTZ ---------------- */

    // Honeypot
    if (company) {
      console.log('🚫 Spam (Honeypot)')
      return Response.json({ success: true })
    }

    // Zeitcheck
    if (formStartTime && Date.now() - formStartTime < 2000) {
      console.log('🚫 Spam (zu schnell)')
      return Response.json({ success: true })
    }

    // Email Validation
    if (!isValidEmail(email)) {
      return Response.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      )
    }

    /* ---------------- ESCAPE ---------------- */

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)
    const safeInterests = interests.map((i: string) => escapeHtml(i)).join(', ')

    /* ---------------- ADMIN MAIL ---------------- */

    const adminResult = await resend.emails.send({
      from: 'Studernheim <noreply@studrum.de>',
      to: 'studernheim.ag@gmail.com',

      // 🔥 WICHTIG: reply_to nur wenn valid
      reply_to: email,

      subject: `📩 Neue Nachricht von ${safeName}`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333">
          
          <h2 style="color:#16a34a;">Neue Anfrage über Website</h2>

          <p><strong>Name:</strong><br/>${safeName}</p>
          <p><strong>E-Mail:</strong><br/>${safeEmail}</p>

          ${
            safeInterests
              ? `<p><strong>Interessen:</strong><br/>${safeInterests}</p>`
              : ''
          }

          <p><strong>Nachricht:</strong></p>

          <div style="background:#f3f4f6;padding:12px;border-radius:8px;">
            ${safeMessage}
          </div>

          <hr style="margin:20px 0"/>

          <p style="font-size:12px;color:#888">
            Diese Nachricht wurde über die Studernheim Website gesendet.
          </p>

        </div>
      `
    })

    if (adminResult.error) {
      console.error('❌ Admin Mail Fehler:', adminResult.error)
      return Response.json(
        { error: adminResult.error.message },
        { status: 500 }
      )
    }

    /* ---------------- USER MAIL ---------------- */

    await resend.emails.send({
      from: 'Studernheim <noreply@studrum.de>',
      to: email,
      subject: '✅ Ihre Anfrage wurde empfangen',

      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333">

          <h2 style="color:#16a34a;">Vielen Dank für Ihre Nachricht</h2>

          <p>Hallo ${safeName},</p>

          <p>
            wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich.
          </p>

          <div style="background:#f3f4f6;padding:12px;border-radius:8px;">
            <strong>Ihre Nachricht:</strong><br/>
            ${safeMessage}
          </div>

          <p style="margin-top:20px;">
            Mit freundlichen Grüßen<br/>
            eure SAG
          </p>

          <hr style="margin:20px 0"/>

          <p style="font-size:12px;color:#888">
            Automatische Bestätigung.
          </p>

        </div>
      `
    })

    console.log('✅ Mail erfolgreich gesendet')

    return Response.json({ success: true })

  } catch (error) {
    console.error('❌ Server error:', error)

    return Response.json(
      { error: 'Fehler beim Senden der Nachricht' },
      { status: 500 }
    )
  }
}
