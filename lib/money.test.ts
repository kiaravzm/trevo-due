import { describe, it, expect } from "vitest";
import { parseCurrencyToCents } from "./money";

describe("parseCurrencyToCents", () => {
  describe("valid amounts", () => {
    it("converts a whole number to cents", () => {
      expect(parseCurrencyToCents("10")).toBe(1000);
    });

    it("converts a dotted decimal with two places", () => {
      expect(parseCurrencyToCents("10.50")).toBe(1050);
    });

    it("pads a single decimal place to two digits", () => {
      expect(parseCurrencyToCents("10.5")).toBe(1050);
    });

    it("accepts a comma as the decimal separator", () => {
      expect(parseCurrencyToCents("10,50")).toBe(1050);
    });

    it("trims surrounding whitespace", () => {
      expect(parseCurrencyToCents(" 12.34 ")).toBe(1234);
    });

    it("converts zero", () => {
      expect(parseCurrencyToCents("0")).toBe(0);
    });
  });

  describe("invalid amounts", () => {
    it("rejects an empty string", () => {
      expect(parseCurrencyToCents("")).toBeNull();
    });

    it("rejects non-numeric input", () => {
      expect(parseCurrencyToCents("abc")).toBeNull();
    });

    it("rejects more than two decimal places", () => {
      expect(parseCurrencyToCents("12.345")).toBeNull();
    });

    it("rejects thousand separators", () => {
      expect(parseCurrencyToCents("1,000.50")).toBeNull();
    });

    it("rejects a currency symbol", () => {
      expect(parseCurrencyToCents("$10")).toBeNull();
    });

    it("rejects a trailing decimal point", () => {
      expect(parseCurrencyToCents("10.")).toBeNull();
    });

    it("rejects negative amounts", () => {
      expect(parseCurrencyToCents("-5")).toBeNull();
    });
  });
});
