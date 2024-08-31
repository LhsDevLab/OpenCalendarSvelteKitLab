<script>
  import "../../app.css"; // Ensure your app.css includes the Tailwind base styles
  import OauthLogin from "./OauthLogin.svelte";
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section
  class="flex flex-col items-center justify-center p-8 max-w-md h-screen mx-auto text-center"
>
  <h1 class="text-6xl font-bold mb-6">모두의 캘린더</h1>

  <OauthLogin />
</section>
