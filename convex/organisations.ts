import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/** Create an organisation and link the current user to it */
export const create = mutation({
  args: {
    name: v.string(),
    type: v.union(
      v.literal("gp"),
      v.literal("dental"),
      v.literal("pharmacy"),
      v.literal("optician"),
      v.literal("other"),
    ),
    odsCode: v.optional(v.string()),
    staffCount: v.optional(v.int64()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const orgId = await ctx.db.insert("organisations", {
      name: args.name,
      type: args.type,
      odsCode: args.odsCode,
      staffCount: args.staffCount,
      onboardingComplete: true,
      createdBy: identity.subject,
    });

    // Upsert user record
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { organisationId: orgId });
    } else {
      await ctx.db.insert("users", {
        clerkId: identity.subject,
        email: identity.email ?? "",
        name: identity.name,
        organisationId: orgId,
        role: "practice_manager",
      });
    }

    // Create initial assessment for 2025-26
    await ctx.db.insert("assessments", {
      organisationId: orgId,
      dsptYear: "2025-26",
      status: "in_progress",
      completionPercent: 0,
      lastActivityAt: Date.now(),
    });

    return orgId;
  },
});

/** Get the current user's organisation */
export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user?.organisationId) return null;
    return await ctx.db.get(user.organisationId);
  },
});
