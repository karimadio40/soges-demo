import React from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Services.css';

const EASE: Easing = 'easeOut';

const serviceData = [
  {
    key: 'accounting',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    color: '#FF5500',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    key: 'creation',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
    color: '#A8421A',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    key: 'commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    color: '#4DAA87',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
  },
  {
    key: 'negoce',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80',
    color: '#FF5500',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    key: 'formation',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    color: '#A8421A',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    key: 'fiscal',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    color: '#4DAA87',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
};

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="services section bg-dark" id="services">
      <div className="services__line services__line--1" />
      <div className="services__line services__line--2" />

      <div className="container">
        <motion.div
          className="services__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          custom={0}
        >
          <span className="section-label">{t('services.label')}</span>
          <h2 className="section-title">
            {t('services.title')}{' '}
            <span>{t('services.titleHighlight')}</span>
          </h2>
          <div className="divider" />
          <p className="section-subtitle">{t('services.subtitle')}</p>
        </motion.div>

        <div className="services__grid">
          {serviceData.map(({ key, image, icon }, i) => (
            <motion.div
              key={key}
              className="services__card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
              custom={0.1 + i * 0.07}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="services__card-img-wrap">
                <img
                  src={image}
                  alt={t(`services.items.${key}.title`)}
                  className="services__card-img"
                  loading="lazy"
                />
                <div className="services__card-img-overlay" />
                <span className="services__card-number">0{i + 1}</span>
              </div>

              {/* Body */}
              <div className="services__card-body">
                <div className="services__card-icon">
                  {icon}
                </div>
                <h3 className="services__card-title">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="services__card-desc">
                  {t(`services.items.${key}.desc`)}
                </p>

                <Link to={`/services/${key}`} className="services__card-link">
                  <span>{t('services.learnMore')}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

