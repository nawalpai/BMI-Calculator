import React, { useState, useEffect, useRef } from 'react'

interface PinnedStudyProps {
  userHeightM?: number
}

export const PinnedStudy: React.FC<PinnedStudyProps> = ({ userHeightM }) => {
  // Stature test interval: 140 cm (1.40 m) to 205 cm (2.05 m)
  const MIN_H = 1.4
  const MAX_H = 2.05

  const initialH = userHeightM && userHeightM >= MIN_H && userHeightM <= MAX_H
    ? userHeightM
    : 1.75

  const [prevUserHeight, setPrevUserHeight] = useState(userHeightM)
  const [heightM, setHeightM] = useState<number>(initialH)
  const [isSyncWithUser, setIsSyncWithUser] = useState<boolean>(!!userHeightM)
  const sectionRef = useRef<HTMLElement>(null)

  // Sync state with props during render
  if (userHeightM !== prevUserHeight) {
    setPrevUserHeight(userHeightM)
    if (userHeightM && isSyncWithUser) {
      setHeightM(userHeightM)
    }
  }

  // Derive all readouts strictly from the stated model:
  // Lower = 18.5 * h²
  // Upper = 24.9 * h²
  const hSq = heightM * heightM
  const lowerKg = Math.round(18.5 * hSq * 10) / 10
  const upperKg = Math.round(24.9 * hSq * 10) / 10
  const midKg = Math.round(((lowerKg + upperKg) / 2) * 10) / 10

  // Imperial conversions
  const lowerLbs = Math.round(lowerKg * 2.20462 * 10) / 10
  const upperLbs = Math.round(upperKg * 2.20462 * 10) / 10

  // Scroll listener inside section to allow scrubbing via scroll as well as manual slider
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isSyncWithUser) return
      const rect = sectionRef.current.getBoundingClientRect()
      const totalDist = sectionRef.current.offsetHeight - window.innerHeight
      if (totalDist <= 0) return

      const progress = Math.min(Math.max(-rect.top / totalDist, 0), 1)
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const computedH = MIN_H + progress * (MAX_H - MIN_H)
        setHeightM(Math.round(computedH * 100) / 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isSyncWithUser])

  // Coordinate calculations for SVG curve:
  // Plotting h from 1.4 to 2.05 against weight from 30kg to 110kg
  const svgMinH = 1.4
  const svgMaxH = 2.05
  const svgMinW = 30
  const svgMaxW = 110

  const getSvgX = (h: number) => 40 + ((h - svgMinH) / (svgMaxH - svgMinH)) * 460
  const getSvgY = (w: number) => 300 - ((w - svgMinW) / (svgMaxW - svgMinW)) * 260

  const currentMarkerX = getSvgX(heightM)
  const currentLowerY = getSvgY(lowerKg)
  const currentUpperY = getSvgY(upperKg)

  // Generate SVG path points for lower (18.5) and upper (24.9) curves
  const steps = 15
  let lowerPathStr = ''
  let upperPathStr = ''
  for (let i = 0; i <= steps; i++) {
    const h = svgMinH + (i / steps) * (svgMaxH - svgMinH)
    const lW = 18.5 * h * h
    const uW = 24.9 * h * h
    const x = getSvgX(h)
    const yL = getSvgY(lW)
    const yU = getSvgY(uW)
    if (i === 0) {
      lowerPathStr = `M ${x} ${yL}`
      upperPathStr = `M ${x} ${yU}`
    } else {
      lowerPathStr += ` L ${x} ${yL}`
      upperPathStr += ` L ${x} ${yU}`
    }
  }

  return (
    <section
      id="study"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-ground-secondary)',
        borderBottom: '1px solid var(--color-rule)',
      }}
      aria-labelledby="study-heading"
    >
      <div className="section-shell">
        <div style={{ marginBottom: '36px' }}>
          <div className="mono-label" style={{ marginBottom: '12px' }}>
            COMPUTED STUDY / 03
          </div>
          <h2
            id="study-heading"
            style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', lineHeight: 1.1 }}
          >
            The Height-Mass Quadratic Arc
          </h2>
          <p
            className="mono-lede"
            style={{ maxWidth: '680px', marginTop: '12px' }}
          >
            Explore how the adult healthy reference-weight boundaries scale
            strictly as a function of stature squared: Lower = 18.5 × h² and Upper =
            24.9 × h². Every point on the curve is computed in real time from this
            stated model.
          </p>
        </div>

        {/* Interactive Stature Control Strip */}
        <div
          style={{
            border: '1px solid var(--color-rule)',
            padding: '24px',
            backgroundColor: 'var(--color-ground)',
            marginBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="mono-label" style={{ color: 'var(--color-accent)' }}>
                STATURE SCRUBBER:
              </span>
              <span className="mono-num" style={{ fontSize: '18px', fontWeight: 600 }}>
                {Math.round(heightM * 100)} cm ({Math.floor((heightM * 39.37) / 12)} ft {Math.round((heightM * 39.37) % 12)} in)
              </span>
            </div>

            {userHeightM && (
              <button
                type="button"
                onClick={() => {
                  setIsSyncWithUser(!isSyncWithUser)
                  if (!isSyncWithUser) setHeightM(userHeightM)
                }}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '10px' }}
              >
                {isSyncWithUser ? 'CALIBRATED TO YOUR HEIGHT' : 'RE-SYNC TO MY HEIGHT'}
              </button>
            )}
          </div>

          {/* Range Slider */}
          <input
            type="range"
            min={MIN_H}
            max={MAX_H}
            step="0.01"
            value={heightM}
            onChange={(e) => {
              setIsSyncWithUser(false)
              setHeightM(parseFloat(e.target.value))
            }}
            style={{
              width: '100%',
              accentColor: 'var(--color-ink)',
              cursor: 'ew-resize',
            }}
            aria-label="Adjust height to evaluate reference interval"
          />
        </div>

        {/* Mathematical Readouts Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          <div style={{ border: '1px solid var(--color-rule)', padding: '20px', backgroundColor: 'var(--color-ground)' }}>
            <span className="mono-label" style={{ fontSize: '10px' }}>
              STATURE SQUARED (h²)
            </span>
            <div className="mono-num" style={{ fontSize: '24px', marginTop: '4px' }}>
              {hSq.toFixed(4)} <span style={{ fontSize: '13px' }}>m²</span>
            </div>
            <span className="mono-label" style={{ fontSize: '9px', opacity: 0.7 }}>
              MODEL DENOMINATOR
            </span>
          </div>

          <div style={{ border: '1px solid var(--color-rule)', padding: '20px', backgroundColor: 'var(--color-ground)' }}>
            <span className="mono-label" style={{ fontSize: '10px', color: '#15803d' }}>
              LOWER BOUNDARY (18.5 × h²)
            </span>
            <div className="mono-num" style={{ fontSize: '24px', marginTop: '4px' }}>
              {lowerKg} <span style={{ fontSize: '13px' }}>kg</span> / {lowerLbs} <span style={{ fontSize: '13px' }}>lbs</span>
            </div>
            <span className="mono-label" style={{ fontSize: '9px', opacity: 0.7 }}>
              BMI 18.5 CUTOFF
            </span>
          </div>

          <div style={{ border: '1px solid var(--color-rule)', padding: '20px', backgroundColor: 'var(--color-ground)' }}>
            <span className="mono-label" style={{ fontSize: '10px', color: '#ca8a04' }}>
              UPPER BOUNDARY (24.9 × h²)
            </span>
            <div className="mono-num" style={{ fontSize: '24px', marginTop: '4px' }}>
              {upperKg} <span style={{ fontSize: '13px' }}>kg</span> / {upperLbs} <span style={{ fontSize: '13px' }}>lbs</span>
            </div>
            <span className="mono-label" style={{ fontSize: '9px', opacity: 0.7 }}>
              BMI 24.9 CUTOFF
            </span>
          </div>

          <div style={{ border: '1px solid var(--color-rule)', padding: '20px', backgroundColor: 'var(--color-ground)' }}>
            <span className="mono-label" style={{ fontSize: '10px', color: 'var(--color-accent)' }}>
              MIDPOINT REFERENCE
            </span>
            <div className="mono-num" style={{ fontSize: '24px', marginTop: '4px' }}>
              {midKg} <span style={{ fontSize: '13px' }}>kg</span>
            </div>
            <span className="mono-label" style={{ fontSize: '9px', opacity: 0.7 }}>
              BMI ≈ 21.7 CENTER
            </span>
          </div>
        </div>

        {/* Live SVG Graph with Synchronized Curves & Active Coordinate Marker */}
        <div
          style={{
            border: '1px solid var(--color-rule)',
            padding: '24px',
            backgroundColor: 'var(--color-ground)',
            overflowX: 'auto',
          }}
        >
          <div className="mono-label" style={{ marginBottom: '16px' }}>
            SYNCHRONIZED CARTESIAN PROJECTION: STATURE (m) vs MASS (kg)
          </div>

          <svg
            viewBox="0 0 540 340"
            width="100%"
            height="340"
            style={{ overflow: 'visible' }}
            role="img"
            aria-label="Cartesian graph plotting height vs healthy adult reference weight boundaries"
          >
            {/* Grid hairlines */}
            {[40, 60, 80, 100].map((w) => {
              const y = getSvgY(w)
              return (
                <g key={w}>
                  <line x1="40" y1={y} x2="500" y2={y} stroke="var(--color-rule)" strokeWidth="1" strokeDasharray="2 4" />
                  <text x="32" y={y + 3} textAnchor="end" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-muted)">
                    {w}kg
                  </text>
                </g>
              )
            })}

            {[1.5, 1.7, 1.9].map((h) => {
              const x = getSvgX(h)
              return (
                <g key={h}>
                  <line x1={x} y1="40" x2={x} y2="300" stroke="var(--color-rule)" strokeWidth="1" strokeDasharray="2 4" />
                  <text x={x} y="318" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-muted)">
                    {h}m
                  </text>
                </g>
              )
            })}

            {/* Healthy interval shaded polygon */}
            <polygon
              points={`
                ${getSvgX(1.4)},${getSvgY(18.5 * 1.4 * 1.4)}
                ${steps > 0 ? Array.from({ length: steps + 1 }).map((_, i) => {
                  const h = svgMinH + (i / steps) * (svgMaxH - svgMinH)
                  return `${getSvgX(h)},${getSvgY(24.9 * h * h)}`
                }).join(' ') : ''}
                ${getSvgX(2.05)},${getSvgY(18.5 * 2.05 * 2.05)}
                ${Array.from({ length: steps + 1 }).reverse().map((_, i) => {
                  const h = svgMaxH - (i / steps) * (svgMaxH - svgMinH)
                  return `${getSvgX(h)},${getSvgY(18.5 * h * h)}`
                }).join(' ')}
              `}
              fill="rgba(21, 128, 61, 0.08)"
            />

            {/* Lower Bound curve (18.5) */}
            <path d={lowerPathStr} fill="none" stroke="#15803d" strokeWidth="2" />
            {/* Upper Bound curve (24.9) */}
            <path d={upperPathStr} fill="none" stroke="#ca8a04" strokeWidth="2" />

            {/* Active Stature Vertical Hairline */}
            <line
              x1={currentMarkerX}
              y1="40"
              x2={currentMarkerX}
              y2="300"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
            />

            {/* Synchronized Markers on lower and upper curves */}
            <circle cx={currentMarkerX} cy={currentLowerY} r="4.5" fill="#15803d" />
            <circle cx={currentMarkerX} cy={currentUpperY} r="4.5" fill="#ca8a04" />
            <circle cx={currentMarkerX} cy={getSvgY(midKg)} r="4" fill="var(--color-accent)" />

            {/* Active Marker Label Callout */}
            <g transform={`translate(${currentMarkerX > 380 ? currentMarkerX - 140 : currentMarkerX + 12}, ${currentLowerY - 20})`}>
              <rect x="0" y="0" width="130" height="54" fill="var(--color-ground-secondary)" stroke="var(--color-ink)" strokeWidth="1" />
              <text x="8" y="16" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" fill="var(--color-ink)">
                h = {(heightM * 100).toFixed(0)}cm
              </text>
              <text x="8" y="32" fontFamily="var(--font-mono)" fontSize="9" fill="#15803d">
                Lower: {lowerKg}kg
              </text>
              <text x="8" y="46" fontFamily="var(--font-mono)" fontSize="9" fill="#ca8a04">
                Upper: {upperKg}kg
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
