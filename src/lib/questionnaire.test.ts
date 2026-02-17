import { describe, expect, it } from "vitest";

import { parseStandardNumber, YES_NO_OPTIONS } from "@/lib/questionnaire";

describe("parseStandardNumber", () => {
  it("defaults to standard 1 for null", () => {
    expect(parseStandardNumber(null)).toBe(1);
  });

  it("defaults to standard 1 for non-numeric values", () => {
    expect(parseStandardNumber("abc")).toBe(1);
  });

  it("clamps values lower than 1", () => {
    expect(parseStandardNumber("0")).toBe(1);
    expect(parseStandardNumber("-3")).toBe(1);
  });

  it("returns valid standard numbers", () => {
    expect(parseStandardNumber("4")).toBe(4);
  });
});

describe("YES_NO_OPTIONS", () => {
  it("contains all expected answer values", () => {
    expect(YES_NO_OPTIONS.map((option) => option.value)).toEqual([
      "yes",
      "no",
      "partial",
      "not_sure",
      "not_applicable",
    ]);
  });
});
