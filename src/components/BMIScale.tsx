import React from 'react'
import type { BMICategory } from '../types/bmi'

interface BMIScaleProps {
  bmi: number
  category: BMICategory
  displayBmi: string
}

export const BMIScale: React.FC<BMIScaleProps> = ({
  bmi,
  category,
  displayBmi,
}) => {
  // Continuous mathematical plotting interval: [14.0, 40.0]
  const SCALE_MIN = 14.0
  const SCALE_MAX = 40.0
  const TOTAL_RANGE = SCALE_MAX - SCALE_MIN

  // Clamped position for the marker
  const isClampedMin = bmi < SCALE_MIN
  const isClampedMax = bmi > SCALE_MAX
  const clampedBmi = Math.min(Math.max(bmi, SCALE_MIN), SCALE_MAX)
  const markerPercent = ((clampedBmi - SCALE_MIN) / TOTAL_RANGE) * 100

  // Category segment spans strictly proportional to numerical value
  const underweightWidthPct = ((18.5 - 14.0) / TOTAL_RANGE) * 100 // 4.5 / 26 ≈ 17.31%
  const healthyWidthPct = ((25.0 - 18.5) / TOTAL_RANGE) * 100 // 6.5 / 26 ≈ 25.0%
  const overweightWidthPct = ((30.0 - 25.0) / TOTAL_RANGE) * 100 // 5.0 / 26 ≈ 19.23%
  const obesityWidthPct = ((40.0 - 30.0) / TOTAL_RANGE) * 100 // 10.0 / 26 ≈ 38.46%

  // Boundary markers relative positions
  const tick18_5Pct = underweightWidthPct
  const tick25Pct = underweightWidthPct + healthyWidthPct
  const tick30Pct = tick25Pct + overweightWidthPct

  return (
    <div
      style={{
        marginTop: '36px',
        border: '1px solid var(--color-rule)',
        padding: '32px 24px',
        backgroundColor: 'var(--color-ground-secondary)',
      }}
      aria-label="Proportional BMI Scale Visualization"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <span className="mono-label">PROPORTIONAL SCALE / MATHEMATICAL CONTINUUM</span>
          <h4 style={{ fontSize: '20px', marginTop: '4px' }}>
            Adult Category Continuum
          </h4>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className="mono-label" style={{ fontSize: '10px' }}>
            SCALE RANGE: 14.0 – 40.0 kg/m²
          </span>
          {isClampedMin && (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-accent)',
              }}
            >
              [Marker pinned to lower scale bound: Actual BMI is {displayBmi}]
            </div>
          )}
          {isClampedMax && (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-accent)',
              }}
            >
              [Marker pinned to upper scale bound: Actual BMI is {displayBmi}]
            </div>
          )}
        </div>
      </div>

      {/* Main Track & Segments */}
      <div style={{ position: 'relative', margin: '48px 0 36px 0' }}>
        {/* Dynamic User Marker */}
        <div
          style={{
            position: 'absolute',
            left: `${markerPercent}%`,
            top: '-38px',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
            transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
        >
          {/* Readout tag */}
          <div
            style={{
              backgroundColor: 'var(--color-ink)',
              color: 'var(--color-ground)',
              padding: '2px 8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>YOU: {displayBmi}</span>
            <span style={{ color: 'var(--color-accent)' }}>•</span>
          </div>
          {/* Downward indicator pointer */}
          <div
            style={{
              width: '1px',
              height: '14px',
              backgroundColor: 'var(--color-ink)',
              marginTop: '2px',
            }}
          />
        </div>

        {/* Proportional Segmented Track */}
        <div
          style={{
            display: 'flex',
            height: '24px',
            width: '100%',
            border: '1px solid var(--color-ink)',
            position: 'relative',
            backgroundColor: '#ffffff',
          }}
        >
          {/* 1. Underweight Segment */}
          <div
            style={{
              width: `${underweightWidthPct}%`,
              backgroundColor: category === 'underweight' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(26,25,23,0.04)',
              borderRight: '1px solid var(--color-ink)',
              position: 'relative',
            }}
            title="Underweight (< 18.5)"
          />

          {/* 2. Healthy Weight Segment */}
          <div
            style={{
              width: `${healthyWidthPct}%`,
              backgroundColor: category === 'healthy' ? 'rgba(21, 128, 61, 0.18)' : 'rgba(26,25,23,0.04)',
              borderRight: '1px solid var(--color-ink)',
              position: 'relative',
            }}
            title="Healthy Weight (18.5 – 24.9)"
          />

          {/* 3. Overweight Segment */}
          <div
            style={{
              width: `${overweightWidthPct}%`,
              backgroundColor: category === 'overweight' ? 'rgba(202, 138, 4, 0.18)' : 'rgba(26,25,23,0.04)',
              borderRight: '1px solid var(--color-ink)',
              position: 'relative',
            }}
            title="Overweight (25.0 – 29.9)"
          />

          {/* 4. Obesity Segment */}
          <div
            style={{
              width: `${obesityWidthPct}%`,
              backgroundColor: category === 'obesity' ? 'rgba(185, 28, 28, 0.16)' : 'rgba(26,25,23,0.04)',
              position: 'relative',
            }}
            title="Obesity (≥ 30.0)"
          />

          {/* Marker vertical hairline through track */}
          <div
            style={{
              position: 'absolute',
              left: `${markerPercent}%`,
              top: 0,
              bottom: 0,
              width: '2px',
              backgroundColor: 'var(--color-accent)',
              transform: 'translateX(-50%)',
              transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>

        {/* Boundary Ticks and Labels Below Track */}
        <div
          style={{
            position: 'relative',
            height: '36px',
            marginTop: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            color: 'var(--color-ink-secondary)',
          }}
        >
          {/* 14.0 start */}
          <div style={{ position: 'absolute', left: '0%', transform: 'none' }}>
            <span style={{ display: 'block', fontSize: '9px', color: 'var(--color-muted)' }}>MIN</span>
            <span>14.0</span>
          </div>

          {/* 18.5 boundary */}
          <div
            style={{
              position: 'absolute',
              left: `${tick18_5Pct}%`,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <div style={{ width: '1px', height: '6px', backgroundColor: 'var(--color-rule-heavy)', margin: '0 auto 2px' }} />
            <span>18.5</span>
          </div>

          {/* 25.0 boundary */}
          <div
            style={{
              position: 'absolute',
              left: `${tick25Pct}%`,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <div style={{ width: '1px', height: '6px', backgroundColor: 'var(--color-rule-heavy)', margin: '0 auto 2px' }} />
            <span style={{ fontWeight: 600 }}>25.0</span>
          </div>

          {/* 30.0 boundary */}
          <div
            style={{
              position: 'absolute',
              left: `${tick30Pct}%`,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <div style={{ width: '1px', height: '6px', backgroundColor: 'var(--color-rule-heavy)', margin: '0 auto 2px' }} />
            <span style={{ fontWeight: 600 }}>30.0</span>
          </div>

          {/* 40.0 end */}
          <div
            style={{
              position: 'absolute',
              right: '0%',
              transform: 'none',
              textAlign: 'right',
            }}
          >
            <span style={{ display: 'block', fontSize: '9px', color: 'var(--color-muted)' }}>MAX</span>
            <span>40.0</span>
          </div>
        </div>
      </div>

      {/* Category Labels Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          borderTop: '1px solid var(--color-rule)',
          paddingTop: '20px',
        }}
      >
        <div style={{ opacity: category === 'underweight' ? 1 : 0.65 }}>
          <div
            className="mono-label"
            style={{
              fontSize: '10px',
              color: category === 'underweight' ? 'var(--color-accent)' : 'var(--color-muted)',
            }}
          >
            &lt; 18.5
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px' }}>
            Underweight
          </div>
        </div>

        <div style={{ opacity: category === 'healthy' ? 1 : 0.65 }}>
          <div
            className="mono-label"
            style={{
              fontSize: '10px',
              color: category === 'healthy' ? 'var(--color-accent)' : 'var(--color-muted)',
            }}
          >
            18.5 – 24.9
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px' }}>
            Healthy weight
          </div>
        </div>

        <div style={{ opacity: category === 'overweight' ? 1 : 0.65 }}>
          <div
            className="mono-label"
            style={{
              fontSize: '10px',
              color: category === 'overweight' ? 'var(--color-accent)' : 'var(--color-muted)',
            }}
          >
            25.0 – 29.9
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px' }}>
            Overweight
          </div>
        </div>

        <div style={{ opacity: category === 'obesity' ? 1 : 0.65 }}>
          <div
            className="mono-label"
            style={{
              fontSize: '10px',
              color: category === 'obesity' ? 'var(--color-accent)' : 'var(--color-muted)',
            }}
          >
            ≥ 30.0
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px' }}>
            Obesity
          </div>
        </div>
      </div>
    </div>
  )
}
