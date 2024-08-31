import { CalendarDateValue, CalendarDate } from "../stores/CalendarStore";

export function nextMonth() {
  CalendarDateValue.update((date: CalendarDate) => {
    const newMonth = date.month + 1 > 11 ? 0 : date.month + 1;
    const newYear = date.month + 1 > 11 ? date.year + 1 : date.year;
    const newDate = new Date(newYear, newMonth, 1);
    return new CalendarDate(newDate);
  });
}
