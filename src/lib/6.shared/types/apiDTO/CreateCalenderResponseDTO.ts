import type { Visibility } from "$lib/6.shared/types/Visibility";

interface CreateCalenderResponseDTO {
  isSuccess: boolean;
}

export interface CreateCalenderResponseDTOonSuccess
  extends CreateCalenderResponseDTO {
  createdCalendarId: string;
}

export interface CreateCalenderResponseDTOonFailure
  extends CreateCalenderResponseDTO {
  message: string;
}
