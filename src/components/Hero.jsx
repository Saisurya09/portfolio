import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { useTypewriter } from '../hooks/useTypewriter';

export function Hero() {
  const { displayedText, isTyping, replay, soundEnabled, toggleSound } = useTypewriter(
    personalInfo.name,
    {
      typingSpeed: 100,
      deletingSpeed: 35,
      interval: 5 * 60 * 1000, // 5 minutes (300,000ms)
      initialDelay: 250,
      middleClipOffset: 2.2, // Use the middle clip (2.2s into the audio)
    }
  );

  return (
    <header className="hero" id="top">
      <div>
        <div className="hero-badge-row">
          <div className="pill-badge">
            <span className="pill-dot"></span>
            <span>{personalInfo.statusPill}</span>
          </div>

          <button
            type="button"
            className="sound-toggle-btn sound-active"
            onClick={toggleSound}
            title="Click to replay typing with sound (middle clip)"
            aria-label="Click to replay typing with sound"
          >
            <span className="sound-toggle-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </span>
            <span>Play with Sound</span>
          </button>
        </div>

        <h1 className="hero-title" aria-label={personalInfo.name}>
          <span
            className="typewriter-wrap"
            onClick={replay}
            title="Click to replay typing animation (auto-repeats every 5 minutes)"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                replay();
              }
            }}
          >
            <span className="typewriter-text" aria-hidden="true">
              {displayedText || '\u00A0'}
            </span>
            <span
              className={`typewriter-cursor ${isTyping ? 'is-typing' : ''}`}
              aria-hidden="true"
            />
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
