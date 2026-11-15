import { useMemo, useState } from "react";

import type { FormEvent } from "react";
import type { CustomerDetails } from "./features/booking/bookingType";

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
import { CreateBooking } from "./features/booking/services/bookingService";
import { generateAvailableSlots } from "./features/booking/utils/availabilityUtils";

// Az általad már elkészített foglalási hibaüzenet-megoldást használd itt,
// ha külön fájlban van. Nem hozunk létre újabb hibatérképet.

function App() {
  const [selectedHairdresserId, setSelectedHairdresserId] =
    useState("");

  const [selectedServiceId, setSelectedServiceId] =
    useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedTime, setSelectedTime] = useState("");

  const [customer, setCustomer] = useState<CustomerDetails>({
    name: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const bookings = useBookingStore((state) => state.bookings);
  const addBooking = useBookingStore((state) => state.addBooking);
  const cancelBooking = useBookingStore((state) => state.cancelBooking);

  const selectedHairdresser = hairdressers.find(
    (item) => item.id === selectedHairdresserId
  );

  const selectedService = services.find(
    (item) => item.id === selectedServiceId
  );

  const availableSlots = useMemo(() => {
    if (!selectedHairdresser || !selectedService || !selectedDate) {
      return [];
    }

    return generateAvailableSlots({
      date: selectedDate,
      hairdresser: selectedHairdresser,
      service: selectedService,
      bookings,
    });
  }, [
    selectedDate,
    selectedHairdresser,
    selectedService,
    bookings,
  ]);

  const handleCustomerChange = (
    field: keyof CustomerDetails,
    value: string
  ) => {
    setCustomer((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !selectedHairdresserId ||
      !selectedServiceId ||
      !selectedDate ||
      !selectedTime
    ) {
      setIsSuccess(false);
      setMessage("Kérlek, válassz ki minden szükséges adatot!");
      return;
    }

    const result = CreateBooking({
      hairdresserId: selectedHairdresserId,
      serviceId: selectedServiceId,
      date: selectedDate,
      startTime: selectedTime,
      customer,
      hairdressers,
      services,
      bookings,
    });

    if (!result.success) {
      setIsSuccess(false);

      // Itt a már meglévő hibaüzenet-megoldásodat használd.
      setMessage(result.error);
      return;
    }

    addBooking(result.booking);

    setIsSuccess(true);
    setMessage("Sikeres foglalás! Várunk szeretettel.");

    setSelectedTime("");
    setCustomer({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <>
      <Header />

      <main>
        <HeroSection />
        <AboutSection />

        <ServicesSection
          services={services}
          onChooseService={(serviceId) => {
            setSelectedServiceId(serviceId);
            setSelectedTime("");
          }}
        />

        <TeamSection
          hairdressers={hairdressers}
          onChooseHairdresser={(hairdresserId) => {
            setSelectedHairdresserId(hairdresserId);
            setSelectedTime("");
          }}
        />

        <BookingSection
          services={services}
          hairdressers={hairdressers}
          selectedServiceId={selectedServiceId}
          selectedHairdresserId={selectedHairdresserId}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedService={selectedService}
          selectedHairdresser={selectedHairdresser}
          availableSlots={availableSlots}
          customer={customer}
          message={message}
          isSuccess={isSuccess}
          onServiceChange={(serviceId) => {
            setSelectedServiceId(serviceId);
            setSelectedTime("");
          }}
          onHairdresserChange={(hairdresserId) => {
            setSelectedHairdresserId(hairdresserId);
            setSelectedTime("");
          }}
          onDateChange={(date) => {
            setSelectedDate(date);
            setSelectedTime("");
          }}
          onTimeChange={setSelectedTime}
          onCustomerChange={handleCustomerChange}
          onSubmit={handleSubmit}
        />

        <MyBookings
          bookings={bookings}
          hairdressers={hairdressers}
          services={services}
          onCancelBooking={cancelBooking}
        />

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

export default App;