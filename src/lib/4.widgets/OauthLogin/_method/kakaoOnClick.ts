import { get } from "$lib/6.shared/utils/FetchUtils/FetchUtils";

export async function kakaoOnClick() {
  try {
    const res = await get("open/kakao/url", {
      query: {
        state: "kakaoLogin",
      },
    });

    window.location.href = res.url;
  } catch (e) {
    alert("서버 에러 발생 재시도 해주세요");
  }
}
