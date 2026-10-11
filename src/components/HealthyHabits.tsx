import React from 'react'

export const HealthyHabits: React.FC = () => {
  const habits = [
    {
      num: 'PILLAR / 01',
      title: 'Nutrition',
      subtitle: 'Nutritional Density & Balanced Proportion',
      body: 'Shift focus from acute caloric restriction toward nutrient-dense whole foods. Incorporate diverse dietary fibers, unprocessed complex carbohydrates, healthy plant lipids, and adequate bioavailable protein to preserve lean skeletal muscle and stabilize insulin sensitivity.',
      detail: 'VARIETY • WHOLE FOODS • CONSISTENCY',
    },
    {
      num: 'PILLAR / 02',
      title: 'Movement',
      subtitle: 'Progressive Loading & Cardiovascular Endurance',
      body: 'Physical activity operates independently of weight loss as a primary driver of longevity. Combine structured resistance training twice weekly with moderate aerobic movement (such as 150 minutes of brisk walking, cycling, or swimming) to strengthen the myocardium and maintain bone density.',
      detail: 'STRENGTH • NEAT • CARDIOVASCULAR HEALTH',
    },
    {
      num: 'PILLAR / 03',
      title: 'Recovery',
      subtitle: 'Circadian Architecture, Sleep & Hydration',
      body: 'Chronic sleep deprivation dysregulates appetite hormones ghrelin and leptin, elevates systemic cortisol, and accelerates metabolic fatigue. Prioritize 7 to 9 hours of restorative sleep, regular circadian exposure, and structured hydration throughout the waking day.',
      detail: 'CIRCADIAN ALIGNMENT • 7–9 HOURS • CELLULAR REST',
    },
    {
      num: 'PILLAR / 04',
      title: 'Clinical Support',
      subtitle: 'Individualized Medicine & Biomarker Diagnostics',
      body: 'A single numerical index cannot replace individualized diagnostics. Annual comprehensive evaluations with a licensed physician—including resting blood pressure, fasting glucose, HbA1c, and lipid panels—provide the true clinical baseline for personal vitality.',
      detail: 'PHYSICIAN REVIEW • BIOMARKERS • PERSONALIZATION',
    },
  ]

  return (
    <section
      id="habits"
      style={{
        backgroundColor: 'var(--color-ground-secondary)',
        borderBottom: '1px solid var(--color-rule)',
      }}
      aria-labelledby="habits-heading"
    >
      <div className="section-shell">
        <div style={{ marginBottom: '48px' }}>
          <div className="mono-label" style={{ marginBottom: '12px' }}>
            DAILY PRACTICE / 05
          </div>
          <h2
            id="habits-heading"
            style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', lineHeight: 1.1 }}
          >
            Small changes. <span className="italic-accent">Sustainable progress.</span>
          </h2>
          <p
            className="mono-lede"
            style={{ maxWidth: '640px', marginTop: '12px' }}
          >
            An evidence-informed editorial guide to long-term physical resilience.
            True metabolic health is established through repeatable daily rhythms
            rather than restrictive programs.
          </p>
        </div>

        {/* Editorial hairline-separated rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {habits.map((item, idx) => (
            <div
              key={idx}
              style={{
                borderTop: '1px solid var(--color-rule)',
                padding: '36px 0',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.4fr) minmax(0, 0.7fr)',
                gap: '32px',
                alignItems: 'baseline',
              }}
              className="habit-row"
            >
              {/* Column 1: Number & Heading */}
              <div>
                <span className="mono-label" style={{ color: 'var(--color-accent)', fontSize: '10px' }}>
                  {item.num}
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(24px, 2.5vw, 32px)',
                    marginTop: '4px',
                    color: 'var(--color-ink)',
                  }}
                >
                  {item.title}
                </h3>
              </div>

              {/* Column 2: Body Narrative */}
              <div>
                <h4
                  style={{
                    fontSize: '18px',
                    marginBottom: '10px',
                    color: 'var(--color-ink)',
                  }}
                >
                  {item.subtitle}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12.5px',
                    lineHeight: 1.7,
                    color: 'var(--color-ink-secondary)',
                  }}
                >
                  {item.body}
                </p>
              </div>

              {/* Column 3: Monospaced Tag & Hairline marker */}
              <div style={{ textAlign: 'right' }} className="habit-meta">
                <span
                  className="mono-label"
                  style={{
                    fontSize: '9.5px',
                    color: 'var(--color-muted)',
                    letterSpacing: '0.14em',
                  }}
                >
                  {item.detail}
                </span>
              </div>
            </div>
          ))}
          <div style={{ borderBottom: '1px solid var(--color-rule)' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .habit-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .habit-meta {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  )
}
