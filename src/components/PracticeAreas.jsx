export default function PracticeAreas({ content }) {
  return (
    <section className="practice-areas" id="services">
      <div className="container">
        <header className="practice-areas__header">
          <span className="overline">{content.label}</span>
          <h2 className="section-headline practice-areas__headline">{content.headline}</h2>
        </header>
        <div className="practice-grid">
          {content.items.map(item => (
            <div key={item.title} className="practice-item">
              <h3 className="practice-item__title">{item.title}</h3>
              <p className="practice-item__body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
