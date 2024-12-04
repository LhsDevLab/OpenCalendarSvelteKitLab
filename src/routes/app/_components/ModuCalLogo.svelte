<script lang="ts">
  import { onMount } from "svelte";
  import { ScreenInfoValue } from "$lib/6.shared/stores/writable/ScreenInfoStore";

  let isLandscape: boolean = $state() as boolean;
  let isSmallWidth: boolean = $state() as boolean;
  let isSmallHeight: boolean;
  let headerElement: HTMLElement = $state() as HTMLElement;
  let myWidth: number = $state() as number;
  let myHeight: number;

  ScreenInfoValue.subscribe((value) => {
    isLandscape = value.isLandscape;
    isSmallWidth = value.isSmallWidth;
    isSmallHeight = value.isSmallHeight;
  });
  onMount(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        myWidth = entry.contentRect.width;
        myHeight = entry.contentRect.height;
      }
    });

    resizeObserver.observe(headerElement);

    return () => {
      resizeObserver.disconnect();
    };
  });

  let isSmall = $derived(
    (!isLandscape && (isSmallWidth || myWidth < 150)) ||
      (isLandscape && isSmallWidth),
  );
</script>

<div
  bind:this={headerElement}
  class="text-gray w-full h-16 flex items-center justify-center"
>
  <div
    class="text-2xl font-bold items-center justify-center"
    class:text-sm={isSmall}
  >
    {`${!isSmall ? "모두의 캘린더" : "MODU"}`}
  </div>
</div>
