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

  //1.에러 체크
  if (error !== null || !code)
    return {
      error,
      error_description,
    };

  //2.state별 로직 처리
  if ((state = "kakaoLogin")) {
    return handleKakaoLogin(code);
  } else {
    return {
      error: "state 미일치",
      error_description: "전송 상태값 미일치",
    };
  }
};
