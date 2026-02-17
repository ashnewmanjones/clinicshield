import { Suspense } from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { QuestionnairePageClient } from "./QuestionnairePageClient";

export default function QuestionnairePage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl">
        <Suspense
          fallback={
            <Card>
              <CardHeader>
                <CardTitle>Loading questionnaire...</CardTitle>
              </CardHeader>
            </Card>
          }
        >
          <QuestionnairePageClient />
        </Suspense>
      </div>
    </div>
  );
}
