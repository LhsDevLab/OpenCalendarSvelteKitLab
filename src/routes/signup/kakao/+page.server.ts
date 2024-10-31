/** @type {import('./$types').PageServerLoad} */
export const load = async ({ url, params, cookies }) => {
  let kakaoId = url.searchParams.get("kakaoId");

  return {
    kakaoId,
  };
};
