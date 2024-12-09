<script lang="ts">
  import "$lib/app.css";
  import ImageSelector from "$lib/5.features/ImageSelector/ImageSelector.svelte";
  import { ScreenInfoValue } from "$lib/6.shared/stores/writable/ScreenInfoStore";
  import { createCalendar } from "./_methods/createCalendar";
  import type { CreateCalenderResponseDTOonFailure } from "$lib/6.shared/types/apiDTO/CreateCalenderResponseDTO";

  let isLandscape: boolean = $state() as boolean;
  let [selectedImage, calendarName, contents] = ["", "", ""];

  let imageSelector: any;

  async function onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const res = await createCalendar(formData);

    if (res.isSuccess === true) {
      alert("캘린더 생성 성공");
      form.reset();
      imageSelector.reset();
    } else {
      alert((res as CreateCalenderResponseDTOonFailure).message);
    }
  }

  ScreenInfoValue.subscribe((value) => {
    isLandscape = value.isLandscape;
  });
</script>

<form
  onsubmit={onSubmit}
  enctype="multipart/form-data"
  class="flex flex-col w-full h-full items-center justify-center basis-0 grow shrink bg-orange-100"
>
  <h1>CALENDAR CREATE</h1>
  <div class="flex flex-row items-center justify-center basis-0 shrink">
    <div class="mx-2">
      <ImageSelector
        id="ProfileImage"
        name="ProfileImage"
        width={150}
        height={150}
        bind:this={imageSelector}
        {selectedImage}
      />
    </div>
    <div>
      <div>calendarName</div>
      <input type="text" name="calendarName" value={calendarName} />
      <div>contents</div>
      <input type="textarea" name="contents" value={contents} />
    </div>
  </div>
  <input
    type="submit"
    value="CREATE"
    class="cursor-pointer bg-blue-500 hover:bg-blue-600 w-60 text-white font-bold py-1 rounded my-1"
  />
</form>
