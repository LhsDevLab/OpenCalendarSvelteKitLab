<script lang="ts">
  import "$lib/app.css";
  import { onMount } from "svelte";
  import { ScreenInfoValue } from "$lib/stores/ScreenInfoStore";
  import { config } from "$lib/app.config";
  import { setToken } from "$lib/utils/FetchUtils";
  import { getCookie } from "$lib/utils/CookieUtils";

  function checkOrientation() {
    ScreenInfoValue.set({
      isLandscape: window.innerWidth > window.innerHeight,
      isSmallWidth: window.innerWidth < config.smallWidth,
      isSmallHeight: window.innerHeight < config.smallHeight,
    });
  }

  onMount(() => {
    // 1. 리프레시 토큰 Load
    const refreshToken = getCookie("refreshToken") ?? "";
    setToken({ refreshToken });

    // 2. 화면 리사이즈 콜백
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  });
</script>

<slot class="flex-1" />
