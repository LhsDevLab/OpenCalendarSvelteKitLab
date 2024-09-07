import type { PageServerLoad } from "./$types";
import { tryLoginWithCode } from "./tryLoginWithCode";
import {
  type LoginResponseDTOonFailure,
  type LoginResponseDTOonSuccess,
} from "$lib/types/DTO/LoginResponseDTO";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ url, params, cookies }) => {
  // Access query parameters
  let code = url.searchParams.get("code");
  let error = url.searchParams.get("error");
  let errorDescription = url.searchParams.get("error_description");
  let state = url.searchParams.get("state");
  let redirectUrl = null;

  if (!["kakaoLogin"].includes(state as string)) {
    error = "state 미일치";
    errorDescription = "전송 상태값 미일치";
  }

  if (error === null && code) {
    if ((state = "kakaoLogin")) {
      const res: LoginResponseDTOonFailure | LoginResponseDTOonSuccess =
        await tryLoginWithCode(code);

      if (res.isSuccess) {
        const { jwtToken } = res as LoginResponseDTOonSuccess;
        cookies.set("jwtToken", jwtToken, { path: "/" });
        redirectUrl = `/app/main`;
      } else {
        const { code, payload } = res as LoginResponseDTOonFailure;
        if (code === "NO_SUCH_USER") {
          cookies.set("kakaoId", payload, { path: "/" });
          redirectUrl = `/signup/kakao`;
        } else {
          error = code ? code.toString() : "";
          errorDescription = payload;
        }
      }
    }
  }

  if (redirectUrl !== null) {
    throw redirect(302, redirectUrl);
  }
  return {
    error,
    errorDescription,
  };
};
