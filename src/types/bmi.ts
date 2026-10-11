export type HeightUnit = 'cm' | 'ft-in'
export type WeightUnit = 'kg' | 'lbs'
export type BiologicalSex = 'male' | 'female' | 'unspecified'
export type BMICategory = 'underweight' | 'healthy' | 'overweight' | 'obesity'
export type AgeCohort = 'infant' | 'pediatric' | 'adult'
export type ThemeMode = 'light' | 'dark'

export interface MeasurementInputs {
  age: string
  sex: BiologicalSex
  heightUnit: HeightUnit
  weightUnit: WeightUnit
  heightCm: string
  heightFt: string
  heightIn: string
  weightKg: string
  weightLbs: string
  saveLocally: boolean
}

export interface ValidationErrors {
  age?: string
  height?: string
  weight?: string
}

export interface ReferenceWeightInterval {
  lowerKg: number
  upperKg: number
  lowerDisplay: number
  upperDisplay: number
  unit: WeightUnit
  status: 'below' | 'within' | 'above'
  differenceDisplay: number
}

export interface BMIResultData {
  rawBmi: number
  displayBmi: string
  category: BMICategory
  categoryLabel: string
  ageCohort: AgeCohort
  age: number
  sex: BiologicalSex
  enteredHeightM: number
  enteredHeightDisplay: string
  enteredWeightKg: number
  enteredWeightDisplay: string
  heightUnit: HeightUnit
  weightUnit: WeightUnit
  referenceWeight: ReferenceWeightInterval
  calculatedAt: string
  isPediatric: boolean
  isInfant: boolean
}

export interface BMIHistoryEntry {
  id: string
  timestamp: number
  dateDisplay: string
  bmi: number
  displayBmi: string
  category: BMICategory
  categoryLabel: string
  age: number
  sex: BiologicalSex
  enteredHeightDisplay: string
  enteredWeightDisplay: string
  heightM: number
  weightKg: number
  heightUnit: HeightUnit
  weightUnit: WeightUnit
}
