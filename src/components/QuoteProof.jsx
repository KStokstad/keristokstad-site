export default function QuoteProof({ content }) {
  return (
    <section className="quote-proof">
      <div className="container">
        <blockquote className="quote-proof__inner">
          <span className="quote-proof__mark" aria-hidden="true">"</span>
          <p className="quote-proof__text">{content.text}</p>
          <footer className="quote-proof__attribution">{content.attribution}</footer>
        </blockquote>
      </div>
    </section>
  )
}
