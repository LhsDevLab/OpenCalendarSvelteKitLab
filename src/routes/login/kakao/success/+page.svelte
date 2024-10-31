<script lang="ts">
  import { goto } from "$app/navigation";
  import "$lib/app.css";
  import { onMount } from "svelte";
  import { handleKakaoLogin } from "./_methods/handleKakaoLogin";
  import { setCookie } from "$lib/utils/CookieUtils";
  import { setToken } from "$lib/utils/FetchUtils";

  /** @type {import('./$types').PageData} */
  export let data;

  let { code, error, error_description, state } = data;

  onMount(async () => {
    //1.에러 체크
    if (error !== null || !code) return;

    //2.state별 로직 처리
    let res: any = await (async () => {
      if ((state = "kakaoLogin")) {
        return handleKakaoLogin(code);
      } else {
        return {
          error: "state 미일치",
          error_description: "전송 상태값 미일치",
        };
      }
    })();
    if (res.error === null) {
      const { accessToken, refreshToken } = res;
      setCookie("refreshToken", refreshToken);
      setToken({ accessToken, refreshToken });
      goto("/app/main");
    }

    error = res.error;
    error_description = res.error_description;
  });
</script>

<svelte:head>
  <title>oauth success</title>
</svelte:head>

<section
  class="flex flex-col items-center justify-center p-8 max-w-md h-screen mx-auto text-center"
>
  {#if error !== null}
    <h1 class="text-4xl font-bold mb-6">로그인 실패!</h1>
    <div>: {error_description}</div>
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
