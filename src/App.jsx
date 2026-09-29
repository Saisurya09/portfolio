import React from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { Activities } from './components/Activities';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-container">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content">
        <div className="w">
          <Hero />
          <Projects />
          <Skills />
          <Certifications />
          <Education />
          <Activities />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
