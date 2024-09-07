<script lang="ts">
  import "$lib/app.css";
  import { onMount } from "svelte";
  import { ScreenInfoValue } from "$lib/stores/ScreenInfoStore";
  import { config } from "$lib/app.config";

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

<slot class="flex-1" />
