import { describe, it, expect } from "vitest";

import { hasTimeOverlap } from "./availabilityUtils";
import { createLocalDateTime } from "./dateUtils";

describe("hasTimeOverlap", () => {
  it("felismeri az egymást átfedő időpontokat", () => {
    const newStart = createLocalDateTime("2026-11-16", "10:30")!;
    const newEnd = createLocalDateTime("2026-11-16", "11:30")!;

    const existingStart = createLocalDateTime("2026-11-16", "10:00")!;
    const existingEnd = createLocalDateTime("2026-11-16", "11:00")!;

    expect(
      hasTimeOverlap(
        newStart,
        newEnd,
        existingStart,
        existingEnd
      )
    ).toBe(true);
  });

  it("nem tekinti ütközésnek az egymást követő foglalásokat", () => {
    const newStart = createLocalDateTime("2026-11-16", "11:00")!;
    const newEnd = createLocalDateTime("2026-11-16", "12:00")!;

    const existingStart = createLocalDateTime("2026-11-16", "10:00")!;
    const existingEnd = createLocalDateTime("2026-11-16", "11:00")!;

    expect(
      hasTimeOverlap(
        newStart,
        newEnd,
        existingStart,
        existingEnd
      )
    ).toBe(false);
  });
});

describe("createLocalDateTime", () => {
  it("helyes helyi dátumot hoz létre", () => {
    const result = createLocalDateTime(
      "2026-11-16",
      "09:30"
    );

    expect(result).not.toBeNull();
    expect(result?.getHours()).toBe(9);
    expect(result?.getMinutes()).toBe(30);
  });

  it("elutasítja a hibás dátumot", () => {
    expect(
      createLocalDateTime("2026-02-30", "09:30")
    ).toBeNull();
  });

  it("elutasítja a hibás időpontot", () => {
    expect(
      createLocalDateTime("2026-11-16", "25:30")
    ).toBeNull();
  });
});