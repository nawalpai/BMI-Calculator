import { useState, useEffect } from 'react'
import type { BMIHistoryEntry, BMIResultData, MeasurementInputs, ThemeMode } from './types/bmi'
import { loadSavedMeasurements } from './utils/storage'
import { loadHistory, addHistoryEntry } from './utils/history'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { BMICalculator } from './components/BMICalculator'
import { BMIResult } from './components/BMIResult'
import { BMIHistoryChart } from './components/BMIHistoryChart'
import { BMIExplanation } from './components/BMIExplanation'
import { PinnedStudy } from './components/PinnedStudy'
import { ReferenceTable } from './components/ReferenceTable'
import { HealthyHabits } from './components/HealthyHabits'
import { Footer } from './components/Footer'
import { PrintReport } from './components/PrintReport'

export function App() {
  const [result, setResult] = useState<BMIResultData | null>(null)
  const [history, setHistory] = useState<BMIHistoryEntry[]>(() => loadHistory())
  const [selectedHistoryEntry, setSelectedHistoryEntry] = useState<BMIHistoryEntry | null>(null)

  // Dark / Light Theme management
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('form_bmi_theme_v1')
      if (saved === 'dark' || saved === 'light') return saved
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    } catch {
      // Fallback
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('form_bmi_theme_v1', theme)
    } catch {
      // Ignore
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const defaultInputs: MeasurementInputs = {
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

  const [initialInputs] = useState<MeasurementInputs>(() => {
    const saved = loadSavedMeasurements()
    return saved ? { ...defaultInputs, ...saved } : defaultInputs
  })

  const handleResultCalculated = (res: BMIResultData | null) => {
    setResult(res)
    if (res && !res.isInfant) {
      const updated = addHistoryEntry(res)
      setHistory(updated)
    }
  }

  const handleSelectHistoryEntry = (entry: BMIHistoryEntry) => {
    setSelectedHistoryEntry(entry)
    scrollToCalculator()
  }

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      const ageInput = document.getElementById('input-age')
      if (ageInput) ageInput.focus()
    }
  }

  const scrollToMethod = () => {
    const el = document.getElementById('method')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Fixed Navigation Bar with Theme Switcher */}
      <Navbar
        onCalculateClick={scrollToCalculator}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* 2. Editorial Hero with Split-Wordmark Bracket & Anatomical Subject */}
      <HeroSection
        onCalculateClick={scrollToCalculator}
        onExploreClick={scrollToMethod}
      />

      {/* 3. Main BMI Calculator (Two-column layout) */}
      <BMICalculator
        initialInputs={initialInputs}
        onResultCalculated={handleResultCalculated}
        selectedHistoryEntry={selectedHistoryEntry}
      />

      {/* 4. Calculated BMI Result Stage (Revealed upon calculation) */}
      {result && <BMIResult result={result} />}

      {/* 5. BMI History & Interactive Trend Chart with Export */}
      <BMIHistoryChart
        history={history}
        onHistoryUpdate={setHistory}
        onSelectEntry={handleSelectHistoryEntry}
      />

      {/* 6. Scientific Explanation of BMI (THE METHOD / 02) */}
      <BMIExplanation />

      {/* 7. Pinned Scientific Height & Mass Study (COMPUTED STUDY / 03) */}
      <PinnedStudy userHeightM={result?.enteredHeightM} />

      {/* 8. Adult International Reference Classification Table */}
      <ReferenceTable />

      {/* 9. Healthy Habits Guide (Small changes. Sustainable progress.) */}
      <HealthyHabits />

      {/* 10. Editorial Closing Section, Disclosures & Bookending Wordmark */}
      <Footer
        onBackToCalculator={scrollToCalculator}
        onExploreMethod={scrollToMethod}
      />

      {/* 11. Print-Only Medical Report (Visible exclusively via window.print()) */}
      <PrintReport result={result} />
    </div>
  )
}

export default App
