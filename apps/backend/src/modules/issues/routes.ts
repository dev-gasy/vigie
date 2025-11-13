import { Hono } from "hono";
import { IssuesService } from "./service.js";

const issues = new Hono();

issues.get("/", async (c) => {
  try {
    const issues = await IssuesService.getAllIssues();
    return c.json(issues);
  } catch (error) {
    return c.json({ error: "Failed to fetch issues" }, 500);
  }
});

issues.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    // Check if it's a JIRA key format (e.g., PROJ-123) or numeric ID
    const issue = id.includes("-")
      ? await IssuesService.getIssueByKey(id)
      : await IssuesService.getIssueById(id);

    return c.json(issue);
  } catch (error) {
    return c.json({ error: "Failed to fetch issue" }, 500);
  }
});

export { issues };
