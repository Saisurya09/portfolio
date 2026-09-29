import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Access key from environment variable or placeholder
  const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus({ type: 'e', text: `Copy failed. Email directly: ${personalInfo.email}` });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (status.text) setStatus({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) {
      setStatus({ type: 'e', text: 'Please enter your name.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: 'e', text: 'Please enter a valid email address.' });
      return;
    }
    if (message.length < 10) {
      setStatus({ type: 'e', text: 'Please enter a message of at least 10 characters.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    // Fallback if ACCESS_KEY has not been configured yet
    if (ACCESS_KEY === 'YOUR_ACCESS_KEY') {
      setIsSubmitting(false);
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${name}`
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      window.location.href = mailtoUrl;
      setStatus({
        type: 's',
        text: `Opening your email app to send directly to ${personalInfo.email}. (To receive submissions via the web form without opening email apps, add a free Web3Forms access key).`
      });
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio inquiry from ${name}`,
          name,
          email,
          message,
          botcheck: ''
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus({ type: 's', text: 'Message sent! I will get back to you shortly.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Fallback to mailto if submission fails
        window.location.href = `mailto:${personalInfo.email}?subject=Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
        setStatus({
          type: 'e',
          text: `Submission notice: ${result.message || 'Could not send'}. Opened your email client to contact ${personalInfo.email} directly.`
        });
      }
    } catch {
      setStatus({
        type: 'e',
        text: `Network issue. Please email me directly at ${personalInfo.email}.`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="sec-block">
      <div className="contact-layout">
        <div className="contact-info">
          <h2 className="sec-title">Let's talk</h2>
          <p>
            Have an open role, engineering challenge, or project in mind? Reach out through this form, or contact me directly.
          </p>

          <div className="contact-direct">
            <a className="direct-link" href={`mailto:${personalInfo.email}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>{personalInfo.email}</span>
            </a>
            <a className="direct-link" href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{personalInfo.phone}</span>
            </a>
          </div>

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
                <span>Copy email</span>
              </>
            )}
          </button>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label className="form-field">
            <span>Your name</span>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Satya Nadella"
              autoComplete="name"
              required
            />
          </label>

          <label className="form-field">
            <span>Your email</span>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. satya@company.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="form-field">
            <span>Message</span>
            <textarea
              name="message"
              className="form-textarea"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about the engineering opportunity or project..."
              required
            ></textarea>
          </label>

          <button
            type="submit"
            className="btn primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending message...' : 'Send message'}
          </button>

          {status.text && (
            <p className={`form-msg ${status.type}`} role="status">
              {status.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
