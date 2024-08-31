<script lang="ts">
  import "../../../app.css"; // Ensure your app.css includes the Tailwind base styles
  import Calendar from "../../../widgets/Calendar/Calendar.svelte";
  import { ScreenInfoValue } from "../../../stores/ScreenStore";

  let isLandscape: boolean;

  ScreenInfoValue.subscribe((value) => {
    isLandscape = value.isLandscape;
  });
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section
  class="flex flex-1 flex-col items-center justify-center p-5 text-center"
  class:flex-row={isLandscape}
  class:flex-col={!isLandscape}
>
  <div class="flex flex-col w-full h-full flex-1">
    <Calendar />
  </div>
  <div class="flex flex-col w-full h-full flex-1">
    <test>test </test>
  </div>
</section>
