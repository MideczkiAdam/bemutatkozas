import type { Booking } from '../bookingType';
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BookingStore{
    bookings: Booking[];
    addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
    cancelBooking: (bookingId: string) => void;
    getBookingById: (bookingId: string) => Booking | undefined;
}

export const useBookingStore = create<BookingStore>()(
    persist(
        (set, get) => ({
            bookings: [],

            addBooking: (booking) => {
                const newBooking: Booking = {
                    ...booking,
                    id: crypto.randomUUID(),
                    createdAt: new Date().toISOString(),
                };
                set((state) => ({
                    bookings: [...state.bookings, newBooking],
                }));
            },

            cancelBooking: (bookingId) => {
                set((state) => ({
                    bookings: state.bookings.map((booking) =>
                        booking.id === bookingId &&
                        booking.status === "confirmed" ?
                            { ...booking, status: "cancelled" } : booking
                    )
                }));
            },

            getBookingById: (bookingId) => {
                return get().bookings.find(
                    (booking) => booking.id === bookingId
                );
            },
        }),
        {
            name: "bookings",
            storage: createJSONStorage(() => localStorage),

            partialize: (state) => ({
                bookings: state.bookings,
            }),
        }
    )
)