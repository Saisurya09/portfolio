import React from 'react';
import { certifications } from '../data/portfolioData';

export function Certifications() {
  return (
    <section id="certifications" className="sec-block">
      <div className="sec-head">
        <div>
          <h2 className="sec-title">Certifications</h2>
          <span className="sec-sub">Verified industry credentials</span>
        </div>
      </div>

      <div className="cards-grid">
        {certifications.map(cert => (
          <article key={cert.title} className="card">
            <div className="cert-mono">{cert.badge}</div>
            <span className="card-kicker">{cert.badgeLabel}</span>
            <h3>{cert.title}</h3>
            <p>{cert.issuer}</p>
            <div className="tags-list">
              <span className="tag-badge">{cert.validity}</span>
              <a
                className="cert-link-btn"
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View certificate</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
