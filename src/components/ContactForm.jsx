import { useState, useRef } from 'react'

const LIMITS = { name: 100, email: 150, organization: 200, message: 3000 }

function validateClient({ name, email, message }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Name is required'
  if (!email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) errors.email = 'Enter a valid email address'
  if (!message.trim()) errors.message = 'Message is required'
  return errors
}

const EMPTY = { name: '', email: '', organization: '', message: '' }

export default function ContactForm() {
  const [fields, setFields] = useState(EMPTY)
  const [fieldErrors, setFieldErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [serverError, setServerError] = useState('')
  const honeypotRef = useRef(null)

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errors = validateClient(fields)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      const firstKey = Object.keys(errors)[0]
      document.getElementById(`cf-${firstKey}`)?.focus()
      return
    }

    setStatus('sending')
    setServerError('')

    try {
      const res = await fetch('https://formspree.io/f/xeenpyje', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim().slice(0, LIMITS.name),
          email: fields.email.trim().slice(0, LIMITS.email),
          organization: fields.organization.trim().slice(0, LIMITS.organization),
          message: fields.message.trim().slice(0, LIMITS.message),
          source_site: 'keristokstad.com',
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setFields(EMPTY)
      } else {
        setStatus('error')
        setServerError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setServerError('Unable to send your message. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form__success" role="status" aria-live="polite">
        <p>Your message has been sent. I'll be in touch.</p>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form
      className="contact-form"
      method="POST"
      action="https://formspree.io/f/xeenpyje"
      onSubmit={handleSubmit}
      noValidate
    >
      <input type="hidden" name="source_site" value="keristokstad.com" />

      {/* Honeypot — hidden from users and assistive technology */}
      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor="cf-hp">Leave this blank</label>
        <input
          ref={honeypotRef}
          type="text"
          id="cf-hp"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="contact-form__row contact-form__row--half">
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-name">Name</label>
          <input
            className={`contact-form__input${fieldErrors.name ? ' contact-form__input--error' : ''}`}
            type="text"
            id="cf-name"
            name="name"
            value={fields.name}
            onChange={handleChange}
            autoComplete="name"
            maxLength={LIMITS.name}
            required
            aria-required="true"
            aria-describedby={fieldErrors.name ? 'cf-name-error' : undefined}
          />
          {fieldErrors.name && (
            <span className="contact-form__field-error" id="cf-name-error" role="alert">
              {fieldErrors.name}
            </span>
          )}
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-email">Email</label>
          <input
            className={`contact-form__input${fieldErrors.email ? ' contact-form__input--error' : ''}`}
            type="email"
            id="cf-email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            autoComplete="email"
            maxLength={LIMITS.email}
            required
            aria-required="true"
            aria-describedby={fieldErrors.email ? 'cf-email-error' : undefined}
          />
          {fieldErrors.email && (
            <span className="contact-form__field-error" id="cf-email-error" role="alert">
              {fieldErrors.email}
            </span>
          )}
        </div>
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="cf-org">
          Organization / context{' '}
          <span className="contact-form__optional">optional</span>
        </label>
        <input
          className="contact-form__input"
          type="text"
          id="cf-org"
          name="organization"
          value={fields.organization}
          onChange={handleChange}
          autoComplete="organization"
          maxLength={LIMITS.organization}
        />
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="cf-message">Message</label>
        <textarea
          className={`contact-form__input contact-form__textarea${fieldErrors.message ? ' contact-form__input--error' : ''}`}
          id="cf-message"
          name="message"
          value={fields.message}
          onChange={handleChange}
          rows={5}
          required
          aria-required="true"
          maxLength={LIMITS.message}
          aria-describedby={fieldErrors.message ? 'cf-message-error' : undefined}
        />
        {fieldErrors.message && (
          <span className="contact-form__field-error" id="cf-message-error" role="alert">
            {fieldErrors.message}
          </span>
        )}
      </div>

      {status === 'error' && serverError && (
        <div className="contact-form__server-error" role="alert" aria-live="assertive">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        className="contact-form__submit"
        disabled={sending}
      >
        {sending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
