"use client";

import { SignOutButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Shield } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "../../../convex/_generated/api";

export default function DashboardPage() {
  const org = useQuery(api.organisations.getCurrent);
  const user = useQuery(api.users.current);
  const questionnaire = useQuery(api.questionnaire.getState, {
    standardNumber: BigInt(1),
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="size-8 text-primary" />
            <div>
              <h1 className="text-xl font-semibold">ClinicShield</h1>
              {org && (
                <p className="text-sm text-muted-foreground">{org.name}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <SignOutButton>Sign out</SignOutButton>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>DSPT Assessment 2025–26</CardTitle>
            <CardDescription>
              Deadline: 30 June 2026 · {questionnaire?.completionPercent ?? 0}%{" "}
              complete
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Work through each NDG Data Security Standard and your answers save
              automatically as you type.
            </p>
            <Link
              href="/dashboard/questionnaire?standard=1"
              className={buttonVariants()}
            >
              Continue questionnaire
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
