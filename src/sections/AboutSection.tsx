import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.aboutGrid}>
          <div className={styles.sectionLabel}>
            <span>01</span> RÓLUNK
          </div>

          <div className={styles.aboutContent}>
            <div className={styles.aboutPhotoWrap}>
              <div className={styles.aboutPhotoPlaceholder}>
                <span>MH</span>
              </div>
              <div className={styles.photoBadge}>
                YOUR STYLE
                <br />
                YOUR STORY
              </div>
            </div>

            <div className={styles.aboutCopy}>
              <h2>
                Több mint egy
                <br />
                <em>hajvágás.</em>
              </h2>
              <p>
                Hiszünk abban, hogy egy jól eltalált frizura magabiztosságot ad.
                Figyelünk rád, megismerjük az elképzeléseidet, és együtt
                megtaláljuk a hozzád illő stílust.
              </p>
              <p>
                Válassz szolgáltatást, fodrászt és egy számodra megfelelő
                időpontot – a többit bízd ránk.
              </p>
              <a className={styles.textLink} href="#booking">
                Foglalj időpontot <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
