import React, { useEffect, useState } from 'react'

interface HeroSectionProps {
  onCalculateClick: () => void
  onExploreClick: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCalculateClick,
  onExploreClick,
}) => {
  const [scrollY, setScrollY] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', handleMotionChange)

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Clamped scroll-driven transforms (progress 0 to 1 across first 600px)
  const progress = Math.min(Math.max(scrollY / 600, 0), 1)

  const upperLineTranslateX = prefersReducedMotion ? 0 : progress * 24
  const lowerLineTranslateX = prefersReducedMotion ? 0 : -progress * 24

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - var(--nav-height))',
        marginTop: 'var(--nav-height)',
        backgroundColor: 'var(--color-ground-secondary)',
        overflow: 'hidden',
        isolation: 'isolate',
        borderBottom: '1px solid var(--color-rule)',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label="Hero Section"
    >
      {/* Background architectural grid hairlines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(to right, var(--color-rule) 1px, transparent 1px), linear-gradient(to bottom, var(--color-rule) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          opacity: 0.35,
          zIndex: 0,
        }}
      />

      <div
        className="hero-inner"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 24px',
          minHeight: 'calc(100vh - var(--nav-height) - 40px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 2,
        }}
      >
        {/* Top Eyebrow Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--color-rule)',
            paddingBottom: '16px',
          }}
        >
          <span className="mono-label">BODY MEASUREMENTS / 01</span>
          <span className="mono-label" style={{ opacity: 0.75 }}>
            ISO 80000-3 STANDARD RATIO
          </span>
        </div>

        {/* Hero Main Content Row */}
        <div
          className="hero-content-row"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '24px',
            marginBottom: '24px',
          }}
        >
          {/* Left Copy Stack */}
          <div
            className="hero-copy-stack"
            style={{
              maxWidth: '560px',
              zIndex: 10,
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(36px, 4.6vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '24px',
              }}
            >
              Understand your body.{' '}
              <span className="italic-accent">Find your balance.</span>
            </h1>

            <p
              className="mono-lede"
              style={{
                marginBottom: '32px',
                maxWidth: '460px',
              }}
            >
              Body Mass Index provides an objective, standardized screening
              ratio calibrated to adult stature. Evaluate your metrics with
              mathematical rigor, healthy weight boundaries, and nonjudgmental
              clinical education.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              <button
                type="button"
                className="btn-primary"
                onClick={onCalculateClick}
              >
                CALCULATE MY BMI
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={onExploreClick}
              >
                EXPLORE THE SCIENCE
              </button>
            </div>
          </div>

          {/* Right Visual: stacked wordmark (no video / body image) */}
          <div
            className="hero-bracket-container"
            style={{
              position: 'relative',
              width: '540px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <div
              className="hero-wordmark"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(56px, 8vw, 104px)',
                lineHeight: 0.82,
                color: 'var(--color-ink)',
                userSelect: 'none',
                pointerEvents: 'none',
                transform: `translate3d(${upperLineTranslateX}px, 0, 0)`,
                transition: prefersReducedMotion ? 'none' : 'transform 0.05s linear',
              }}
            >
              BMI
            </div>

            <div
              className="hero-wordmark"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(56px, 8vw, 104px)',
                lineHeight: 0.82,
                color: 'var(--color-ink)',
                userSelect: 'none',
                pointerEvents: 'none',
                transform: `translate3d(${lowerLineTranslateX}px, 0, 0)`,
                transition: prefersReducedMotion ? 'none' : 'transform 0.05s linear',
              }}
            >
              Calculator<span style={{ color: 'var(--color-accent)' }}>.</span>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Corner Pinned Caption */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid var(--color-rule)',
            paddingTop: '16px',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '32px' }}>
            <div>
              <div className="mono-label" style={{ fontSize: '9.5px' }}>
                FORMULA
              </div>
              <div className="mono-num" style={{ fontSize: '11px', color: 'var(--color-ink)' }}>
                kg / m² (QUETELET INDEX)
              </div>
            </div>
            <div>
              <div className="mono-label" style={{ fontSize: '9.5px' }}>
                STANDARD RANGE
              </div>
              <div className="mono-num" style={{ fontSize: '11px', color: 'var(--color-ink)' }}>
                18.5 – 24.9 kg/m²
              </div>
            </div>
          </div>

          <div
            className="mono-label"
            style={{
              fontSize: '10px',
              color: 'var(--color-muted)',
              textAlign: 'right',
            }}
          >
            REF. NO. 01 / STATISTICAL SCREENING CALIBRATION
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-content-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 40px !important;
          }
          .hero-bracket-container {
            width: 100% !important;
            align-items: flex-start !important;
          }
          .hero-wordmark {
            font-size: 64px !important;
          }
        }
      `}</style>
    </section>
  )
}
