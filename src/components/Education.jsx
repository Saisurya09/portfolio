import React from 'react';
import { educationList } from '../data/portfolioData';

export function Education() {
  return (
    <section id="education" className="sec-block">
      <div className="sec-head">
        <div>
          <h2 className="sec-title">Education</h2>
          <span className="sec-sub">Academic foundation & degree milestones</span>
        </div>
      </div>

      <div className="cards-grid">
        {educationList.map(edu => (
          <article key={edu.institution} className="card">
            <span className="card-kicker">{edu.period}</span>
            <h3>{edu.institution}</h3>
            <p>{edu.degree}</p>
            <div className="big-stat">
              {edu.score} <span className="stat-unit">{edu.scoreLabel}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
