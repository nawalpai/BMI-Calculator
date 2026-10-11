import React from 'react'

export const ReferenceTable: React.FC = () => {
  const tableData = [
    {
      category: 'Underweight',
      range: '< 18.5 kg/m²',
      risk: 'Increased risk of nutritional deficiency, immune vulnerability, and bone density reduction.',
      clinical: 'Initial screening indicates below-standard body mass. Evaluation of caloric sufficiency, endocrine function, or chronic illness advised if unintentional.',
    },
    {
      category: 'Healthy Weight',
      range: '18.5 – 24.9 kg/m²',
      risk: 'Statistically lowest baseline population risk for cardiovascular disease, type 2 diabetes, and stroke.',
      clinical: 'Standard adult reference interval. Lifestyle focus remains on metabolic resilience, dietary variety, cardiovascular endurance, and muscular strength.',
    },
    {
      category: 'Overweight',
      range: '25.0 – 29.9 kg/m²',
      risk: 'Moderate epidemiological risk for hypertension, dyslipidemia, and metabolic strain.',
      clinical: 'Screening threshold. Does not establish adiposity: athletic individuals with substantial lean muscle tissue frequently plot in this interval without metabolic harm.',
    },
    {
      category: 'Obesity Class I',
      range: '30.0 – 34.9 kg/m²',
      risk: 'Elevated clinical risk of atherosclerotic cardiovascular disease, hypertension, and insulin resistance.',
      clinical: 'Medical consultation recommended to measure blood pressure, lipid profile, and fasting blood glucose rather than relying solely on body mass.',
    },
    {
      category: 'Obesity Class II',
      range: '35.0 – 39.9 kg/m²',
      risk: 'Substantial risk of metabolic syndrome, sleep apnea, joint degeneration, and non-alcoholic fatty liver.',
      clinical: 'Structured multidisciplinary clinical support recommended for sustainable lifestyle, medical evaluation, and cardiovascular risk reduction.',
    },
    {
      category: 'Obesity Class III',
      range: '≥ 40.0 kg/m²',
      risk: 'Severe risk of cardiovascular events, pulmonary limitation, and chronic metabolic comorbidities.',
      clinical: 'Comprehensive medical management and clinical guidance indicated to prioritize long-term vitality, joint preservation, and organ protection.',
    },
  ]

  return (
    <section
      id="reference"
      style={{
        backgroundColor: 'var(--color-ground)',
        borderBottom: '1px solid var(--color-rule)',
      }}
      aria-labelledby="reference-heading"
    >
      <div className="section-shell">
        <div style={{ marginBottom: '48px' }}>
          <div className="mono-label" style={{ marginBottom: '12px' }}>
            STATISTICAL COMPENDIUM / 04
          </div>
          <h2
            id="reference-heading"
            style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', lineHeight: 1.1 }}
          >
            Adult International Reference Classification
          </h2>
          <p
            className="mono-lede"
            style={{ maxWidth: '640px', marginTop: '12px' }}
          >
            Standardized diagnostic cut-offs established by the World Health
            Organization (WHO) and Centers for Disease Control (CDC) for adult
            populations aged 20 and above.
          </p>
        </div>

        {/* Full-width editorial reference table */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-ink)' }}>
                <th
                  style={{
                    padding: '16px 20px 16px 0',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: 'var(--color-muted)',
                    textTransform: 'uppercase',
                    width: '22%',
                  }}
                >
                  CLASSIFICATION
                </th>
                <th
                  style={{
                    padding: '16px 20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: 'var(--color-muted)',
                    textTransform: 'uppercase',
                    width: '20%',
                  }}
                >
                  BMI INTERVAL
                </th>
                <th
                  style={{
                    padding: '16px 20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: 'var(--color-muted)',
                    textTransform: 'uppercase',
                    width: '28%',
                  }}
                >
                  STATISTICAL RISK PROFILE
                </th>
                <th
                  style={{
                    padding: '16px 0 16px 20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: 'var(--color-muted)',
                    textTransform: 'uppercase',
                    width: '30%',
                  }}
                >
                  CLINICAL INTERPRETATION
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid var(--color-rule)',
                    transition: 'background-color 0.2s ease',
                  }}
                  className="reference-table-row"
                >
                  <td style={{ padding: '24px 20px 24px 0', verticalAlign: 'top' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(18px, 1.8vw, 22px)',
                        color: 'var(--color-ink)',
                      }}
                    >
                      {row.category}
                    </div>
                  </td>
                  <td style={{ padding: '24px 20px', verticalAlign: 'top' }}>
                    <div
                      className="mono-num"
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--color-accent)',
                      }}
                    >
                      {row.range}
                    </div>
                  </td>
                  <td style={{ padding: '24px 20px', verticalAlign: 'top' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        lineHeight: 1.6,
                        color: 'var(--color-ink-secondary)',
                      }}
                    >
                      {row.risk}
                    </p>
                  </td>
                  <td style={{ padding: '24px 0 24px 20px', verticalAlign: 'top' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        lineHeight: 1.6,
                        color: 'var(--color-muted)',
                      }}
                    >
                      {row.clinical}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .reference-table-row:hover {
          background-color: rgba(26, 25, 23, 0.02);
        }
        @media (max-width: 800px) {
          table, thead, tbody, th, td, tr {
            display: block !important;
          }
          thead tr {
            position: absolute !important;
            top: -9999px !important;
            left: -9999px !important;
          }
          tr.reference-table-row {
            padding: 20px 0 !important;
          }
          td {
            padding: 6px 0 !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
