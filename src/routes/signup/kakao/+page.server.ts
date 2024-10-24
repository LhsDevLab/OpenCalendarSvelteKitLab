/** @type {import('./$types').PageServerLoad} */
export const load = async ({ url, params, cookies }) => {
  let { kakaoId } = params as any;
  return {
    kakaoId,
  };
};
