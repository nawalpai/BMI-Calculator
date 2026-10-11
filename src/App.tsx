import { useState } from 'react'
import type { BMIResultData, MeasurementInputs } from './types/bmi'
import { loadSavedMeasurements } from './utils/storage'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { BMICalculator } from './components/BMICalculator'
import { BMIResult } from './components/BMIResult'
import { BMIExplanation } from './components/BMIExplanation'
import { PinnedStudy } from './components/PinnedStudy'
import { ReferenceTable } from './components/ReferenceTable'
import { HealthyHabits } from './components/HealthyHabits'
import { Footer } from './components/Footer'
import { PrintReport } from './components/PrintReport'

export function App() {
  const [result, setResult] = useState<BMIResultData | null>(null)

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
      {/* 1. Fixed Navigation Bar */}
      <Navbar onCalculateClick={scrollToCalculator} />

      {/* 2. Editorial Hero with Split-Wordmark Bracket & Anatomical Subject */}
      <HeroSection
        onCalculateClick={scrollToCalculator}
        onExploreClick={scrollToMethod}
      />

      {/* 3. Main BMI Calculator (Two-column layout) */}
      <BMICalculator
        initialInputs={initialInputs}
        onResultCalculated={(res) => setResult(res)}
      />

      {/* 4. Calculated BMI Result Stage (Revealed upon calculation) */}
      {result && <BMIResult result={result} />}

      {/* 5. Scientific Explanation of BMI (THE METHOD / 02) */}
      <BMIExplanation />

      {/* 6. Pinned Scientific Height & Mass Study (COMPUTED STUDY / 03) */}
      <PinnedStudy userHeightM={result?.enteredHeightM} />

      {/* 7. Adult International Reference Classification Table */}
      <ReferenceTable />

      {/* 8. Healthy Habits Guide (Small changes. Sustainable progress.) */}
      <HealthyHabits />

      {/* 9. Editorial Closing Section, Disclosures & Bookending Wordmark */}
      <Footer
        onBackToCalculator={scrollToCalculator}
        onExploreMethod={scrollToMethod}
      />

      {/* 10. Print-Only Medical Report (Visible exclusively via window.print()) */}
      <PrintReport result={result} />
    </div>
  )
}

export default App
