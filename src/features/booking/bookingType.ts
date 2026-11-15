export type BookingStatus = "confirmed" | "cancelled"

export interface CustomerDetails {
    name: string;
    email: string;
    phone: string;
}

export interface Booking {
    id: string;
    hairdresserId: string;
    serviceId: string;
    customer: CustomerDetails;
    startAt: string;
    endAt: string;
    status: BookingStatus;
    createdAt: string;
}

export interface TimeSlot {
    startAt: string;
    endAt: string;
    isAvailable: boolean;
}