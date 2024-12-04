interface SignUpResponseDTO {
  isSuccess: boolean;
}

export interface SignUpResponseDTOonSuccess extends SignUpResponseDTO {}

export interface SignUpResponseDTOonFailure extends SignUpResponseDTO {
  message: string;
}
