import { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import CTAFooter from '../components/CTAFooter.jsx'
import { siteContent } from '../content.js'

function isEmbedOrigin(origin) {
  try {
    const host = new URL(origin).hostname
    return (
      host === 'claude.site' ||
      host === 'claude.ai' ||
      host.endsWith('.claude.ai') ||
      host === 'claudeusercontent.com' ||
      host.endsWith('.claudeusercontent.com')
    )
  } catch {
    return false
  }
}

function heightFromMessage(data) {
  if (typeof data === 'number' && data > 0) return data
  if (!data || typeof data !== 'object') return null

  const candidates = [
    data.height,
    data.payload?.height,
    data.params?.height,
    data.data?.height,
  ]

  for (const value of candidates) {
    const next = typeof value === 'string' ? Number.parseFloat(value) : value
    if (typeof next === 'number' && Number.isFinite(next) && next > 0) {
      return next
    }
  }

  return null
}

export default function Resume() {
  const c = siteContent
  const page = c.resume
  const [frameHeight, setFrameHeight] = useState(null)

  useEffect(() => {
    const previous = document.title
    document.title = 'Interactive Resume — Keri Stokstad Consulting'
    return () => {
      document.title = previous
    }
  }, [])

  useEffect(() => {
    function onMessage(event) {
      if (!isEmbedOrigin(event.origin)) return
      const next = heightFromMessage(event.data)
      if (!next) return
      setFrameHeight(current => Math.max(current ?? 0, Math.ceil(next)))
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <>
      <Header name={c.name} nav={c.nav} homePrefix="/" />
      <main className="resume" id="top">
        <div className="container">
          <header className="resume__intro">
            <span className="overline">{page.label}</span>
            <h1 className="section-headline resume__headline">{page.headline}</h1>
          </header>
        </div>
        <div className="resume__embed">
          <div className="container">
            <iframe
              src={page.embedSrc}
              title={page.embedTitle}
              width="100%"
              frameBorder="0"
              allow="clipboard-write"
              allowFullScreen
              className="resume__frame"
              style={frameHeight ? { height: `${frameHeight}px` } : undefined}
            />
          </div>
        </div>
      </main>
      <CTAFooter content={c.cta} footer={c.footer} name={c.name} homeHref="/" />
    </>
  )
}
