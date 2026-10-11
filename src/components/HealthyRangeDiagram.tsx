import React from 'react'
import type { ReferenceWeightInterval } from '../types/bmi'

interface HealthyRangeDiagramProps {
  reference: ReferenceWeightInterval
  heightDisplay: string
  currentWeightDisplay: string
  currentWeightVal: number
}

export const HealthyRangeDiagram: React.FC<HealthyRangeDiagramProps> = ({
  reference,
  heightDisplay,
  currentWeightDisplay,
  currentWeightVal,
}) => {
  const { lowerDisplay, upperDisplay, unit, status } = reference

  // Calculate dynamic axis range that fits lower, upper, and user weight comfortably
  const span = upperDisplay - lowerDisplay
  const minAxis = Math.max(0, Math.min(lowerDisplay - span * 0.4, currentWeightVal - span * 0.2))
  const maxAxis = Math.max(upperDisplay + span * 0.4, currentWeightVal + span * 0.2)
  const totalAxisSpan = maxAxis - minAxis

  const lowerPct = ((lowerDisplay - minAxis) / totalAxisSpan) * 100
  const upperPct = ((upperDisplay - minAxis) / totalAxisSpan) * 100
  const widthPct = upperPct - lowerPct

  const clampedWeight = Math.min(Math.max(currentWeightVal, minAxis), maxAxis)
  const weightPct = ((clampedWeight - minAxis) / totalAxisSpan) * 100

  return (
    <div
      style={{
        marginTop: '36px',
        border: '1px solid var(--color-rule)',
        padding: '32px 24px',
        backgroundColor: 'var(--color-ground)',
      }}
      aria-label="Healthy Adult Reference-Weight Interval"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <span className="mono-label">STATISTICAL REFERENCE WEIGHT / 02</span>
          <h4 style={{ fontSize: '20px', marginTop: '4px' }}>
            Reference Interval for Stature ({heightDisplay})
          </h4>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color:
              status === 'within'
                ? '#15803d'
                : 'var(--color-accent)',
            fontWeight: 600,
          }}
        >
          STATUS: CURRENT WEIGHT IS {status.toUpperCase()} REFERENCE INTERVAL
        </div>
      </div>

      <p
        className="mono-lede"
        style={{ fontSize: '12px', maxWidth: '780px', marginBottom: '36px' }}
      >
        Standard adult BMI reference-weight interval for your height: calculated
        between 18.5 × h² and 24.9 × h². This benchmark reflects statistical
        correlations across adult populations rather than an individualized
        optimal target. Individual targets depend on body composition, clinical
        biomarkers, and medical consultation.
      </p>

      {/* Numerical Stats Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
          borderBottom: '1px solid var(--color-rule)',
          paddingBottom: '24px',
        }}
      >
        <div>
          <span className="mono-label" style={{ fontSize: '10px' }}>
            LOWER BOUNDARY (18.5 × h²)
          </span>
          <div className="mono-num" style={{ fontSize: '22px', marginTop: '2px' }}>
            {lowerDisplay} <span style={{ fontSize: '13px' }}>{unit}</span>
          </div>
        </div>

        <div>
          <span className="mono-label" style={{ fontSize: '10px' }}>
            UPPER BOUNDARY (24.9 × h²)
          </span>
          <div className="mono-num" style={{ fontSize: '22px', marginTop: '2px' }}>
            {upperDisplay} <span style={{ fontSize: '13px' }}>{unit}</span>
          </div>
        </div>

        <div>
          <span className="mono-label" style={{ fontSize: '10px' }}>
            YOUR CURRENT WEIGHT
          </span>
          <div
            className="mono-num"
            style={{ fontSize: '22px', marginTop: '2px', color: 'var(--color-accent)' }}
          >
            {currentWeightDisplay}
          </div>
        </div>
      </div>

      {/* Horizontal Interval Diagram */}
      <div style={{ position: 'relative', margin: '48px 0 28px 0' }}>
        {/* User Weight Marker */}
        <div
          style={{
            position: 'absolute',
            left: `${weightPct}%`,
            top: '-36px',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
            transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-ink)',
              color: 'var(--color-ground)',
              padding: '2px 8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            CURRENT: {currentWeightDisplay}
          </div>
          <div
            style={{
              width: '1px',
              height: '14px',
              backgroundColor: 'var(--color-ink)',
              marginTop: '2px',
            }}
          />
        </div>

        {/* Track Line */}
        <div
          style={{
            height: '18px',
            width: '100%',
            backgroundColor: 'rgba(26,25,23,0.06)',
            border: '1px solid var(--color-rule-heavy)',
            position: 'relative',
          }}
        >
          {/* Shaded Reference Interval Block */}
          <div
            style={{
              position: 'absolute',
              left: `${lowerPct}%`,
              width: `${widthPct}%`,
              top: 0,
              bottom: 0,
              backgroundColor: 'rgba(21, 128, 61, 0.22)',
              borderLeft: '2px solid #15803d',
              borderRight: '2px solid #15803d',
            }}
          />

          {/* Marker Vertical Line */}
          <div
            style={{
              position: 'absolute',
              left: `${weightPct}%`,
              top: '-4px',
              bottom: '-4px',
              width: '2px',
              backgroundColor: 'var(--color-accent)',
              transform: 'translateX(-50%)',
              transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>

        {/* Labels under Track */}
        <div
          style={{
            position: 'relative',
            height: '24px',
            marginTop: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-ink-secondary)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `${lowerPct}%`,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <span>{lowerDisplay} {unit}</span>
          </div>

          <div
            style={{
              position: 'absolute',
              left: `${upperPct}%`,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <span>{upperDisplay} {unit}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
