interface LoginResponseDTO {
  isSuccess: boolean;
}

export type LoginResponseDTOCode = "NO_SUCH_USER" | "DEFAULT";

export interface LoginResponseDTOonSuccess extends LoginResponseDTO {
  jwtToken: string;
}

export interface LoginResponseDTOonFailure extends LoginResponseDTO {
  code: LoginResponseDTOCode;
  payload: string;
}
