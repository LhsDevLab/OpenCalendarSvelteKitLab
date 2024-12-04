import { get } from "$lib/6.shared/utils/FetchUtils/FetchUtils";

export function kakaoOnClick() {
  get("open/kakao/url", {
    query: {
      state: "kakaoLogin",
    },
  }).then((res) => {
    window.location.href = res.url;
  });
}
