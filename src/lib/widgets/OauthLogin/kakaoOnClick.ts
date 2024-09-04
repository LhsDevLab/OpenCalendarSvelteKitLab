import { get } from "$lib/utils/FetchUtils";

export function kakaoOnClick() {
  get("open/kakao/url", {
    query: {
      state: "kakaoLogin",
    },
  }).then((res) => {
    window.location.href = res.url;
  });
}
