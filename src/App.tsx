import React from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="bg-gray-900 min-h-screen">
        <ScrollProgress />
        <Navbar />
        <Hero />
        <Projects />
        <About />
        <Contact />
      </div>
    </Router>
  );
}
