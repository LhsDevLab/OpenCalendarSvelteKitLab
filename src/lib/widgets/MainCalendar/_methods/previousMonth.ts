import {
  MainCalendarDateValue,
  MainCalendarDate,
} from "$lib/stores/writable/MainCalendarStore";

export function previousMonth() {
  MainCalendarDateValue.update((date: MainCalendarDate) => {
    const newMonth = date.month - 1 < 0 ? 11 : date.month - 1;
    const newYear = date.month - 1 < 0 ? date.year - 1 : date.year;
    const newDate = new Date(newYear, newMonth, 1);
    return new MainCalendarDate(newDate);
  });
}
