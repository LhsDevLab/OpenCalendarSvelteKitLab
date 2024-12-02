<script lang="ts">
  import "$lib/app.css";
  import { onMount } from "svelte";
  import { ScreenInfoValue } from "$lib/stores/writable/ScreenInfoStore";
  import { config } from "$lib/app.config";
  import { setToken } from "$lib/stores/FetchStore";
  import { getCookie } from "$lib/utils/CookieUtils";
  interface Props {
    children?: import('svelte').Snippet<[any]>;
  }

  let { children }: Props = $props();

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

{@render children?.({ class: "flex-1", })}
