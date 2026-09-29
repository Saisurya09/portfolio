import React from 'react';
import { personalInfo } from '../data/portfolioData';

export function Hero() {
  return (
    <header className="hero" id="top">
      <div>
        <div className="pill-badge">
          <span className="pill-dot"></span>
          <span>{personalInfo.statusPill}</span>
        </div>

        <h1 className="hero-title" aria-label={personalInfo.name}>
          <span className="typewriter-wrap">
            {personalInfo.name}
            <span className="typewriter-cursor" aria-hidden="true"></span>
          </span>
        </h1>

        <p className="lede">{personalInfo.lede}</p>

        <dl className="det-grid">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}>{personalInfo.phone}</a>
            </dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{personalInfo.location}</dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>{personalInfo.educationSnippet}</dd>
          </div>
        </dl>

        <div className="hero-actions">
          <a className="btn primary" href="#work">
            See my projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a className="btn" href="#contact">
            Send a message
          </a>
        </div>
      </div>

      <div className="portrait-wrap">
        <div className="portrait-frame">
          <img
            className="portrait-img"
            src={personalInfo.avatar}
            alt={`Portrait of ${personalInfo.name}`}
            loading="eager"
          />
        </div>
      </div>
    </header>
  );
}
