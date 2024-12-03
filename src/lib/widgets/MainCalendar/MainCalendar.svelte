<script lang="ts">
  import { onMount } from "svelte";
  import YearMonth from "$lib/widgets/YearMonth/YearMonth.svelte";
  import DayElement from "./_components/DayElement.svelte";
  import {
    MainCalendarDateValue,
    MainCalendarDate,
  } from "$lib/stores/writable/MainCalendarStore";
  import { previousMonth } from "./_methods/previousMonth";
  import { nextMonth } from "./_methods/nextMonth";

  let currentDate: Date;
  let currentMonth: number = $state() as number;
  let currentYear: number = $state() as number;
  let daysInMonth: number = $state() as number;
  let firstDayOfMonth: number = $state() as number;

  onMount(() => {
    const unsubscribe = MainCalendarDateValue.subscribe(
      (date: MainCalendarDate) => {
        currentDate = new Date(date.year, date.month, date.date);
        currentMonth = currentDate.getMonth();
        currentYear = currentDate.getFullYear();
        daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
      },
    );

    return unsubscribe;
  });

  let calendarDays = $derived(
    Array.from(
      { length: daysInMonth },
      (_, i) => new Date(currentYear, currentMonth, i + 1),
    ),
  );
</script>

<div class="flex flex-col w-full h-full flex-1">
  <div class="flex justify-between items-center mb-4">
    <button class="px-2 py-1 bg-gray-200 rounded" onclick={previousMonth}
      >&lt;</button
    >
    <YearMonth />
    <button class="px-2 py-1 bg-gray-200 rounded" onclick={nextMonth}
      >&gt;</button
    >
  </div>
  <div class="grid grid-cols-weekdays gap-1 bg-blue-300 rounded">
    {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as weekday}
      <div class="text-center font-bold p-1">{weekday}</div>
    {/each}
  </div>
  <div class="grid grid-cols-7 gap-2 flex-1">
    {#each Array(firstDayOfMonth).fill(null) as _}
      <div class="text-center p-1"></div>
    {/each}
    {#each calendarDays as day}
      <DayElement {day} />
    {/each}
  </div>
</div>
