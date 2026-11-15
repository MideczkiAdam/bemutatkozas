import type { HairdresserType } from "../types/hairdresser";

const standardWorkingHours = [
  { dayOfWeek: 0, isOpen: false, open: "00:00", close: "00:00" },
  { dayOfWeek: 1, isOpen: true, open: "09:00", close: "17:00" },
  { dayOfWeek: 2, isOpen: true, open: "09:00", close: "17:00" },
  { dayOfWeek: 3, isOpen: true, open: "09:00", close: "17:00" },
  { dayOfWeek: 4, isOpen: true, open: "09:00", close: "17:00" },
  { dayOfWeek: 5, isOpen: true, open: "09:00", close: "17:00" },
  { dayOfWeek: 6, isOpen: false, open: "00:00", close: "00:00" },
];

export const hairdressers: HairdresserType[] = [
  {
    id: "hairdresser-1",
    name: "Anna",
    description: "Női hajvágás és hajfestés specialistája.",
    image: "",
    phone: "123-456-7890",
    email: "anna@gmail.com",
    serviceIds: ["service-1", "service-3", "service-4"],
    workingHours: standardWorkingHours,
    isActive: true,
  },
  {
    id: "hairdresser-2",
    name: "Péter",
    description: "Férfi hajvágás és modern frizurák.",
    image: "",
    phone: "123-456-7890",
    email: "peter@gmail.com",
    serviceIds: ["service-2", "service-4"],
    workingHours: standardWorkingHours,
    isActive: true,
  },
];