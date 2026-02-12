import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // =========================================================================
  // DSPT Reference Data (seeded from data/dspt-v8-gp.ts)
  // =========================================================================

  /** The 10 NDG Data Security Standards */
  standards: defineTable({
    number: v.int64(),
    title: v.string(),
    description: v.string(),
  }).index("by_number", ["number"]),

  /** Assertions grouped under standards (e.g. "1.1", "4.5") */
  assertions: defineTable({
    ref: v.string(),
    title: v.string(),
    standardId: v.id("standards"),
  }).index("by_standard", ["standardId"]),

  /** Evidence items — the actual questions users must answer */
  evidenceItems: defineTable({
    ref: v.string(),
    assertionId: v.id("assertions"),
    standardId: v.id("standards"),
    inputType: v.union(
      v.literal("yes_no"),
      v.literal("text"),
      v.literal("document"),
      v.literal("date"),
    ),
    /** Official DSPT question text */
    evidenceText: v.string(),
    /** Official DSPT tooltip/guidance */
    tooltip: v.optional(v.string()),
    /** ClinicShield plain-English question */
    plainEnglishQuestion: v.string(),
    /** Contextual help for GP practices */
    clinicHelp: v.string(),
    /** Required for "Standards Met" */
    mandatory: v.boolean(),
    /** Required for "Approaching Standards" */
    approachingMandatory: v.boolean(),
    /** Exemptions that waive this requirement */
    exemptions: v.array(
      v.union(
        v.literal("nhs_mail"),
        v.literal("cyber_essentials_plus"),
        v.literal("iso27001"),
        v.literal("psn_ia"),
        v.literal("audit"),
      ),
    ),
    /** v7 → v8 change description */
    changeFromV7: v.optional(v.string()),
    /** Whether this is new in v8 */
    newInV8: v.boolean(),
  })
    .index("by_assertion", ["assertionId"])
    .index("by_standard", ["standardId"])
    .index("by_ref", ["ref"]),

  // =========================================================================
  // Organisations & Users
  // =========================================================================

  /** A healthcare organisation (GP practice, dental clinic, etc.) */
  organisations: defineTable({
    name: v.string(),
    type: v.union(
      v.literal("gp"),
      v.literal("dental"),
      v.literal("pharmacy"),
      v.literal("optician"),
      v.literal("other"),
    ),
    /** ODS code if applicable */
    odsCode: v.optional(v.string()),
    /** ICO registration number (from evidence item 1.1.1) */
    icoRegistrationNumber: v.optional(v.string()),
    /** Approximate number of staff */
    staffCount: v.optional(v.int64()),
    /** Onboarding completed */
    onboardingComplete: v.boolean(),
    /** Owner user (who created the org) */
    createdBy: v.string(),
  }).index("by_created_by", ["createdBy"]),

  /** Users linked to organisations */
  users: defineTable({
    /** Clerk user ID (from auth token subject) */
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    organisationId: v.optional(v.id("organisations")),
    role: v.union(
      v.literal("practice_manager"),
      v.literal("ig_lead"),
      v.literal("caldicott_guardian"),
      v.literal("admin"),
      v.literal("viewer"),
    ),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_organisation", ["organisationId"]),

  // =========================================================================
  // Assessments & Answers
  // =========================================================================

  /** An assessment instance — one per org per DSPT year */
  assessments: defineTable({
    organisationId: v.id("organisations"),
    /** e.g. "2025-26" */
    dsptYear: v.string(),
    status: v.union(
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("submitted"),
    ),
    /** Overall completion percentage (0-100) */
    completionPercent: v.float64(),
    /** When the user last worked on it */
    lastActivityAt: v.float64(),
  })
    .index("by_organisation", ["organisationId"])
    .index("by_org_year", ["organisationId", "dsptYear"]),

  /** Individual answers to evidence items */
  answers: defineTable({
    assessmentId: v.id("assessments"),
    evidenceItemId: v.id("evidenceItems"),
    /** For yes_no questions */
    yesNoValue: v.optional(
      v.union(
        v.literal("yes"),
        v.literal("no"),
        v.literal("partial"),
        v.literal("not_sure"),
        v.literal("not_applicable"),
      ),
    ),
    /** For text questions */
    textValue: v.optional(v.string()),
    /** For document questions — reference to uploaded file */
    fileId: v.optional(v.id("_storage")),
    /** Optional comments on any answer */
    comments: v.optional(v.string()),
    /** Who last updated this answer */
    updatedBy: v.string(),
    /** When this was last updated */
    updatedAt: v.float64(),
  })
    .index("by_assessment", ["assessmentId"])
    .index("by_assessment_evidence", ["assessmentId", "evidenceItemId"]),

  // =========================================================================
  // Evidence Files
  // =========================================================================

  /** Metadata for uploaded evidence files */
  evidenceFiles: defineTable({
    assessmentId: v.id("assessments"),
    evidenceItemId: v.id("evidenceItems"),
    storageId: v.id("_storage"),
    fileName: v.string(),
    fileSize: v.int64(),
    mimeType: v.string(),
    uploadedBy: v.string(),
    uploadedAt: v.float64(),
  })
    .index("by_assessment", ["assessmentId"])
    .index("by_evidence_item", ["assessmentId", "evidenceItemId"]),
});
