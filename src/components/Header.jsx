import { useState } from 'react'

const LINKEDIN_HREF = 'https://www.linkedin.com/in/keristokstad'
const LINKEDIN_LABEL = 'Connect with Keri Stokstad on LinkedIn'

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function Header({ name, nav }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="header__logo">
          <span className="header__logo-name">{name}</span>
          <span className="header__logo-sep" aria-hidden="true">/</span>
          <span className="header__logo-tag">Consulting</span>
        </a>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__links">
            {nav.links.map(link => (
              <li key={link.label}>
                <a href={link.href} className="header__link">{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="header__actions">
            <a href={nav.cta.href} className="header__cta">
              {nav.cta.label}
            </a>
            <a
              href={LINKEDIN_HREF}
              className="header__linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={LINKEDIN_LABEL}
            >
              <LinkedInIcon />
            </a>
          </div>
        </nav>

        <button
          className={`header__toggle${open ? ' is-open' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="header__drawer" role="navigation" aria-label="Mobile navigation">
          {nav.links.map(link => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            className="header__cta"
            style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}
            onClick={() => setOpen(false)}
          >
            {nav.cta.label}
          </a>
          <a
            href={LINKEDIN_HREF}
            className="header__linkedin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={LINKEDIN_LABEL}
            onClick={() => setOpen(false)}
          >
            <LinkedInIcon />
          </a>
        </div>
      )}
    </header>
  )
}
