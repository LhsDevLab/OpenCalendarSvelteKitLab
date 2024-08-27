<script>
  import { page } from "$app/stores";

  // Define reactive variables for query parameters
  export let code = "";
  export let error = "";
  export let errorDescription = "";
  export let state = "";
  // Reactive statement to update variables when the URL changes
  $: {
    const searchParams = $page.url.searchParams;
    code = searchParams.get("code") ?? ""; // Get the 'code' parameter
    error = searchParams.get("error") ?? ""; // Get the 'error' parameter
    errorDescription = searchParams.get("error_description") ?? ""; // Get the 'error_description' parameter
    state = searchParams.get("state") ?? ""; // Get the 'state' parameter
  }

  // Optionally handle the parameters for application logic
  $: if (error) {
    console.error(`Error: ${error}, Description: ${errorDescription}`);
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section
  class="flex flex-col items-center justify-center p-8 max-w-md h-screen mx-auto text-center"
>
  <h1 class="text-6xl font-bold mb-6">kakao 로그인 성공</h1>
  <div>code : {code}</div>
  <div>error : {error}</div>
  <div>errorDescription : {errorDescription}</div>
  <div>state : {state}</div>
</section>
