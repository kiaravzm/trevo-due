import { describe, it, expect } from "vitest";
import { FREE_PLAN_LIMIT, hasReachedFreeLimit } from "./limits";

describe("hasReachedFreeLimit", () => {
  describe("inactive subscription", () => {
    it("does not limit when below the free plan cap", () => {
      expect(hasReachedFreeLimit("inactive", FREE_PLAN_LIMIT - 1)).toBe(false);
    });
    it("limits when count equals the free plan cap", () => {
      expect(hasReachedFreeLimit("inactive", FREE_PLAN_LIMIT)).toBe(true);
    });
    it("limits when count is above the free plan cap", () => {
      expect(hasReachedFreeLimit("inactive", FREE_PLAN_LIMIT + 1)).toBe(true);
    });
    it("does not limit when count is zero", () => {
      expect(hasReachedFreeLimit("inactive", 0)).toBe(false);
    });
  });
  describe("paying or trialing subscription", () => {
    it("never limits an active subscriber, even with a high count", () => {
      expect(hasReachedFreeLimit("active", 100)).toBe(false);
    });
    it("never limits a trialing subscriber, even with a high count", () => {
      expect(hasReachedFreeLimit("trialing", 100)).toBe(false);
    });
  });
});
