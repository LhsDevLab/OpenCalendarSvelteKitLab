<script lang="ts">
  import Footer from "./_components/Footer.svelte";
  import Menubar from "./_components/Menubar.svelte";
  import "$lib/app.css";
  import { onMount } from "svelte";
  import { ScreenInfoValue } from "$lib/stores/ScreenInfoStore";
  import { config } from "$lib/app.config";

  let isLandscape: boolean;

  ScreenInfoValue.subscribe((value) => {
    isLandscape = value.isLandscape;
  });

  function checkOrientation() {
    ScreenInfoValue.set({
      isLandscape: window.innerWidth > window.innerHeight,
      isSmallWidth: window.innerWidth < config.smallWidth,
      isSmallHeight: window.innerHeight < config.smallHeight,
    });
  }

  onMount(() => {
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  });
</script>

<div class="flex flex-col min-h-screen">
  <div
    class="flex flex-1"
    class:flex-row={isLandscape}
    class:flex-col={!isLandscape}
  >
    <Menubar />
    <main class="flex flex-col flex-1">
      <slot class="flex-1" />
    </main>
  </div>
  <Footer />
</div>
