export default function AboutPreview({ content }) {
  return (
    <section className="about-preview" id="about">
      <div className="container">
        <div className="about-preview__inner">
          <div className="about-preview__left">
            <span className="overline">{content.label}</span>
            <h2 className="about-preview__headline">{content.headline}</h2>
            {Array.isArray(content.body)
              ? content.body.map((p, i) => (
                  <p key={i} className="about-preview__body">{p}</p>
                ))
              : <p className="about-preview__body">{content.body}</p>
            }
          </div>

          <div className="about-preview__right">
            <div className="about-credentials">
              <span className="about-credentials__label">Experience includes</span>
              <ul className="about-credentials__list">
                {content.credentials.map(c => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            {content.testimonials?.length > 0 && (
              <div className="about-testimonials">
                {content.testimonials.map((t, i) => (
                  <blockquote key={i} className="about-testimonial">
                    <p className="about-testimonial__quote">{t.quote}</p>
                    <footer className="about-testimonial__attribution">{t.attribution}</footer>
                  </blockquote>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
