import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  };

  return (
    <section id="contact" className="sec-block">
      <div className="contact-container">
        <div className="contact-header">
          <div className="pill-badge" style={{ marginBottom: '14px' }}>
            <span className="pill-dot"></span>
            <span>Get in touch</span>
          </div>
          <h2 className="sec-title">Let's connect</h2>
          <p className="contact-desc">
            Have an open role, engineering challenge, or project in mind? Reach out directly via email or phone—I'd love to discuss how we can work together.
          </p>
        </div>

        <div className="contact-methods">
          <a
            className="contact-method-card"
            href={`mailto:${personalInfo.email}`}
            title={`Send an email to ${personalInfo.email}`}
          >
            <div className="method-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="method-content">
              <span className="method-label">Email</span>
              <span className="method-value">{personalInfo.email}</span>
            </div>
            <span className="method-arrow" aria-hidden="true">↗</span>
          </a>

          <a
            className="contact-method-card"
            href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
            title={`Call or message ${personalInfo.phone}`}
          >
            <div className="method-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="method-content">
              <span className="method-label">Phone</span>
              <span className="method-value">{personalInfo.phone}</span>
            </div>
            <span className="method-arrow" aria-hidden="true">↗</span>
          </a>

          <div className="contact-method-card static">
            <div className="method-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="method-content">
              <span className="method-label">Location</span>
              <span className="method-value">{personalInfo.location}</span>
            </div>
          </div>
        </div>

        <div className="contact-actions">
          <a
            className="btn primary"
            href={`mailto:${personalInfo.email}`}
            title="Open email application"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>Send an Email</span>
          </a>

          <button
            type="button"
            className="btn"
            onClick={handleCopyEmail}
            aria-live="polite"
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Email Copied!</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {copyError && (
          <p className="contact-copy-notice" role="alert">
            Copy failed. Please write directly to {personalInfo.email}
          </p>
        )}
      </div>
    </section>
  );
}
