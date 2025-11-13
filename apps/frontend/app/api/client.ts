import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

// Handle SSL certificate issues in development (server-side only)
const getHttpsAgent = () => {
  if (typeof window !== "undefined") return undefined;
  
  try {
    const https = require("https");
    return new https.Agent({
      rejectUnauthorized: false,
    });
  } catch {
    return undefined;
  }
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: getHttpsAgent(),
});

export async function executeRequest<T>(
  requestFn: () => Promise<{ data: T }>
): Promise<T> {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API request failed: ${error.response?.statusText || error.message}`
      );
    }
    throw error;
  }
}