export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid request' })
  }

  const { name, email, organization, message, _hp } = body

  // Honeypot — silently succeed without sending
  if (_hp) {
    return res.status(200).json({ ok: true })
  }

  const n = String(name || '').trim()
  const e = String(email || '').trim()
  const o = String(organization || '').trim()
  const m = String(message || '').trim()

  const errors = {}

  if (!n) errors.name = 'Name is required'
  else if (n.length > 100) errors.name = 'Name is too long'

  if (!e) errors.email = 'Email is required'
  else if (e.length > 150) errors.email = 'Email is too long'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) errors.email = 'Invalid email address'

  if (o.length > 200) errors.organization = 'Organization / context is too long'

  if (!m) errors.message = 'Message is required'
  else if (m.length > 3000) errors.message = 'Message is too long'

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors })
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const lines = [`Name: ${n}`, `Email: ${e}`]
  if (o) lines.push(`Organization / context: ${o}`)
  lines.push('', 'Message:', m)

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: e,
        subject: 'New inquiry from KeriStokstad.com',
        text: lines.join('\n'),
      }),
    })

    if (!r.ok) {
      return res.status(500).json({ error: 'Failed to send message. Please try again.' })
    }

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Failed to send message. Please try again.' })
  }
}
