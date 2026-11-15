import type { Service } from "../types/service";

export const services: Service[] = [
  {
    id: "service-1",
    name: "Női hajvágás",
    description: "Hajvágás és formázás.",
    durationMinutes: 60,
    price: 8000,
    isActive: true,
  },
  {
    id: "service-2",
    name: "Férfi hajvágás",
    description: "Klasszikus vagy modern férfi hajvágás.",
    durationMinutes: 45,
    price: 6000,
    isActive: true,
  },
  {
    id: "service-3",
    name: "Hajfestés",
    description: "Teljes hajfestés és szárítás.",
    durationMinutes: 120,
    price: 18000,
    isActive: true,
  },
  {
    id: "service-4",
    name: "Hajmosás és beszárítás",
    description: "Hajmosás és professzionális beszárítás.",
    durationMinutes: 45,
    price: 7000,
    isActive: true,
  },
];