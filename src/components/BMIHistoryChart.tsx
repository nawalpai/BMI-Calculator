import React, { useState } from 'react'
import type { BMIHistoryEntry } from '../types/bmi'
import {
  deleteHistoryItem,
  clearAllHistory,
  downloadHistoryCSV,
  downloadHistoryJSON,
} from '../utils/history'

interface BMIHistoryChartProps {
  history: BMIHistoryEntry[]
  onHistoryUpdate: (updated: BMIHistoryEntry[]) => void
  onSelectEntry?: (entry: BMIHistoryEntry) => void
}

// Illustrative demo entries if user has no or 1 entry
const DEMO_ENTRIES: BMIHistoryEntry[] = [
  {
    id: 'demo_1',
    timestamp: Date.now() - 150 * 24 * 3600 * 1000,
    dateDisplay: '5 mos ago',
    bmi: 27.8,
    displayBmi: '27.8',
    category: 'overweight',
    categoryLabel: 'OVERWEIGHT',
    age: 30,
    sex: 'unspecified',
    enteredHeightDisplay: '175 cm',
    enteredWeightDisplay: '85.1 kg',
    heightM: 1.75,
    weightKg: 85.1,
    heightUnit: 'cm',
    weightUnit: 'kg',
  },
  {
    id: 'demo_2',
    timestamp: Date.now() - 100 * 24 * 3600 * 1000,
    dateDisplay: '3 mos ago',
    bmi: 26.5,
    displayBmi: '26.5',
    category: 'overweight',
    categoryLabel: 'OVERWEIGHT',
    age: 30,
    sex: 'unspecified',
    enteredHeightDisplay: '175 cm',
    enteredWeightDisplay: '81.2 kg',
    heightM: 1.75,
    weightKg: 81.2,
    heightUnit: 'cm',
    weightUnit: 'kg',
  },
  {
    id: 'demo_3',
    timestamp: Date.now() - 50 * 24 * 3600 * 1000,
    dateDisplay: '1 mo ago',
    bmi: 25.1,
    displayBmi: '25.1',
    category: 'overweight',
    categoryLabel: 'OVERWEIGHT',
    age: 30,
    sex: 'unspecified',
    enteredHeightDisplay: '175 cm',
    enteredWeightDisplay: '76.9 kg',
    heightM: 1.75,
    weightKg: 76.9,
    heightUnit: 'cm',
    weightUnit: 'kg',
  },
  {
    id: 'demo_4',
    timestamp: Date.now(),
    dateDisplay: 'Recent',
    bmi: 24.2,
    displayBmi: '24.2',
    category: 'healthy',
    categoryLabel: 'HEALTHY WEIGHT',
    age: 30,
    sex: 'unspecified',
    enteredHeightDisplay: '175 cm',
    enteredWeightDisplay: '74.1 kg',
    heightM: 1.75,
    weightKg: 74.1,
    heightUnit: 'cm',
    weightUnit: 'kg',
  },
]

