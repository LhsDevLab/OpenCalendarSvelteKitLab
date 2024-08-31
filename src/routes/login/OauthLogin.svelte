<script>
  import "../../app.css"; // Ensure your app.css includes the Tailwind base styles
  import { kakaoOnClick } from "./kakaoOnClick";
</script>

<div class="oauth-buttons flex flex-col space-y-2 w-full">
  <!-- Google Button -->
  <button
    class="flex items-center justify-center w-full p-2 border bg-blue-500 font-bold text-white rounded hover:bg-blue-600"
  >
    <span>구글로 로그인</span>
  </button>

  <!-- Apple Button -->
  <button
    class="flex items-center justify-center w-full p-2 bg-neutral-900 font-bold text-white rounded hover:bg-neutral-800"
  >
    <span>애플로 로그인</span>
  </button>

  <!-- Kakao Button -->
  <button
    class="flex items-center justify-center w-full p-2 bg-yellow-400 font-bold text-gray-800 rounded hover:bg-yellow-500"
    on:click={kakaoOnClick}
  >
    <span>카카오로 로그인</span>
  </button>
</div>
