import { get } from "../../modules/FetchModule";

export function kakaoOnClick() {
  get("open/kakao/loginUrl", {
    query: {
      state: "kakaoLogin",
    },
  }).then((res) => {
    window.location.href = res.loginUrl;
  });
}
