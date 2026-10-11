# FORM / BMI — Body Mass Index & Anatomical Wellness Suite

An editorial, scientifically calibrated, front-end-only Body Mass Index (BMI) calculator, reference-weight interval projector, longitudinal history tracking suite, and clinical education platform built with React, Vite, and TypeScript.

Live Website: **[https://nawalpai.github.io/BMI-Calculator/](https://nawalpai.github.io/BMI-Calculator/)**

---

## Overview

**FORM / BMI** is designed around a warm editorial studio aesthetic (`#E7E3DA` bone ground, `#1A1917` ink, and `#9B3418` oxide pigment accent) with an integrated high-contrast dark mode (`#151413`). It avoids generic AI-generated landing page tropes—featuring square corners, hairline rules, mathematically plotted SVG scales, and clear medical distinction between screening metrics, tissue composition, and holistic health.

### Core Capabilities

1. **Exact Quetelet BMI Formulation**:
   - Metric: $\text{BMI} = \text{weight (kg)} / (\text{height (m)})^2$
   - Imperial: $\text{BMI} = 703 \times \text{weight (lbs)} / (\text{height (in)})^2$ (with exact conversion constants: $1\text{ in} = 0.0254\text{ m}$, $1\text{ lb} = 0.45359237\text{ kg}$).
   - Boundary-tested adult classification:
     - Underweight: $< 18.5$
     - Healthy weight: $18.5 \le \text{BMI} < 25.0$ (25.0 is strictly classified as overweight)
     - Overweight: $25.0 \le \text{BMI} < 30.0$ (30.0 is strictly classified as obesity)
     - Obesity: $\ge 30.0$
2. **BMI History & Interactive Longitudinal Chart**:
   - Stores calculations locally on your device with timestamps and metrics.
   - Interactive SVG line and scatter chart with healthy and overweight reference bands.
   - Summary cards displaying Latest, Lowest, and Highest recorded BMIs.
   - One-click **Reload** to restore past measurements into the calculator.
   - Built-in demonstration trajectory mode for previewing multi-month progress curves.
3. **Dark & Light Mode Toggle**:
   - Accessible button in the fixed navigation bar (`◐ DARK` / `☼ LIGHT`).
   - Automatically adapts colors, borders, charts, and sculptural visuals while preserving editorial typography and legibility.
   - Persists user preference in `localStorage` and respects system `prefers-color-scheme`.
4. **Pediatric & Infant Safety Guidance**:
   - Users aged 2–19 are directed to age-and-sex specific CDC/WHO growth percentile curves.
   - Children under 2 receive guidance on WHO infant weight-for-length standards.
5. **Height-Calibrated Adult Reference-Weight Interval**:
   - Computes $18.5 \times h^2$ to $24.9 \times h^2$ based on the user's stature.
   - Displays whether current mass is below, within, or above the standard interval.
6. **Three-Circle Domain Venn Diagram**:
   - Differentiates **BMI Screening**, **Body Composition** (lean mass vs. visceral adiposity), and **Overall Metabolic Health**.
7. **Interactive Stature Study Section**:
   - Live scroll/scrubber Cartesian graph tracking quadratic stature-to-mass dynamics ($Lower = 18.5 \times h^2$, $Upper = 24.9 \times h^2$).
8. **Multiple Export & Download Options**:
   - **Download Report (.txt)**: Clean, formatted clinical screening report file.
   - **Export CSV**: Spreadsheet-compatible data file of complete measurement history.
   - **Export JSON**: Raw structured data backup.
   - **Copy Report**: Clipboard copy with instant visual feedback.
   - **Print Report**: High-contrast, button-free `@media print` layout via `window.print()`.
9. **Nonjudgmental Clinical Education**:
   - Respectful, evidence-supported guidance for all categories with no shaming or crash diets.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Linter**: Oxlint (0 warnings, 0 errors)
- **Typography**: Google Fonts (*Instrument Serif* + *Azeret Mono*)
- **Deployment**: GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages

---

## Project Structure

```text
BMI-Calculator/
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions deployment to GitHub Pages
├── index.html                 # Brand metadata, fonts, theme color, custom SVG favicon
├── public/
│   ├── favicon.svg            # Bespoke architectural 'F' monogram in bone & oxide
│   └── hero-video.mp4         # Reference anatomical sculpture video
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # 60px translucent fixed bar with theme toggle & mobile drawer
│   │   ├── HeroSection.tsx    # Split-wordmark bracket with subject in gap
│   │   ├── BMICalculator.tsx  # Dual-column calculator with lossless unit switching & history reload
│   │   ├── BMIResult.tsx      # Results stage with quick/detailed switch & download action
│   │   ├── BMIHistoryChart.tsx# Interactive SVG trend chart & history log
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
│   │   ├── history.ts         # History management, CSV, JSON, and TXT exports
│   │   ├── storage.ts         # Session storage persistence
│   │   └── clipboard.ts       # Text report generator & clipboard copy
│   ├── App.tsx                # State orchestrator: theme, history, inputs, scroll
│   ├── index.css              # Editorial tokens, dark mode [data-theme='dark'], print styles
│   └── main.tsx
├── test-calculations.mjs      # Standalone verification test suite
└── vite.config.ts             # GitHub Pages base path configuration (/BMI-Calculator/)
```

---

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Run Calculations & Boundary Test Suite

```bash
npm test
```

Verifies all example calculations, threshold boundaries (18.4, 18.5, 24.9, 25.0, 29.9, 30.0), pediatric cohorts, and bidirectional unit conversions.

### 4. Run Code Linter

```bash
npm run lint
```

### 5. Build for Production

```bash
npm run build
```

---

## GitHub Pages Deployment

The repository includes an automated GitHub Actions deployment workflow at [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml).

### To Publish:

1. Commit and push the changes:
   ```bash
   git add .
   git commit -m "feat: add BMI history, charts, dark mode, downloads, and GitHub Pages workflow"
   git push origin main
   ```

2. Enable GitHub Pages in your repository settings:
   - Go to your repository on GitHub: `https://github.com/nawalpai/BMI-Calculator/`
   - Click **Settings** (top tab) → **Pages** (left sidebar).
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.

3. The included workflow will automatically run, test, build, and deploy the site to:
   **`https://nawalpai.github.io/BMI-Calculator/`**
