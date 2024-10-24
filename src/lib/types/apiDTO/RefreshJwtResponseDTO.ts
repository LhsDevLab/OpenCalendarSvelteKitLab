import type { JwtDto } from "$lib/types/JwtDto";

interface RefreshJwtResponseDTO {
  isSuccess: boolean;
}

export interface RefreshJwtResponseDTOonSuccess extends RefreshJwtResponseDTO {
  isSuccess: boolean;
  jwtDto: JwtDto;
}

export interface RefreshJwtResponseDTOonFailure extends RefreshJwtResponseDTO {
  isSuccess: boolean;
  message: string | undefined;
}
