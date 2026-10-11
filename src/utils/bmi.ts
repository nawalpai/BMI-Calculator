import type {
  AgeCohort,
  BMICategory,
  BMIResultData,
  HeightUnit,
  MeasurementInputs,
  ReferenceWeightInterval,
  ValidationErrors,
  WeightUnit,
} from '../types/bmi'

// Exact international scientific conversion factors
export const INCH_TO_CM = 2.54
export const INCH_TO_M = 0.0254
export const FOOT_TO_INCH = 12
export const LBS_TO_KG = 0.45359237
export const KG_TO_LBS = 1 / LBS_TO_KG

// Standard Adult BMI thresholds
export const ADULT_BMI_THRESHOLDS = {
  UNDERWEIGHT_MAX: 18.5,
  HEALTHY_MAX: 25.0,
  OVERWEIGHT_MAX: 30.0,
  // Healthy reference upper calculation constant (one decimal representation)
  HEALTHY_REFERENCE_UPPER_FACTOR: 24.9,
  HEALTHY_REFERENCE_LOWER_FACTOR: 18.5,
} as const

/**
 * Classifies an adult BMI strictly by its unrounded numerical value.
 * Boundary verification:
 * - 18.4999... -> underweight
 * - 18.5 -> healthy
 * - 24.9999... -> healthy
 * - 25.0 -> overweight (Never classified as healthy weight)
 * - 29.9999... -> overweight
 * - 30.0 -> obesity (Never classified as merely overweight)
 */
export function classifyAdultBMI(bmi: number): BMICategory {
  if (bmi < ADULT_BMI_THRESHOLDS.UNDERWEIGHT_MAX) {
    return 'underweight'
  }
  if (bmi < ADULT_BMI_THRESHOLDS.HEALTHY_MAX) {
    return 'healthy'
  }
  if (bmi < ADULT_BMI_THRESHOLDS.OVERWEIGHT_MAX) {
    return 'overweight'
  }
  return 'obesity'
}

export function getCategoryLabel(category: BMICategory): string {
  switch (category) {
    case 'underweight':
      return 'UNDERWEIGHT'
    case 'healthy':
      return 'HEALTHY WEIGHT'
    case 'overweight':
      return 'OVERWEIGHT'
    case 'obesity':
      return 'OBESITY'
  }
}

/**
 * Converts height inputs to height in meters.
 */
export function parseHeightToMeters(
  unit: HeightUnit,
  heightCm: string,
  heightFt: string,
  heightIn: string,
): { heightM: number; isValid: boolean; error?: string } {
  if (unit === 'cm') {
    const val = parseFloat(heightCm)
    if (isNaN(val) || val <= 0) {
      return { heightM: 0, isValid: false, error: 'Please enter a valid height in centimeters.' }
    }
    if (val < 50 || val > 260) {
      return { heightM: 0, isValid: false, error: 'Height must be between 50 cm and 260 cm.' }
    }
    return { heightM: val / 100, isValid: true }
  } else {
    const ftVal = parseFloat(heightFt)
    const inVal = heightIn === '' ? 0 : parseFloat(heightIn)

    if (isNaN(ftVal) || ftVal < 0) {
      return { heightM: 0, isValid: false, error: 'Please enter a valid number of feet.' }
    }
    if (isNaN(inVal) || inVal < 0 || inVal >= 12) {
      return { heightM: 0, isValid: false, error: 'Inches must be between 0 and 11.9.' }
    }

    const totalInches = ftVal * FOOT_TO_INCH + inVal
    if (totalInches <= 0) {
      return { heightM: 0, isValid: false, error: 'Total height must be greater than zero.' }
    }

    const heightM = totalInches * INCH_TO_M
    if (heightM < 0.5 || heightM > 2.6) {
      return { heightM: 0, isValid: false, error: 'Height must be between 1 ft 8 in and 8 ft 6 in.' }
    }

    return { heightM, isValid: true }
  }
}

/**
 * Converts weight inputs to weight in kilograms.
 */
