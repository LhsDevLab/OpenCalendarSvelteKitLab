<script lang="ts">
  import "$lib/app.css"; // Ensure your app.css includes the Tailwind base styles
  import { ScreenInfoValue } from "$lib/6.shared/stores/writable/ScreenInfoStore";
  import CreateCalendar from "$lib/4.widgets/CreateCalendar/CreateCalendar.svelte";

  let isLandscape: boolean = $state() as boolean;
  let [profileImageId, calendarName, contents] = ["", "", ""];

  ScreenInfoValue.subscribe((value) => {
    isLandscape = value.isLandscape;
  });
</script>

<svelte:head>
  <title>Create</title>
</svelte:head>

<section
  class="flex flex-1 flex-col items-center justify-center p-5 text-center"
  class:flex-row={isLandscape}
  class:flex-col={!isLandscape}
>
  <CreateCalendar />
</section>
