import { post } from "$lib/utils/FetchUtils/FetchUtils";

export async function getUser() {
  try {
    return await post("app/user/get", {
      body: { userId: "test" },
    }).then((res) => {
      return {
        ...res,
        message: res.message || "테스트 성공!",
      };
    });
  } catch (e) {
    return {
      isSuccess: false,
      message: "테스트 실패!",
    };
  }
}
