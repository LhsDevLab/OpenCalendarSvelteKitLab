import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  // Access cookies
  let kakaoId = cookies.get("kakaoId");

  return {
    kakaoId,
  };
};
