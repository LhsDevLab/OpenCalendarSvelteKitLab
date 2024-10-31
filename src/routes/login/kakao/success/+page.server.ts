import type { PageServerLoad } from "./$types";

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ url, params, cookies }) => {
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
