
import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

import type { Booking } from "../bookingType";
import { toLocalDateTimeString } from "../utils/dateUtils";

type NewBooking = Omit<Booking, "id" | "createdAt">;

interface BookingStore {
  bookings: Booking[];

  addBooking: (booking: NewBooking) => Booking;
  cancelBooking: (bookingId: string) => void;
  deleteBooking: (bookingId: string) => void;
  getBookingById: (bookingId: string) => Booking | undefined;
}
function generateBookingId(): string {
    return `booking-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 11)}`;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],

      addBooking: (bookingData) => {
        const newBooking: Booking = {
          ...bookingData,
          id: generateBookingId(),
          createdAt: toLocalDateTimeString(new Date()),
        };

        set((state) => ({
          bookings: [...state.bookings, newBooking],
        }));

        return newBooking;
      },

      cancelBooking: (bookingId) => {
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, status: "cancelled" }
              : booking
          ),
        }));
      },

      deleteBooking: (bookingId) => {
        set ((state) => ({
          bookings: state.bookings.filter((booking) => booking.id !== bookingId),
        }));
      },

      getBookingById: (bookingId) => {
        return get().bookings.find(
          (booking) => booking.id === bookingId
        );
      },
    }),
    {
      name: "hair-salon-bookings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
