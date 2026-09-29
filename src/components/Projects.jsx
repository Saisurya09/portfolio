import React, { useState } from 'react';
import { projects } from '../data/portfolioData';

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Cloud', 'Full Stack', 'AI & Vision', 'Security'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="work" className="sec-block">
      <div className="sec-head">
        <div>
          <h2 className="sec-title">Projects</h2>
          <span className="sec-sub">Production systems & applications I've built</span>
        </div>
      </div>

      <div className="filter-bar" role="tablist" aria-label="Project categories">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="cards-grid">
        {filteredProjects.map(project => (
          <article key={project.id} className="card">
            <span className="card-kicker">{project.subtitle}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tags-list">
              {project.tags.map(tag => (
                <span key={tag} className="tag-badge">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
