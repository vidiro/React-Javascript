import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Encuentra el talento perfecto para tu empresa</h1>
          <p>Utilizando inteligencia artificial para conectar los mejores candidatos con las mejores oportunidades</p>
          <div className={styles.heroButtons}>
            <button className="button button-primary">Comenzar búsqueda</button>
            <button className="button button-secondary">Saber más</button>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2>¿Por qué elegirnos?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3>Búsqueda Precisa</h3>
            <p>Tecnología AI para encontrar las mejores coincidencias</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Resultados Rápidos</h3>
            <p>Obtén resultados en segundos, no en días</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>Seguro y Confiable</h3>
            <p>Tus datos siempre están protegidos</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 