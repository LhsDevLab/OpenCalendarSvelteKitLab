import { ClientErrorCode } from "./ClientErrorCode";

export class TokenRefreshError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ClientErrorCode.TokenRefreshError;
  }
}

export class FetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ClientErrorCode.FetchError;
  }
}
