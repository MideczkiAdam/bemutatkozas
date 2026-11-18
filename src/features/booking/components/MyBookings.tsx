import type { Booking } from "../bookingType";
import type { Service } from "../../../types/service";
import type { HairdresserType } from "../../../types/hairdresser";
import { formatDate, formatPrice, formatTime } from "../../../utils/formatters";
import styles from "./MyBookings.module.css";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

interface MyBookingsProps {
  bookings: Booking[];
  services: Service[];
  hairdressers: HairdresserType[];
  cancelBooking: (bookingId: string) => void;
  deleteBooking: (bookingId: string) => void;
}

export default function MyBookings({
  bookings,
  services,
  hairdressers,
  cancelBooking,
  deleteBooking
}: MyBookingsProps) {
  const [pending, setPending] = useState<
  { type: "cancel" | "delete"; bookingId: string } | null
>(null);

const handleConfirm = () => {
  if (!pending) return;
  if (pending.type === "cancel") cancelBooking(pending.bookingId);
  else deleteBooking(pending.bookingId);
  setPending(null);
};

  return (
    <>
      <ConfirmDialog
        open={pending !== null}
        title={pending?.type === "delete" ? "Foglalás törlése" : "Foglalás lemondása"}
        message={
          pending?.type === "delete"
            ? "Biztosan törölni szeretnéd ezt a foglalást?"
            : "Biztosan le szeretnéd mondani ezt a foglalást?"
        }
        confirmLabel={pending?.type === "delete" ? "Törlés" : "Lemondás"}
        cancelLabel="Mégsem"
        danger
        onConfirm={handleConfirm}
        onClose={() => setPending(null)}
      />
      <section className={styles.section} id="my-bookings">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionLabel}><span>05</span> FOGLALÁSAIM</p>
              <h2>Tervezd meg<br /><em>az idődet.</em></h2>
            </div>
            <p>Az ezen a böngészőn mentett<br />aktív foglalásaid.</p>
          </div>

          {bookings.length === 0 ? (
            <div className={styles.noBookings}>
              <p>Még nincs aktív foglalásod.</p>
              <a className={styles.textLink} href="#booking">Foglalok egy időpontot <span>↗</span></a>
            </div>
          ) : (
            <div className={styles.bookingList}>
              {bookings.map((booking) => {
                const service = services.find((item) => item.id === booking.serviceId);
                const hairdresser = hairdressers.find((item) => item.id === booking.hairdresserId);
                const isCancelled = booking.status === "cancelled";

                return (
                  <article className={`${styles.bookingListCard} ${isCancelled ? styles.cancelled : ""}`} key={booking.id}>
                    <div className={styles.bookingListDate}>
                      <strong>{formatTime(booking.startAt)}</strong>
                      <span>{formatDate(booking.startAt)}</span>
                    </div>
                    <div className={styles.bookingListDetails}>
                      <h3>{service?.name ?? "Szolgáltatás"}</h3>
                      <p>{hairdresser?.name ?? "Fodrász"} · {service ? formatPrice(service.price) : ""}</p>
                      <p>{booking.customer.name}</p>
                    </div>
                    <div className={styles.bookingListActions}>
                      {isCancelled ? (
                        <span className={styles.cancelledLabel}>Lemondva</span>
                      ) : (
                        <button className={styles.cancelButton} type="button" onClick={() => setPending({ type: "cancel", bookingId: booking.id })}>
                          Lemondás
                        </button>
                      )}
                      <button className={styles.deleteButton} type="button" onClick={() => setPending({ type: "delete", bookingId: booking.id })}>
                        Törlés
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
