import { useState } from 'react'

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
          <a href={nav.cta.href} className="header__cta">
            {nav.cta.label}
          </a>
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
        </div>
      )}
    </header>
  )
}
