import type { BookingError } from "../bookingErrors";
import type {
  Booking,
  CustomerDetails,
} from "../bookingType";

import type { HairdresserType } from "../../../types/hairdresser";
import type { Service } from "../../../types/service";

import {
  addMinutes,
  createLocalDateTime,
  getDayOfWeek,
  toLocalDateTimeString,
} from "../utils/dateUtils";

import { hasTimeOverlap } from "../utils/availabilityUtils";

interface CreateBookingParams {
  hairdresserId: string;
  serviceId: string;
  date: string;
  startTime: string;
  customer: CustomerDetails;

  hairdressers: HairdresserType[];
  services: Service[];
  bookings: Booking[];

  now?: Date;
}

type CreateBookingResult =
  | {
      success: true;
      booking: Omit<Booking, "id" | "createdAt">;
    }
  | {
      success: false;
      error: BookingError;
    };

export function CreateBooking({
    hairdresserId,
    serviceId,
    date,
    startTime,
    customer,
    hairdressers,
    services,
    bookings,
    now = new Date(),
}: CreateBookingParams): CreateBookingResult {
    const hairdresser = hairdressers.find(
    (item) => item.id === hairdresserId
  );

  if (!hairdresser) {
    return {
      success: false,
      error: "HAIRDRESSER_NOT_FOUND",
    };
  }

  if (!hairdresser.isActive) {
    return {
      success: false,
      error: "HAIRDRESSER_INACTIVE",
    };
  }

  // 2. Szolgáltatás keresése

  const service = services.find(
    (item) => item.id === serviceId
  );

  if (!service) {
    return {
      success: false,
      error: "SERVICE_NOT_FOUND",
    };
  }

  if (!service.isActive) {
    return {
      success: false,
      error: "SERVICE_INACTIVE",
    };
  }

  if (!hairdresser.serviceIds.includes(service.id)) {
    return {
      success: false,
      error: "SERVICE_NOT_AVAILABLE",
    };
  }

  if (
    !Number.isInteger(service.durationMinutes) ||
    service.durationMinutes <= 0
  ) {
    return {
      success: false,
      error: "SERVICE_NOT_AVAILABLE",
    };
  }

  // 3. Vendégadatok ellenőrzése

  if (
    !customer.name.trim() ||
    !customer.email.trim() ||
    !customer.phone.trim()
  ) {
    return {
      success: false,
      error: "INVALID_CUSTOMER",
    };
  }

  // 4. Dátum és kezdési időpont ellenőrzése

  const startAt = createLocalDateTime(date, startTime);

  if (!startAt) {
    return {
      success: false,
      error: "INVALID_DATE",
    };
  }

  if (startAt.getTime() <= now.getTime()) {
    return {
      success: false,
      error: "PAST_DATE",
    };
  }

  // 5. A hét napjának és a munkaidőnek az ellenőrzése

  const dayOfWeek = getDayOfWeek(date);

  if (dayOfWeek === null) {
    return {
      success: false,
      error: "INVALID_DATE",
    };
  }

  const workingHours = hairdresser.workingHours.find(
    (hours) => hours.dayOfWeek === dayOfWeek
  );

  if (!workingHours || !workingHours.isOpen) {
    return {
      success: false,
      error: "HAIRDRESSER_CLOSED",
    };
  }

  const openingTime = createLocalDateTime(
    date,
    workingHours.open
  );

  const closingTime = createLocalDateTime(
    date,
    workingHours.close
  );

  if (!openingTime || !closingTime) {
    return {
      success: false,
      error: "OUTSIDE_WORKING_HOURS",
    };
  }

  if (closingTime.getTime() <= openingTime.getTime()) {
    return {
      success: false,
      error: "OUTSIDE_WORKING_HOURS",
    };
  }

  // 6. A szolgáltatás befejezési idejének kiszámítása

  const endAt = addMinutes(
    startAt,
    service.durationMinutes
  );

  if (
    startAt.getTime() < openingTime.getTime() ||
    endAt.getTime() > closingTime.getTime()
  ) {
    return {
      success: false,
      error: "OUTSIDE_WORKING_HOURS",
    };
  }

  // 7. Meglévő foglalások ellenőrzése

  const hasConflict = bookings.some((booking) => {
    if (
      booking.hairdresserId !== hairdresser.id ||
      booking.status !== "confirmed"
    ) {
      return false;
    }

    const existingStart = new Date(booking.startAt);
    const existingEnd = new Date(booking.endAt);

    if (
      Number.isNaN(existingStart.getTime()) ||
      Number.isNaN(existingEnd.getTime()) ||
      existingEnd.getTime() <= existingStart.getTime()
    ) {
      return true;
    }

    return hasTimeOverlap(
      startAt,
      endAt,
      existingStart,
      existingEnd
    );
  });

  if (hasConflict) {
    return {
      success: false,
      error: "BOOKING_CONFLICT",
    };
  }

  // 8. Sikeres foglalási adatok összeállítása

  return {
    success: true,
    booking: {
      hairdresserId: hairdresser.id,
      serviceId: service.id,
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
      },
      startAt: toLocalDateTimeString(startAt),
      endAt: toLocalDateTimeString(endAt),
      status: "confirmed",
    },
  };
}
