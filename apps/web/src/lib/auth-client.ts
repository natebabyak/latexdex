import { stripeClient } from "@better-auth/stripe/client";
import { emailOTPClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    stripeClient({
      subscription: true,
    }),
    usernameClient({
      displayUsername: false,
    }),
  ],
});
