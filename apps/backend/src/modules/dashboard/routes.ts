import { Hono } from "hono";
import { DashboardService } from "./service.js";

const dashboard = new Hono();

dashboard.get("/", async (c) => {
  try {
    const data = await DashboardService.getDashboardData();
    return c.json(data);
  } catch (error) {
    return c.json({ error: "Failed to fetch dashboard data" }, 500);
  }
});

export { dashboard };
