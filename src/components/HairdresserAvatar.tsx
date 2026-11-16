import type { HairdresserType } from "../types/hairdresser";

export default function HairdresserAvatar({
  hairdresser,
  size = 64,
}: {
  hairdresser: HairdresserType;
  size?: number;
}) {
  const shared = { width: size, height: size, borderRadius: "50%" } as const;

  if (hairdresser.image) {
    return (
      <img
        src={hairdresser.image}
        alt={hairdresser.name}
        loading="lazy"
        style={{ ...shared, objectFit: "cover" }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{ ...shared, display: "grid", placeItems: "center", background: "#e8e2d9" }}
    >
      {hairdresser.name.charAt(0)}
    </span>
  );
}