import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  weatherData: defineTable({
    userId: v.string(),
    city: v.string(),
    data: v.any(),
  })
    .index("by_user_city", ["userId", "city"])
    .index("by_user", ["userId"]),
});
