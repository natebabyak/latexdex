import { defineEnvVars } from "@sveltejs/kit/env";
import z from "zod";

export const variables = defineEnvVars({
  BETTER_AUTH_SECRET: {
    schema: z.string(),
  },
  BETTER_AUTH_URL: {
    schema: z.pipe(z.string(), z.url()),
  },
  DATABASE_URL: {
    schema: z.pipe(z.string(), z.url()),
  },
  GITHUB_CLIENT_ID: {
    schema: z.string(),
  },
  GITHUB_CLIENT_SECRET: {
    schema: z.string(),
  },
  GOOGLE_CLIENT_ID: {
    schema: z.string(),
  },
  GOOGLE_CLIENT_SECRET: {
    schema: z.string(),
  },
  SMTP_HOST: {
    schema: z.string(),
  },
  SMTP_PORT: {
    schema: z.pipe(z.string(), z.coerce.number()),
  },
  SMTP_USERNAME: {
    schema: z.string(),
  },
  SMTP_PASSWORD: {
    schema: z.string(),
  },
  STRIPE_SECRET_KEY: {
    schema: z.string(),
  },
  STRIPE_WEBHOOK_SECRET: {
    schema: z.string(),
  },
});
