import React, { useState } from 'react'

interface NavbarProps {
  onCalculateClick: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onCalculateClick }) => {
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
        backgroundColor: 'rgba(231, 227, 218, 0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        zIndex: 100,
        borderBottom: '1px solid var(--color-rule)',
        display: 'flex',
        alignItems: 'center',
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
            gap: '32px',
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
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
