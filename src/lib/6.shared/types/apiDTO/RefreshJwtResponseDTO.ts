interface RefreshJwtResponseDTO {
  isSuccess: boolean;
}

export interface RefreshJwtResponseDTOonSuccess extends RefreshJwtResponseDTO {
  isSuccess: boolean;
  accessToken: string;
}

export interface RefreshJwtResponseDTOonFailure extends RefreshJwtResponseDTO {
  isSuccess: boolean;
  message: string | undefined;
}
