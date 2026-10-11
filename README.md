# FORM / BMI — Body Mass Index & Anatomical Wellness Suite

An editorial, scientifically calibrated, front-end-only Body Mass Index (BMI) calculator, reference-weight interval projector, and clinical education platform built with React, Vite, and TypeScript.

---

## Overview

**FORM / BMI** is designed around a warm editorial studio aesthetic (`#E7E3DA` bone ground, `#1A1917` ink, and `#9B3418` oxide pigment accent). It avoids generic AI-generated landing page tropes—featuring square corners, hairline rules, mathematically plotted SVG scales, and clear medical distinction between screening metrics, tissue composition, and holistic health.

### Core Capabilities

1. **Exact Quetelet BMI Formulation**:
   - Metric: $\text{BMI} = \text{weight (kg)} / (\text{height (m)})^2$
   - Imperial: $\text{BMI} = 703 \times \text{weight (lbs)} / (\text{height (in)})^2$ (with exact conversion constants: $1\text{ in} = 0.0254\text{ m}$, $1\text{ lb} = 0.45359237\text{ kg}$).
   - Boundary-tested adult classification:
     - Underweight: $< 18.5$
     - Healthy weight: $18.5 \le \text{BMI} < 25.0$ (25.0 is strictly classified as overweight)
     - Overweight: $25.0 \le \text{BMI} < 30.0$ (30.0 is strictly classified as obesity)
     - Obesity: $\ge 30.0$
2. **Pediatric & Infant Safety Guidance**:
   - Users aged 2–19 are directed to age-and-sex specific CDC/WHO growth percentile curves.
   - Children under 2 receive guidance on WHO infant weight-for-length standards.
3. **Height-Calibrated Adult Reference-Weight Interval**:
   - Computes $18.5 \times h^2$ to $24.9 \times h^2$ based on the user's stature.
   - Displays whether current mass is below, within, or above the standard interval.
4. **Three-Circle Domain Venn Diagram**:
   - Differentiates **BMI Screening**, **Body Composition** (lean mass vs. visceral adiposity), and **Overall Metabolic Health**.
5. **Interactive Stature Study Section**:
   - Live scroll/scrubber Cartesian graph tracking quadratic stature-to-mass dynamics ($Lower = 18.5 \times h^2$, $Upper = 24.9 \times h^2$).
6. **Nonjudgmental Clinical Education**:
   - Respectful, evidence-supported guidance for all categories with no shaming or crash diets.
7. **Export & Print**:
   - Instant text summary copying to clipboard with toast notification.
   - Print stylesheet (`window.print()`) rendering a clean, button-free medical report.
8. **Optional Local Storage**:
   - Zero telemetry. Optional opt-in checkbox to remember measurements locally in the browser session.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Linter**: Oxlint (0 warnings, 0 errors)
- **Typography**: Google Fonts (*Instrument Serif* + *Azeret Mono*)
- **Styling**: Pure CSS design tokens, hairline rules, zero framework bloat

---

## Project Structure

```text
form-bmi/
├── index.html                 # Brand metadata, fonts, theme color, custom SVG favicon
├── public/
│   ├── favicon.svg            # Bespoke architectural 'F' monogram in bone & oxide
│   └── hero-video.mp4         # Reference anatomical sculpture video
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # 60px translucent fixed bar with mobile drawer
│   │   ├── HeroSection.tsx    # Split-wordmark bracket with subject in gap
│   │   ├── BMICalculator.tsx  # Dual-column calculator with lossless unit switching
│   │   ├── BMIResult.tsx      # Results stage with quick/detailed switch
│   │   ├── BMIScale.tsx       # Mathematically continuous proportional scale
│   │   ├── HealthyRangeDiagram.tsx # Stature-calibrated reference-weight interval
│   │   ├── BMIComparisonDiagram.tsx # Three-circle Venn diagram
│   │   ├── BMIExplanation.tsx # Hairline-ruled methodology section
│   │   ├── PinnedStudy.tsx    # Stature-mass quadratic Cartesian graph
│   │   ├── ReferenceTable.tsx # Full-width international reference table
│   │   ├── HealthyHabits.tsx  # 4-pillar editorial lifestyle guidance
│   │   ├── PersonalizedGuidance.tsx # Category-calibrated suggestions
│   │   ├── PrintReport.tsx    # Print-only medical report layout
│   │   └── Footer.tsx         # Bookending cropped wordmark & back-to-top
│   ├── types/
│   │   └── bmi.ts             # Strict TypeScript definitions
│   ├── utils/
│   │   ├── bmi.ts             # Mathematical formulas, conversions, validation
│   │   ├── formatters.ts      # Clinical descriptions and formatters
│   │   ├── storage.ts         # Session storage persistence
│   │   └── clipboard.ts       # Text report generator & clipboard copy
│   ├── App.tsx                # Layout sequence orchestrator
│   ├── index.css              # Editorial tokens, typography, print styles
│   └── main.tsx
├── test-calculations.mjs      # Standalone verification test suite
└── vite.config.ts             # GitHub Pages relative base configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended; tested on v24)
- npm

### 1. Installation

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 3. Run Calculations & Boundary Test Suite

```bash
npm test
```

Verifies all example calculations, threshold boundaries (18.4, 18.5, 24.9, 25.0, 29.9, 30.0), pediatric cohorts, and unit conversions.

### 4. Run Code Linter

```bash
npm run lint
```

### 5. Build for Production

```bash
npm run build
```

Build artifacts will be emitted to `dist/` with relative asset paths ready for GitHub Pages.

### 6. Preview Production Build

```bash
npm run preview
```

---

## GitHub Pages Deployment

The project is configured with `base: './'` in `vite.config.ts`, ensuring all assets, scripts, and stylesheets load seamlessly on repository sub-paths (e.g. `https://<USERNAME>.github.io/<REPO>/`) without server rewrites.

### Steps to Deploy:

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete editorial FORM / BMI website"
   git push origin main
   ```
2. In GitHub, go to your repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Use the standard static Vite workflow, or push the contents of `dist/` to a `gh-pages` branch.

---

## Medical Disclaimer

FORM / BMI is an educational and screening application. It does not provide medical diagnoses, treatment advice, or personalized dietary prescriptions. For personal health assessments, consult a qualified healthcare professional.
