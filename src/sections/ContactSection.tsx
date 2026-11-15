import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.contactGrid}>
          <div className={styles.contactCopy}>
            <p className={styles.sectionLabel}><span>06</span> KAPCSOLAT</p>
            <h2>Találkozunk<br /><em>a szalonban.</em></h2>
            <p>Kérdésed van? Vedd fel velünk a kapcsolatot, vagy foglalj időpontot online.</p>
            <a className={styles.button} href="#booking">Időpontfoglalás <span>↗</span></a>
          </div>

          <div className={styles.contactDetails}>
            <div>
              <span>NYITVATARTÁS</span>
              <strong>Hétfő – Péntek</strong>
              <p>09:00 – 17:00</p>
            </div>
            <div>
              <span>ONLINE FOGLALÁS</span>
              <strong>Egyszerűen, pár lépésben</strong>
              <p>Válaszd ki a neked megfelelő időpontot fentebb.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
