import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a className={styles.brand} href="#home">
          <span className={styles.brandMark}>M</span>
          <span>MAISON HAIR</span>
        </a>
        <span>© {new Date().getFullYear()} MAISON HAIR · Minden jog fenntartva.</span>
        <a href="#home">Vissza az oldal tetejére ↑</a>
      </div>
    </footer>
  );
}
