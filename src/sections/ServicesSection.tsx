import ServiceIcon from "../components/ServiceIcon";
import type { Service } from "../types/service";
import { formatPrice } from "../utils/formatters";
import styles from "./ServicesSection.module.css";

interface ServicesSectionProps {
  services: Service[];
  onChooseService: (serviceId: string) => void;
}

export default function ServicesSection({
  services,
  onChooseService
}: ServicesSectionProps) {
  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionLabel}><span>02</span> SZOLGÁLTATÁSAINK</p>
            <h2>Találd meg a<br /><em>neked valót.</em></h2>
          </div>
          <p>Minőségi szolgáltatások,<br />személyre szabott figyelem.</p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <article className={styles.serviceCard} key={service.id}>
              <div className={styles.serviceCardTop}>
                <span className={styles.serviceNumber}><ServiceIcon name={service.serviceIcon} size={28}/></span>
                <span className={styles.serviceArrow}>↗</span>
              </div>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <div className={styles.serviceMeta}>
                <strong>{formatPrice(service.price)}</strong>
                <span>{service.durationMinutes} perc</span>
              </div>
              <a
                className={styles.serviceSelect}
                href="#booking"
                onClick={() => onChooseService(service.id)}
              >
                Időpontot foglalok <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
