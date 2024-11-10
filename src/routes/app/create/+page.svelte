<script lang="ts">
  import "$lib/app.css"; // Ensure your app.css includes the Tailwind base styles
  import ImageSelector from "$lib/components/ImageSelector.svelte";
  import { ScreenInfoValue } from "$lib/stores/writable/ScreenInfoStore";
  import { getUser } from "./_method/temp";

  let isLandscape: boolean;
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
  <div
    class="flex flex-col w-full h-full items-center justify-center basis-0 grow shrink bg-orange-100"
  >
    <form>
      <div>profileImageId</div>
      <ImageSelector uploadedImageId={"default_profile"} />
      <div>calendarName</div>
      <input value={calendarName} />
      <div>contents</div>
      <input type="textarea" value={contents} />
    </form>
    <button
      on:click={() => {
        getUser().then((res) => console.log(res.message));
      }}
    >
      test
    </button>
  </div>
</section>
