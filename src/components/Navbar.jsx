import React, { useState } from 'react';

export function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Projects', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Education', href: '#education' },
    { label: 'Activities', href: '#activity' },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="w">
        <a href="#top" className="brand-link" aria-label="Back to top">
          <span className="brand-badge" title="Available for opportunities"></span>
          Ambati SaiSurya
        </a>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={handleLinkClick}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-link cta-btn"
            onClick={handleLinkClick}
          >
            Contact
          </a>

          <button
            type="button"
            className="theme-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </div>

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
