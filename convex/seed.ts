import { dsptV8Standards, NEW_IN_V8_REFS } from "../data/dspt-v8-gp";
import { internalMutation } from "./_generated/server";

/**
 * Seed the database with DSPT v8 GP (Category 4) reference data.
 *
 * Run once via the Convex dashboard or CLI:
 *   npx convex run seed:seedDsptData
 *
 * This is idempotent — it checks for existing data and skips if already seeded.
 */
export const seedDsptData = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existingStandard = await ctx.db
      .query("standards")
      .withIndex("by_number")
      .first();

    if (existingStandard) {
      console.log("DSPT data already seeded — skipping.");
      return { seeded: false, message: "Already seeded" };
    }

    let standardCount = 0;
    let assertionCount = 0;
    let evidenceItemCount = 0;

    for (const standard of dsptV8Standards) {
      const standardId = await ctx.db.insert("standards", {
        number: BigInt(standard.number),
        title: standard.title,
        description: standard.description,
      });
      standardCount++;

      for (const assertion of standard.assertions) {
        const assertionId = await ctx.db.insert("assertions", {
          ref: assertion.ref,
          title: assertion.title,
          standardId,
        });
        assertionCount++;

        for (const item of assertion.evidenceItems) {
          await ctx.db.insert("evidenceItems", {
            ref: item.ref,
            assertionId,
            standardId,
            inputType: item.inputType,
            evidenceText: item.evidenceText,
            tooltip: item.tooltip ?? undefined,
            plainEnglishQuestion: item.plainEnglishQuestion,
            clinicHelp: item.clinicHelp,
            mandatory: item.mandatory,
            approachingMandatory: item.approachingMandatory,
            exemptions: item.exemptions,
            changeFromV7: item.changeFromV7 ?? undefined,
            newInV8: NEW_IN_V8_REFS.has(item.ref),
          });
          evidenceItemCount++;
        }
      }
    }

    console.log(
      `Seeded: ${standardCount} standards, ${assertionCount} assertions, ${evidenceItemCount} evidence items`,
    );

    return {
      seeded: true,
      standards: standardCount,
      assertions: assertionCount,
      evidenceItems: evidenceItemCount,
    };
  },
});
