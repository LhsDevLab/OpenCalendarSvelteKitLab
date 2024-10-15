<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { getImage } from "$lib/utils/FetchUtils";

  export let uploadedImageId: string = "default_profile";
  let selectedImage: string | null = null;
  let uploadedImageUrl: string | null = null;
  const dispatch = createEventDispatcher();

  function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        selectedImage = e.target?.result as string;
        dispatch("imageSelected", { image: selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }

  onMount(async () => {
    try {
      const blob = await getImage(uploadedImageId);
      uploadedImageUrl = URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  });
</script>

<div class="image-selector">
  <input
    type="file"
    accept="image/*"
    on:change={handleFileSelect}
    class="hidden"
    id="imageInput"
  />
  <label
    for="imageInput"
    class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
  >
    Select Image
  </label>
  {#if selectedImage}
    <div class="mt-4 border-2 border-Violet-300">
      <img src={selectedImage} alt="선택된 이미지" class="max-w-full h-auto" />
    </div>
  {:else if uploadedImageUrl}
    <div class="mt-4">
      <img
        src={uploadedImageUrl}
        alt="로드된 이미지"
        class="max-w-full h-auto"
        on:load={() => {
          if (uploadedImageUrl) {
            URL.revokeObjectURL(uploadedImageUrl);
          }
        }}
      />
    </div>
  {:else}
    <div class="mt-4">이미지 로딩</div>
  {/if}
</div>
