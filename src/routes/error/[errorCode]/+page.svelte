<script lang="ts">
  import "$lib/app.css";
  import { page } from "$app/stores";
  import {
    type ClientErrorCode,
    ClientErrorCodeMap,
  } from "$lib/6.shared/types/ClientErrorCode";

  const errorCode: ClientErrorCode = $page.params.errorCode as ClientErrorCode;
</script>

<div
  class="flex flex-col items-center justify-center p-8 max-w-md h-screen mx-auto text-center"
>
  <h1 class="text-4xl font-bold mb-6">에러 발생</h1>
  <div>: {ClientErrorCodeMap[errorCode]}</div>
  <button
    class="flex items-center justify-center w-full p-2 bg-gray-400 font-bold text-gray-800 rounded hover:bg-gray-500 hover:text-gray-100"
    on:click={() => {
      window.location.href = "/login";
    }}
  >
    <span>로그인으로 이동</span>
  </button>
</div>
