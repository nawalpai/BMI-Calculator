import React from 'react'

export const BMIExplanation: React.FC = () => {
  const methodRows = [
    {
      label: 'HISTORICAL ORIGIN',
      description: 'Conceived in 1835 by Belgian mathematician Adolphe Quetelet during social physics studies.',
      value: 'QUETELET INDEX (1835)',
    },
    {
      label: 'MATHEMATICAL FORMULA',
      description: 'Mass divided by stature squared. Normalizes weight relative to vertical surface dimension.',
      value: 'BMI = kg / m²',
    },
    {
      label: 'EPIDEMIOLOGICAL UTILITY',
      description: 'Used internationally by the WHO and CDC to survey population-level health trends and risk correlations.',
      value: 'SCREENING TOOL',
    },
    {
      label: 'ADIPOSITY LIMITATION',
      description: 'Cannot distinguish between dense skeletal muscle, skeletal bone mass, and adipose tissue volume.',
      value: 'NO TISSUE DIFFERENTIATION',
    },
    {
      label: 'REGIONAL DISTRIBUTION',
      description: 'Visceral abdominal fat carries higher cardiovascular risk than subcutaneous fat, yet BMI treats all mass equally.',
      value: 'NO FAT LOCALIZATION',
    },
    {
      label: 'ETHNIC & DEMOGRAPHIC SHIFTS',
      description: 'Health risks emerge at lower BMI thresholds (e.g. 23.0) in South Asian and East Asian adult populations.',
      value: 'POPULATION VARIANCE',
    },
    {
      label: 'PEDIATRIC PROGRESSION',
      description: 'Children and adolescents require growth curves (percentile charts) adjusting for sex and monthly developmental stage.',
      value: 'PERCENTILES 2–19 YRS',
    },
  ]

  return (
    <section
      id="method"
      style={{
        backgroundColor: 'var(--color-ground)',
        borderBottom: '1px solid var(--color-rule)',
      }}
      aria-labelledby="method-heading"
    >
      <div className="section-shell">
        <div style={{ marginBottom: '48px' }}>
          <div className="mono-label" style={{ marginBottom: '12px' }}>
            THE METHOD / 02
          </div>
          <h2
            id="method-heading"
            style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', lineHeight: 1.1 }}
          >
            The Science, Formula &amp; Clinical Boundaries
          </h2>
          <p
            className="mono-lede"
            style={{ maxWidth: '640px', marginTop: '12px' }}
          >
            A rigorous exploration of the mathematical Quetelet formulation, why
            it remains the international screening standard, and its inherent
            physiological limitations.
          </p>
        </div>

        {/* 2 Columns: Definition Rows on Left, Scientific SVG Drawing on Right */}
        <div
          className="method-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Hairline-ruled Definition Rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {methodRows.map((row, idx) => (
              <div
                key={idx}
                style={{
                  borderTop: '1px solid var(--color-rule)',
                  padding: '20px 0',
                  display: 'grid',
                  gridTemplateColumns: '150px 1fr auto',
                  gap: '20px',
                  alignItems: 'baseline',
                }}
                className="definition-row"
              >
                <span
                  className="mono-label"
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-accent)',
                  }}
                >
                  {row.label}
                </span>

                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12.5px',
                    lineHeight: 1.6,
                    color: 'var(--color-ink-secondary)',
                  }}
                >
                  {row.description}
                </p>

                <span
                  className="mono-num"
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-ink)',
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
            <div style={{ borderBottom: '1px solid var(--color-rule)' }} />
          </div>

          {/* Right Column: Scientific Architectural SVG Illustration to scale */}
          <div
            style={{
              border: '1px solid var(--color-rule)',
              padding: '32px 24px',
              backgroundColor: 'var(--color-ground-secondary)',
              position: 'sticky',
              top: 'calc(var(--nav-height) + 24px)',
            }}
          >
            <div className="mono-label" style={{ marginBottom: '16px' }}>
              CONSTRUCTION GEOMETRY / QUETELET PROPORTION
            </div>

            <svg
              viewBox="0 0 320 360"
              width="100%"
              height="360"
              style={{ overflow: 'visible', margin: '16px 0' }}
              role="img"
              aria-label="Scientific geometry diagram demonstrating height squared relation to body mass"
            >
              {/* Construction hairline axes */}
              <line x1="40" y1="300" x2="300" y2="300" stroke="var(--color-rule-heavy)" strokeWidth="1" />
              <line x1="40" y1="300" x2="40" y2="40" stroke="var(--color-rule-heavy)" strokeWidth="1" />

              {/* Axis labels */}
              <text x="300" y="318" textAnchor="end" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-muted)">
                HEIGHT (h²)
              </text>
              <text x="35" y="35" textAnchor="end" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-muted)">
                MASS (kg)
              </text>

              {/* BMI Constant slope rays: 18.5, 25.0, 30.0 */}
              {/* Healthy lower bound slope: 18.5 */}
              <line x1="40" y1="300" x2="280" y2="160" stroke="#15803d" strokeWidth="1.5" />
              <text x="285" y="163" fontFamily="var(--font-mono)" fontSize="9" fill="#15803d" fontWeight="600">
                18.5 kg/m²
              </text>

              {/* Healthy upper bound slope: 25.0 */}
              <line x1="40" y1="300" x2="280" y2="105" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="285" y="108" fontFamily="var(--font-mono)" fontSize="9" fill="#ca8a04" fontWeight="600">
                25.0 kg/m²
              </text>

              {/* Obesity boundary slope: 30.0 */}
              <line x1="40" y1="300" x2="280" y2="60" stroke="#b91c1c" strokeWidth="1.5" />
              <text x="285" y="63" fontFamily="var(--font-mono)" fontSize="9" fill="#b91c1c" fontWeight="600">
                30.0 kg/m²
              </text>

              {/* Hairline geometric leaders */}
              <line x1="40" y1="180" x2="190" y2="180" stroke="var(--color-rule)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="190" y1="300" x2="190" y2="180" stroke="var(--color-rule)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="190" cy="180" r="3.5" fill="var(--color-accent)" />

              {/* Leader note */}
              <text x="195" y="174" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--color-accent)" fontWeight="600">
                (h², MASS) INTERCEPT
              </text>

              {/* Proportional human figure silhouette icon */}
              <g transform="translate(60, 60) scale(0.65)" opacity="0.6">
                <circle cx="30" cy="20" r="12" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
                <path d="M 12 40 L 48 40 L 44 95 L 34 95 L 34 160 L 26 160 L 26 95 L 16 95 Z" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
              </g>
            </svg>

            <div
              style={{
                borderTop: '1px solid var(--color-rule)',
                paddingTop: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                lineHeight: 1.6,
                color: 'var(--color-ink-secondary)',
              }}
            >
              Every boundary represents a constant slope (k = m / h²). As stature
              increases linearly, physiological surface area scales quadratically.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .method-grid {
            grid-template-columns: 1fr !important;
          }
          .definition-row {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          .definition-row span:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  )
}
