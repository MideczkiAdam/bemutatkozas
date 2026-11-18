import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import { hairdressers, services } from "../../../data";
import { bookingErrorMessages } from "../bookingErrors";
import type { CustomerDetails } from "../bookingType";
import { CreateBooking } from "../services/bookingService";
import { useBookingStore } from "../store/bookingStore";
import { generateAvailableSlots } from "../utils/availabilityUtils";

const emptyCustomer: CustomerDetails = { name: "", email: "", phone: "" };

export function useBookingForm() {
  // --- 1) A felhasználó által TÉNYLEGESEN kiválasztott dolgok (state) ---
  const [hairdresserId, setHairdresserId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [customer, setCustomer] = useState<CustomerDetails>(emptyCustomer);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const bookings = useBookingStore((s) => s.bookings);
  const addBooking = useBookingStore((s) => s.addBooking);

  // --- 2) LEVEZETETT adatok: nem tároljuk, minden rendernél kiszámoljuk ---
  const hairdresser = hairdressers.find((h) => h.id === hairdresserId);

  const availableServices = useMemo(
    () =>
      hairdresser
        ? services.filter(
            (s) => s.isActive && hairdresser.serviceIds.includes(s.id)
          )
        : [],
    [hairdresser]
  );

  const service = availableServices.find((s) => s.id === serviceId);

  const availableSlots = useMemo(() => {
    if (!hairdresser || !service || !date) return [];
    return generateAvailableSlots({ date, hairdresser, service, bookings });
  }, [hairdresser, service, date, bookings]);

  // Melyik lépés nyitható ki? Mindig az előző lépés eredményéből következik.
  const unlocked = {
    service: Boolean(hairdresser),
    date: Boolean(service),
    time: Boolean(service && date),
    details: Boolean(time),
  };

  // --- 3) Eseménykezelők: itt van a dominóeffektus ---
  const clearFeedback = () => {
    setMessage("");
    setIsSuccess(false);
  };

  const selectHairdresser = (id: string) => {
    const next = hairdressers.find((h) => h.id === id);
    setHairdresserId(id);
    // A szolgáltatás maradhat, ha az új fodrász is csinálja; különben nullázzuk.
    if (!next?.serviceIds.includes(serviceId)) setServiceId("");
    setTime(""); // az időpontok fodrászonként mások
    clearFeedback();
  };

  const selectService = (id: string) => {
    setServiceId(id);
    setTime(""); // más szolgáltatás = más időtartam = más szabad időpontok
    clearFeedback();
  };

  const chooseService = (id: string) => {
    const serviceExists = services.some((s) => s.id === id && s.isActive);
    if (!serviceExists) return;

    const offersService = (h: (typeof hairdressers)[number]) =>
      h.isActive && h.serviceIds.includes(id);

    const target =
      hairdresser && offersService(hairdresser)
        ? hairdresser
        : hairdressers.find(offersService);
    if (!target) return;

    if (target.id !== hairdresserId) setHairdresserId(target.id);
    setServiceId(id);
    setTime("");
    clearFeedback();
  };

  const selectDate = (value: string) => {
    setDate(value);
    setTime("");
    clearFeedback();
  };

  const selectTime = (value: string) => {
    setTime(value);
    clearFeedback();
  };

  const changeCustomer = (field: keyof CustomerDetails, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const fail = (text: string) => {
    setIsSuccess(false);
    setMessage(text);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hairdresser || !service || !date || !time) {
      fail("Kérlek, válassz ki minden szükséges adatot!");
      return;
    }

    const result = CreateBooking({
      hairdresserId: hairdresser.id,
      serviceId: service.id,
      date,
      startTime: time,
      customer,
      hairdressers,
      services,
      bookings,
    });

    if (!result.success) {
      fail(bookingErrorMessages[result.error]); // magyar üzenet, nem a kód
      return;
    }

    addBooking(result.booking);
    setIsSuccess(true);
    setMessage("Sikeres foglalás! Várunk szeretettel.");
    setTime("");
    setCustomer(emptyCustomer);
  };

  return {
    // adatok
    hairdressers, hairdresser, availableServices, service, availableSlots,
    hairdresserId, serviceId, date, time, customer, message, isSuccess,
    unlocked,
    // műveletek
    selectHairdresser, selectService, chooseService, selectDate, selectTime,
    changeCustomer, submit,
  };
}

export type BookingForm = ReturnType<typeof useBookingForm>;