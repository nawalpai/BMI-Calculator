import type { BMIResultData } from '../types/bmi'

export function generateReportText(result: BMIResultData): string {
  const lines: string[] = [
    '==================================================',
    'FORM / BMI — BODY MEASUREMENT & WELLNESS REPORT',
    '==================================================',
    `Report Date: ${result.calculatedAt}`,
    `Age: ${result.age} | Biological Reference: ${result.sex}`,
    `Entered Height: ${result.enteredHeightDisplay}`,
    `Entered Weight: ${result.enteredWeightDisplay}`,
    '--------------------------------------------------',
  ]

  if (result.isInfant) {
    lines.push(
      'COHORT: INFANT (< 2 YEARS)',
      'NOTE: Standard BMI is not indicated for children under 2 years of age.',
      'RECOMMENDATION: Use pediatric WHO weight-for-length growth standards with a qualified healthcare provider.',
    )
  } else if (result.isPediatric) {
    lines.push(
      `CALCULATED VALUE: ${result.displayBmi}`,
      'COHORT: PEDIATRIC / ADOLESCENT (2–19 YEARS)',
      'INTERPRETATION: For youth ages 2–19, BMI must be interpreted using age- and sex-specific growth percentiles (CDC/WHO). Adult classification categories (Underweight, Healthy, Overweight, Obesity) do NOT apply directly.',
      'RECOMMENDATION: Please review your percentile curve with a pediatrician or clinician.',
    )
  } else {
    lines.push(
      `CALCULATED BMI: ${result.displayBmi}`,
      `ADULT CATEGORY: ${result.categoryLabel}`,
      'STANDARD ADULT INTERVALS:',
      '  - Underweight: < 18.5',
      '  - Healthy Weight: 18.5 – 24.9',
      '  - Overweight: 25.0 – 29.9',
      '  - Obesity: ≥ 30.0',
      '--------------------------------------------------',
      `REFERENCE-WEIGHT INTERVAL FOR YOUR HEIGHT (${result.enteredHeightDisplay}):`,
      `  ${result.referenceWeight.lowerDisplay} – ${result.referenceWeight.upperDisplay} ${result.referenceWeight.unit}`,
      `Current weight status: ${result.referenceWeight.status.toUpperCase()} reference interval`,
    )
  }

  lines.push(
    '==================================================',
    'IMPORTANT CLINICAL CONTEXT & LIMITATIONS:',
    'BMI is an epidemiological screening ratio based strictly on weight and height.',
    'It does not directly evaluate muscle mass, bone density, visceral fat, or metabolic health.',
    'This report is provided for general health education only and does not replace medical advice.',
    '==================================================',
  )

  return lines.join('\n')
}

export async function copyReportToClipboard(result: BMIResultData): Promise<boolean> {
  const text = generateReportText(result)
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Fallback using textarea
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  } catch {
    return false
  }
}
