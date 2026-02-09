import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    CONVEX_DEPLOYMENT: z.string().min(1),
    WORKOS_CLIENT_ID: z.string().min(1),
    WORKOS_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CONVEX_URL: z.url(),
    NEXT_PUBLIC_CONVEX_SITE_URL: z.url(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1),
    NEXT_PUBLIC_WORKOS_REDIRECT_URI: z.url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_CONVEX_SITE_URL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_WORKOS_REDIRECT_URI: process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
  }
});