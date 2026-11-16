import type { HairdresserType } from "../types/hairdresser";
import styles from "./TeamSection.module.css";

interface TeamSectionProps {
  hairdressers: HairdresserType[];
  onChooseHairdresser: (hairdresserId: string) => void;
}

export default function TeamSection({
  hairdressers,
  onChooseHairdresser,
}: TeamSectionProps) {
  return (
    <section className={styles.section} id="team">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionLabel}><span>03</span> A CSAPATUNK</p>
            <h2>Jó kezekben<br /><em>leszel.</em></h2>
          </div>
          <p>Ismerd meg fodrászainkat,<br />és válaszd ki, kihez érkezel.</p>
        </div>

        <div className={styles.teamGrid}>
          {hairdressers.map((hairdresser, index) => (
            <article className={styles.teamCard} key={hairdresser.id}>
              <div className={styles.teamAvatar}>
                {hairdresser.image ? (
                  <img src={hairdresser.image} alt={hairdresser.name} loading="lazy" />
                ) : (
                  <span>{hairdresser.name.charAt(0)}</span>
                )}
                <span className={styles.teamIndex}>0{index + 1}</span>
              </div>
              <div className={styles.teamInfo}>
                <div>
                  <h3>{hairdresser.name}</h3>
                  <p>{hairdresser.description}</p>
                </div>
                <a
                  className={styles.textLink}
                  href="#booking"
                  onClick={() => onChooseHairdresser(hairdresser.id)}
                >
                  Időpontot kérek <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
