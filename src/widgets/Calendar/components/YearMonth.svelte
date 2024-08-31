<script lang="ts">
  import {
    CalendarDateValue,
    CalendarDate,
  } from "../../../stores/CalendarStore";
  import { ScreenInfoValue } from "../../../stores/ScreenStore";

  let isSmallHeight: boolean;

  ScreenInfoValue.subscribe((value) => {
    isSmallHeight = value.isSmallHeight;
  });

  let year: number;
  let month: number;
  let weekday: number;

  CalendarDateValue.subscribe((date: CalendarDate) => {
    year = date.year;
    month = date.month;
    weekday = date.weekday;
  });
</script>

{#if !isSmallHeight}
  <div
    class="flex flex-col items-center justify-center font-sans bg-gray-100 rounded-lg p-4 shadow-md w-full h-15 mx-2"
  >
    <div class="flex flex-col items-center h-full">
      <span class="text-lg font-bold">
        {`${year}년 ${new Date(year, month).toLocaleString("default", { month: "long" })}`}
      </span>
    </div>
  </div>
{:else}
  <div
    class="flex flex-col items-center justify-center font-sans bg-gray-100 rounded-lg p-4 shadow-md w-full h-10 mx-2"
  >
    <div class="flex flex-col items-center h-full">
      <span class="text-sm font-bold">
        {`${year}년 ${new Date(year, month).toLocaleString("default", { month: "long" })}`}
      </span>
    </div>
  </div>
{/if}
