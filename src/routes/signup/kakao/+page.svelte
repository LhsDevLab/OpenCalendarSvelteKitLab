<script lang="ts">
  import { preventDefault } from "svelte/legacy";

  import { goto } from "$app/navigation";
  import "$lib/app.css"; // Ensure your app.css includes the Tailwind base styles
  import { ScreenInfoValue } from "$lib/6.shared/stores/writable/ScreenInfoStore";
  import type {
    SignUpResponseDTOonFailure,
    SignUpResponseDTOonSuccess,
  } from "$lib/6.shared/types/apiDTO/SignUpResponseDTO";
  import { trySignup } from "./_methods/trySignup";

  interface Props {
    data: import("./$types").PageData;
  }

  let { data }: Props = $props();

  let { kakaoId } = data;

  let isSmallWidth: boolean = $state() as boolean;
  let message: string = $state("");
  let nickname = $state("");

  ScreenInfoValue.subscribe((value) => {
    isSmallWidth = value.isSmallWidth;
  });

  async function handleSubmit() {
    const res: SignUpResponseDTOonFailure | SignUpResponseDTOonSuccess =
      await trySignup(kakaoId, nickname);
    if (res.isSuccess) {
      alert("회원가입 성공!");
      goto("/login");
    } else {
      message = (res as SignUpResponseDTOonFailure).message;
    }
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section
  class="flex flex-col items-center justify-center p-8 max-w-md h-screen mx-auto text-center"
>
  <h1 class="text-4xl font-bold mb-6" class:text-6xl={!isSmallWidth}>
    회원가입
  </h1>
  <span class="text-sm font-bold mb-6" class:text-xl={!isSmallWidth}
    >{message}</span
  >
  <form class="w-full" onsubmit={handleSubmit}>
    <div class="mb-4">
      <input
        type="text"
        id="nickname"
        bind:value={nickname}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        placeholder="닉네임을 입력하세요"
        required
      />
    </div>
    <button
      type="submit"
      class="w-full bg-violet-500 text-white font-bold py-2 px-4 rounded hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
    >
      가입하기
    </button>
  </form>
</section>
