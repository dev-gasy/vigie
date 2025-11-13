import type { DashboardData } from "@dgig-vigie/types";
import { apiClient, executeRequest } from "./client";

export class DashboardApi {
  async getData(): Promise<DashboardData> {
    return executeRequest(() => apiClient.get<DashboardData>("/dashboard"));
  }
}

export const dashboardApi = new DashboardApi();