export function parseWeightToKg(
  unit: WeightUnit,
  weightKg: string,
  weightLbs: string,
): { weightKg: number; isValid: boolean; error?: string } {
  if (unit === 'kg') {
    const val = parseFloat(weightKg)
    if (isNaN(val) || val <= 0) {
      return { weightKg: 0, isValid: false, error: 'Please enter a valid weight in kilograms.' }
    }
    if (val < 2 || val > 450) {
      return { weightKg: 0, isValid: false, error: 'Weight must be between 2 kg and 450 kg.' }
    }
    return { weightKg: val, isValid: true }
  } else {
    const val = parseFloat(weightLbs)
    if (isNaN(val) || val <= 0) {
      return { weightKg: 0, isValid: false, error: 'Please enter a valid weight in pounds.' }
    }
    const valKg = val * LBS_TO_KG
    if (valKg < 2 || valKg > 450) {
      return { weightKg: 0, isValid: false, error: 'Weight must be between 4.4 lbs and 990 lbs.' }
    }
    return { weightKg: valKg, isValid: true }
  }
}

/**
 * Validates user age and cohorts.
 */
export function parseAge(ageInput: string): {
  age: number
  cohort: AgeCohort
  isValid: boolean
  error?: string
} {
  const age = parseFloat(ageInput)
  if (isNaN(age) || age < 0) {
    return { age: 0, cohort: 'adult', isValid: false, error: 'Please enter a valid age.' }
  }
  if (age > 120) {
    return { age: 0, cohort: 'adult', isValid: false, error: 'Please enter an age up to 120.' }
  }

  if (age < 2) {
    return { age, cohort: 'infant', isValid: true }
  }
  if (age < 20) {
    return { age, cohort: 'pediatric', isValid: true }
  }
  return { age, cohort: 'adult', isValid: true }
}

/**
 * Calculates standard Adult Reference-Weight interval:
 * Lower = 18.5 * h²
 * Upper = 24.9 * h²
 */
export function calculateReferenceWeightInterval(
  heightM: number,
  currentWeightKg: number,
  displayUnit: WeightUnit,
): ReferenceWeightInterval {
  const hSq = heightM * heightM
  const lowerKg = ADULT_BMI_THRESHOLDS.HEALTHY_REFERENCE_LOWER_FACTOR * hSq
  const upperKg = ADULT_BMI_THRESHOLDS.HEALTHY_REFERENCE_UPPER_FACTOR * hSq

  let lowerDisplay: number
  let upperDisplay: number
  let currentDisplay: number

  if (displayUnit === 'kg') {
    lowerDisplay = Math.round(lowerKg * 10) / 10
    upperDisplay = Math.round(upperKg * 10) / 10
    currentDisplay = Math.round(currentWeightKg * 10) / 10
  } else {
    lowerDisplay = Math.round(lowerKg * KG_TO_LBS * 10) / 10
    upperDisplay = Math.round(upperKg * KG_TO_LBS * 10) / 10
    currentDisplay = Math.round(currentWeightKg * KG_TO_LBS * 10) / 10
  }

  let status: 'below' | 'within' | 'above'
  let differenceDisplay = 0

  if (currentWeightKg < lowerKg) {
    status = 'below'
    differenceDisplay = Math.round((lowerDisplay - currentDisplay) * 10) / 10
  } else if (currentWeightKg > upperKg) {
    status = 'above'
    differenceDisplay = Math.round((currentDisplay - upperDisplay) * 10) / 10
  } else {
    status = 'within'
    differenceDisplay = 0
  }

  return {
    lowerKg,
    upperKg,
    lowerDisplay,
    upperDisplay,
    unit: displayUnit,
    status,
    differenceDisplay,
  }
}

/**
 * Calculates BMI and complete analytical payload.
 */
