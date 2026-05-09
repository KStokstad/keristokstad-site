import ContactForm from './ContactForm.jsx'

export default function CTAFooter({ content, footer, name }) {
  return (
    <footer className="cta-footer" id="contact">
      <div className="cta-section">
        <div className="container">
          <div className="cta-section__intro">
            <span className="cta-section__label">{content.label}</span>
            <h2 className="cta-section__headline">{content.headline}</h2>
            <p className="cta-section__body">{content.body}</p>
          </div>
          <ContactForm />
        </div>
      </div>

      <div className="footer-bar">
        <div className="container">
          <div className="footer-bar__inner">
            <a href="#top" className="footer-bar__name">{name}</a>
            <span className="footer-bar__copy">{footer.copyright}</span>
            <nav className="footer-bar__links" aria-label="Footer navigation">
              {footer.links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-bar__link"
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
