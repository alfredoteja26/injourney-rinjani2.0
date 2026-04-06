import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-cd5e1016/health", (c) => {
  return c.json({ status: "ok" });
});

// Get onboarding status
app.get("/make-server-cd5e1016/onboarding/:userId", async (c) => {
  const userId = c.req.param("userId");
  try {
    const data = await kv.get(`onboarding:${userId}`);
    return c.json(data || { hasSeenSpotlight: false, seenFeatureVersions: [] });
  } catch (e) {
    console.error(e);
    return c.json({ error: e.message }, 500);
  }
});

// Update onboarding status
app.post("/make-server-cd5e1016/onboarding/:userId", async (c) => {
  const userId = c.req.param("userId");
  const body = await c.req.json();
  try {
    // Merge with existing
    const existing = (await kv.get(`onboarding:${userId}`)) || { hasSeenSpotlight: false, seenFeatureVersions: [] };
    const updated = { ...existing, ...body };
    await kv.set(`onboarding:${userId}`, updated);
    return c.json(updated);
  } catch (e) {
    console.error(e);
    return c.json({ error: e.message }, 500);
  }
});

Deno.serve(app.fetch);