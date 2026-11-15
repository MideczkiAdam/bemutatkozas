
export const bookingErrorMessages = {
  HAIRDRESSER_NOT_FOUND: "A kiválasztott fodrász nem található.",
  HAIRDRESSER_INACTIVE: "A kiválasztott fodrász jelenleg nem elérhető.",
  SERVICE_NOT_FOUND: "A kiválasztott szolgáltatás nem található.",
  SERVICE_INACTIVE: "A kiválasztott szolgáltatás jelenleg nem elérhető.",
  SERVICE_NOT_AVAILABLE: "Ez a szolgáltatás nem érhető el a kiválasztott fodrásznál.",
  INVALID_DATE: "A megadott dátum érvénytelen.",
  INVALID_TIME: "A megadott időpont érvénytelen.",
  PAST_DATE: "Múltbeli időpontra nem lehet foglalni.",
  HAIRDRESSER_CLOSED: "A fodrász ezen a napon nem dolgozik.",
  OUTSIDE_WORKING_HOURS: "A kiválasztott időpont kívül esik a fodrász munkaidején.",
  BOOKING_CONFLICT: "Ez az időpont már foglalt. Kérlek, válassz másikat.",
  INVALID_CUSTOMER: "Kérlek, töltsd ki az összes vendégadatot.",
} as const;

export type BookingError = keyof typeof bookingErrorMessages;
