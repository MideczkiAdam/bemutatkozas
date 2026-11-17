import type { Booking } from "../bookingType";
import type { Service } from "../../../types/service";
import type { HairdresserType } from "../../../types/hairdresser";
import { formatDate, formatPrice, formatTime } from "../../../utils/formatters";
import styles from "./MyBookings.module.css";

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
  const handleCancel = (bookingId: string) => {
    const confirmed = window.confirm(
      "Biztosan le szeretnéd mondani ezt a foglalást?"
    );

    if (confirmed) {
      cancelBooking(bookingId);
    }
  };

  const handleDelete = (bookingId: string) => {
    const confirmed = window.confirm(
      "Biztosan törölni szeretnéd ezt a foglalást?"
    );

    if (confirmed) {
      deleteBooking(bookingId);
    }
  };

  return (
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
              console.log("Booking status:", booking.status, "isCancelled:", isCancelled);

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
                      <button className={styles.cancelButton} type="button" onClick={() => handleCancel(booking.id)}>
                        Lemondás
                      </button>
                    )}
                    <button className={styles.deleteButton} type="button" onClick={() => handleDelete(booking.id)}>
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
  );
}
