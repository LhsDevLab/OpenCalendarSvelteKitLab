<script lang="ts">
  import { onMount } from "svelte";
  import { getImage } from "$lib/6.shared/utils/FetchUtils/FetchUtils";
  import { ImageSize } from "$lib/6.shared/types/ImageSize";
  import { config } from "$lib/app.config";

  interface Props {
    id?: string;
    defaultImageId?: string;
    width?: number;
    height?: number;
    selectedImage: string | null;
  }

  let {
    id,
    defaultImageId = config.defaultImageId,
    width = 300,
    height = 300,
    selectedImage = $bindable(null),
  }: Props = $props();

  let loadedImageUrl: string | null = $state(null);

  function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        selectedImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onMount(async () => {
    try {
      const blob = await getImage(defaultImageId, ImageSize.THUMBNAIL);
      loadedImageUrl = URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  });
</script>

<div
  class="flex flex-col items-center justify-center max-w-md mx-auto text-center"
>
  {#if selectedImage}
    <div class="mt-4 border-2 border-Violet-300">
      <img
        src={selectedImage}
        alt="선택된 이미지"
        class="max-w-full h-auto"
        style={`width: ${width}px; height: ${height}px; object-fit: cover;`}
      />
    </div>
  {:else if loadedImageUrl}
    <div class="mt-4">
      <img
        src={loadedImageUrl}
        alt="로드된 이미지"
        class="max-w-full h-auto"
        style={`width: ${width}px; height: ${height}px; object-fit: cover;`}
        onload={() => {
          if (loadedImageUrl) {
            URL.revokeObjectURL(loadedImageUrl);
          }
        }}
      />
    </div>
  {:else}
    <div class="mt-4 flex items-center justify-center">
      <p
        style={`width: ${width}px; height: ${height}px;`}
        class="flex items-center justify-center"
      >
        loading...
      </p>
    </div>
  {/if}
  <input
    type="file"
    accept="image/*"
    onchange={handleFileSelect}
    class="hidden"
    {id}
  />
  <label
    for={id}
    class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 rounded my-1"
    class:bg-orange-500={selectedImage}
    style={`width: ${width}px;`}
  >
    SELECT
  </label>
</div>
