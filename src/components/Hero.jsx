export default function Hero({ content }) {
  return (
    <section className="hero" id="top">
      <div className="hero__image-wrap" aria-hidden="true">
        <img
          src="/images/keri-line-hero-v2.png"
          alt=""
          className="hero__image"
        />
      </div>
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow-wrap">
              <span className="hero__eyebrow-rule" aria-hidden="true" />
              <span className="hero__eyebrow">{content.eyebrow}</span>
            </div>
            <h1 className="hero__headline">
              {content.headline.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h1>
            <p className="hero__sub">{content.sub}</p>
            {content.credentials && (
              <p className="hero__credentials">{content.credentials}</p>
            )}
            <div className="hero__actions">
              <a href={content.ctaPrimary.href} className="btn btn-primary">
                {content.ctaPrimary.label}
              </a>
              {content.ctaSecondary && (
                <a href={content.ctaSecondary.href} className="hero__secondary-link">
                  {content.ctaSecondary.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
