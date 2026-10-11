import React, { useState } from 'react'
import type { BMIResultData } from '../types/bmi'
import { copyReportToClipboard } from '../utils/clipboard'
import { getCategoryDescription } from '../utils/formatters'
import { BMIScale } from './BMIScale'
import { HealthyRangeDiagram } from './HealthyRangeDiagram'
import { BMIComparisonDiagram } from './BMIComparisonDiagram'
import { PersonalizedGuidance } from './PersonalizedGuidance'

interface BMIResultProps {
  result: BMIResultData
}

export const BMIResult: React.FC<BMIResultProps> = ({ result }) => {
  const [viewMode, setViewMode] = useState<'quick' | 'detailed'>('quick')
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null)

  const handleCopy = async () => {
    const success = await copyReportToClipboard(result)
    if (success) {
      setCopyFeedback('COPIED TO CLIPBOARD')
      setTimeout(() => setCopyFeedback(null), 2500)
    } else {
      setCopyFeedback('FAILED TO COPY')
      setTimeout(() => setCopyFeedback(null), 2500)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <section
      id="result-stage"
      style={{
        backgroundColor: 'var(--color-ground)',
        borderBottom: '1px solid var(--color-rule)',
        padding: '80px 24px',
      }}
      aria-live="polite"
      role="region"
      aria-label="BMI Result Analysis"
    >
      <div className="section-shell" style={{ padding: 0 }}>
        {/* Header Strip & View Switcher */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottom: '1px solid var(--color-rule)',
            paddingBottom: '16px',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <span className="mono-label">EVALUATION SUMMARY / 01</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', marginTop: '4px' }}>
              Your Result & Analysis
            </h2>
          </div>

          {/* Quick vs Detailed Mode Switcher & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', border: '1px solid var(--color-rule-heavy)' }}>
              <button
                type="button"
                onClick={() => setViewMode('quick')}
                style={{
                  padding: '6px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor:
                    viewMode === 'quick' ? 'var(--color-ink)' : 'transparent',
                  color:
                    viewMode === 'quick' ? 'var(--color-ground)' : 'var(--color-ink)',
                }}
              >
                QUICK SUMMARY
              </button>
              <button
                type="button"
                onClick={() => setViewMode('detailed')}
                style={{
                  padding: '6px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  border: 'none',
                  borderLeft: '1px solid var(--color-rule-heavy)',
                  cursor: 'pointer',
                  backgroundColor:
                    viewMode === 'detailed' ? 'var(--color-ink)' : 'transparent',
                  color:
                    viewMode === 'detailed'
                      ? 'var(--color-ground)'
                      : 'var(--color-ink)',
                }}
              >
                DETAILED VIEW
              </button>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '10px' }}
                aria-label="Copy result report to clipboard"
              >
                {copyFeedback ? copyFeedback : 'COPY REPORT'}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '10px' }}
                aria-label="Print report"
              >
                PRINT REPORT
              </button>
            </div>
          </div>
        </div>

        {/* Infant / Pediatric Cohort Alerts */}
        {result.isInfant ? (
          <div
            style={{
              padding: '24px',
              border: '1px solid var(--color-accent)',
              backgroundColor: 'var(--color-ground-secondary)',
              marginBottom: '32px',
            }}
          >
            <div className="mono-label" style={{ color: 'var(--color-accent)', marginBottom: '8px' }}>
              PEDIATRIC SAFETY NOTICE / INFANT COHORT (&lt; 2 YEARS)
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>
              Standard BMI is not utilized for infants.
            </h3>
            <p className="mono-lede">
              For children under 2 years of age, medical standards rely on WHO
              weight-for-length percentiles and head circumference measurements
              administered by a pediatrician. Adult mathematical categories do not apply.
            </p>
          </div>
        ) : result.isPediatric ? (
          <div
            style={{
              padding: '24px',
              border: '1px solid var(--color-rule-heavy)',
              borderLeft: '4px solid var(--color-accent)',
              backgroundColor: 'var(--color-ground-secondary)',
              marginBottom: '32px',
            }}
          >
            <div className="mono-label" style={{ color: 'var(--color-accent)', marginBottom: '8px' }}>
              DEVELOPMENTAL NOTICE / YOUTH COHORT (AGE 2–19)
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>
              Calculated Value: {result.displayBmi} — Requires Growth Percentiles
            </h3>
            <p className="mono-lede">
              For individuals aged 2–19, body composition changes dynamically with
              pubertal development and bone maturation. BMI must be plotted on CDC or WHO
              age-and-sex specific percentile growth curves rather than adult threshold boxes.
              Please consult a pediatric healthcare provider for clinical assessment.
            </p>
          </div>
        ) : null}

        {/* Primary Adult Result Highlight Panel */}
        {!result.isInfant && (
          <div
            style={{
              border: '1px solid var(--color-ink)',
              padding: '40px 32px',
              backgroundColor: 'var(--color-ground-secondary)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
              gap: '40px',
              alignItems: 'center',
            }}
            className="result-main-card"
          >
            <div>
              <span className="mono-label" style={{ color: 'var(--color-accent)' }}>
                CALCULATED ADULT BMI
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(64px, 8vw, 108px)',
                  lineHeight: 0.9,
                  marginTop: '4px',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em',
                }}
              >
                {result.displayBmi}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span className="mono-label" style={{ fontSize: '11px' }}>
                  CLASSIFICATION:
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '16px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--color-ink)',
                  }}
                >
                  {result.categoryLabel}
                </span>
              </div>

              <p
                className="mono-lede"
                style={{ marginTop: '12px', fontSize: '13px', maxWidth: '480px' }}
              >
                {getCategoryDescription(result.category)}
              </p>
            </div>

            {/* Parameter Matrix */}
            <div
              style={{
                borderLeft: '1px solid var(--color-rule)',
                paddingLeft: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
              className="result-meta-column"
            >
              <div>
                <span className="mono-label" style={{ fontSize: '10px' }}>
                  RECORDED HEIGHT
                </span>
                <div className="mono-num" style={{ fontSize: '16px' }}>
                  {result.enteredHeightDisplay} ({(result.enteredHeightM * 100).toFixed(1)} cm)
                </div>
              </div>

              <div>
                <span className="mono-label" style={{ fontSize: '10px' }}>
                  RECORDED WEIGHT
                </span>
                <div className="mono-num" style={{ fontSize: '16px' }}>
                  {result.enteredWeightDisplay} ({result.enteredWeightKg.toFixed(1)} kg)
                </div>
              </div>

              <div>
                <span className="mono-label" style={{ fontSize: '10px' }}>
                  STANDARD REFERENCE INTERVAL
                </span>
                <div className="mono-num" style={{ fontSize: '16px' }}>
                  18.5 – 24.9 kg/m²
                </div>
              </div>

              <div>
                <span className="mono-label" style={{ fontSize: '10px' }}>
                  BIOLOGICAL CONTEXT
                </span>
                <div className="mono-num" style={{ fontSize: '13px', color: 'var(--color-ink-secondary)' }}>
                  Age: {result.age} • Reference: {result.sex}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 1. BMIScale Component */}
        <BMIScale
          bmi={result.rawBmi}
          category={result.category}
          displayBmi={result.displayBmi}
        />

        {/* 2. Healthy Range Diagram Component */}
        <HealthyRangeDiagram
          reference={result.referenceWeight}
          heightDisplay={result.enteredHeightDisplay}
          currentWeightDisplay={result.enteredWeightDisplay}
          currentWeightVal={
            result.weightUnit === 'kg'
              ? result.enteredWeightKg
              : result.enteredWeightKg * 2.20462
          }
        />

        {/* 3. Detailed View Extra Sections */}
        {viewMode === 'detailed' && (
          <div
            style={{
              marginTop: '36px',
              border: '1px solid var(--color-rule)',
              padding: '32px 28px',
              backgroundColor: 'var(--color-ground)',
            }}
          >
            <span className="mono-label" style={{ color: 'var(--color-accent)' }}>
              MATHEMATICAL FORMULATION & BOUNDARY PROOF
            </span>
            <h4 style={{ fontSize: '22px', marginTop: '6px', marginBottom: '16px' }}>
              How your result was derived
            </h4>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12.5px',
                lineHeight: 1.8,
                color: 'var(--color-ink-secondary)',
              }}
            >
              <p>
                <strong>Unrounded quotient:</strong>{' '}
                {result.enteredWeightKg.toFixed(4)} kg / ({result.enteredHeightM.toFixed(4)} m)² ={' '}
                <strong>{result.rawBmi.toFixed(5)} kg/m²</strong>
              </p>
              <p>
                <strong>Displayed rounded quotient:</strong> {result.displayBmi} kg/m² (ISO 80000-3 display convention)
              </p>
              <p>
                <strong>Classification logic:</strong> Evaluation is conducted strictly on
                unrounded precision against international cut-offs: &lt;18.5 (underweight),
                18.5–24.999 (healthy), 25.0–29.999 (overweight), and ≥30.0 (obesity).
              </p>
            </div>
          </div>
        )}

        {/* 4. Three-Circle Venn Comparison Diagram */}
        <BMIComparisonDiagram />

        {/* 5. Personalized Guidance Section */}
        {!result.isInfant && !result.isPediatric && (
          <PersonalizedGuidance category={result.category} />
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .result-main-card {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .result-meta-column {
            border-left: none !important;
            border-top: 1px solid var(--color-rule) !important;
            padding-left: 0 !important;
            padding-top: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
