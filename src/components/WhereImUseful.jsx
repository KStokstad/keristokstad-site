export default function WhereImUseful({ content }) {
  return (
    <section className="where-useful" id="useful">
      <div className="container">
        <header className="where-useful__header">
          <span className="overline">{content.label}</span>
          <h2 className="section-headline where-useful__headline">{content.headline}</h2>
        </header>
        <div className="where-useful__list">
          {content.items.map((item, i) => (
            <div key={i} className="where-useful__item">
              <p className="where-useful__situation">{item.situation}</p>
              <p className="where-useful__response">{item.response}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
