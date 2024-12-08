export enum ClientErrorCode {
  PageError = "PageError",
  FetchError = "FetchError",
}

export const ClientErrorCodeMap: any = {
  PageError: "페이지에서 에러가 발생하였습니다.",
  FetchError: "서버 요청에 실패하였습니다.",
};
