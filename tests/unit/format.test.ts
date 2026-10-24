import { describe, expect, it } from "vitest";
import { formatDate, formatDuration } from "@/lib/format";

describe("formatDate", () => {
  it("formats an ISO date in a readable, timezone-independent way", () => {
    expect(formatDate("2026-09-30")).toBe("September 30, 2026");
    expect(formatDate("2026-01-07")).toBe("January 7, 2026");
  });
});

describe("formatDuration", () => {
  it("formats durations under an hour as MM:SS", () => {
    expect(formatDuration(0)).toBe("00:00");
    expect(formatDuration(65)).toBe("01:05");
    expect(formatDuration(3599)).toBe("59:59");
  });

  it("formats durations of an hour or more as H:MM:SS", () => {
    expect(formatDuration(3600)).toBe("1:00:00");
    expect(formatDuration(3645)).toBe("1:00:45");
  });
});
