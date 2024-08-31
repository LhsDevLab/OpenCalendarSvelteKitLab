<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ScreenInfoValue } from "../../stores/ScreenStore";
  import ModuCalLogo from "./ModuCalLogo.svelte";

  let isLandscape: boolean;
  let isSmallWidth: boolean;
  let isSmallHeight: boolean;

  ScreenInfoValue.subscribe((value) => {
    isLandscape = value.isLandscape;
    isSmallWidth = value.isSmallWidth;
    isSmallHeight = value.isSmallHeight;
  });
  const dispatch = createEventDispatcher();

  function handleMenuClick(menuItem: string) {
    dispatch("menuSelect", menuItem);
  }

  const menuItems = [
    { name: "Home", icon: "🏠" },
    { name: "Calendar", icon: "📅" },
    { name: "Tasks", icon: "✅" },
    { name: "Settings", icon: "⚙️" },
  ];
</script>

<nav class="bg-gray-800 text-white">
  {#if isLandscape}
    {#if !isSmallWidth}
      <ul class="flex flex-col h-screen items-start w-40">
        <li class="w-full">
          <ModuCalLogo />
        </li>
        {#each menuItems as item}
          <li class="w-full">
            <button
              class="flex flex-row h-16 items-center justify-start hover:bg-gray-700 rounded p-2 w-full"
              on:click={() => handleMenuClick(item.name)}
            >
              <span class="text-2xl">{item.icon}</span>
              <span class="text-sm">{item.name}</span>
            </button>
          </li>
        {/each}
      </ul>
    {:else}
      <ul class="flex flex-col h-screen items-start w-24">
        <li class="w-full">
          <ModuCalLogo />
        </li>
        {#each menuItems as item}
          <li class="w-full">
            <button
              class="flex flex-col h-16 items-center justify-start hover:bg-gray-700 rounded py-2 w-full"
              on:click={() => handleMenuClick(item.name)}
            >
              <span class="text-2xl">{item.icon}</span>
              <span class="text-sm">{item.name}</span>
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  {:else}
    <ul class="flex flex-row w-full justify-around items-center h-16">
      <li class="w-full h-full">
        <ModuCalLogo />
      </li>
      {#each menuItems as item}
        <li class="w-full">
          <button
            class="flex flex-col items-center justify-center hover:bg-gray-700 rounded px-2 w-full"
            on:click={() => handleMenuClick(item.name)}
          >
            <span class="text-xl">{item.icon}</span>
            <span class="text-xs">{item.name}</span>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</nav>
