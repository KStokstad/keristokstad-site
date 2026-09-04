import { useEffect } from 'react'
import Header from '../components/Header.jsx'
import CTAFooter from '../components/CTAFooter.jsx'
import { siteContent } from '../content.js'

export default function Resume() {
  const c = siteContent
  const page = c.resume

  useEffect(() => {
    const previous = document.title
    document.title = 'Interactive Resume — Keri Stokstad Consulting'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <div className="resume-page">
      <Header name={c.name} nav={c.nav} homePrefix="/" />
      <main className="resume" id="top">
        <div className="container">
          <header className="resume__intro">
            <span className="overline">{page.label}</span>
            <h1 className="section-headline resume__headline">{page.headline}</h1>
          </header>
        </div>
        <div className="resume__embed">
          <div className="container resume__embed-frame">
            <iframe
              src={page.embedSrc}
              title={page.embedTitle}
              width="100%"
              frameBorder="0"
              allow="clipboard-write"
              allowFullScreen
              className="resume__frame"
            />
          </div>
        </div>
      </main>
      <CTAFooter compact footer={c.footer} name={c.name} homeHref="/" />
    </div>
  )
}
