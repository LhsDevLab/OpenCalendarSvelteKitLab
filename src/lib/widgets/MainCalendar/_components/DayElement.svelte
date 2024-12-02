<script lang="ts">
  import { onMount } from "svelte";
  import { SelectedDateTime } from "$lib/stores/writable/EventsStore";

  interface Props {
    day: Date;
  }

  let { day }: Props = $props();

  let selected: Set<number> = $state(new Set());

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
  let isSame = $derived(selected.has(day.getTime()));
</script>

<button
  class="text-center p-1 bg-sky-200 hover:bg-sky-300 rounded shadow-blue-500"
  class:shadow-lg={isSame}
  class:bg-sky-300={isSame}
  onclick={onClick}
>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <span>{day.getDate()}일</span>
    <div class="w-full h-full flex-1"></div>
  </div>
</button>
