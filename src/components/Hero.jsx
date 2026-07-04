import { useCallback, useLayoutEffect, useRef } from 'react'
import { HERO_PORTRAIT_LOCK as lock } from '../hero-portrait.lock.js'

function paintedSize(img) {
  const boxW = img.clientWidth
  const boxH = img.clientHeight
  const imageAspect = img.naturalWidth / img.naturalHeight
  const boxAspect = boxW / boxH

  if (imageAspect > boxAspect) {
    const width = boxW
    return { width, height: width / imageAspect }
  }

  const height = boxH
  return { width: height * imageAspect, height }
}

export default function Hero({ content }) {
  const containerRef = useRef(null)
  const gapRef = useRef(null)
  const headlineRef = useRef(null)
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  const alignPortrait = useCallback(() => {
    const container = containerRef.current
    const gap = gapRef.current
    const headline = headlineRef.current
    const wrap = wrapRef.current
    const img = imgRef.current

    if (!container || !gap || !wrap || !img) return

    if (window.matchMedia('(max-width: 900px)').matches) {
      wrap.style.top = ''
      img.style.transform = ''
      return
    }

    if (!img.complete || !img.naturalWidth) return

    const containerTop = container.getBoundingClientRect().top
    const gapRect = gap.getBoundingClientRect()
    const gapTarget = gapRect.top - containerTop + lock.gapOffsetPx

    const { height: paintedHeight, width: paintedWidth } = paintedSize(img)
    const lineFromTop = paintedHeight * lock.lineYRatio * lock.scale

    wrap.style.top = `${Math.max(0, gapTarget - lineFromTop)}px`

    let nudgePx = 0
    if (headline) {
      const wrapRect = wrap.getBoundingClientRect()
      const figureLeft =
        wrapRect.right - paintedWidth * lock.scale + paintedWidth * lock.scale * lock.figureXRatio
      const needed =
        headline.getBoundingClientRect().right + lock.headlineClearancePx - figureLeft
      nudgePx = Math.max(0, Math.min(needed, lock.maxHeadlineNudgePx))
    }

    img.style.transformOrigin = 'top right'
    img.style.transform =
      nudgePx > 0
        ? `translateX(calc(${lock.translateX} + ${nudgePx}px)) scale(${lock.scale})`
        : `translateX(${lock.translateX}) scale(${lock.scale})`
  }, [])

  useLayoutEffect(() => {
    alignPortrait()

    const container = containerRef.current
    if (!container) return undefined

    const observer = new ResizeObserver(alignPortrait)
    observer.observe(container)

    window.addEventListener('resize', alignPortrait)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', alignPortrait)
    }
  }, [alignPortrait])

  return (
    <section className="hero" id="top">
      <div className="container" ref={containerRef}>
        <div className="hero__image-wrap" ref={wrapRef} aria-hidden="true">
          <img
            ref={imgRef}
            src={lock.imageSrc}
            alt=""
            className="hero__image"
            onLoad={alignPortrait}
          />
        </div>
        <div className="hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow-wrap">
              <span className="hero__eyebrow-rule" aria-hidden="true" />
              <span className="hero__eyebrow">{content.eyebrow}</span>
            </div>
            <h1 className="hero__headline" ref={headlineRef}>
              {content.headline.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h1>
            <p className="hero__sub">{content.sub}</p>
            <div className="hero__line-gap" ref={gapRef} aria-hidden="true" />
            {content.credentials && (
              <p className="hero__credentials">{content.credentials}</p>
            )}
            <div className="hero__actions">
              <a href={content.ctaPrimary.href} className="btn btn-primary">
                {content.ctaPrimary.label}
              </a>
              {content.ctaSecondary && (
                <div>
                  <a
                    href={content.ctaSecondary.href}
                    className="btn btn-outline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content.ctaSecondary.label}
                  </a>
                  {content.ctaSecondary.caption && (
                    <p
                      className="hero__credentials"
                      style={{ marginTop: '6px', marginBottom: 0 }}
                    >
                      {content.ctaSecondary.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
