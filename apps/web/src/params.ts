import { defineParams } from "@sveltejs/kit/params";
import z from "zod";

export const params = defineParams({
  username: z.string().regex(/^@\w{3,30}$/),
});
