import { post } from "$lib/utils/FetchUtils";
import {
  type SignUpResponseDTOonFailure,
  type SignUpResponseDTOonSuccess,
} from "$lib/types/apiDTO/SignUpResponseDTO";

export async function trySignup(
  kakaoId: string,
  nickname: string,
): Promise<SignUpResponseDTOonFailure | SignUpResponseDTOonSuccess> {
  try {
    return await post("open/kakao/trySignUp", {
      body: { nickname, kakaoId },
    }).then((res) => {
      return {
        ...res,
        message: res.message || "회원가입 성공!",
      };
    });
  } catch (e) {
    return {
      isSuccess: false,
      message: "회원가입 실패!",
    };
  }
}
