import type { MeasurementInputs } from '../types/bmi'

const STORAGE_KEY = 'form_bmi_session_measurements_v1'

export function loadSavedMeasurements(): Partial<MeasurementInputs> | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveMeasurements(inputs: MeasurementInputs): void {
  try {
    if (inputs.saveLocally) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(inputs))
    } else {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // Graceful handling of private browsing mode
  }
}

export function clearSavedMeasurements(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore
  }
}
