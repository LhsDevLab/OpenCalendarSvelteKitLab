interface LoginResponseDTO {
  isSuccess: boolean;
}

export type LoginResponseDTOCode = "NO_SUCH_USER" | "DEFAULT";

export interface LoginResponseDTOonSuccess extends LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponseDTOonFailure extends LoginResponseDTO {
  code: LoginResponseDTOCode;
  payload: string;
}
