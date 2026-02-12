"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Building2, Check } from "lucide-react";

const ORG_TYPES = [
  {
    value: "gp",
    label: "GP Practice",
    description: "General practice / primary care",
  },
  {
    value: "dental",
    label: "Dental Practice",
    description: "NHS or private dental clinic",
  },
  {
    value: "pharmacy",
    label: "Pharmacy",
    description: "Community or hospital pharmacy",
  },
  {
    value: "optician",
    label: "Optician / Optometrist",
    description: "Eye care practice",
  },
  {
    value: "other",
    label: "Other Healthcare Provider",
    description: "Physio, podiatry, or other small provider",
  },
] as const;

const STAFF_RANGES = [
  { value: "5", label: "1–10 staff" },
  { value: "25", label: "11–50 staff" },
  { value: "75", label: "51–100 staff" },
  { value: "150", label: "100+ staff" },
] as const;

type OrgType = (typeof ORG_TYPES)[number]["value"];

export default function OnboardingPage() {
  const router = useRouter();
  const createOrg = useMutation(api.organisations.create);

  const [step, setStep] = useState(0);
  const [orgType, setOrgType] = useState<OrgType | null>(null);
  const [orgName, setOrgName] = useState("");
  const [odsCode, setOdsCode] = useState("");
  const [staffCount, setStaffCount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  const canProceed = () => {
    switch (step) {
      case 0:
        return orgType !== null;
      case 1:
        return orgName.trim().length > 0;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!orgType || !orgName.trim()) return;
    setIsSubmitting(true);
    try {
      await createOrg({
        name: orgName.trim(),
        type: orgType,
        odsCode: odsCode.trim() || undefined,
        staffCount: staffCount ? BigInt(staffCount) : undefined,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create organisation:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step
                  ? "w-8 bg-primary"
                  : i < step
                    ? "w-8 bg-primary/40"
                    : "w-8 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Step 0: Organisation type */}
        {step === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                What type of organisation are you?
              </CardTitle>
              <CardDescription>
                This helps us tailor the DSPT assessment to your specific
                requirements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {ORG_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setOrgType(type.value)}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                      orgType === type.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <Building2
                      className={`mt-0.5 size-5 shrink-0 ${orgType === type.value ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {type.description}
                      </div>
                    </div>
                    {orgType === type.value && (
                      <Check className="ml-auto mt-0.5 size-5 shrink-0 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                onClick={() => setStep(1)}
                disabled={!canProceed()}
                size="lg"
              >
                Continue
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 1: Practice details */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Practice details</CardTitle>
              <CardDescription>
                Tell us a bit about your organisation. You can update these later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="orgName">Organisation name *</Label>
                  <Input
                    id="orgName"
                    placeholder="e.g. Riverside Medical Centre"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="odsCode">ODS code (optional)</Label>
                  <Input
                    id="odsCode"
                    placeholder="e.g. A12345"
                    value={odsCode}
                    onChange={(e) => setOdsCode(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Your Organisation Data Service code, if you know it.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label>Approximate staff count</Label>
                  <Select
                    value={staffCount}
                    onValueChange={setStaffCount}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                      {STAFF_RANGES.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="ghost" onClick={() => setStep(0)}>
                <ArrowLeft data-icon="inline-start" className="size-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={!canProceed()}
                size="lg"
              >
                Continue
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Ready to start</CardTitle>
              <CardDescription>
                Review your details and begin your DSPT assessment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border bg-muted/30 p-4">
                <dl className="grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Type</dt>
                    <dd className="font-medium">
                      {ORG_TYPES.find((t) => t.value === orgType)?.label}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Name</dt>
                    <dd className="font-medium">{orgName}</dd>
                  </div>
                  {odsCode && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">ODS Code</dt>
                      <dd className="font-medium">{odsCode}</dd>
                    </div>
                  )}
                  {staffCount && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Staff</dt>
                      <dd className="font-medium">
                        {STAFF_RANGES.find((r) => r.value === staffCount)?.label}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">DSPT Year</dt>
                    <dd className="font-medium">2025–26</dd>
                  </div>
                </dl>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                We'll create your assessment for the 2025–26 DSPT cycle
                (deadline: 30 June 2026). You can work through the 10 NDG
                standards at your own pace.
              </p>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft data-icon="inline-start" className="size-4" />
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? "Setting up…" : "Start assessment"}
                {!isSubmitting && (
                  <Check data-icon="inline-end" className="size-4" />
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
