<script lang="ts">
  import { onMount } from "svelte";
  import { SelectedDateTime } from "$lib/stores/writable/EventsStore";

  export let day: Date;

  let selected: Set<number> = new Set();

  onMount(() => {
    const unsubscribe = SelectedDateTime.subscribe((e: Set<number>) => {
      selected = e;
    });

    return unsubscribe;
  });

  function onClick() {
    SelectedDateTime.update((asis: Set<number>) => {
      if (isSame) {
        asis.delete(day.getTime());
      } else {
        asis.add(day.getTime());
      }
      return new Set(asis);
    });
  }
  $: isSame = selected.has(day.getTime());
</script>

<button
  class="text-center p-1 bg-sky-200 hover:bg-sky-300 rounded shadow-blue-500"
  class:shadow-lg={isSame}
  class:bg-sky-300={isSame}
  on:click={onClick}
>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <span>{day.getDate()}일</span>
    <div class="w-full h-full flex-1"></div>
  </div>
</button>
