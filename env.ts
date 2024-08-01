import { createEnv } from "@t3-oss/env-nuxt";
import { z } from "zod";

export const env = createEnv({
    client: {
        NUXT_PUBLIC_FIREBASE_API_KEY: z.string(),
        NUXT_PUBLIC_AUTH_DOMAIN: z.string(),
        NUXT_PUBLIC_PROJECT_ID: z.string(),
        NUXT_PUBLIC_STORAGE_BUCKET: z.string(),
        NUXT_PUBLIC_MESSAGING_SENDER_ID: z.string(),
        NUXT_PUBLIC_APP_ID: z.string(),
        NUXT_PUBLIC_MEASUREMENT_ID: z.string(),
    },
});

// console.log(env);