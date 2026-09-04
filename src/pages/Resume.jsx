import { useEffect } from 'react'
import Header from '../components/Header.jsx'
import InteractiveResume from '../components/InteractiveResume.jsx'
import CTAFooter from '../components/CTAFooter.jsx'
import { siteContent } from '../content.js'

export default function Resume() {
  const c = siteContent

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
      <InteractiveResume />
      <CTAFooter compact footer={c.footer} name={c.name} homeHref="/" />
    </div>
  )
}
