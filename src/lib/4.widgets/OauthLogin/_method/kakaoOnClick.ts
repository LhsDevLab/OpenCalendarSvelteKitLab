import { HttpStatus } from "$lib/6.shared/types/HttpStatus";
import { get } from "$lib/6.shared/utils/FetchUtils/FetchUtils";

export async function kakaoOnClick() {
  const res = await get("open/kakao/url", {
    query: {
      state: "kakaoLogin",
    },
  });
  window.location.href = res.url;
}
