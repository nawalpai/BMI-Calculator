import type { BMIHistoryEntry, BMIResultData } from '../types/bmi'
import { generateReportText } from './clipboard'

const HISTORY_STORAGE_KEY = 'form_bmi_history_v1'

export function loadHistory(): BMIHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed
    }
    return []
  } catch {
    return []
  }
}

export function saveHistory(entries: BMIHistoryEntry[]): void {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // LocalStorage quota or private mode fallback
  }
}

export function addHistoryEntry(result: BMIResultData): BMIHistoryEntry[] {
  const current = loadHistory()

  // Avoid creating identical duplicates within 10 seconds
  const now = Date.now()
  if (
    current.length > 0 &&
    now - current[0].timestamp < 10000 &&
    current[0].displayBmi === result.displayBmi &&
    current[0].enteredWeightDisplay === result.enteredWeightDisplay
  ) {
    return current
  }

  const newEntry: BMIHistoryEntry = {
    id: `bmi_${now}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: now,
    dateDisplay: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    bmi: result.rawBmi,
    displayBmi: result.displayBmi,
    category: result.category,
    categoryLabel: result.categoryLabel,
    age: result.age,
    sex: result.sex,
    enteredHeightDisplay: result.enteredHeightDisplay,
    enteredWeightDisplay: result.enteredWeightDisplay,
    heightM: result.enteredHeightM,
    weightKg: result.enteredWeightKg,
    heightUnit: result.heightUnit,
    weightUnit: result.weightUnit,
  }

  // Prepend new entry, limit to recent 50 entries
  const updated = [newEntry, ...current].slice(0, 50)
  saveHistory(updated)
  return updated
}

export function deleteHistoryItem(id: string): BMIHistoryEntry[] {
  const current = loadHistory()
  const updated = current.filter((item) => item.id !== id)
  saveHistory(updated)
  return updated
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY)
  } catch {
    // Ignore
  }
}

export function downloadReportFile(result: BMIResultData): void {
  const content = generateReportText(result)
  const filename = `BMI-Report-${result.displayBmi}-${new Date().toISOString().slice(0, 10)}.txt`
  triggerDownload(content, filename, 'text/plain;charset=utf-8')
}

export function downloadHistoryCSV(entries: BMIHistoryEntry[]): void {
  if (entries.length === 0) return

  const headers = ['ID', 'Date', 'Age', 'Sex', 'Height', 'Weight', 'BMI', 'Category']
  const rows = entries.map((e) => [
    e.id,
    `"${e.dateDisplay}"`,
    e.age,
    e.sex,
    `"${e.enteredHeightDisplay}"`,
    `"${e.enteredWeightDisplay}"`,
    e.displayBmi,
    `"${e.categoryLabel}"`,
  ])

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
  triggerDownload(csvContent, `BMI-History-${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv;charset=utf-8')
}

export function downloadHistoryJSON(entries: BMIHistoryEntry[]): void {
  const jsonContent = JSON.stringify(entries, null, 2)
  triggerDownload(jsonContent, `BMI-History-${new Date().toISOString().slice(0, 10)}.json`, 'application/json')
}

function triggerDownload(content: string, filename: string, mimeType: string): void {
  try {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch {
    // Fallback if Blob / URL is unsupported
  }
}
