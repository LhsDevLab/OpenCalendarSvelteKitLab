<script lang="ts">
  import {
    MainCalendarDateValue,
    MainCalendarDate,
  } from "$lib/stores/writable/MainCalendarStore";

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

  function handleFocus(event: FocusEvent) {
    const select = event.target as HTMLSelectElement;
    select.size = 12;
  }
  function handleBlur(event: FocusEvent) {
    const select = event.target as HTMLSelectElement;
    select.size = 1;
  }
  function handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    select.blur();
  }
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
>
  <div class="p-4 rounded-lg bg-white w-96">
    <div class="flex flex-col mb-4">
      <h2 class="text-lg font-bold mb-4">Year</h2>
      <select
        class="mr-2 p-2 border rounded w-full text-center"
        bind:value={year}
        on:focus={handleFocus}
        on:blur={handleBlur}
        on:change={handleChange}
      >
        {#each Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i) as yearOption}
          <option value={yearOption} class="text-center">{yearOption}년</option>
        {/each}
      </select>
      <h2 class="text-lg font-bold mb-4">Month</h2>
      <select
        class="p-2 border rounded w-full text-center"
        bind:value={month}
        on:focus={handleFocus}
        on:blur={handleBlur}
        on:change={handleChange}
      >
        {#each Array.from({ length: 12 }, (_, i) => i) as monthOption}
          <option value={monthOption} class="text-center"
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
