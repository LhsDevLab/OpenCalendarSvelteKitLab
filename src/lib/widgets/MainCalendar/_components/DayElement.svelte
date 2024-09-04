<script lang="ts">
  export let day: number;
  function onClick() {
    alert(day);
  }
</script>

<button
  class="text-center p-1 border border-gray-300 bg-yellow-400 hover:bg-yellow-500 rounded"
  on:click={onClick}
>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <span>{day}일</span>
    <div class="w-full h-full flex-1">contents</div>
  </div>
</button>
