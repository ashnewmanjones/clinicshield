"use client";

import { useMutation, useQuery } from "convex/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { QuestionnaireView } from "@/components/questionnaire/QuestionnaireView";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseStandardNumber, type YesNoValue } from "@/lib/questionnaire";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

export function QuestionnairePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [savingItemIds, setSavingItemIds] = useState<Set<string>>(new Set());

  const selectedStandard = parseStandardNumber(searchParams.get("standard"));
  const state = useQuery(api.questionnaire.getState, {
    standardNumber: BigInt(selectedStandard),
  });
  const saveAnswer = useMutation(api.questionnaire.saveAnswer);

  const setStandard = useCallback(
    (standardNumber: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("standard", String(standardNumber));
      router.replace(`/dashboard/questionnaire?${params.toString()}`);
    },
    [router, searchParams],
  );

  const assessmentId = useMemo(
    () => state?.assessmentId as Id<"assessments"> | undefined,
    [state?.assessmentId],
  );

  const withSavingState = useCallback(
    async (itemId: string, run: () => Promise<void>) => {
      setSavingItemIds((current) => new Set(current).add(itemId));
      try {
        await run();
      } finally {
        setSavingItemIds((current) => {
          const next = new Set(current);
          next.delete(itemId);
          return next;
        });
      }
    },
    [],
  );

  const handleSaveYesNo = useCallback(
    async (itemId: string, value: YesNoValue) => {
      if (!assessmentId) return;
      await withSavingState(itemId, async () => {
        await saveAnswer({
          assessmentId,
          evidenceItemId: itemId as Id<"evidenceItems">,
          yesNoValue: value,
        });
      });
    },
    [assessmentId, saveAnswer, withSavingState],
  );

  const handleSaveText = useCallback(
    async (itemId: string, value: string) => {
      if (!assessmentId) return;
      await withSavingState(itemId, async () => {
        await saveAnswer({
          assessmentId,
          evidenceItemId: itemId as Id<"evidenceItems">,
          textValue: value,
        });
      });
    },
    [assessmentId, saveAnswer, withSavingState],
  );

  if (state === undefined) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading questionnaire...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (state === null) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No assessment found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Finish onboarding to create your first DSPT assessment.
          </p>
          <Button onClick={() => router.push("/onboarding")}>
            Go to onboarding
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <QuestionnaireView
      state={state}
      savingItemIds={savingItemIds}
      onSelectStandard={setStandard}
      onSaveYesNo={(itemId, value) => {
        void handleSaveYesNo(itemId, value);
      }}
      onSaveText={(itemId, value) => {
        void handleSaveText(itemId, value);
      }}
    />
  );
}
