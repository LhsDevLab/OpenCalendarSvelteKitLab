import type { Visibility } from "$lib/6.shared/types/Visibility";

export interface CreateCalendarRequestDTO {
  profileImage?: any;
  calendarName: String;
  contents: String;
  visibility: Visibility;
}
