export default function HowIHelp({ content }) {
  return (
    <section id="services">
      <div className="positioning-band">
        <div className="container">
          <span className="overline positioning-band__overline">{content.label}</span>
          <p className="positioning-statement">{content.positioningStatement}</p>
        </div>
      </div>

      <div className="services-band">
        <div className="container">
          <div className="service-grid">
            {content.items.map(item => (
              <div key={item.title} className="service-item">
                <h3 className="service-item__title">{item.title}</h3>
                <p className="service-item__body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
