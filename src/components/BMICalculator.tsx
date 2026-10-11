import React, { useState } from 'react'
import type {
  BMIHistoryEntry,
  BMIResultData,
  BiologicalSex,
  HeightUnit,
  MeasurementInputs,
  ValidationErrors,
  WeightUnit,
} from '../types/bmi'
import {
  calculateBMI,
  convertHeightUnits,
  convertWeightUnits,
} from '../utils/bmi'
import { clearSavedMeasurements, saveMeasurements } from '../utils/storage'

interface BMICalculatorProps {
  initialInputs: MeasurementInputs
  onResultCalculated: (result: BMIResultData | null) => void
  selectedHistoryEntry?: BMIHistoryEntry | null
}

export const BMICalculator: React.FC<BMICalculatorProps> = ({
  initialInputs,
  onResultCalculated,
  selectedHistoryEntry,
}) => {
  const [inputs, setInputs] = useState<MeasurementInputs>(initialInputs)
  const [prevSelectedEntry, setPrevSelectedEntry] = useState<BMIHistoryEntry | null>(null)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [hasCalculated, setHasCalculated] = useState(false)

  // Sync with selected history reload request
  if (selectedHistoryEntry && selectedHistoryEntry !== prevSelectedEntry) {
    setPrevSelectedEntry(selectedHistoryEntry)
    let cm = ''
    let ft = ''
    let inch = ''
    if (selectedHistoryEntry.heightUnit === 'cm') {
      cm = Math.round(selectedHistoryEntry.heightM * 100).toString()
    } else {
      const totalInches = selectedHistoryEntry.heightM / 0.0254
      ft = Math.floor(totalInches / 12).toString()
      inch = (Math.round((totalInches % 12) * 10) / 10).toString()
    }

    let kg = ''
    let lbs = ''
    if (selectedHistoryEntry.weightUnit === 'kg') {
      kg = selectedHistoryEntry.weightKg.toFixed(1)
    } else {
      lbs = (selectedHistoryEntry.weightKg * 2.20462).toFixed(1)
    }

    setInputs((prev: MeasurementInputs) => ({
      ...prev,
      age: selectedHistoryEntry.age.toString(),
      sex: selectedHistoryEntry.sex,
      heightUnit: selectedHistoryEntry.heightUnit,
      weightUnit: selectedHistoryEntry.weightUnit,
      heightCm: cm,
      heightFt: ft,
      heightIn: inch,
      weightKg: kg,
      weightLbs: lbs,
    }))
  }

  // Height Unit Switcher
  const handleHeightUnitChange = (newUnit: HeightUnit) => {
    if (newUnit === inputs.heightUnit) return
    const converted = convertHeightUnits(
      inputs.heightUnit,
      newUnit,
      inputs.heightCm,
      inputs.heightFt,
      inputs.heightIn,
    )
    const updated: MeasurementInputs = {
      ...inputs,
      heightUnit: newUnit,
      heightCm: converted.heightCm,
      heightFt: converted.heightFt,
      heightIn: converted.heightIn,
    }
    setInputs(updated)
    if (updated.saveLocally) saveMeasurements(updated)

    // Recalculate if already calculated and valid
    if (hasCalculated) {
      const calc = calculateBMI(updated)
      if (calc.result) {
        onResultCalculated(calc.result)
      }
    }
  }

  // Weight Unit Switcher
  const handleWeightUnitChange = (newUnit: WeightUnit) => {
    if (newUnit === inputs.weightUnit) return
    const converted = convertWeightUnits(
      inputs.weightUnit,
      newUnit,
      inputs.weightKg,
      inputs.weightLbs,
    )
    const updated: MeasurementInputs = {
      ...inputs,
      weightUnit: newUnit,
      weightKg: converted.weightKg,
      weightLbs: converted.weightLbs,
    }
    setInputs(updated)
    if (updated.saveLocally) saveMeasurements(updated)

    // Recalculate if already calculated and valid
    if (hasCalculated) {
      const calc = calculateBMI(updated)
      if (calc.result) {
        onResultCalculated(calc.result)
      }
    }
  }

  const handleInputChange = (field: keyof MeasurementInputs, value: string | boolean | BiologicalSex) => {
    const updated = { ...inputs, [field]: value }
    setInputs(updated)

    // Clear inline error on change
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev: ValidationErrors) => ({ ...prev, [field]: undefined }))
    }

    if (updated.saveLocally) {
      saveMeasurements(updated)
    }

    // Auto-recalculate if user already submitted once
    if (hasCalculated) {
      const calc = calculateBMI(updated)
      if (calc.result) {
        onResultCalculated(calc.result)
        setErrors({})
      }
    }
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    const { result, errors: validationErrors } = calculateBMI(inputs)
    setErrors(validationErrors)

    if (result) {
      setHasCalculated(true)
      onResultCalculated(result)
      if (inputs.saveLocally) saveMeasurements(inputs)

      // Smooth scroll to result
      setTimeout(() => {
        const el = document.getElementById('result-stage')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else {
      onResultCalculated(null)
    }
  }

  const handleReset = () => {
    const blank: MeasurementInputs = {
      age: '',
      sex: 'unspecified',
      heightUnit: 'cm',
      weightUnit: 'kg',
      heightCm: '',
      heightFt: '',
      heightIn: '',
      weightKg: '',
      weightLbs: '',
      saveLocally: false,
    }
    setInputs(blank)
    setErrors({})
    setHasCalculated(false)
    clearSavedMeasurements()
    onResultCalculated(null)
  }

  return (
    <section
      id="calculator"
      style={{
        backgroundColor: 'var(--color-ground)',
        borderBottom: '1px solid var(--color-rule)',
      }}
      className="no-print"
      aria-labelledby="calculator-heading"
    >
      <div className="section-shell">
        {/* Section Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="mono-label" style={{ marginBottom: '12px' }}>
            PRECISION EVALUATION / 01
          </div>
          <h2
            id="calculator-heading"
            style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', lineHeight: 1.1 }}
          >
            Enter your measurements.
          </h2>
          <p
            className="mono-lede"
            style={{ maxWidth: '640px', marginTop: '12px' }}
          >
            Calculate adult Body Mass Index using certified metric or imperial
            standards. Conversions between international units remain losslessly
            calibrated.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div
          className="calculator-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Form Controls */}
          <form
            onSubmit={handleCalculate}
            noValidate
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
          >
            {/* Age & Sex Group */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.4fr',
                gap: '20px',
              }}
              className="age-sex-row"
            >
              {/* Age Field */}
              <div>
                <label
                  htmlFor="input-age"
                  className="mono-label"
                  style={{ display: 'block', marginBottom: '8px' }}
                >
                  Age (Years) *
                </label>
                <input
                  id="input-age"
                  type="number"
                  min="0"
                  max="120"
                  step="1"
                  placeholder="e.g. 28"
                  value={inputs.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`input-editorial ${errors.age ? 'error' : ''}`}
                  aria-invalid={!!errors.age}
                  aria-describedby={errors.age ? 'age-error' : undefined}
                  required
                />
                {errors.age && (
                  <span
                    id="age-error"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--color-accent)',
                      marginTop: '6px',
                    }}
                    role="alert"
                  >
                    {errors.age}
                  </span>
                )}
              </div>

              {/* Biological Reference / Sex Field */}
              <div>
                <label
                  htmlFor="input-sex"
                  className="mono-label"
                  style={{ display: 'block', marginBottom: '8px' }}
                >
                  Biological Sex (Optional)
                </label>
                <select
                  id="input-sex"
                  value={inputs.sex}
                  onChange={(e) =>
                    handleInputChange('sex', e.target.value as BiologicalSex)
                  }
                  className="input-editorial"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="unspecified">Prefer not to say</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--color-muted)',
                    marginTop: '6px',
                  }}
                >
                  Adult formula formula (kg/m²) is identical across sexes.
                </span>
              </div>
            </div>

            {/* Height Field with Unit Selector */}
            <div
              style={{
                border: '1px solid var(--color-rule)',
                padding: '20px',
                backgroundColor: 'rgba(231, 227, 218, 0.4)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                }}
              >
                <label
                  htmlFor={inputs.heightUnit === 'cm' ? 'input-height-cm' : 'input-height-ft'}
                  className="mono-label"
                >
                  Height Measurement *
                </label>
                {/* Unit Switcher */}
                <div style={{ display: 'flex', border: '1px solid var(--color-rule)' }}>
                  <button
                    type="button"
                    onClick={() => handleHeightUnitChange('cm')}
                    style={{
                      padding: '4px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      background:
                        inputs.heightUnit === 'cm'
                          ? 'var(--color-ink)'
                          : 'transparent',
                      color:
                        inputs.heightUnit === 'cm'
                          ? 'var(--color-ground)'
                          : 'var(--color-ink)',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Centimeters (cm)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHeightUnitChange('ft-in')}
                    style={{
                      padding: '4px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      background:
                        inputs.heightUnit === 'ft-in'
                          ? 'var(--color-ink)'
                          : 'transparent',
                      color:
                        inputs.heightUnit === 'ft-in'
                          ? 'var(--color-ground)'
                          : 'var(--color-ink)',
                      border: 'none',
                      borderLeft: '1px solid var(--color-rule)',
                      cursor: 'pointer',
                    }}
                  >
                    Feet & Inches (ft / in)
                  </button>
                </div>
              </div>

              {inputs.heightUnit === 'cm' ? (
                <div>
                  <input
                    id="input-height-cm"
                    type="number"
                    step="0.1"
                    min="50"
                    max="260"
                    placeholder="e.g. 175"
                    value={inputs.heightCm}
                    onChange={(e) =>
                      handleInputChange('heightCm', e.target.value)
                    }
                    className={`input-editorial ${
                      errors.height ? 'error' : ''
                    }`}
                    aria-invalid={!!errors.height}
                    aria-describedby={errors.height ? 'height-error' : undefined}
                    required
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                  }}
                >
                  <div>
                    <label
                      htmlFor="input-height-ft"
                      className="mono-label"
                      style={{ fontSize: '10px', marginBottom: '4px', display: 'block' }}
                    >
                      Feet (ft)
                    </label>
                    <input
                      id="input-height-ft"
                      type="number"
                      step="1"
                      min="1"
                      max="8"
                      placeholder="e.g. 5"
                      value={inputs.heightFt}
                      onChange={(e) =>
                        handleInputChange('heightFt', e.target.value)
                      }
                      className={`input-editorial ${
                        errors.height ? 'error' : ''
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="input-height-in"
                      className="mono-label"
                      style={{ fontSize: '10px', marginBottom: '4px', display: 'block' }}
                    >
                      Inches (in)
                    </label>
                    <input
                      id="input-height-in"
                      type="number"
                      step="0.1"
                      min="0"
                      max="11.9"
                      placeholder="e.g. 9"
                      value={inputs.heightIn}
                      onChange={(e) =>
                        handleInputChange('heightIn', e.target.value)
                      }
                      className={`input-editorial ${
                        errors.height ? 'error' : ''
                      }`}
                    />
                  </div>
                </div>
              )}

              {errors.height && (
                <span
                  id="height-error"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--color-accent)',
                    marginTop: '6px',
                  }}
                  role="alert"
                >
                  {errors.height}
                </span>
              )}
            </div>

            {/* Weight Field with Unit Selector */}
            <div
              style={{
                border: '1px solid var(--color-rule)',
                padding: '20px',
                backgroundColor: 'rgba(231, 227, 218, 0.4)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                }}
              >
                <label
                  htmlFor={inputs.weightUnit === 'kg' ? 'input-weight-kg' : 'input-weight-lbs'}
                  className="mono-label"
                >
                  Weight Measurement *
                </label>
                {/* Unit Switcher */}
                <div style={{ display: 'flex', border: '1px solid var(--color-rule)' }}>
                  <button
                    type="button"
                    onClick={() => handleWeightUnitChange('kg')}
                    style={{
                      padding: '4px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      background:
                        inputs.weightUnit === 'kg'
                          ? 'var(--color-ink)'
                          : 'transparent',
                      color:
                        inputs.weightUnit === 'kg'
                          ? 'var(--color-ground)'
                          : 'var(--color-ink)',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Kilograms (kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleWeightUnitChange('lbs')}
                    style={{
                      padding: '4px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      background:
                        inputs.weightUnit === 'lbs'
                          ? 'var(--color-ink)'
                          : 'transparent',
                      color:
                        inputs.weightUnit === 'lbs'
                          ? 'var(--color-ground)'
                          : 'var(--color-ink)',
                      border: 'none',
                      borderLeft: '1px solid var(--color-rule)',
                      cursor: 'pointer',
                    }}
                  >
                    Pounds (lbs)
                  </button>
                </div>
              </div>

              {inputs.weightUnit === 'kg' ? (
                <div>
                  <input
                    id="input-weight-kg"
                    type="number"
                    step="0.1"
                    min="2"
                    max="450"
                    placeholder="e.g. 70"
                    value={inputs.weightKg}
                    onChange={(e) =>
                      handleInputChange('weightKg', e.target.value)
                    }
                    className={`input-editorial ${
                      errors.weight ? 'error' : ''
                    }`}
                    aria-invalid={!!errors.weight}
                    aria-describedby={errors.weight ? 'weight-error' : undefined}
                    required
                  />
                </div>
              ) : (
                <div>
                  <input
                    id="input-weight-lbs"
                    type="number"
                    step="0.1"
                    min="5"
                    max="990"
                    placeholder="e.g. 154"
                    value={inputs.weightLbs}
                    onChange={(e) =>
                      handleInputChange('weightLbs', e.target.value)
                    }
                    className={`input-editorial ${
                      errors.weight ? 'error' : ''
                    }`}
                    aria-invalid={!!errors.weight}
                    aria-describedby={errors.weight ? 'weight-error' : undefined}
                    required
                  />
                </div>
              )}

              {errors.weight && (
                <span
                  id="weight-error"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--color-accent)',
                    marginTop: '6px',
                  }}
                  role="alert"
                >
                  {errors.weight}
                </span>
              )}
            </div>

            {/* Optional Session Storage Opt-in Checkbox */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '4px 0',
              }}
            >
              <input
                id="checkbox-save"
                type="checkbox"
                checked={inputs.saveLocally}
                onChange={(e) =>
                  handleInputChange('saveLocally', e.target.checked)
                }
                style={{
                  marginTop: '3px',
                  accentColor: 'var(--color-ink)',
                  cursor: 'pointer',
                }}
              />
              <label
                htmlFor="checkbox-save"
                className="mono-label"
                style={{
                  fontSize: '10.5px',
                  color: 'var(--color-ink-secondary)',
                  cursor: 'pointer',
                  textTransform: 'none',
                  letterSpacing: '0.04em',
                  lineHeight: 1.4,
                }}
              >
                Remember measurements in this browser session. Data remains
                strictly local on your device.
              </label>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                marginTop: '8px',
              }}
            >
              <button
                type="submit"
                className="btn-primary"
                style={{ flex: 1, padding: '14px 28px' }}
              >
                CALCULATE BMI
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleReset}
                style={{ padding: '14px 20px' }}
              >
                RESET
              </button>
            </div>
          </form>

          {/* Right Column: Architectural Supporting Guide Card */}
          <div
            style={{
              border: '1px solid var(--color-rule)',
              padding: '32px 28px',
              backgroundColor: 'var(--color-ground-secondary)',
            }}
          >
            <div className="mono-label" style={{ marginBottom: '14px' }}>
              CALIBRATION CONTEXT
            </div>
            <h3
              style={{
                fontSize: '22px',
                lineHeight: 1.25,
                marginBottom: '16px',
              }}
            >
              Screening without distortion.
            </h3>
            <p
              className="mono-lede"
              style={{ fontSize: '12px', marginBottom: '24px' }}
            >
              BMI operates as a broad epidemiological indicator. It establishes
              a baseline correlation between vertical stature and total physical
              mass, serving as an entry point for deeper lifestyle evaluation.
            </p>

            <div
              style={{
                borderTop: '1px solid var(--color-rule)',
                paddingTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span className="mono-label" style={{ fontSize: '10px' }}>
                  ADULT COHORT
                </span>
                <span className="mono-num" style={{ fontSize: '11px' }}>
                  AGE 20+
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span className="mono-label" style={{ fontSize: '10px' }}>
                  PEDIATRIC COHORT
                </span>
                <span className="mono-num" style={{ fontSize: '11px' }}>
                  AGE 2–19 (PERCENTILES)
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span className="mono-label" style={{ fontSize: '10px' }}>
                  INFANT GROWTH
                </span>
                <span className="mono-num" style={{ fontSize: '11px' }}>
                  &lt; 2 YRS (WEIGHT-FOR-LENGTH)
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: '28px',
                padding: '16px',
                borderLeft: '2px solid var(--color-accent)',
                backgroundColor: 'rgba(231, 227, 218, 0.7)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  lineHeight: 1.6,
                  color: 'var(--color-ink-secondary)',
                }}
              >
                <strong>Scientific integrity notice:</strong> Adult BMI categories
                do not assess adiposity distribution or muscular hypertrophy.
                Athletes with significant lean muscle tissue may register a
                higher BMI without surplus adipose mass.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .calculator-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .age-sex-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
