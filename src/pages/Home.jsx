import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import AboutPreview from '../components/AboutPreview.jsx'
import WhereImUseful from '../components/WhereImUseful.jsx'
import PositioningBand from '../components/PositioningBand.jsx'
import SelectedWork from '../components/SelectedWork.jsx'
import WaysIWork from '../components/WaysIWork.jsx'
import CTAFooter from '../components/CTAFooter.jsx'
import { siteContent } from '../content.js'

export default function Home() {
  const c = siteContent
  return (
    <>
      <Header name={c.name} nav={c.nav} />
      <main>
        <Hero content={c.hero} />
        <AboutPreview content={c.about} />
        <WhereImUseful content={c.whereImUseful} />
        <PositioningBand content={c.positioningBand} />
        <SelectedWork content={c.selectedWork} />
        <WaysIWork content={c.waysIWork} />
      </main>
      <CTAFooter content={c.cta} footer={c.footer} name={c.name} />
    </>
  )
}