export const BMIHistoryChart: React.FC<BMIHistoryChartProps> = ({
  history,
  onHistoryUpdate,
  onSelectEntry,
}) => {
  const [showDemo, setShowDemo] = useState(false)
  const [hoveredEntry, setHoveredEntry] = useState<BMIHistoryEntry | null>(null)

  const activeList = history.length >= 2 ? history : showDemo ? DEMO_ENTRIES : history
  const isDemonstration = history.length < 2 && showDemo

  const handleDelete = (id: string) => {
    const updated = deleteHistoryItem(id)
    onHistoryUpdate(updated)
  }

  const handleClear = () => {
    if (window.confirm('Clear all recorded BMI history from this browser?')) {
      clearAllHistory()
      onHistoryUpdate([])
    }
  }

  // Statistical summary derived from active list
  const bmis = activeList.map((e) => e.bmi)
  const latestBmi = bmis.length > 0 ? activeList[0].displayBmi : '—'
  const lowestBmi = bmis.length > 0 ? Math.min(...bmis).toFixed(1) : '—'
  const highestBmi = bmis.length > 0 ? Math.max(...bmis).toFixed(1) : '—'

  // SVG Chart bounds
  const chartW = 700
  const chartH = 260
  const padLeft = 50
  const padRight = 30
  const padTop = 30
  const padBottom = 40

  const plotW = chartW - padLeft - padRight
  const plotH = chartH - padTop - padBottom

  const minBmi = 15
  const maxBmi = 35
  const bmiRange = maxBmi - minBmi

  const getY = (val: number) => {
    const clamped = Math.min(Math.max(val, minBmi), maxBmi)
    return padTop + plotH - ((clamped - minBmi) / bmiRange) * plotH
  }

  // Reverse list for chronological display left-to-right
  const chronological = [...activeList].reverse()

  const getX = (index: number, count: number) => {
    if (count <= 1) return padLeft + plotW / 2
    return padLeft + (index / (count - 1)) * plotW
  }

  // SVG line points
  const points = chronological.map((e, idx) => ({
    x: getX(idx, chronological.length),
    y: getY(e.bmi),
    entry: e,
  }))

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <section
      id="history"
      style={{
        backgroundColor: 'var(--color-ground)',
        borderBottom: '1px solid var(--color-rule)',
      }}
      aria-labelledby="history-heading"
    >
      <div className="section-shell">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div className="mono-label" style={{ marginBottom: '8px' }}>
              LONGITUDINAL TRACKING / 02
            </div>
            <h2
              id="history-heading"
              style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', lineHeight: 1.1 }}
            >
              Measurement History &amp; Trajectory
            </h2>
            <p
              className="mono-lede"
              style={{ maxWidth: '640px', marginTop: '10px' }}
            >
              Track your screening history over time. Data remains stored
              strictly in your device's browser memory with full privacy.
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {history.length < 2 && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowDemo(!showDemo)}
                style={{ padding: '8px 14px', fontSize: '10.5px' }}
              >
                {showDemo ? 'HIDE SAMPLE DEMO' : 'VIEW SAMPLE TRAJECTORY'}
              </button>
            )}

            {history.length > 0 && (
              <>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => downloadHistoryCSV(history)}
                  style={{ padding: '8px 14px', fontSize: '10.5px' }}
                  title="Download CSV file for Excel or Sheets"
                >
                  EXPORT CSV
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => downloadHistoryJSON(history)}
                  style={{ padding: '8px 14px', fontSize: '10.5px' }}
                  title="Download raw JSON data"
                >
                  EXPORT JSON
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleClear}
                  style={{ padding: '8px 14px', fontSize: '10.5px', color: 'var(--color-accent)' }}
                  title="Clear local history"
                >
                  CLEAR ALL
                </button>
              </>
            )}
          </div>
        </div>

        {/* Demo Notice Banner */}
        {isDemonstration && (
          <div
            style={{
              padding: '12px 18px',
              border: '1px solid var(--color-rule-heavy)',
              borderLeft: '4px solid var(--color-accent)',
              backgroundColor: 'var(--color-ground-secondary)',
              marginBottom: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-ink-secondary)',
            }}
          >
            <strong>DEMONSTRATION MODE ACTIVE:</strong> Showing an illustrative 4-point
            progression. Perform 2 or more real calculations to view your personal
            live curve.
          </div>
        )}

        {/* Key Metrics Banner */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div style={{ border: '1px solid var(--color-rule)', padding: '16px', backgroundColor: 'var(--color-ground-secondary)' }}>
            <span className="mono-label" style={{ fontSize: '9.5px' }}>LATEST RECORDED</span>
            <div className="mono-num" style={{ fontSize: '26px', marginTop: '4px' }}>
              {latestBmi}
            </div>
            <span className="mono-label" style={{ fontSize: '9px', opacity: 0.7 }}>CURRENT LEVEL</span>
          </div>

          <div style={{ border: '1px solid var(--color-rule)', padding: '16px', backgroundColor: 'var(--color-ground-secondary)' }}>
            <span className="mono-label" style={{ fontSize: '9.5px', color: '#15803d' }}>LOWEST VALUE</span>
            <div className="mono-num" style={{ fontSize: '26px', marginTop: '4px' }}>
              {lowestBmi}
            </div>
            <span className="mono-label" style={{ fontSize: '9px', opacity: 0.7 }}>MINIMUM RECORD</span>
          </div>

          <div style={{ border: '1px solid var(--color-rule)', padding: '16px', backgroundColor: 'var(--color-ground-secondary)' }}>
            <span className="mono-label" style={{ fontSize: '9.5px', color: '#ca8a04' }}>HIGHEST VALUE</span>
            <div className="mono-num" style={{ fontSize: '26px', marginTop: '4px' }}>
              {highestBmi}
            </div>
            <span className="mono-label" style={{ fontSize: '9px', opacity: 0.7 }}>MAXIMUM RECORD</span>
          </div>

          <div style={{ border: '1px solid var(--color-rule)', padding: '16px', backgroundColor: 'var(--color-ground-secondary)' }}>
            <span className="mono-label" style={{ fontSize: '9.5px' }}>ENTRIES RECORDED</span>
            <div className="mono-num" style={{ fontSize: '26px', marginTop: '4px' }}>
              {activeList.length}
            </div>
            <span className="mono-label" style={{ fontSize: '9px', opacity: 0.7 }}>TOTAL SAMPLES</span>
          </div>
        </div>

        {/* Interactive SVG Chart Container */}
        {activeList.length >= 1 ? (
          <div
            style={{
              border: '1px solid var(--color-rule)',
              padding: '24px',
              backgroundColor: 'var(--color-ground-secondary)',
              position: 'relative',
              overflowX: 'auto',
              marginBottom: '36px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <span className="mono-label" style={{ fontSize: '10.5px' }}>
                CHRONOLOGICAL TRAJECTORY (BMI vs TIME)
              </span>
              <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                <span style={{ color: '#15803d' }}>■ Healthy Zone (18.5 – 24.9)</span>
                <span style={{ color: '#ca8a04' }}>■ Overweight (25.0 – 29.9)</span>
              </div>
            </div>

            <svg
              viewBox={`0 0 ${chartW} ${chartH}`}
              width="100%"
              height="260"
              style={{ overflow: 'visible' }}
              role="img"
              aria-label="BMI history trend chart showing measurements across dates"
            >
              {/* Category Reference Bands */}
              {/* Healthy Weight Band: 18.5 to 25.0 */}
              <rect
                x={padLeft}
                y={getY(25.0)}
                width={plotW}
                height={getY(18.5) - getY(25.0)}
                fill="rgba(21, 128, 61, 0.08)"
              />

              {/* Overweight Band: 25.0 to 30.0 */}
              <rect
                x={padLeft}
                y={getY(30.0)}
                width={plotW}
                height={getY(25.0) - getY(30.0)}
                fill="rgba(202, 138, 4, 0.06)"
              />

              {/* Horizontal Reference Grid Lines */}
              {[18.5, 25.0, 30.0].map((thr) => {
                const y = getY(thr)
                return (
                  <g key={thr}>
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={padLeft + plotW}
                      y2={y}
                      stroke="var(--color-rule-heavy)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={padLeft - 8}
                      y={y + 3}
                      textAnchor="end"
                      fontFamily="var(--font-mono)"
                      fontSize="9.5"
                      fill="var(--color-muted)"
                    >
                      {thr.toFixed(1)}
                    </text>
                  </g>
                )
              })}

              {/* Connecting Polyline if 2+ points */}
              {points.length >= 2 && (
                <polyline
                  fill="none"
                  stroke="var(--color-ink)"
                  strokeWidth="2"
                  points={polylinePoints}
                />
              )}

              {/* Data points */}
              {points.map((p, idx) => (
                <g key={idx}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredEntry?.id === p.entry.id ? '6.5' : '4.5'}
                    fill={p.entry.category === 'healthy' ? '#15803d' : 'var(--color-accent)'}
                    stroke="var(--color-ink)"
                    strokeWidth="1.5"
                    style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                    onMouseEnter={() => setHoveredEntry(p.entry)}
                    onMouseLeave={() => setHoveredEntry(null)}
                  />
                  {/* Date label under X-axis */}
                  <text
                    x={p.x}
                    y={chartH - 12}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="9.5"
                    fill="var(--color-ink-secondary)"
                  >
                    {p.entry.dateDisplay.split(',')[0]}
                  </text>
                </g>
              ))}

              {/* Hover Tooltip Callout */}
              {hoveredEntry && (
                <g
                  transform={`translate(${
                    points.find((p) => p.entry.id === hoveredEntry.id)?.x || padLeft
                  }, ${
                    (points.find((p) => p.entry.id === hoveredEntry.id)?.y || padTop) - 40
                  })`}
                >
                  <rect
                    x="-65"
                    y="-10"
                    width="130"
                    height="32"
                    fill="var(--color-ink)"
                    stroke="var(--color-ink)"
                  />
                  <text
                    x="0"
                    y="6"
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="10"
                    fontWeight="600"
                    fill="var(--color-ground)"
                  >
                    BMI {hoveredEntry.displayBmi} • {hoveredEntry.enteredWeightDisplay}
                  </text>
                </g>
              )}
            </svg>
          </div>
        ) : (
          <div
            style={{
              padding: '48px 24px',
              border: '1px dashed var(--color-rule-heavy)',
              textAlign: 'center',
              backgroundColor: 'var(--color-ground-secondary)',
              marginBottom: '32px',
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '8px' }}>
              No calculations recorded yet
            </div>
            <p className="mono-lede" style={{ maxWidth: '420px', margin: '0 auto 20px' }}>
              Enter your measurements in the calculator above and click "Calculate BMI".
              Your entries will automatically be plotted here.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setShowDemo(true)}
              style={{ fontSize: '10.5px' }}
            >
              PREVIEW SAMPLE TRAJECTORY
            </button>
          </div>
        )}

        {/* History Log List */}
        {history.length > 0 && (
          <div>
            <div className="mono-label" style={{ marginBottom: '16px' }}>
              RECORDED LOG ({history.length} ENTRIES)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {history.map((item) => (
                <div
                  key={item.id}
                  style={{
                    borderTop: '1px solid var(--color-rule)',
                    padding: '16px 0',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.2fr) minmax(0, 1.5fr) auto',
                    gap: '16px',
                    alignItems: 'center',
                  }}
                  className="history-row"
                >
                  <div>
                    <span className="mono-label" style={{ fontSize: '9px' }}>
                      {item.dateDisplay}
                    </span>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px' }}>
                      BMI {item.displayBmi}
                    </div>
                  </div>

                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        padding: '2px 6px',
                        border: '1px solid var(--color-rule-heavy)',
                        color:
                          item.category === 'healthy'
                            ? '#15803d'
                            : 'var(--color-accent)',
                        fontWeight: 600,
                      }}
                    >
                      {item.categoryLabel}
                    </span>
                  </div>

                  <div className="mono-num" style={{ fontSize: '12px', color: 'var(--color-ink-secondary)' }}>
                    Weight: {item.enteredWeightDisplay} • Height: {item.enteredHeightDisplay}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {onSelectEntry && (
                      <button
                        type="button"
                        onClick={() => onSelectEntry(item)}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '9.5px' }}
                        title="Load this measurement into the calculator"
                      >
                        RELOAD
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      style={{
                        background: 'none',
                        border: '1px solid var(--color-rule)',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9.5px',
                        color: 'var(--color-muted)',
                      }}
                      title="Delete this record"
                      aria-label="Delete entry"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ borderBottom: '1px solid var(--color-rule)' }} />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .history-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  )
}
