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
    goto(`/error/${ClientErrorCode.FetchError}`);
    throw Error(ClientErrorCodeMap[ClientErrorCode.FetchError]);
  }
}
