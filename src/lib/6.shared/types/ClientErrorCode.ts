export enum ClientErrorCode {
  PageError = "PageError",
  FetchError = "FetchError",
  TokenRefreshError = "TokenRefreshError",
}

export const ClientErrorCodeMap: any = {
  PageError: "페이지에서 에러가 발생하였습니다.",
  FetchError: "서버 요청에 실패하였습니다.",
  TokenRefreshError: "토큰 갱신에 실패했습니다.",
};