export function calculateBMI(inputs: MeasurementInputs): {
  result?: BMIResultData
  errors: ValidationErrors
} {
  const errors: ValidationErrors = {}

  // 1. Validate age
  const ageRes = parseAge(inputs.age)
  if (!ageRes.isValid) {
    errors.age = ageRes.error
  }

  // 2. Validate height
  const heightRes = parseHeightToMeters(
    inputs.heightUnit,
    inputs.heightCm,
    inputs.heightFt,
    inputs.heightIn,
  )
  if (!heightRes.isValid) {
    errors.height = heightRes.error
  }

  // 3. Validate weight
  const weightRes = parseWeightToKg(inputs.weightUnit, inputs.weightKg, inputs.weightLbs)
  if (!weightRes.isValid) {
    errors.weight = weightRes.error
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  const heightM = heightRes.heightM
  const weightKg = weightRes.weightKg
  const unroundedBmi = weightKg / (heightM * heightM)
  const displayBmi = unroundedBmi.toFixed(1)
  const category = classifyAdultBMI(unroundedBmi)
  const categoryLabel = getCategoryLabel(category)

  const referenceWeight = calculateReferenceWeightInterval(heightM, weightKg, inputs.weightUnit)

  // Height display string
  let enteredHeightDisplay = ''
  if (inputs.heightUnit === 'cm') {
    enteredHeightDisplay = `${parseFloat(inputs.heightCm).toFixed(0)} cm`
  } else {
    const ft = inputs.heightFt
    const inch = inputs.heightIn || '0'
    enteredHeightDisplay = `${ft} ft ${inch} in`
  }

  // Weight display string
  let enteredWeightDisplay = ''
  if (inputs.weightUnit === 'kg') {
    enteredWeightDisplay = `${parseFloat(inputs.weightKg).toFixed(1)} kg`
  } else {
    enteredWeightDisplay = `${parseFloat(inputs.weightLbs).toFixed(1)} lbs`
  }

  const resultData: BMIResultData = {
    rawBmi: unroundedBmi,
    displayBmi,
    category,
    categoryLabel,
    ageCohort: ageRes.cohort,
    age: ageRes.age,
    sex: inputs.sex,
    enteredHeightM: heightM,
    enteredHeightDisplay,
    enteredWeightKg: weightKg,
    enteredWeightDisplay,
    heightUnit: inputs.heightUnit,
    weightUnit: inputs.weightUnit,
    referenceWeight,
    calculatedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    isPediatric: ageRes.cohort === 'pediatric',
    isInfant: ageRes.cohort === 'infant',
  }

  return { result: resultData, errors: {} }
}

/**
 * Unit conversion helper for height without physical measurement loss.
 */
export function convertHeightUnits(
  currentUnit: HeightUnit,
  newUnit: HeightUnit,
  heightCm: string,
  heightFt: string,
  heightIn: string,
): { heightCm: string; heightFt: string; heightIn: string } {
  if (currentUnit === newUnit) return { heightCm, heightFt, heightIn }

  if (currentUnit === 'cm' && newUnit === 'ft-in') {
    const cm = parseFloat(heightCm)
    if (isNaN(cm) || cm <= 0) return { heightCm: '', heightFt: '', heightIn: '' }
    const totalInches = cm / INCH_TO_CM
    const ft = Math.floor(totalInches / FOOT_TO_INCH)
    const remainingIn = Math.round((totalInches % FOOT_TO_INCH) * 10) / 10
    return {
      heightCm,
      heightFt: ft.toString(),
      heightIn: remainingIn.toString(),
    }
  }

  if (currentUnit === 'ft-in' && newUnit === 'cm') {
    const ft = parseFloat(heightFt) || 0
    const inch = parseFloat(heightIn) || 0
    if (ft <= 0 && inch <= 0) return { heightCm: '', heightFt, heightIn }
    const totalInches = ft * FOOT_TO_INCH + inch
    const cm = Math.round(totalInches * INCH_TO_CM * 10) / 10
    return {
      heightCm: cm.toString(),
      heightFt,
      heightIn,
    }
  }

  return { heightCm, heightFt, heightIn }
}

/**
 * Unit conversion helper for weight without physical measurement loss.
 */
export function convertWeightUnits(
  currentUnit: WeightUnit,
  newUnit: WeightUnit,
  weightKg: string,
  weightLbs: string,
): { weightKg: string; weightLbs: string } {
  if (currentUnit === newUnit) return { weightKg, weightLbs }

  if (currentUnit === 'kg' && newUnit === 'lbs') {
    const kg = parseFloat(weightKg)
    if (isNaN(kg) || kg <= 0) return { weightKg: '', weightLbs: '' }
    const lbs = Math.round(kg * KG_TO_LBS * 10) / 10
    return { weightKg, weightLbs: lbs.toString() }
  }

  if (currentUnit === 'lbs' && newUnit === 'kg') {
    const lbs = parseFloat(weightLbs)
    if (isNaN(lbs) || lbs <= 0) return { weightKg: '', weightLbs: '' }
    const kg = Math.round(lbs * LBS_TO_KG * 10) / 10
    return { weightKg: kg.toString(), weightLbs }
  }

  return { weightKg, weightLbs }
}
