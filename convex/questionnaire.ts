import { v } from "convex/values";
import {
  type MutationCtx,
  mutation,
  type QueryCtx,
  query,
} from "./_generated/server";
import {
  calculateCompletionPercent,
  isAnswerFilled,
  normalizeTextAnswer,
} from "./questionnaireHelpers";

const YES_NO_VALUE_VALIDATOR = v.union(
  v.literal("yes"),
  v.literal("no"),
  v.literal("partial"),
  v.literal("not_sure"),
  v.literal("not_applicable"),
);

async function getCurrentUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first();

  if (!user?.organisationId) return null;
  return { identity, user, organisationId: user.organisationId };
}

export const getState = query({
  args: { standardNumber: v.optional(v.int64()) },
  handler: async (ctx, args) => {
    const current = await getCurrentUser(ctx);
    if (!current) return null;

    const assessment = await ctx.db
      .query("assessments")
      .withIndex("by_org_year", (q) =>
        q
          .eq("organisationId", current.organisationId)
          .eq("dsptYear", "2025-26"),
      )
      .first();

    if (!assessment) return null;

    const standards = await ctx.db
      .query("standards")
      .withIndex("by_number")
      .collect();
    if (standards.length === 0) return null;

    const allEvidenceItems = await ctx.db.query("evidenceItems").collect();
    const answers = await ctx.db
      .query("answers")
      .withIndex("by_assessment", (q) => q.eq("assessmentId", assessment._id))
      .collect();

    const selectedStandard =
      standards.find((standard) => standard.number === args.standardNumber) ??
      standards[0];

    const itemCountsByStandard = new Map<string, number>();
    for (const item of allEvidenceItems) {
      const key = item.standardId;
      itemCountsByStandard.set(key, (itemCountsByStandard.get(key) ?? 0) + 1);
    }

    const answersByEvidenceItem = new Map<string, (typeof answers)[number]>();
    for (const answer of answers) {
      answersByEvidenceItem.set(answer.evidenceItemId, answer);
    }

    const answeredCountsByStandard = new Map<string, number>();
    for (const item of allEvidenceItems) {
      const answer = answersByEvidenceItem.get(item._id);
      if (!answer || !isAnswerFilled(answer)) continue;
      answeredCountsByStandard.set(
        item.standardId,
        (answeredCountsByStandard.get(item.standardId) ?? 0) + 1,
      );
    }

    const currentStandardItems = allEvidenceItems
      .filter((item) => item.standardId === selectedStandard._id)
      .sort((a, b) => a.ref.localeCompare(b.ref))
      .map((item) => {
        const answer = answersByEvidenceItem.get(item._id);
        return {
          _id: item._id,
          ref: item.ref,
          inputType: item.inputType,
          plainEnglishQuestion: item.plainEnglishQuestion,
          evidenceText: item.evidenceText,
          clinicHelp: item.clinicHelp,
          tooltip: item.tooltip,
          mandatory: item.mandatory,
          yesNoValue: answer?.yesNoValue ?? null,
          textValue: answer?.textValue ?? "",
        };
      });

    const completionPercent = calculateCompletionPercent(
      allEvidenceItems.length,
      answers,
    );

    return {
      assessmentId: assessment._id,
      dsptYear: assessment.dsptYear,
      completionPercent,
      standards: standards.map((standard) => ({
        _id: standard._id,
        number: Number(standard.number),
        title: standard.title,
        description: standard.description,
        itemCount: itemCountsByStandard.get(standard._id) ?? 0,
        answeredCount: answeredCountsByStandard.get(standard._id) ?? 0,
      })),
      currentStandard: {
        _id: selectedStandard._id,
        number: Number(selectedStandard.number),
        title: selectedStandard.title,
        description: selectedStandard.description,
        items: currentStandardItems,
      },
    };
  },
});

export const saveAnswer = mutation({
  args: {
    assessmentId: v.id("assessments"),
    evidenceItemId: v.id("evidenceItems"),
    yesNoValue: v.optional(YES_NO_VALUE_VALIDATOR),
    textValue: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const current = await getCurrentUser(ctx);
    if (!current) throw new Error("Not authenticated");

    const assessment = await ctx.db.get(args.assessmentId);
    if (!assessment) throw new Error("Assessment not found");
    if (assessment.organisationId !== current.organisationId) {
      throw new Error("Forbidden");
    }

    const evidenceItem = await ctx.db.get(args.evidenceItemId);
    if (!evidenceItem) throw new Error("Evidence item not found");

    const existingAnswer = await ctx.db
      .query("answers")
      .withIndex("by_assessment_evidence", (q) =>
        q
          .eq("assessmentId", args.assessmentId)
          .eq("evidenceItemId", args.evidenceItemId),
      )
      .first();

    const metadataPatch = {
      updatedAt: Date.now(),
      updatedBy: current.identity.subject,
    };

    if (evidenceItem.inputType === "yes_no") {
      if (!args.yesNoValue) {
        throw new Error("yes_no questions require yesNoValue");
      }

      if (existingAnswer) {
        await ctx.db.patch(existingAnswer._id, {
          ...metadataPatch,
          yesNoValue: args.yesNoValue,
        });
      } else {
        await ctx.db.insert("answers", {
          assessmentId: args.assessmentId,
          evidenceItemId: args.evidenceItemId,
          ...metadataPatch,
          yesNoValue: args.yesNoValue,
        });
      }
    } else if (evidenceItem.inputType === "text") {
      const textValue = normalizeTextAnswer(args.textValue) ?? "";

      if (existingAnswer) {
        await ctx.db.patch(existingAnswer._id, {
          ...metadataPatch,
          textValue,
        });
      } else {
        await ctx.db.insert("answers", {
          assessmentId: args.assessmentId,
          evidenceItemId: args.evidenceItemId,
          ...metadataPatch,
          textValue,
        });
      }
    } else {
      throw new Error(
        `Input type "${evidenceItem.inputType}" is not supported in this slice`,
      );
    }

    const allEvidenceItems = await ctx.db.query("evidenceItems").collect();
    const allAnswers = await ctx.db
      .query("answers")
      .withIndex("by_assessment", (q) =>
        q.eq("assessmentId", args.assessmentId),
      )
      .collect();

    const completionPercent = calculateCompletionPercent(
      allEvidenceItems.length,
      allAnswers,
    );

    await ctx.db.patch(args.assessmentId, {
      completionPercent,
      lastActivityAt: Date.now(),
    });

    return { completionPercent };
  },
});
