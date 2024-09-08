<script lang="ts">
  import {
    MainCalendarDateValue,
    MainCalendarDate,
  } from "$lib/stores/MainCalendarStore";

  export let togglePopup: Function;
  let year: number;
  let month: number;
  let weekday: number;

  function updateDate(newYear: number, newMonth: number) {
    MainCalendarDateValue.update((date: MainCalendarDate) => {
      const newDate = new Date(newYear, newMonth, 1);
      return new MainCalendarDate(newDate);
    });
    togglePopup();
  }

  MainCalendarDateValue.subscribe((date: MainCalendarDate) => {
    year = date.year;
    month = date.month;
    weekday = date.weekday;
  });
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
>
  <div class="bg-white p-4 rounded-lg">
    <h2 class="text-lg font-bold mb-4">Select Year and Month</h2>
    <div class="flex mb-4">
      <select bind:value={year} class="mr-2 p-2 border rounded">
        {#each Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i) as yearOption}
          <option value={yearOption}>{yearOption}</option>
        {/each}
      </select>
      <select bind:value={month} class="p-2 border rounded">
        {#each Array.from({ length: 12 }, (_, i) => i) as monthOption}
          <option value={monthOption}
            >{new Date(2000, monthOption).toLocaleString("default", {
              month: "long",
            })}</option
          >
        {/each}
      </select>
    </div>
    <div class="flex justify-end">
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        on:click={() => updateDate(year, month)}
      >
        Apply
      </button>
      <button
        class="bg-gray-300 px-4 py-2 rounded"
        on:click={() => togglePopup()}
      >
        Cancel
      </button>
    </div>
  </div>
</div>
