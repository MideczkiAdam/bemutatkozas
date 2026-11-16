import { formatDate, formatPrice } from "../../../utils/formatters";
import styles from "./BookingSection.module.css";
import type { BookingForm } from "../hooks/useBookingForm";
import HairdresserAvatar from "../../../components/HairdresserAvatar";
import ServiceIcon from "../../../components/ServiceIcon";

function getToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function BookingSection({ form }: { form: BookingForm }) {
  const { unlocked } = form;
  const freeSlots = form.availableSlots.filter((slot) => slot.isAvailable);

  return (
    <section className={styles.section} id="booking">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionLabel}><span>04</span> ONLINE FOGLALÁS</p>
            <h2>A következő<br /><em>énidőd.</em></h2>
          </div>
          <p>Válaszd ki a fodrászt, a szolgáltatást és az időpontot.<br />A foglalás pár perc alatt elkészül.</p>
        </div>

        <div className={styles.bookingLayout}>
          <form className={styles.bookingForm} onSubmit={form.submit}>
            {/* 01 – Fodrász */}
            <fieldset className={styles.step}>
              <legend>01 · Válassz fodrászt</legend>
              <div className={styles.choiceGrid}>
                {form.hairdressers.filter((h) => h.isActive).map((h) => (
                  <label key={h.id} className={styles.choice}>
                    <input
                      type="radio"
                      name="hairdresser"
                      className={styles.choiceInput}
                      value={h.id}
                      checked={form.hairdresserId === h.id}
                      onChange={() => form.selectHairdresser(h.id)}
                    />
                    <span className={styles.choiceBody}>
                      <HairdresserAvatar hairdresser={h} size={64} />
                      <strong>{h.name}</strong>
                      <small>{h.description}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 02 – Szolgáltatás: csak az adott fodrász szolgáltatásai */}
            <fieldset className={styles.step} disabled={!unlocked.service}>
              <legend>02 · Válassz szolgáltatást</legend>
              {!unlocked.service && (
                <p className={styles.fieldHint}>Először válassz fodrászt.</p>
              )}
              <div className={styles.choiceGrid}>
                {form.availableServices.map((s) => (
                  <label key={s.id} className={styles.choice}>
                    <input
                      type="radio"
                      name="service"
                      className={styles.choiceInput}
                      value={s.id}
                      checked={form.serviceId === s.id}
                      onChange={() => form.selectService(s.id)}
                    />
                    <span className={styles.choiceBody}>
                      <ServiceIcon name={s.serviceIcon} size={28} />
                      <strong>{s.name}</strong>
                      <small>{s.durationMinutes} perc · {formatPrice(s.price)}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 03 – Dátum */}
            <fieldset className={styles.step} disabled={!unlocked.date}>
              <legend>03 · Válassz dátumot</legend>
              <input
                type="date"
                min={getToday()}
                value={form.date}
                onChange={(e) => form.selectDate(e.target.value)}
              />
            </fieldset>

            {/* 04 – Időpont */}
            <fieldset className={styles.step} disabled={!unlocked.time}>
              <legend>04 · Válassz időpontot</legend>
              <div className={styles.timeSlots}>
                {form.availableSlots.length === 0 ? (
                  <p className={styles.emptySlots}>
                    Erre a napra nincs elérhető időpont. Válassz másik dátumot!
                  </p>
                ) : (
                  <div className={styles.timeGrid}>
                    {freeSlots.map((slot) => {
                      const t = slot.startAt.slice(11, 16);
                      return (
                        <button
                          type="button"
                          key={slot.startAt}
                          className={`${styles.timeSlot} ${form.time === t ? styles.selected : ""}`}
                          disabled={!slot.isAvailable}
                          onClick={() => form.selectTime(t)}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </fieldset>

            {/* 05 – Vendégadatok */}
            <fieldset className={styles.step} disabled={!unlocked.details}>
              <legend>05 · Kapcsolattartási adatok</legend>
              <div className={styles.formFields}>
                <input
                  type="text"
                  placeholder="Teljes neved"
                  autoComplete="name"
                  value={form.customer.name}
                  onChange={(e) => form.changeCustomer("name", e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="E-mail címed"
                  autoComplete="email"
                  value={form.customer.email}
                  onChange={(e) => form.changeCustomer("email", e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefonszámod"
                  autoComplete="tel"
                  value={form.customer.phone}
                  onChange={(e) => form.changeCustomer("phone", e.target.value)}
                  required
                />
              </div>
            </fieldset>

            {form.message && (
              <div
                className={`${styles.bookingMessage} ${form.isSuccess ? styles.success : styles.error}`}
                role="status"
              >
                {form.message}
              </div>
            )}

            <button className={styles.submitButton} type="submit" disabled={!unlocked.details}>
              Foglalás véglegesítése <span>↗</span>
            </button>
            <p className={styles.privacyNote}>A foglalásod ezen a böngészőn kerül mentésre.</p>
          </form>

          <aside className={styles.bookingSummary}>
            <p className={styles.summaryLabel}>FOGLALÁSI ÖSSZESÍTŐ</p>
            <h3>A te időpontod.</h3>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryRow}><span>Fodrász</span><strong>{form.hairdresser?.name ?? "—"}</strong></div>
            <div className={styles.summaryRow}><span>Szolgáltatás</span><strong>{form.service?.name ?? "—"}</strong></div>
            <div className={styles.summaryRow}><span>Dátum</span><strong>{form.date ? formatDate(form.date) : "—"}</strong></div>
            <div className={styles.summaryRow}><span>Időpont</span><strong>{form.time || "Még nincs kiválasztva"}</strong></div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryTotal}>
              <span>Várható végösszeg</span>
              <strong>{form.service ? formatPrice(form.service.price) : "—"}</strong>
            </div>
            <p className={styles.summaryFootnote}>Az időpont a foglalás véglegesítése után kerül mentésre.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}