import type { PageServerLoad } from "./$types";
import { tryLoginWithCode } from "./_methods/tryLoginWithCode";
import {
  type LoginResponseDTOonFailure,
  type LoginResponseDTOonSuccess,
} from "$lib/types/DTO/LoginResponseDTO";
import { redirect } from "@sveltejs/kit";
import { setToken } from "$lib/utils/FetchUtils";

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ url, params, cookies }) => {
  // Access query parameters
  let code = url.searchParams.get("code");
  let error = url.searchParams.get("error");
  let errorDescription = url.searchParams.get("error_description");
  let state = url.searchParams.get("state");
  let redirectUrl = null;

  //1.상태값 체크
  if (!["kakaoLogin"].includes(state as string))
    return {
      error: "state 미일치",
      errorDescription: "전송 상태값 미일치",
    };

  //2.에러 체크
  if (error !== null || !code)
    return {
      error,
      errorDescription,
    };

  //3.state별 로직 처리
  if ((state = "kakaoLogin")) {
    const res: LoginResponseDTOonFailure | LoginResponseDTOonSuccess =
      await tryLoginWithCode(code);

    if (res.isSuccess) {
      const { jwtToken } = res as LoginResponseDTOonSuccess;
      //로그인 성공 시, 토큰 획득
      setToken(jwtToken);
      redirectUrl = `/app/main`;
    } else {
      const { code, payload } = res as LoginResponseDTOonFailure;
      //해당 카카오 회원이 없을시, 회원가입 시도
      if (code === "NO_SUCH_USER") {
        cookies.set("kakaoId", payload, { path: "/" });
        redirectUrl = `/signup/kakao`;
      } else {
        error = code ? code.toString() : "";
        errorDescription = payload;
      }
    }
  }

  //4. 리다이렉트
  if (redirectUrl !== null) {
    throw redirect(302, redirectUrl);
  }

  //5.return
  return {
    error,
    errorDescription,
  };
};
