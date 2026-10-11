import React from 'react'
import type { BMIResultData } from '../types/bmi'
import { getCategoryDescription } from '../utils/formatters'

interface PrintReportProps {
  result: BMIResultData | null
}

export const PrintReport: React.FC<PrintReportProps> = ({ result }) => {
  if (!result) return null

  return (
    <div
      className="print-only"
      style={{
        padding: '32px',
        backgroundColor: '#ffffff',
        color: '#000000',
        fontFamily: 'Georgia, serif',
      }}
    >
      {/* Print Header */}
      <div
        style={{
          borderBottom: '2px solid #000000',
          paddingBottom: '16px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <div>
          <h1 style={{ fontSize: '28px', margin: 0, letterSpacing: '-0.02em' }}>
            FORM / BMI — CLINICAL SUMMARY REPORT
          </h1>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', margin: '4px 0 0 0' }}>
            Standardized Body Mass Index &amp; Stature-Calibrated Reference Analysis
          </p>
        </div>

        <div style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '11px' }}>
          <div>GENERATED: {result.calculatedAt}</div>
          <div>STATUS: SCREENING ONLY</div>
        </div>
      </div>

      {/* Patient / Subject Demographics */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '24px',
          fontFamily: 'monospace',
          fontSize: '12px',
        }}
      >
        <tbody>
          <tr style={{ borderBottom: '1px solid #cccccc' }}>
            <td style={{ padding: '8px 0', width: '25%' }}><strong>RECORDED AGE:</strong> {result.age} Yrs</td>
            <td style={{ padding: '8px 0', width: '25%' }}><strong>BIOLOGICAL SEX:</strong> {result.sex}</td>
            <td style={{ padding: '8px 0', width: '25%' }}><strong>STATURE:</strong> {result.enteredHeightDisplay}</td>
            <td style={{ padding: '8px 0', width: '25%' }}><strong>MASS:</strong> {result.enteredWeightDisplay}</td>
          </tr>
        </tbody>
      </table>

      {/* Primary Mathematical Finding */}
      <div
        style={{
          border: '1px solid #000000',
          padding: '20px',
          marginBottom: '24px',
          backgroundColor: '#fafafa',
        }}
      >
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#666666' }}>
          PRIMARY RESULT
        </div>
        <div style={{ fontSize: '42px', fontWeight: 'bold', margin: '6px 0' }}>
          BMI: {result.displayBmi}{' '}
          <span style={{ fontSize: '18px', fontWeight: 'normal', fontFamily: 'monospace' }}>
            ({result.categoryLabel})
          </span>
        </div>
        <p style={{ fontSize: '13px', margin: '6px 0 0 0' }}>
          {getCategoryDescription(result.category)}
        </p>
      </div>

      {/* Adult Reference Intervals */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', borderBottom: '1px solid #000000', paddingBottom: '4px', marginBottom: '10px' }}>
          Reference Intervals
        </h3>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'monospace',
            fontSize: '11px',
          }}
        >
          <tbody>
            <tr style={{ borderBottom: '1px solid #eeeeee' }}>
              <td style={{ padding: '6px 0' }}>Underweight</td>
              <td style={{ padding: '6px 0' }}>&lt; 18.5 kg/m²</td>
              <td style={{ padding: '6px 0' }}>Higher risk of nutrient deficiency and osteoporosis</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eeeeee' }}>
              <td style={{ padding: '6px 0' }}>Healthy Weight</td>
              <td style={{ padding: '6px 0' }}>18.5 – 24.9 kg/m²</td>
              <td style={{ padding: '6px 0' }}>Standard population reference interval</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eeeeee' }}>
              <td style={{ padding: '6px 0' }}>Overweight</td>
              <td style={{ padding: '6px 0' }}>25.0 – 29.9 kg/m²</td>
              <td style={{ padding: '6px 0' }}>Increased cardiovascular & metabolic vigilance</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eeeeee' }}>
              <td style={{ padding: '6px 0' }}>Obesity</td>
              <td style={{ padding: '6px 0' }}>≥ 30.0 kg/m²</td>
              <td style={{ padding: '6px 0' }}>Clinical medical consultation recommended</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Reference Weight for Height */}
      <div style={{ marginBottom: '28px', border: '1px solid #dddddd', padding: '16px' }}>
        <h4 style={{ fontSize: '14px', margin: '0 0 8px 0' }}>
          Stature-Calibrated Weight Interval for {result.enteredHeightDisplay}
        </h4>
        <p style={{ fontFamily: 'monospace', fontSize: '12px', margin: 0 }}>
          Healthy reference range (18.5 × h² to 24.9 × h²):{' '}
          <strong>
            {result.referenceWeight.lowerDisplay} – {result.referenceWeight.upperDisplay}{' '}
            {result.referenceWeight.unit}
          </strong>
        </p>
        <p style={{ fontFamily: 'monospace', fontSize: '11px', margin: '4px 0 0 0', color: '#555' }}>
          Subject's current recorded mass is{' '}
          <strong>{result.referenceWeight.status.toUpperCase()}</strong> this standard interval.
        </p>
      </div>

      {/* Clinical Disclaimer & Signoff */}
      <div
        style={{
          borderTop: '1px solid #000000',
          paddingTop: '12px',
          fontFamily: 'monospace',
          fontSize: '9.5px',
          color: '#444444',
          lineHeight: 1.5,
        }}
      >
        <p>
          <strong>DISCLAIMER &amp; LIMITATIONS:</strong> Body Mass Index is an indirect
          screening metric based on external dimensions. It does not assess adipose tissue
          distribution (visceral vs. subcutaneous), skeletal muscle mass, bone density, or
          biochemical biomarkers. This document does not constitute a medical diagnosis.
          Review with a licensed healthcare practitioner for comprehensive care.
        </p>
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
          <span>FORM / BMI REPORTING SERVICE</span>
          <span>DOCUMENT REF: FB-CLINICAL-SUMMARY</span>
        </div>
      </div>
    </div>
  )
}
