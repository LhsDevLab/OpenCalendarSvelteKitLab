<script>
  import { onMount } from "svelte";

  export let showTime = true;
  export let showDate = true;

  let time = new Date();

  function updateTime() {
    time = new Date();
  }

  onMount(() => {
    if (showTime) {
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }
  });

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
</script>

<div class="clock">
  <div class="date-time-container">
    {#if showDate}
      <div class="date-container">
        <span class="weekday">{weekdays[time.getDay()]}</span>
        <span class="date">{time.toLocaleDateString()}</span>
      </div>
    {/if}
    {#if showTime}
      <div class="time-container">
        <span class="time">{time.toLocaleTimeString()}</span>
      </div>
    {/if}
  </div>
</div>

<style>
  .clock {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .date-time-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .date-container,
  .time-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .weekday {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .date {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .time {
    font-size: 1rem;
    color: #666;
  }
</style>
