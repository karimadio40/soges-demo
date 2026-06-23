import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Testimonials.css';



const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();
  const items = t('testimonials.items', { returnObjects: true }) as Array<{
    name: string;
    role: string;
    text: string;
    rating: number;
  }>;

  return (
    <section className="testimonials section bg-surface" id="testimonials">
      <div className="testimonials__orb" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
        >
          <span className="section-label">{t('testimonials.label')}</span>
          <h2 className="section-title">
            {t('testimonials.title')}{' '}
            <span>{t('testimonials.titleHighlight')}</span>
          </h2>
          <div className="divider" />
          <p className="section-subtitle">{t('testimonials.subtitle')}</p>
        </motion.div>

        {/* Grid */}
        <div className="testimonials__grid">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="testimonials__card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="testimonials__quote-icon">
                <svg viewBox="0 0 32 32" fill="currentColor">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                </svg>
              </div>

              <p className="testimonials__text">"{item.text}"</p>

              <div className="testimonials__author">
                <div className="testimonials__avatar">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="testimonials__name">{item.name}</p>
                  <p className="testimonials__role">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

