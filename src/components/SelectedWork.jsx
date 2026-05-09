export default function SelectedWork({ content }) {
  return (
    <section className="selected-work" id="work">
      <div className="container">
        <header className="selected-work__header">
          <span className="overline">{content.label}</span>
          <h2 className="section-headline selected-work__headline">{content.headline}</h2>
        </header>

        <div className="work-entries">
          {content.items.map(item => (
            <article key={item.title} className="work-entry">
              <span className="work-entry__category">{item.category}</span>
              <h3 className="work-entry__title">{item.title}</h3>
              <p className="work-entry__body">{item.body}</p>
              {item.whatItShows && (
                <div className="work-entry__shows">
                  <span className="work-entry__shows-label">What it shows</span>
                  <p className="work-entry__shows-body">{item.whatItShows}</p>
                </div>
              )}
              {item.note && (
                <p className="work-entry__note">{item.note}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
