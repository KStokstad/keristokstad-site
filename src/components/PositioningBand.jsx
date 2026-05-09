export default function PositioningBand({ content }) {
  return (
    <div className="positioning-band" aria-hidden="false">
      <div className="container">
        <p className="positioning-statement">{content.statement}</p>
      </div>
    </div>
  )
}
