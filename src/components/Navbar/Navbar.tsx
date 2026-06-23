import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../Logo/Logo';
import './Navbar.css';

/* ---- Sun icon ---- */
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

/* ---- Moon icon ---- */
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(i18n.language);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    const newLang = activeLang === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
    setActiveLang(newLang);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { key: 'home', id: 'home' },
    { key: 'about', id: 'about' },
    { key: 'services', id: 'services' },
    { key: 'testimonials', id: 'testimonials' },
    { key: 'contact', id: 'contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} navbar--${theme}`}>
      <div className="container navbar__inner">

        {/* Logo */}
        <Logo onClick={() => scrollTo('home')} />

        {/* Desktop Nav */}
        <ul className="navbar__links">
          {navLinks.map(({ key, id }) => (
            <li key={key}>
              <button className="navbar__link" onClick={() => scrollTo(id)}>
                {t(`nav.${key}`)}
              </button>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="navbar__controls">

          {/* Theme toggle */}
          <motion.button
            className={`navbar__theme-toggle navbar__theme-toggle--${theme}`}
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </motion.div>
          </motion.button>

          {/* Language toggle */}
          <button className="navbar__lang-toggle" onClick={toggleLang} title="Switch language">
            <span className={activeLang === 'fr' ? 'active' : ''}>FR</span>
            <span className="navbar__lang-sep">|</span>
            <span className={activeLang === 'en' ? 'active' : ''}>EN</span>
          </button>

          {/* CTA */}
          <button
            className="btn btn-primary navbar__cta"
            onClick={() => scrollTo('contact')}
          >
            {t('nav.cta')}
          </button>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map(({ key, id }) => (
              <button
                key={key}
                className="navbar__mobile-link"
                onClick={() => scrollTo(id)}
              >
                {t(`nav.${key}`)}
              </button>
            ))}

            {/* Mobile theme toggle row */}
            <div className="navbar__mobile-extras">
              <button
                className={`navbar__theme-toggle navbar__theme-toggle--${theme}`}
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                <span>{theme === 'dark' ? 'Thème clair' : 'Thème sombre'}</span>
              </button>
            </div>

            <button
              className="btn btn-primary navbar__mobile-cta"
              onClick={() => scrollTo('contact')}
            >
              {t('nav.cta')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
