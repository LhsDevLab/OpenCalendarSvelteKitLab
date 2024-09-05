import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, params }) => {
  // Access query parameters
  let code = url.searchParams.get("code");
  let error = url.searchParams.get("error");
  let errorDescription = url.searchParams.get("error_description");
  let state = url.searchParams.get("state");

  // Perform any necessary operations with these parameters
  if (!["kakaoLogin", "kakaoSignUp"].includes(state as string)) {
    error = "state 미일치";
    errorDescription = "전송 상태값 미일치";
  }

  return {
    code,
    error,
    errorDescription,
    state,
    // Include any other data you want to pass to the page
  };
};
