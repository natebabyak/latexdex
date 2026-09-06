import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth/minimal";
import { emailOTP, username } from "better-auth/plugins";
import { sveltekitCookies } from "better-auth/svelte-kit";
import Stripe from "stripe";
import { db } from "#lib/server/db/drizzle.ts";
import * as schema from "#lib/server/db/schema.ts";
import { sendEmail } from "#lib/server/email.ts";
import {
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
} from "$app/env/private";
import { getRequestEvent } from "$app/server";

const stripeClient = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2026-07-29.dahlia",
});

export const auth = betterAuth({
  secret: BETTER_AUTH_SECRET,
  baseURL: BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          await sendEmail({
            from: "noreply@texfolia.com",
            to: email,
            subject: "Sign in OTP",
            html: `Your OTP is ${otp}`,
          });
        } else if (type === "email-verification") {
          await sendEmail({
            from: "noreply@texfolia.com",
            to: email,
            subject: "Email Verification OTP",
            html: `Your OTP is ${otp}`,
          });
        } else {
          await sendEmail({
            from: "noreply@texfolia.com",
            to: email,
            subject: "Password Reset OTP",
            html: `Your OTP is ${otp}`,
          });
        }
      },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: STRIPE_WEBHOOK_SECRET,
      createCustomerOnSignUp: true,
    }),
    username({
      displayUsername: false,
    }),
    sveltekitCookies(getRequestEvent),
  ],
  advanced: {
    database: {
      joins: true,
    },
  },
});
