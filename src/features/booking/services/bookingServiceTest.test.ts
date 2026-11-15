import { describe, it, expect } from "vitest";

import { CreateBooking } from "./bookingService";

import { hairdressers } from "../../../data/hairdressers";
import { services } from "../../../data/services";

import type { Booking } from "../bookingType";

const now = new Date(2026, 10, 15, 12, 0);

const customer = {
  name: "Teszt Elek",
  email: "teszt@example.com",
  phone: "+36301234567",
};

const existingBookings: Booking[] = [
  {
    id: "booking-1",
    hairdresserId: "hairdresser-1",
    serviceId: "service-1",
    customer,
    startAt: "2026-11-16T09:00:00",
    endAt: "2026-11-16T10:00:00",
    status: "confirmed",
    createdAt: "2026-11-15T12:00:00",
  },
];

describe("CreateBooking", () => {
  it("létrehoz egy érvényes foglalást", () => {
    const result = CreateBooking({
      hairdresserId: "hairdresser-1",
      serviceId: "service-1",
      date: "2026-11-16",
      startTime: "10:00",
      customer,
      hairdressers,
      services,
      bookings: existingBookings,
      now,
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.booking.startAt).toBe(
        "2026-11-16T10:00:00"
      );

      expect(result.booking.endAt).toBe(
        "2026-11-16T11:00:00"
      );
    }
  });

  it("elutasítja az ütköző foglalást", () => {
    const result = CreateBooking({
      hairdresserId: "hairdresser-1",
      serviceId: "service-1",
      date: "2026-11-16",
      startTime: "09:30",
      customer,
      hairdressers,
      services,
      bookings: existingBookings,
      now,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error).toBe("BOOKING_CONFLICT");
    }
  });

  it("elutasítja a zárás után befejeződő foglalást", () => {
    const result = CreateBooking({
      hairdresserId: "hairdresser-1",
      serviceId: "service-1",
      date: "2026-11-16",
      startTime: "16:30",
      customer,
      hairdressers,
      services,
      bookings: [],
      now,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error).toBe("OUTSIDE_WORKING_HOURS");
    }
  });

  it("elutasítja a múltbeli foglalást", () => {
    const result = CreateBooking({
      hairdresserId: "hairdresser-1",
      serviceId: "service-1",
      date: "2026-11-15",
      startTime: "10:00",
      customer,
      hairdressers,
      services,
      bookings: [],
      now,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error).toBe("PAST_DATE");
    }
  });

  it("elutasítja a nem létező fodrászt", () => {
    const result = CreateBooking({
      hairdresserId: "nem-letezo",
      serviceId: "service-1",
      date: "2026-11-16",
      startTime: "10:00",
      customer,
      hairdressers,
      services,
      bookings: [],
      now,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error).toBe("HAIRDRESSER_NOT_FOUND");
    }
  });
});