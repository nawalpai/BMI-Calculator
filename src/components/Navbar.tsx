import React, { useState } from 'react'
import type { ThemeMode } from '../types/bmi'

interface NavbarProps {
  onCalculateClick: () => void
  theme: ThemeMode
  onToggleTheme: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  onCalculateClick,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height)',
        backgroundColor: 'var(--color-nav-bg)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        zIndex: 100,
        borderBottom: '1px solid var(--color-rule)',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.25s ease',
      }}
      className="no-print"
      role="banner"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '19px',
            letterSpacing: '-0.015em',
            color: 'var(--color-ink)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'baseline',
          }}
          aria-label="FORM / BMI Home"
        >
          FORM / BMI<span style={{ color: 'var(--color-accent)' }}>.</span>
        </a>

        {/* Desktop Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '28px',
          }}
          className="desktop-nav"
          aria-label="Main Navigation"
        >
          <a
            href="#calculator"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('calculator')
            }}
          >
            Calculator
          </a>
          <a
            href="#history"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('history')
            }}
          >
            History
          </a>
          <a
            href="#method"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('method')
            }}
          >
            BMI Guide
          </a>
          <a
            href="#study"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('study')
            }}
          >
            Height Study
          </a>
          <a
            href="#reference"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('reference')
            }}
          >
            Reference
          </a>
          <a
            href="#habits"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('habits')
            }}
          >
            Habits
          </a>
          <a
            href="#about"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('about')
            }}
          >
            About
          </a>
        </nav>

        {/* Action Button, Theme Toggle & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Dark/Light Mode Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-rule-heavy)',
              padding: '7px 12px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: 'var(--color-ink)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label={`Toggle theme, current is ${theme}`}
          >
            <span>{theme === 'light' ? '◐ DARK' : '☼ LIGHT'}</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={onCalculateClick}
            style={{ padding: '8px 16px', fontSize: '10.5px' }}
          >
            CALCULATE
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            style={{
              background: 'none',
              border: '1px solid var(--color-rule-heavy)',
              padding: '8px 12px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: 'var(--color-ink)',
            }}
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-ground)',
            borderBottom: '1px solid var(--color-rule)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            zIndex: 99,
          }}
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <a
            href="#calculator"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('calculator')
            }}
          >
            Calculator
          </a>
          <a
            href="#history"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('history')
            }}
          >
            History &amp; Charts
          </a>
          <a
            href="#method"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('method')
            }}
          >
            BMI Guide
          </a>
          <a
            href="#study"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('study')
            }}
          >
            Height Study
          </a>
          <a
            href="#reference"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('reference')
            }}
          >
            Reference Range
          </a>
          <a
            href="#habits"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('habits')
            }}
          >
            Healthy Habits
          </a>
          <a
            href="#about"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('about')
            }}
          >
            About
          </a>

          <div style={{ borderTop: '1px solid var(--color-rule)', paddingTop: '16px' }}>
            <button
              type="button"
              onClick={() => {
                onToggleTheme()
                setMobileMenuOpen(false)
              }}
              className="btn-secondary"
              style={{ width: '100%', padding: '10px' }}
            >
              TOGGLE {theme === 'light' ? 'DARK' : 'LIGHT'} MODE
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  )
}
