export const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "partial", label: "Partial" },
  { value: "not_sure", label: "Not sure" },
  { value: "not_applicable", label: "N/A" },
] as const;

export type YesNoValue = (typeof YES_NO_OPTIONS)[number]["value"];

export function parseStandardNumber(value: string | null): number {
  if (!value) return 1;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 1;
  if (parsed < 1) return 1;
  return parsed;
}
