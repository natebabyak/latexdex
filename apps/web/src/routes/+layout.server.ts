import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { resolve } from "$app/paths";

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const { user } = locals;

  if (user && !user.emailVerified && url.pathname !== "/sign-in") {
    redirect(302, resolve("/sign-in"));
  }
};
