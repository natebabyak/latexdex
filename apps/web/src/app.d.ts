import type { auth } from "#lib/server/auth.ts";

declare global {
  namespace App {
    interface Locals {
      session?: typeof auth.$Infer.Session.session;
      user?: typeof auth.$Infer.Session.user;
    }
  }
}

export {};
