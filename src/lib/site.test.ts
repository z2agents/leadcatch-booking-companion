import { describe, expect, it } from "vitest";
import { BOOKING_URL, monthlyLeak } from "./site";

describe("monthlyLeak", () => {
  it("25 missed calls a week at $200 leaks $10,000 a month", () => {
    expect(monthlyLeak(25, 200)).toBe(10000);
  });
  it("never goes negative", () => {
    expect(monthlyLeak(-5, 100)).toBe(0);
  });
});

describe("BOOKING_URL", () => {
  it("points at the current GHL calendar", () => {
    expect(BOOKING_URL).toBe("https://api.leadconnectorhq.com/widget/booking/QZ3JU9yCIqPT8BRYkdkf");
  });
  it("does not point at the retired calendar", () => {
    expect(BOOKING_URL).not.toContain("GOJemuzY7aZmFSDO7HSI");
  });
});
