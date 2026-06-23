import React from 'react';
import logoImg from '../../assets/logo.jpg';
import './Logo.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', onClick }) => {
  return (
    <button className={`logo logo--${size}`} onClick={onClick} aria-label="SOGES — Accueil">
      <div className="logo__mark">
        <img
          src={logoImg}
          alt="SOGES Logo"
          className="logo__img"
        />
      </div>
      <div className="logo__text">
        <span className="logo__name">SOGES</span>
        <span className="logo__sub">Solutions d'Entreprises</span>
      </div>
    </button>
  );
};

export default Logo;
