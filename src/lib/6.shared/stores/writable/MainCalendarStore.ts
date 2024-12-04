import { writable, type Writable } from "svelte/store";

export class MainCalendarDate {
  constructor(date: Date) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.date = date.getDate();
    this.weekday = date.getDay();
  }
  year: number;
  month: number;
  date: number;
  weekday: number;
}

export const MainCalendarDateValue: Writable<MainCalendarDate> =
  writable<MainCalendarDate>(new MainCalendarDate(new Date()));
