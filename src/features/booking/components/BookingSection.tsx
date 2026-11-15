import type { FormEvent } from "react";
import type { Service } from "../../../types/service";
import type { HairdresserType } from "../../../types/hairdresser";
import type { CustomerDetails, TimeSlot } from "../bookingType";
import { formatDate, formatPrice } from "../../../utils/formatters";
import styles from "./BookingSection.module.css";

interface BookingSectionProps {
  services: Service[];
  hairdressers: HairdresserType[];
  selectedServiceId: string;
  selectedHairdresserId: string;
  selectedDate: string;
  selectedTime: string;
  selectedService: Service | undefined;
  selectedHairdresser: HairdresserType | undefined;
  availableSlots: TimeSlot[];
  customer: CustomerDetails;
  message: string;
  isSuccess: boolean;
  onServiceChange: (serviceId: string) => void;
  onHairdresserChange: (hairdresserId: string) => void;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onCustomerChange: (field: keyof CustomerDetails, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function getToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function BookingSection({
  services,
  hairdressers,
  selectedServiceId,
  selectedHairdresserId,
  selectedDate,
  selectedTime,
  selectedService,
  selectedHairdresser,
  availableSlots,
  customer,
  message,
  isSuccess,
  onServiceChange,
  onHairdresserChange,
  onDateChange,
  onTimeChange,
  onCustomerChange,
  onSubmit,
}: BookingSectionProps) {
  return (
    <section className={styles.section} id="booking">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionLabel}><span>04</span> ONLINE FOGLALÁS</p>
            <h2>A következő<br /><em>énidőd.</em></h2>
          </div>
          <p>Válaszd ki a szolgáltatást és az időpontot.<br />A foglalás pár perc alatt elkészül.</p>
        </div>

        <div className={styles.bookingLayout}>
          <form className={styles.bookingForm} onSubmit={onSubmit}>
            <div className={styles.bookingStep}>
              <span className={styles.stepNumber}>01</span>
              <div className={styles.stepContent}>
                <label htmlFor="service">Válassz szolgáltatást</label>
                <select id="service" value={selectedServiceId} onChange={(event) => onServiceChange(event.target.value)}>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} – {formatPrice(service.price)}
                    </option>
                  ))}
                </select>
                {selectedService && <p className={styles.fieldHint}>Időtartam: {selectedService.durationMinutes} perc</p>}
              </div>
            </div>

            <div className={styles.bookingStep}>
              <span className={styles.stepNumber}>02</span>
              <div className={styles.stepContent}>
                <label htmlFor="hairdresser">Válassz fodrászt</label>
                <select id="hairdresser" value={selectedHairdresserId} onChange={(event) => onHairdresserChange(event.target.value)}>
                  {hairdressers.map((hairdresser) => (
                    <option key={hairdresser.id} value={hairdresser.id}>{hairdresser.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.bookingStep}>
              <span className={styles.stepNumber}>03</span>
              <div className={styles.stepContent}>
                <label htmlFor="date">Válassz dátumot</label>
                <input id="date" type="date" min={getToday()} value={selectedDate} onChange={(event) => onDateChange(event.target.value)} required />

                <div className={styles.timeSlots}>
                  <p className={styles.timeSlotsTitle}>Elérhető időpontok</p>
                  {availableSlots.length === 0 ? (
                    <p className={styles.emptySlots}>Erre a napra nincs elérhető időpont. Válassz másik dátumot!</p>
                  ) : (
                    <div className={styles.timeGrid}>
                      {availableSlots.map((slot) => {
                        const time = slot.startAt.slice(11, 16);
                        return (
                          <button
                            className={`${styles.timeSlot} ${selectedTime === time ? styles.selected : ""}`}
                            type="button"
                            key={slot.startAt}
                            disabled={!slot.isAvailable}
                            onClick={() => onTimeChange(time)}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.bookingStep}>
              <span className={styles.stepNumber}>04</span>
              <div className={styles.stepContent}>
                <label>Kapcsolattartási adatok</label>
                <div className={styles.formFields}>
                  <input type="text" placeholder="Teljes neved" autoComplete="name" value={customer.name} onChange={(event) => onCustomerChange("name", event.target.value)} required />
                  <input type="email" placeholder="E-mail címed" autoComplete="email" value={customer.email} onChange={(event) => onCustomerChange("email", event.target.value)} required />
                  <input type="tel" placeholder="Telefonszámod" autoComplete="tel" value={customer.phone} onChange={(event) => onCustomerChange("phone", event.target.value)} required />
                </div>
              </div>
            </div>

            {message && (
              <div className={`${styles.bookingMessage} ${isSuccess ? styles.success : styles.error}`} role="status">
                {message}
              </div>
            )}

            <button className={styles.submitButton} type="submit" disabled={!selectedTime || !selectedHairdresser}>
              Foglalás véglegesítése <span>↗</span>
            </button>
            <p className={styles.privacyNote}>A foglalásod ezen a böngészőn kerül mentésre.</p>
          </form>

          <aside className={styles.bookingSummary}>
            <p className={styles.summaryLabel}>FOGLALÁSI ÖSSZESÍTŐ</p>
            <h3>A te időpontod.</h3>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryRow}><span>Szolgáltatás</span><strong>{selectedService?.name ?? "—"}</strong></div>
            <div className={styles.summaryRow}><span>Fodrász</span><strong>{selectedHairdresser?.name ?? "—"}</strong></div>
            <div className={styles.summaryRow}><span>Dátum</span><strong>{selectedDate ? formatDate(selectedDate) : "—"}</strong></div>
            <div className={styles.summaryRow}><span>Időpont</span><strong>{selectedTime || "Még nincs kiválasztva"}</strong></div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryTotal}>
              <span>Várható végösszeg</span>
              <strong>{selectedService ? formatPrice(selectedService.price) : "—"}</strong>
            </div>
            <p className={styles.summaryFootnote}>Az időpont a foglalás véglegesítése után kerül mentésre.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
