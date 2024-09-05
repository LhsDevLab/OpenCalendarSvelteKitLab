<script lang="ts">
  import "$lib/app.css";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { CookieUtils } from "$lib/utils/CookieUtils";
  import { tryLoginWithCode } from "./tryLoginWithCode";
  import type { JwtTokenInfo } from "$lib/types/JwtTokenInfo";

  export let data: {
    code: string;
    error: string;
    errorDescription: string;
    state: string;
  };

  let { code, error, errorDescription, state } = data;

  onMount(() => {
    if (error === null && browser && code) {
      if ((state = "kakaoLogin")) {
        tryLoginWithCode(code).then((tokenInfo: JwtTokenInfo | null) => {
          // Store the code in a cookie
          CookieUtils.setCookie("jwtToken", tokenInfo?.jwtToken ?? "");
          let temp = CookieUtils.getCookie("jwtToken");
          console.log(temp);
          // Redirect to the main page with the code parameter
          //goto(`/app/main`);
        });
      } else if (state === "kakaoSignUp") {
        goto("/login/kakao/signup");
      }
    }
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
    <div>: {errorDescription}</div>
    <button
      class="flex items-center justify-center w-full p-2 bg-gray-400 font-bold text-gray-800 rounded hover:bg-gray-500 hover:text-gray-100"
      on:click={() => {
        window.location.href = "/page/login";
      }}
    >
      <span>로그인으로 이동</span>
    </button>
  {:else if code !== null}
    <div></div>
  {/if}
</section>
