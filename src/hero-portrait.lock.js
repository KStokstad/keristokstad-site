/**
 * LOCKED — Hero portrait layout (approved 2026-06-30)
 *
 * Do not edit these values unless the site owner explicitly asks to reposition
 * the hero illustration. Vertical placement is computed in Hero.jsx from
 * `.hero__line-gap` so the artwork’s waist line sits between the two body
 * paragraphs. Horizontal placement uses the values below.
 *
 * @see .cursor/rules/hero-portrait.mdc
 */
export const HERO_PORTRAIT_LOCK = Object.freeze({
  version: 1,
  imageSrc: '/images/keri-hero-line-art.png',

  // PNG waist-line row (1536×1024)
  lineYRatio: 722 / 1024,
  gapOffsetPx: -14,

  scale: 1.2,
  translateX: '-7%',
  sizePercent: 155,

  wrapLeft: '51ch',
  wrapRight: '-1rem',
  wrapTopFallback: '9.5rem',

  figureXRatio: 0.32,
  headlineClearancePx: 12,
  maxHeadlineNudgePx: 48,

  lineGapHeight: '2.75rem',
})
