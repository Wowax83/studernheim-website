import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    await resend.emails.send({
      from: 'SAG Studernheim <onboarding@resend.dev>',
      to: 'DEINE@EMAIL.DE', // <-- hier deine Mail rein
      subject: `Neue Nachricht von ${name}`,
      html: `
        <h2>Neue Anfrage über Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong><br/>${message}</p>
      `
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Fehler beim Senden' }, { status: 500 })
  }
}
