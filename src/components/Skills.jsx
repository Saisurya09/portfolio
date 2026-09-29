import React from 'react';
import { skillCategories } from '../data/portfolioData';

export function Skills() {
  return (
    <section id="skills" className="sec-block">
      <div className="sec-head">
        <div>
          <h2 className="sec-title">Skills</h2>
          <span className="sec-sub">Technologies, databases & engineering competencies</span>
        </div>
      </div>

      <div className="cards-grid">
        {skillCategories.map(cat => (
          <article key={cat.category} className="card skill-card">
            <h3>{cat.category}</h3>
            <div className="tags-list">
              {cat.skills.map(skill => (
                <span key={skill} className="tag-badge">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
