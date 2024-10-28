import { tryLoginWithCode } from "./tryLoginWithCode";
import {
  type LoginResponseDTOonFailure,
  type LoginResponseDTOonSuccess,
} from "$lib/types/apiDTO/LoginResponseDTO";
import { redirect } from "@sveltejs/kit";
import { buildQueryString, setToken } from "$lib/utils/FetchUtils";

export async function handleKakaoLogin(kakaoCode: string) {
  const res: LoginResponseDTOonFailure | LoginResponseDTOonSuccess =
    await tryLoginWithCode(kakaoCode);

  if (res.isSuccess) {
    const { accessToken, refreshToken } = res as LoginResponseDTOonSuccess;
    //로그인 성공 시, 토큰 획득
    await setToken({ accessToken, refreshToken });
    return {
      error: null,
      refreshToken: refreshToken,
    };
  }
  const { code, payload } = res as LoginResponseDTOonFailure;
  //해당 카카오 회원이 없을시, 회원가입 시도
  if (code === "NO_SUCH_USER") {
    throw redirect(
      302,
      `/signup/kakao/${buildQueryString({ kakaoId: payload })}`,
    );
  }

  return {
    error: code ? code.toString() : "",
    error_description: payload,
  };
}
