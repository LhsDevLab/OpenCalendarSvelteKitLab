import {
  MainCalendarDateValue,
  MainCalendarDate,
} from "$lib/stores/writable/MainCalendarStore";

export function nextMonth() {
  MainCalendarDateValue.update((date: MainCalendarDate) => {
    const newMonth = date.month + 1 > 11 ? 0 : date.month + 1;
    const newYear = date.month + 1 > 11 ? date.year + 1 : date.year;
    const newDate = new Date(newYear, newMonth, 1);
    return new MainCalendarDate(newDate);
  });
}
