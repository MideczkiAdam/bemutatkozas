import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import TeamSection from "./sections/TeamSection";
import ContactSection from "./sections/ContactSection";
import BookingSection from "./features/booking/components/BookingSection";
import MyBookings from "./features/booking/components/MyBookings";

import { hairdressers, services } from "./data";
import { useBookingStore } from "./features/booking/store/bookingStore";
import { useBookingForm } from "./features/booking/hooks/useBookingForm";

function App() {
  const form = useBookingForm();
  const bookings = useBookingStore((s) => s.bookings);
  const cancelBooking = useBookingStore((s) => s.cancelBooking);
  const deleteBooking = useBookingStore((s) => s.deleteBooking);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection services={services} onChooseService={form.selectService} />
        <TeamSection
          hairdressers={hairdressers}
          onChooseHairdresser={form.selectHairdresser}
        />
        <BookingSection form={form} />
        <MyBookings
          bookings={bookings}
          hairdressers={hairdressers}
          services={services}
          cancelBooking={cancelBooking}
          deleteBooking={deleteBooking}
        />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;