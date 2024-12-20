import { post } from "$lib/utils/FetchUtils/FetchUtils";
import {
  type LoginResponseDTOonFailure,
  type LoginResponseDTOonSuccess,
} from "$lib/types/apiDTO/LoginResponseDTO";

export async function tryLoginWithCode(
  code: string,
): Promise<LoginResponseDTOonSuccess | LoginResponseDTOonFailure> {
  try {
    let res: LoginResponseDTOonSuccess | LoginResponseDTOonFailure = await post(
      "open/kakao/tryLogin",
      {
        body: { code },
      },
    );

    return res;
  } catch (e: any) {
    return {
      isSuccess: false,
      code: "DEFAULT",
      payload: e.message,
    };
  }
}
