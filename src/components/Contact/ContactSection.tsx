import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import './Contact.css';

const EASE: Easing = 'easeOut';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const WHATSAPP_NUMBER = '2250749787811';
const EMAIL = 'soges.devis.infos@gmail.com';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: EASE },
  }),
};

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const serviceOptions = t('contact.form.services', { returnObjects: true }) as string[];

  const onSubmit = (data: FormData) => {
    setLoading(true);
    // Build WhatsApp message
    const msg = encodeURIComponent(
      `*Nouvelle demande SOGES*\n\n` +
      `👤 *Nom:* ${data.name}\n` +
      `📧 *Email:* ${data.email}\n` +
      `📞 *Téléphone:* ${data.phone}\n` +
      `🏷️ *Service:* ${data.service}\n\n` +
      `💬 *Message:*\n${data.message}`
    );
    // Open WhatsApp
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 6000);
    }, 800);
  };

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: t('contact.info.address_label'),
      value: t('contact.info.address'),
      href: 'https://maps.app.goo.gl/2G1HXe7XmMKwvkYG8',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: t('contact.info.email_label'),
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.27 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 5.55 5.55l1.15-1.15a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.24 15z"/>
        </svg>
      ),
      label: t('contact.info.phone_label'),
      value: '+225 07 49 78 78 11',
      href: 'tel:+2250749787811',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      label: t('contact.info.hours_label'),
      value: t('contact.info.hours'),
      href: null,
    },
  ];

  return (
    <section className="contact section bg-dark" id="contact">
      <div className="contact__orb" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="contact__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          custom={0}
        >
          <span className="section-label">{t('contact.label')}</span>
          <h2 className="section-title">
            {t('contact.title')}{' '}
            <span>{t('contact.titleHighlight')}</span>
          </h2>
          <div className="divider" />
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="contact__grid">
          {/* Left — Info */}
          <motion.div
            className="contact__info"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            custom={0.15}
          >
            {/* Info cards */}
            <div className="contact__info-cards">
              {contactInfo.map((item, i) => (
                <div key={i} className="contact__info-card glass-card">
                  <div className="contact__info-icon">{item.icon}</div>
                  <div>
                    <p className="contact__info-label">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="contact__info-value contact__info-link">
                        {item.value}
                      </a>
                    ) : (
                      <p className="contact__info-value">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps embed */}
            <div className="contact__map">
              <iframe
                src="https://maps.google.com/maps?q=Cocody+Riviera+Palmeraie+Immeuble+Quick+Market+Abidjan&output=embed"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SOGES Location"
              />
            </div>

            {/* Social links */}
            <div className="contact__socials">
              <a href="https://wa.me/message/ADZLV5HCBVJCH1" target="_blank" rel="noreferrer" className="contact__social-btn contact__social-btn--wa">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a href="https://www.facebook.com/share/18egmwnxVd/" target="_blank" rel="noreferrer" className="contact__social-btn contact__social-btn--fb">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </a>
              <a href="https://maps.app.goo.gl/2G1HXe7XmMKwvkYG8" target="_blank" rel="noreferrer" className="contact__social-btn contact__social-btn--maps">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Google Maps
              </a>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="contact__form-wrapper glass-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            custom={0.25}
          >
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3>{t('contact.form.success')}</h3>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="contact__form-row">
                  {/* Name */}
                  <div className="contact__field">
                    <label className="contact__label">{t('contact.form.name')}</label>
                    <input
                      className={`contact__input ${errors.name ? 'error' : ''}`}
                      placeholder={t('contact.form.name_placeholder')}
                      {...register('name', { required: true, minLength: 2 })}
                    />
                    {errors.name && <span className="contact__error">Ce champ est requis</span>}
                  </div>

                  {/* Email */}
                  <div className="contact__field">
                    <label className="contact__label">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      className={`contact__input ${errors.email ? 'error' : ''}`}
                      placeholder={t('contact.form.email_placeholder')}
                      {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    />
                    {errors.email && <span className="contact__error">Email invalide</span>}
                  </div>
                </div>

                <div className="contact__form-row">
                  {/* Phone */}
                  <div className="contact__field">
                    <label className="contact__label">{t('contact.form.phone')}</label>
                    <input
                      className="contact__input"
                      placeholder={t('contact.form.phone_placeholder')}
                      {...register('phone')}
                    />
                  </div>

                  {/* Service */}
                  <div className="contact__field">
                    <label className="contact__label">{t('contact.form.service')}</label>
                    <select
                      className={`contact__input contact__select ${errors.service ? 'error' : ''}`}
                      {...register('service', { required: true })}
                      defaultValue=""
                    >
                      <option value="" disabled>{t('contact.form.service_placeholder')}</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.service && <span className="contact__error">Veuillez sélectionner un service</span>}
                  </div>
                </div>

                {/* Message */}
                <div className="contact__field">
                  <label className="contact__label">{t('contact.form.message')}</label>
                  <textarea
                    className={`contact__input contact__textarea ${errors.message ? 'error' : ''}`}
                    placeholder={t('contact.form.message_placeholder')}
                    rows={5}
                    {...register('message', { required: true, minLength: 10 })}
                  />
                  {errors.message && <span className="contact__error">Message trop court</span>}
                </div>

                <button type="submit" className="btn btn-primary contact__submit" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="contact__spinner" />
                      {t('contact.form.submitting')}
                    </>
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
