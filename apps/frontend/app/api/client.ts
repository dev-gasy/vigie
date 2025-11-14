import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function executeRequest<T>(
  requestFn: () => Promise<{ data: T }>
): Promise<T> {
  try {
    const response = await requestFn()
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API request failed: ${error.response?.statusText || error.message}`
      )
    }
    throw error
  }
}
