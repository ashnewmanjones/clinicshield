export const YES_NO_VALUES = [
  "yes",
  "no",
  "partial",
  "not_sure",
  "not_applicable",
] as const;

type AnswerLike = {
  yesNoValue?: (typeof YES_NO_VALUES)[number] | null;
  textValue?: string | null;
  fileId?: string | null;
};

export function isAnswerFilled(answer: AnswerLike): boolean {
  if (answer.yesNoValue) return true;
  if ((answer.textValue ?? "").trim().length > 0) return true;
  if (answer.fileId) return true;
  return false;
}

export function normalizeTextAnswer(
  value: string | undefined,
): string | undefined {
  const normalized = (value ?? "").trim();
  return normalized.length > 0 ? normalized : undefined;
}

export function calculateCompletionPercent(
  totalEvidenceItems: number,
  answers: AnswerLike[],
): number {
  if (totalEvidenceItems <= 0) return 0;
  const answeredCount = answers.filter(isAnswerFilled).length;
  return Math.round((answeredCount / totalEvidenceItems) * 1000) / 10;
}
