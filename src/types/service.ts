export type ServiceIconName = "scissors" | "personstanding" | "droplets" | "showerhead";

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    serviceIcon: ServiceIconName;
    durationMinutes: number;
    isActive: boolean;
}