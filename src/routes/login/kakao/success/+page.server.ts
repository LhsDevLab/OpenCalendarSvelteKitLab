import type { PageServerLoad } from "./$types";
import { handleKakaoLogin } from "./_methods/handleKakaoLogin";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ url, params, cookies }) => {
  // Access query parameters
  let code = url.searchParams.get("code");
  let error = url.searchParams.get("error");
  let error_description = url.searchParams.get("error_description");
  let state = url.searchParams.get("state");

  return {
    code,
    error,
    error_description,
    state,
  };
};
