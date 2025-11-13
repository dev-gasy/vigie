import { z } from "zod";

export const envVariables = z.object({
  API_KEY: z.string(),
});

export type Env = z.infer<typeof envVariables>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
