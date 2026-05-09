export default function WaysIWork({ content }) {
  return (
    <section className="ways-i-work" id="approach">
      <div className="container">
        <div className="ways-header">
          <span className="overline">{content.label}</span>
          <h2 className="section-headline ways-header__headline">{content.headline}</h2>
        </div>
        <div className="ways-list">
          {content.items.map(item => (
            <div key={item.num} className="ways-list__item">
              <span className="ways-list__num">{item.num}</span>
              <div className="ways-list__content">
                <h3 className="ways-list__title">{item.title}</h3>
                <p className="ways-list__body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
