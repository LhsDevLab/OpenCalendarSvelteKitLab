import { goto } from "$app/navigation";
import type {
  CreateCalenderResponseDTOonSuccess,
  CreateCalenderResponseDTOonFailure,
} from "$lib/6.shared/types/apiDTO/CreateCalenderResponseDTO";
import { post } from "$lib/6.shared/utils/FetchUtils/FetchUtils";
import {
  ClientErrorCode,
  ClientErrorCodeMap,
} from "$lib/6.shared/types/ClientErrorCode";

export async function createCalendar(
  formData: FormData,
): Promise<
  CreateCalenderResponseDTOonSuccess | CreateCalenderResponseDTOonFailure
> {
  try {
    return await post("app/calendar/create", {
      body: formData,
    });
  } catch (e) {
    alert("캘린더 생성 실패");
    throw Error(ClientErrorCodeMap[ClientErrorCode.FetchError]);
  }
}
