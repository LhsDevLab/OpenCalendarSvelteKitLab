import { post } from "$lib/6.shared/utils/FetchUtils/FetchUtils";
import {
  type SignUpResponseDTOonFailure,
  type SignUpResponseDTOonSuccess,
} from "$lib/6.shared/types/apiDTO/SignUpResponseDTO";
import { goto } from "$app/navigation";
import {
  ClientErrorCode,
  ClientErrorCodeMap,
} from "$lib/6.shared/types/ClientErrorCode";

export async function trySignup(
  kakaoId: string,
  nickname: string,
): Promise<SignUpResponseDTOonFailure | SignUpResponseDTOonSuccess> {
  try {
    const res = await post("open/kakao/trySignUp", {
      body: { nickname, kakaoId },
    });
    return {
      ...res,
      message: res.message || "회원가입 성공!",
    };
  } catch (e) {
    goto(`/error/${ClientErrorCode.FetchError}`);
    throw Error(ClientErrorCodeMap[ClientErrorCode.FetchError]);
  }
}
