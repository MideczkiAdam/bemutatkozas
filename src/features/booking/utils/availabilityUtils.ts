import type { Booking, TimeSlot } from "../bookingType";
import type { HairdresserType } from "../../../types/hairdresser";
import type { Service } from "../../../types/service";
import {
  addMinutes,
  createLocalDateTime,
  getDayOfWeek,
  toLocalDateTimeString,
} from "./dateUtils";

export function hasTimeOverlap(
  newStart: Date,
  newEnd: Date,
  existingStart: Date,
  existingEnd: Date
): boolean {
  return (
    newStart.getTime() < existingEnd.getTime() &&
    newEnd.getTime() > existingStart.getTime()
  );
}

interface GenerateSlotsParams {
  date: string;
  hairdresser: HairdresserType;
  service: Service;
  bookings: Booking[];
  slotIntervalMinutes?: number;
  now?: Date;
}

export function generateAvailableSlots({
  date,
  hairdresser,
  service,
  bookings,
  slotIntervalMinutes = 30,
  now = new Date(),
}: GenerateSlotsParams): TimeSlot[] {
  // 1. Alapvető ellenőrzések

  if (!hairdresser.isActive || !service.isActive) {
    return [];
  }

  if (!hairdresser.serviceIds.includes(service.id)) {
    return [];
  }

  if (
    !Number.isInteger(service.durationMinutes) ||
    service.durationMinutes <= 0 ||
    !Number.isInteger(slotIntervalMinutes) ||
    slotIntervalMinutes <= 0
  ) {
    return [];
  }

  // 2. Megkeressük a fodrász munkaidejét

  const dayOfWeek = getDayOfWeek(date);

  if (dayOfWeek === null) {
    return [];
  }

  const workingHours = hairdresser.workingHours.find(
    (hours) => hours.dayOfWeek === dayOfWeek
  );

  if (!workingHours || !workingHours.isOpen) {
    return [];
  }

  // 3. Meghatározzuk a nyitás és zárás időpontját

  const openingTime = createLocalDateTime(
    date,
    workingHours.open
  );

  const closingTime = createLocalDateTime(
    date,
    workingHours.close
  );

  if (
    !openingTime ||
    !closingTime ||
    closingTime.getTime() <= openingTime.getTime()
  ) {
    return [];
  }

  // 4. Csak az adott fodrász aktív foglalásait vizsgáljuk

  const activeBookings = bookings.filter(
    (booking) =>
      booking.hairdresserId === hairdresser.id &&
      booking.status === "confirmed"
  );

  // 5. Létrehozzuk az időpontokat

  const slots: TimeSlot[] = [];

  let currentStart = openingTime;

  while (true) {
    const currentEnd = addMinutes(
      currentStart,
      service.durationMinutes
    );

    // A szolgáltatásnak bele kell férnie a munkaidőbe.
    if (currentEnd.getTime() > closingTime.getTime()) {
      break;
    }

    // Múltbeli időpontokat nem kínálunk fel.
    if (currentStart.getTime() > now.getTime()) {
      const hasConflict = activeBookings.some((booking) => {
        const existingStart = new Date(booking.startAt);
        const existingEnd = new Date(booking.endAt);

        return (
          Number.isNaN(existingStart.getTime()) ||
          Number.isNaN(existingEnd.getTime()) ||
          existingEnd.getTime() <= existingStart.getTime() ||
          hasTimeOverlap(
            currentStart,
            currentEnd,
            existingStart,
            existingEnd
          )
        );
      });

      slots.push({
        startAt: toLocalDateTimeString(currentStart),
        endAt: toLocalDateTimeString(currentEnd),
        isAvailable: !hasConflict,
      });
    }

    // Következő lehetséges kezdési időpont.
    currentStart = addMinutes(
      currentStart,
      slotIntervalMinutes
    );
  }

  return slots;
}