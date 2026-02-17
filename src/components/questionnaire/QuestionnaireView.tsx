"use client";

import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { YES_NO_OPTIONS, type YesNoValue } from "@/lib/questionnaire";
import { cn } from "@/lib/utils";

type StandardSummary = {
  _id: string;
  number: number;
  title: string;
  description: string;
  itemCount: number;
  answeredCount: number;
};

type QuestionnaireItem = {
  _id: string;
  ref: string;
  inputType: "yes_no" | "text" | "document" | "date";
  plainEnglishQuestion: string;
  evidenceText: string;
  clinicHelp: string;
  tooltip?: string;
  mandatory: boolean;
  yesNoValue: YesNoValue | null;
  textValue: string;
};

export type QuestionnaireState = {
  assessmentId: string;
  dsptYear: string;
  completionPercent: number;
  standards: StandardSummary[];
  currentStandard: {
    _id: string;
    number: number;
    title: string;
    description: string;
    items: QuestionnaireItem[];
  };
};

type QuestionnaireViewProps = {
  state: QuestionnaireState;
  savingItemIds: Set<string>;
  onSelectStandard: (standardNumber: number) => void;
  onSaveYesNo: (itemId: string, value: YesNoValue) => void;
  onSaveText: (itemId: string, value: string) => void;
};

export function QuestionnaireView({
  state,
  savingItemIds,
  onSelectStandard,
  onSaveYesNo,
  onSaveText,
}: QuestionnaireViewProps) {
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const initial: Record<string, string> = {};
    for (const item of state.currentStandard.items) {
      if (item.inputType === "text") {
        initial[item._id] = item.textValue;
      }
    }
    setTextAnswers(initial);
  }, [state.currentStandard.items]);

  const standardProgressText = useMemo(() => {
    const standard = state.standards.find(
      (entry) => entry.number === state.currentStandard.number,
    );
    if (!standard) return "0/0 answered";
    return `${standard.answeredCount}/${standard.itemCount} answered`;
  }, [state.currentStandard.number, state.standards]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            DSPT Assessment {state.dsptYear}
          </CardTitle>
          <CardDescription>
            Overall progress: {state.completionPercent}% complete
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{
                width: `${Math.min(Math.max(state.completionPercent, 0), 100)}%`,
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Standard {state.currentStandard.number}: {standardProgressText}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">Standards</CardTitle>
            <CardDescription>Jump between sections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {state.standards.map((standard) => (
              <button
                key={standard._id}
                type="button"
                onClick={() => onSelectStandard(standard.number)}
                className={cn(
                  "w-full rounded-xl border p-3 text-left transition-colors",
                  standard.number === state.currentStandard.number
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">
                    Standard {standard.number}
                  </p>
                  <Badge variant="outline">
                    {standard.answeredCount}/{standard.itemCount}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {standard.title}
                </p>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Standard {state.currentStandard.number}:{" "}
              {state.currentStandard.title}
            </CardTitle>
            <CardDescription>
              {state.currentStandard.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.currentStandard.items.map((item) => (
              <div key={item._id} className="rounded-xl border p-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{item.ref}</Badge>
                  {item.mandatory && <Badge variant="outline">Mandatory</Badge>}
                  {savingItemIds.has(item._id) ? (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <LoaderCircle className="size-3 animate-spin" />
                      Saving
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle2 className="size-3" />
                      Saved
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-sm font-medium">
                  {item.plainEnglishQuestion}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.clinicHelp}
                </p>

                {item.inputType === "yes_no" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {YES_NO_OPTIONS.map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={
                          item.yesNoValue === option.value
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => onSaveYesNo(item._id, option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                )}

                {item.inputType === "text" && (
                  <div className="mt-3">
                    <Textarea
                      value={textAnswers[item._id] ?? ""}
                      onChange={(event) => {
                        const nextValue = event.target.value;
                        setTextAnswers((current) => ({
                          ...current,
                          [item._id]: nextValue,
                        }));
                        onSaveText(item._id, nextValue);
                      }}
                      placeholder="Add your answer"
                      rows={4}
                    />
                  </div>
                )}

                {(item.inputType === "document" ||
                  item.inputType === "date") && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    This input type is part of the next slice.
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
