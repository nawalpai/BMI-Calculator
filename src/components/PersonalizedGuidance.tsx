import React from 'react'
import type { BMICategory } from '../types/bmi'

interface PersonalizedGuidanceProps {
  category: BMICategory
}

export const PersonalizedGuidance: React.FC<PersonalizedGuidanceProps> = ({ category }) => {
  return (
    <div
      style={{
        marginTop: '36px',
        border: '1px solid var(--color-rule)',
        padding: '36px 28px',
        backgroundColor: 'var(--color-ground)',
      }}
      aria-label="Educational Health Guidance"
    >
      <div style={{ marginBottom: '24px' }}>
        <span className="mono-label">PRACTICE & PERSPECTIVE / 04</span>
        <h4 style={{ fontSize: '22px', marginTop: '4px' }}>
          Nonjudgmental Health Guidance
        </h4>
        <p className="mono-lede" style={{ fontSize: '12px', marginTop: '6px', maxWidth: '720px' }}>
          Sustainable physical wellbeing is built through consistent daily
          practices, not rapid interventions or numerical fixation. The notes
          below offer neutral, evidence-supported perspectives tailored to your
          screening category.
        </p>
      </div>

      {category === 'underweight' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '20px', backgroundColor: 'var(--color-ground-secondary)', borderLeft: '3px solid #3b82f6' }}>
            <div className="mono-label" style={{ color: '#3b82f6', marginBottom: '6px' }}>
              UNDERWEIGHT GUIDANCE (BMI &lt; 18.5)
            </div>
            <h5 style={{ fontSize: '18px', marginBottom: '8px' }}>
              Nourishment & Functional Mass
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-ink-secondary)', lineHeight: 1.6 }}>
              <li>• Prioritize regular, calorically and nutrient-dense meals featuring whole grains, healthy lipids (olive oil, avocados, nuts), and quality proteins.</li>
              <li>• Incorporate progressive resistance training to promote functional lean skeletal muscle mass and bone mineral density.</li>
              <li>• If low body weight is unintentional, sudden, or paired with chronic fatigue, arrange a diagnostic evaluation with a healthcare physician.</li>
            </ul>
          </div>
        </div>
      )}

      {category === 'healthy' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '20px', backgroundColor: 'var(--color-ground-secondary)', borderLeft: '3px solid #15803d' }}>
            <div className="mono-label" style={{ color: '#15803d', marginBottom: '6px' }}>
              HEALTHY WEIGHT GUIDANCE (18.5 – 24.9)
            </div>
            <h5 style={{ fontSize: '18px', marginBottom: '8px' }}>
              Maintenance & Metabolic Resilience
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-ink-secondary)', lineHeight: 1.6 }}>
              <li>• Sustain a diverse dietary intake rich in dietary fiber, polyphenols, lean proteins, and micronutrients.</li>
              <li>• Combine regular cardiovascular endurance work (walking, running, cycling) with resistance exercise to support heart and metabolic function.</li>
              <li>• Remember that statistical weight alignment does not inherently guarantee optimal cardiovascular or biochemical health; annual medical wellness screenings remain valuable.</li>
            </ul>
          </div>
        </div>
      )}

      {category === 'overweight' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '20px', backgroundColor: 'var(--color-ground-secondary)', borderLeft: '3px solid #ca8a04' }}>
            <div className="mono-label" style={{ color: '#ca8a04', marginBottom: '6px' }}>
              OVERWEIGHT GUIDANCE (25.0 – 29.9)
            </div>
            <h5 style={{ fontSize: '18px', marginBottom: '8px' }}>
              Gradual Progression & Habit Architecture
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-ink-secondary)', lineHeight: 1.6 }}>
              <li>• Focus on enjoyable, repeatable changes rather than abrupt calorie restriction or commercial fad diets.</li>
              <li>• Gradually increase daily non-exercise physical activity (NEAT), such as brisk walking, taking stairs, and standing breaks.</li>
              <li>• Note that muscular individuals frequently map into this range due to lean mass density without adverse metabolic risk.</li>
              <li>• Consult a registered dietitian or physician to establish personal biometric benchmarks (blood pressure, blood glucose, lipid panel).</li>
            </ul>
          </div>
        </div>
      )}

      {category === 'obesity' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '20px', backgroundColor: 'var(--color-ground-secondary)', borderLeft: '3px solid #b91c1c' }}>
            <div className="mono-label" style={{ color: '#b91c1c', marginBottom: '6px' }}>
              CLINICAL CONSULTATION & MULTIFACTORIAL CARE (≥ 30.0)
            </div>
            <h5 style={{ fontSize: '18px', marginBottom: '8px' }}>
              Support, Diagnostics, & Compassionate Health
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-ink-secondary)', lineHeight: 1.6 }}>
              <li>• Discuss this result with a credentialed medical practitioner who can evaluate metabolic biomarkers, cardiac health, and sleep apnea risks.</li>
              <li>• Emphasize sustainable lifestyle interventions: restful sleep (7–9 hours), stress mitigation, hydration, and gentle low-impact movement.</li>
              <li>• Avoid unverified weight-loss supplements or rapid-loss protocols that risk metabolic rebound or muscular catabolism.</li>
              <li>• Your body size is not a moral metric; clinical support focuses on cardiovascular longevity and daily vitality.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
