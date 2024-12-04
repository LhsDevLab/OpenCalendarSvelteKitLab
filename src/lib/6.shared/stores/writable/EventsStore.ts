import { writable, type Writable } from "svelte/store";

export class EventsStore {}

export const EventsStoreValue: Writable<EventsStore> = writable<EventsStore>();

export const SelectedDateTime: Writable<Set<number>> = writable<Set<number>>(
  new Set(),
);
