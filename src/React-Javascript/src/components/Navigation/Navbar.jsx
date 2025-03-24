import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          TalentScan
        </Link>

        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/about" className={styles.navLink}>Sobre Nosotros</Link>
          <Link to="/services" className={styles.navLink}>Servicios</Link>
          <Link to="/search" className={styles.navLink}>Buscar CVs</Link>
          <Link to="/contact" className={styles.navLink}>Contacto</Link>
        </div>

        <button 
          className={styles.menuButton} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 