import React from 'react'

interface FooterProps {
  onBackToCalculator: () => void
  onExploreMethod: () => void
}

export const Footer: React.FC<FooterProps> = ({
  onBackToCalculator,
  onExploreMethod,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      id="about"
      style={{
        backgroundColor: 'var(--color-ground-secondary)',
        borderTop: '1px solid var(--color-rule)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="no-print"
      role="contentinfo"
      aria-label="Site Footer"
    >
      <div className="section-shell" style={{ paddingBottom: '32px' }}>
        {/* Editorial Closing Block */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '40px',
            marginBottom: '64px',
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <span className="mono-label" style={{ marginBottom: '12px', display: 'block' }}>
              CONCLUSION &amp; DISCLOSURE / 06
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 4.4vw, 54px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
              }}
            >
              Better understanding{' '}
              <span className="italic-accent">begins with better information.</span>
            </h2>
            <p
              className="mono-lede"
              style={{ maxWidth: '520px', marginBottom: '28px' }}
            >
              Physical metrics provide a compass, not a verdict. Use standard
              stature-to-mass ratios as an objective checkpoint to inform
              sustainable movement, intentional nutrition, and restorative rest.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={onBackToCalculator}
              >
                RETURN TO CALCULATOR
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={onExploreMethod}
              >
                EXPLORE THE FORMULA
              </button>
            </div>
          </div>

          {/* Clinical Disclaimer Block */}
          <div
            style={{
              maxWidth: '420px',
              border: '1px solid var(--color-rule)',
              padding: '24px',
              backgroundColor: 'var(--color-ground)',
            }}
          >
            <span
              className="mono-label"
              style={{ fontSize: '10px', color: 'var(--color-accent)', display: 'block', marginBottom: '8px' }}
            >
              MEDICAL DISCLAIMER
            </span>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                lineHeight: 1.6,
                color: 'var(--color-ink-secondary)',
              }}
            >
              The calculations, scales, and guidance provided by FORM / BMI are
              engineered strictly for educational, informational, and general
              wellness screening. They do not constitute personalized medical
              diagnoses, treatment protocols, or dietary prescriptions. Always
              consult a licensed physician or registered dietitian regarding
              personal health decisions.
            </p>
          </div>
        </div>

        {/* Hairline Divider & Metadata Nav */}
        <div
          style={{
            borderTop: '1px solid var(--color-rule)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <div className="mono-label" style={{ fontSize: '10.5px' }}>
            FORM / BMI — OPEN SOURCE EDITORIAL BODY SCREENING SUITE
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span className="mono-label" style={{ fontSize: '10px' }}>
              ISO 80000-3 COMPLIANT
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="btn-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              aria-label="Scroll back to top of page"
            >
              ↑ BACK TO TOP
            </button>
          </div>
        </div>
      </div>

      {/* Signature Large Cropped Wordmark Bookending the Hero */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 0.72,
          marginBottom: '-0.17em',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(90px, 22vw, 320px)',
            color: 'var(--color-ink)',
            opacity: 0.88,
            letterSpacing: '-0.025em',
            whiteSpace: 'nowrap',
          }}
        >
          FORM / BMI<span style={{ color: 'var(--color-accent)' }}>.</span>
        </div>
      </div>
    </footer>
  )
}
