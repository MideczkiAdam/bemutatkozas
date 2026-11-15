import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <p className={`${styles.eyebrow} ${styles.fadeIn}`}>
              MAISON HAIR <span>✳</span> HAIR STUDIO
            </p>

            <h1 className={styles.fadeIn}>
              A stílusod.
              <br />
              A történeted.
              <br />
              <em>A hajad.</em>
            </h1>

            <p className={`${styles.heroIntro} ${styles.fadeIn}`}>
              Egy hely, ahol a részletek számítanak. Találd meg a hozzád illő
              frizurát, és foglalj időpontot néhány egyszerű lépésben.
            </p>

            <div className={`${styles.heroActions} ${styles.fadeIn}`}>
              <a className={styles.buttonPrimary} href="#booking">
                Időpontot foglalok <span>↗</span>
              </a>
              <a className={styles.textLink} href="#services">
                Szolgáltatások
              </a>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={`${styles.orbit} ${styles.orbitOne}`} />
            <div className={`${styles.orbit} ${styles.orbitTwo}`} />
            <div className={styles.heroMonogram}>
              M<span>.</span>
            </div>
            <div className={styles.heroCard}>
              <span className={styles.statusDot} />
              Egy kis énidő neked
            </div>
            <div className={`${styles.floatingShape} ${styles.shapeSquare}`} />
            <div className={`${styles.floatingShape} ${styles.shapeDot}`} />
          </div>
        </div>

        <div className={styles.heroFooter}>
          <span>HAIR · STYLE · EXPERIENCE</span>
          <span className={styles.scrollHint}>
            GÖRGESS LEJJEBB <span className={styles.scrollLine} />
          </span>
        </div>
      </div>
    </section>
  );
}
