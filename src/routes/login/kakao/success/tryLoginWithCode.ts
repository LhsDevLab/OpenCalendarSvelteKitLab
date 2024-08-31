import { post } from "../../../../modules/FetchModule";

async function getAccessToken(code: string) {
  const response = await post("open/kakao/loginUrl", { body: { code } });
}

export async function tryLoginWithCode(code: string) {
  const jwtToken = await getAccessToken(code);
  return jwtToken;
}
