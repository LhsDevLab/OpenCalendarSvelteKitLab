import { post } from "$lib/utils/FetchUtils";
import { JwtTokenInfo } from "$lib/types/JwtTokenInfo";

export async function tryLoginWithCode(
  code: string,
): Promise<JwtTokenInfo | null> {
  let jwtToken = null;
  try {
    jwtToken = await await post("open/kakao/tryLoginWithCode", {
      body: { code },
    }).then((response) => {
      let jwtToken = response.jwtToken;
      if (jwtToken === null) {
        throw new Error("jwtToken is null");
      }
      return new JwtTokenInfo(jwtToken);
    });
  } catch (error) {
    alert(error);
  } finally {
    return jwtToken;
  }
}
