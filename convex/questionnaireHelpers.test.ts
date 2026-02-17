import { describe, expect, it } from "vitest";

import {
  calculateCompletionPercent,
  isAnswerFilled,
  normalizeTextAnswer,
} from "./questionnaireHelpers";

describe("isAnswerFilled", () => {
  it("returns true when yes/no value is set", () => {
    expect(isAnswerFilled({ yesNoValue: "yes" })).toBe(true);
  });

  it("returns true for non-empty text answers", () => {
    expect(isAnswerFilled({ textValue: "Policy exists" })).toBe(true);
  });

  it("returns false for empty text answers", () => {
    expect(isAnswerFilled({ textValue: "   " })).toBe(false);
  });

  it("returns true when a file id is present", () => {
    expect(isAnswerFilled({ fileId: "file_123" })).toBe(true);
  });
});

describe("normalizeTextAnswer", () => {
  it("trims and keeps non-empty values", () => {
    expect(normalizeTextAnswer("  hello  ")).toBe("hello");
  });

  it("returns undefined for empty values", () => {
    expect(normalizeTextAnswer("   ")).toBeUndefined();
    expect(normalizeTextAnswer(undefined)).toBeUndefined();
  });
});

describe("calculateCompletionPercent", () => {
  it("returns 0 when there are no evidence items", () => {
    expect(calculateCompletionPercent(0, [{ yesNoValue: "yes" }])).toBe(0);
  });

  it("calculates and rounds to one decimal place", () => {
    expect(
      calculateCompletionPercent(3, [
        { yesNoValue: "yes" },
        { textValue: "done" },
      ]),
    ).toBe(66.7);
  });
});
