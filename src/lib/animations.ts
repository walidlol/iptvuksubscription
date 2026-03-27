/**
 * animations.ts — Framer Motion variant library
 *
 * CLAUDE.md §5 Animation Rules:
 *   • whileHover: scale 1.02, y -2  |  whileTap: scale 0.98
 *   • Spring: stiffness 400, damping 25
 *   • Entrance ease: [0.22, 1, 0.36, 1] (ease-out-expo)
 *   • viewport: once: true, margin: "-100px"
 *   • Never animate layout properties — only transform and opacity
 */

import type { Variants, Transition } from 'framer-motion'

// ─── Shared easing & spring presets ─────────────────────────────────────────

/** Custom ease-out-expo used for all section entrances */
export const EASE_ENTRANCE = [0.22, 1, 0.36, 1] as const

/** Spring config for all micro-interactions (hover, tap, etc.) */
export const SPRING: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
}

/** Smooth spring for larger layout motions */
export const SPRING_SMOOTH: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
}

/** Shared viewport config — fire once, 100px before element enters view */
export const defaultViewport = {
  once: true,
  margin: '-100px',
} as const

// ─── Fade variants ───────────────────────────────────────────────────────────

/**
 * fadeUp — section entrance animation
 * opacity 0→1, translateY 30→0, duration 0.6s, ease-out-expo
 * CLAUDE.md: initial { opacity:0, y:30 } whileInView { opacity:1, y:0 }
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_ENTRANCE,
    },
  },
}

/**
 * fadeIn — simple opacity fade
 * opacity 0→1, duration 0.4s
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_ENTRANCE },
  },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_ENTRANCE },
  },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_ENTRANCE },
  },
}

// ─── Stagger container ───────────────────────────────────────────────────────

/**
 * staggerContainer — wraps a list to stagger child entrances
 * staggerChildren: 0.1s, delayChildren: 0.2s
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
}

// ─── Card interaction ────────────────────────────────────────────────────────

/**
 * cardHover — CLAUDE.md §5 mandatory spec
 * whileHover: scale 1.02, y -2 | whileTap: scale 0.98 | spring 400/25
 */
export const cardHover = {
  scale: 1.02,
  y: -2,
  transition: SPRING,
} as const

export const cardTap = {
  scale: 0.98,
  transition: SPRING,
} as const

/** Full card variant object for use with initial/animate/whileHover/whileTap */
export const cardVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -2, transition: SPRING },
  tap:   { scale: 0.98,        transition: SPRING },
}

// ─── Section entrance (named alias) ─────────────────────────────────────────

/**
 * sectionEntrance — use with whileInView + defaultViewport
 *
 * Usage:
 *   <motion.section
 *     variants={sectionEntrance}
 *     initial="hidden"
 *     whileInView="visible"
 *     viewport={defaultViewport}
 *   />
 */
export const sectionEntrance: Variants = fadeUp

// ─── Navbar blur ─────────────────────────────────────────────────────────────

/**
 * navbarBlur — two states driven by scroll position
 * "top": transparent, no blur
 * "scrolled": frosted glass with border
 *
 * Usage:
 *   const controls = useAnimationControls()
 *   // on scroll: controls.start(scrollY > 10 ? 'scrolled' : 'top')
 *   <motion.nav animate={controls} variants={navbarBlur} />
 */
export const navbarBlur: Variants = {
  top: {
    backgroundColor: 'rgba(8, 9, 13, 0)',
    backdropFilter: 'blur(0px)',
    borderBottomColor: 'rgba(255,255,255,0)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  scrolled: {
    backgroundColor: 'rgba(22, 24, 32, 0.85)',
    backdropFilter: 'blur(20px)',
    borderBottomColor: 'rgba(255,255,255,0.08)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// ─── Hero sequence ───────────────────────────────────────────────────────────

export const heroHeadline: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_ENTRANCE } },
}

export const heroSubtext: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_ENTRANCE, delay: 0.15 } },
}

export const heroCTA: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_ENTRANCE, delay: 0.3 } },
}

// ─── Pricing card ─────────────────────────────────────────────────────────────

export const pricingCard: Variants = {
  hidden:  { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE_ENTRANCE } },
}

// ─── Modal / overlay ─────────────────────────────────────────────────────────

export const modalOverlay: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } },
}

export const modalContent: Variants = {
  hidden:  { opacity: 0, scale: 0.95, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: EASE_ENTRANCE } },
  exit:    { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.15, ease: 'easeIn' } },
}

// ─── FAQ accordion ────────────────────────────────────────────────────────────

export const accordionContent: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height:  { duration: 0.25, ease: 'easeInOut' },
      opacity: { duration: 0.15 },
    },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height:  { duration: 0.3, ease: EASE_ENTRANCE },
      opacity: { duration: 0.2, delay: 0.05 },
    },
  },
}

// ─── Stat counter ─────────────────────────────────────────────────────────────

export const statItem: Variants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_ENTRANCE } },
}
