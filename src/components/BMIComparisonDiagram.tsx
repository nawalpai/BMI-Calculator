import React, { useState } from 'react'

export const BMIComparisonDiagram: React.FC = () => {
  const [activeCircle, setActiveCircle] = useState<'bmi' | 'composition' | 'health' | 'all'>('all')

  return (
    <div
      style={{
        marginTop: '36px',
        border: '1px solid var(--color-rule)',
        padding: '36px 28px',
        backgroundColor: 'var(--color-ground-secondary)',
      }}
      aria-label="Venn Diagram comparing BMI Classification, Body Composition, and Overall Health"
    >
      <div style={{ marginBottom: '24px' }}>
        <span className="mono-label">CONCEPTUAL INTERSECTION / 03</span>
        <h4 style={{ fontSize: '22px', marginTop: '4px' }}>
          Three Distinct Domains of Anatomical Evaluation
        </h4>
        <p className="mono-lede" style={{ fontSize: '12px', marginTop: '8px', maxWidth: '720px' }}>
          BMI classification, physiological body composition, and holistic health
          correlate across populations, but they are not interchangeable metrics.
          Explore how each domain functions independently.
        </p>
      </div>

      <div
        className="venn-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: '36px',
          alignItems: 'center',
        }}
      >
        {/* SVG Three-Circle Venn Diagram */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '440px',
            margin: '0 auto',
            aspectRatio: '1 / 1',
          }}
        >
          <svg
            viewBox="0 0 400 400"
            width="100%"
            height="100%"
            style={{ overflow: 'visible' }}
            role="img"
            aria-label="Venn diagram showing three overlapping circles representing BMI, Body Composition, and Overall Health"
          >
            {/* Circle 1: Top - BMI Classification */}
            <circle
              cx="200"
              cy="150"
              r="110"
              fill={activeCircle === 'bmi' || activeCircle === 'all' ? 'rgba(155, 52, 24, 0.08)' : 'rgba(26,25,23,0.03)'}
              stroke={activeCircle === 'bmi' ? 'var(--color-accent)' : 'var(--color-ink)'}
              strokeWidth={activeCircle === 'bmi' ? '2.5' : '1.2'}
              strokeDasharray={activeCircle === 'bmi' ? 'none' : '4 2'}
              style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
              onClick={() => setActiveCircle('bmi')}
            />

            {/* Circle 2: Bottom Left - Body Composition */}
            <circle
              cx="135"
              cy="255"
              r="110"
              fill={activeCircle === 'composition' || activeCircle === 'all' ? 'rgba(21, 128, 61, 0.08)' : 'rgba(26,25,23,0.03)'}
              stroke={activeCircle === 'composition' ? '#15803d' : 'var(--color-ink)'}
              strokeWidth={activeCircle === 'composition' ? '2.5' : '1.2'}
              style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
              onClick={() => setActiveCircle('composition')}
            />

            {/* Circle 3: Bottom Right - Overall Health */}
            <circle
              cx="265"
              cy="255"
              r="110"
              fill={activeCircle === 'health' || activeCircle === 'all' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(26,25,23,0.03)'}
              stroke={activeCircle === 'health' ? '#3b82f6' : 'var(--color-ink)'}
              strokeWidth={activeCircle === 'health' ? '2.5' : '1.2'}
              style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
              onClick={() => setActiveCircle('health')}
            />

            {/* Labels inside Venn */}
            <text
              x="200"
              y="115"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fontWeight="600"
              letterSpacing="0.12em"
              fill="var(--color-ink)"
            >
              BMI SCREENING
            </text>

            <text
              x="105"
              y="285"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fontWeight="600"
              letterSpacing="0.12em"
              fill="var(--color-ink)"
            >
              BODY
            </text>
            <text
              x="105"
              y="300"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10"
              letterSpacing="0.12em"
              fill="var(--color-ink)"
            >
              COMPOSITION
            </text>

            <text
              x="295"
              y="285"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fontWeight="600"
              letterSpacing="0.12em"
              fill="var(--color-ink)"
            >
              OVERALL
            </text>
            <text
              x="295"
              y="300"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10"
              letterSpacing="0.12em"
              fill="var(--color-ink)"
            >
              HEALTH
            </text>

            {/* Center intersection marker */}
            <circle
              cx="200"
              cy="225"
              r="5"
              fill="var(--color-accent)"
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveCircle('all')}
            />
            <text
              x="200"
              y="245"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="8"
              letterSpacing="0.15em"
              fill="var(--color-accent)"
              fontWeight="600"
            >
              INTERSECTION
            </text>
          </svg>
        </div>

        {/* Right Explanatory Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Card 1 */}
          <div
            onClick={() => setActiveCircle('bmi')}
            style={{
              padding: '16px',
              border: '1px solid var(--color-rule)',
              backgroundColor: activeCircle === 'bmi' ? 'var(--color-ground)' : 'transparent',
              borderLeft: activeCircle === 'bmi' ? '3px solid var(--color-accent)' : '1px solid var(--color-rule)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div className="mono-label" style={{ fontSize: '10px', color: 'var(--color-accent)' }}>
              01 / BMI CLASSIFICATION
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginTop: '2px' }}>
              Screening Ratio
            </div>
            <p className="mono-lede" style={{ fontSize: '11.5px', marginTop: '6px' }}>
              Calculated purely from height and total body weight. Fast, universally
              standardized, and non-invasive. Does not measure body fat, bone mass,
              or muscle tissue distribution directly.
            </p>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => setActiveCircle('composition')}
            style={{
              padding: '16px',
              border: '1px solid var(--color-rule)',
              backgroundColor: activeCircle === 'composition' ? 'var(--color-ground)' : 'transparent',
              borderLeft: activeCircle === 'composition' ? '3px solid #15803d' : '1px solid var(--color-rule)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div className="mono-label" style={{ fontSize: '10px', color: '#15803d' }}>
              02 / BODY COMPOSITION
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginTop: '2px' }}>
              Tissue Architecture
            </div>
            <p className="mono-lede" style={{ fontSize: '11.5px', marginTop: '6px' }}>
              Differentiates between lean muscle, bone mineral content, subcutaneous fat,
              and visceral adipose tissue. Evaluated via DEXA scans, hydrostatic weighing,
              or skinfold measurements—never directly from BMI.
            </p>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => setActiveCircle('health')}
            style={{
              padding: '16px',
              border: '1px solid var(--color-rule)',
              backgroundColor: activeCircle === 'health' ? 'var(--color-ground)' : 'transparent',
              borderLeft: activeCircle === 'health' ? '3px solid #3b82f6' : '1px solid var(--color-rule)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div className="mono-label" style={{ fontSize: '10px', color: '#3b82f6' }}>
              03 / OVERALL HEALTH
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginTop: '2px' }}>
              Multivariate Wellness
            </div>
            <p className="mono-lede" style={{ fontSize: '11.5px', marginTop: '6px' }}>
              Governed by cardiovascular fitness, blood lipids, blood pressure, glycemic
              regulation, sleep quality, stress levels, and genetic predisposition. A person
              can have optimal metabolic markers at various BMI numbers.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .venn-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
