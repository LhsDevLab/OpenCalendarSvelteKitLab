import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
  let jwtToken = cookies.get("jwtToken");
  if (jwtToken) {
    throw redirect(302, "/app/main");
  }
};
