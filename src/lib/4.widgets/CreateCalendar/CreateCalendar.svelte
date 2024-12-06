<script lang="ts">
  import "$lib/app.css"; // Ensure your app.css includes the Tailwind base styles
  import ImageSelector from "$lib/5.features/ImageSelector/ImageSelector.svelte";
  import { ScreenInfoValue } from "$lib/6.shared/stores/writable/ScreenInfoStore";
  import { config } from "$lib/app.config";

  let isLandscape: boolean = $state() as boolean;
  let [selectedImage, calendarName, contents] = ["", "", ""];

  ScreenInfoValue.subscribe((value) => {
    isLandscape = value.isLandscape;
  });
</script>

<div
  class="flex flex-col w-full h-full items-center justify-center basis-0 grow shrink bg-orange-100"
>
  <form
    method="POST"
    action={`${config}/app/calendar/create`}
    enctype="multipart/form-data"
  >
    <ImageSelector id="ProfileImage" width={100} height={100} {selectedImage} />
    <div>calendarName</div>
    <input value={calendarName} />
    <div>contents</div>
    <input type="textarea" value={contents} />
  </form>
</div>
