export interface WorkingHours {
    dayOfWeek: number;
    isOpen: boolean;
    open: string;
    close: string;
}

export interface HairdresserType {
    id: string;
    name: string;
    description: string;
    image: string;
    phone: string;
    email: string;
    serviceIds: string[];
    workingHours: WorkingHours[];
    isActive: boolean;
}