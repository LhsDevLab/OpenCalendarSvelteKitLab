<script lang="ts">
  import Footer from "./_components/Footer.svelte";
  import Menubar from "$lib/4.widgets/Menubar/Menubar.svelte";
  import "$lib/app.css";
  import { ScreenInfoValue } from "$lib/6.shared/stores/writable/ScreenInfoStore";
  import { goto } from "$app/navigation";
  interface Props {
    children?: import('svelte').Snippet<[any]>;
  }

  let { children }: Props = $props();

  let isLandscape: boolean = $state() as boolean;

  ScreenInfoValue.subscribe((value) => {
    isLandscape = value.isLandscape;
  });
</script>

<div class="flex flex-col min-h-screen">
  <div
    class="flex flex-1"
    class:flex-row={isLandscape}
    class:flex-col={!isLandscape}
  >
    <Menubar selected="main" />
    <main class="flex flex-col flex-1">
      {@render children?.({ class: "flex-1", })}
    </main>
  </div>
  <Footer />
</div>
