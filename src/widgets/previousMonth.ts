import { CalendarDateValue, CalendarDate } from "../stores/CalendarStore";

export function previousMonth() {
  CalendarDateValue.update((date: CalendarDate) => {
    const newMonth = date.month - 1 < 0 ? 11 : date.month - 1;
    const newYear = date.month - 1 < 0 ? date.year - 1 : date.year;
    const newDate = new Date(newYear, newMonth, 1);
    return new CalendarDate(newDate);
  });
}
