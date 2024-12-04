import { tryLoginWithCode } from "./tryLoginWithCode";
import {
  type LoginResponseDTOonFailure,
  type LoginResponseDTOonSuccess,
} from "$lib/6.shared/types/apiDTO/LoginResponseDTO";
import { goto } from "$app/navigation";
import { buildQueryString } from "$lib/6.shared/utils/FetchUtils/FetchUtils";

export async function handleKakaoLogin(kakaoCode: string) {
  const res: LoginResponseDTOonFailure | LoginResponseDTOonSuccess =
    await tryLoginWithCode(kakaoCode);

  if (res.isSuccess) {
    const { accessToken, refreshToken } = res as LoginResponseDTOonSuccess;

    return {
      error: null,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
  const { code, payload } = res as LoginResponseDTOonFailure;
  //해당 카카오 회원이 없을시, 회원가입 시도
  if (code === "NO_SUCH_USER") {
    goto(`/signup/kakao?${buildQueryString({ kakaoId: payload })}`);
  }

  return {
    error: code ? code.toString() : "",
    error_description: payload,
  };
}
