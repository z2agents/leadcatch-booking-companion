import { describe, expect, it } from "vitest";
import { monthlyLeak } from "./site";

describe("monthlyLeak", () => {
  it("25 missed calls a week at $200 leaks $10,000 a month", () => {
    expect(monthlyLeak(25, 200)).toBe(10000);
  });
  it("never goes negative", () => {
    expect(monthlyLeak(-5, 100)).toBe(0);
  });
});
