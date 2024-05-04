import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveWeatherData = mutation({
  args: {
    city: v.string(),
    data: v.any(),
  },
  handler: async ({ db, auth }, { city, data }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;

    const existingData = await db
      .query("weatherData")
      .withIndex("by_user_city", (q) => q.eq("userId", userId).eq("city", city))
      .first();

    if (existingData) {
      await db.patch(existingData._id, {
        data,
      });
    } else {
      await db.insert("weatherData", {
        userId,
        city,
        data,
      });
    }
  },
});

export const getWeatherDataByUser = query({
  args: {
    city: v.string(),
  },
  handler: async ({ db, auth }, { city }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;

    const weatherData = await db
      .query("weatherData")
      .withIndex("by_user_city", (q) => q.eq("userId", userId).eq("city", city))
      .first();

    return weatherData?.data;
  },
});

export const getAllWeatherDataByUser = query({
  handler: async ({ db, auth }) => {
    const identity = await auth.getUserIdentity();

    const userId = identity?.subject;

    const weatherData = await db
      .query("weatherData")
      .withIndex("by_user", (q) => q.eq("userId", userId || ""))
      .collect();

    return weatherData;
  },
});
