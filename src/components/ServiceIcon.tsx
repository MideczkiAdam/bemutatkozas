import { Scissors, Droplets, ShowerHead, PersonStanding } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceIconName } from "../types/service";

const icons: Record<ServiceIconName, LucideIcon> = {
  scissors: Scissors,
  personstanding: PersonStanding,
  droplets: Droplets,
  showerhead: ShowerHead,
};

export default function ServiceIcon({
  name,
  size = 24,
}: {
  name: ServiceIconName;
  size?: number;
}) {
  const Icon = icons[name];
  return <Icon size={size} aria-hidden="true" />;
}