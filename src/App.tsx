import { useBookingStore } from "./features/booking/store/bookingStore";

function App() {
  const bookings = useBookingStore((state) => state.bookings);
  const addBooking = useBookingStore((state) => state.addBooking);
  const cancelBooking = useBookingStore(
    (state) => state.cancelBooking
  );

  const handleTestBooking = () => {
    addBooking({
      hairdresserId: "hairdresser-1",
      serviceId: "service-1",
      customer: {
        name: "Teszt Elek",
        email: "teszt@example.com",
        phone: "+36301234567",
      },
      startAt: new Date().toISOString(),
      endAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      status: "confirmed",
    });
  };

  return (
    <main>
      <h1>Booking store teszt</h1>

      <button onClick={handleTestBooking}>
        Tesztfoglalás létrehozása
      </button>

      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>{booking.customer.name}</p>
          <p>{booking.status}</p>

          <button onClick={() => cancelBooking(booking.id)}>
            Foglalás lemondása
          </button>
        </div>
      ))}
    </main>
  );
}

export default App;