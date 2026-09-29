import React from 'react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="w footer-inner">
        <div>
          <span>© {new Date().getFullYear()} Ambati SaiSurya. Built with React.js & Vite.</span>
        </div>
        <div>
          <a href="#top" className="back-to-top" aria-label="Scroll to top of page">
            <span>Back to top</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
