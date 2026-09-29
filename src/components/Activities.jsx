import React from 'react';
import { activities } from '../data/portfolioData';

export function Activities() {
  return (
    <section id="activity" className="sec-block">
      <div className="sec-head">
        <div>
          <h2 className="sec-title">Activities</h2>
          <span className="sec-sub">Beyond coursework & engineering initiatives</span>
        </div>
      </div>

      <div className="cards-grid">
        {activities.map(act => (
          <article key={act.title} className="card">
            <h3>{act.title}</h3>
            <p>{act.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
