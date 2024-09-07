<script lang="ts">
  import "$lib/app.css";

  /** @type {import('./$types').PageData} */
  export let data;

  let { error, errorDescription } = data;
</script>

<svelte:head>
  <title>oauth success</title>
</svelte:head>

<section
  class="flex flex-col items-center justify-center p-8 max-w-md h-screen mx-auto text-center"
>
  {#if error !== null}
    <h1 class="text-4xl font-bold mb-6">로그인 실패!</h1>
    <div>: {errorDescription}</div>
    <button
      class="flex items-center justify-center w-full p-2 bg-gray-400 font-bold text-gray-800 rounded hover:bg-gray-500 hover:text-gray-100"
      on:click={() => {
        window.location.href = "/login";
      }}
    >
      <span>로그인으로 이동</span>
    </button>
  {:else}
    <div></div>
  {/if}
</section>
