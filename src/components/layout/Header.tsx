import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a className={styles.brand} href="#home" aria-label="Maison Hair főoldal">
          <span className={styles.brandMark}>M</span>
          <span>MAISON HAIR</span>
        </a>

        <nav className={styles.navLinks} aria-label="Fő navigáció">
          <a href="#services">Szolgáltatások</a>
          <a href="#team">Csapatunk</a>
          <a href="#booking">Időpontfoglalás</a>
        </nav>

        <a className={styles.navCta} href="#booking">
          Foglalás <span>↗</span>
        </a>
      </div>
    </header>
  );
}
