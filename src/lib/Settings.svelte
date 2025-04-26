<script module>
  import { onMount } from "svelte";
  import closeIcon from "../assets/cross-20.svg";
  import settingsIcon from "../assets/settings-20.svg";
  import { colorScheme } from "./colors";
  import { settings, type Density, type LabelMode } from "./settings";
</script>

<script lang="ts">
  let showSettings = $state(false);
  let density: Density = $state("medium");
  let labelMode: LabelMode = $state("all");

  onMount(() => ({ labelMode, density, showSettings } = $settings));

  $effect(() => {
    $settings.labelMode = labelMode;
  });

  $effect(() => {
    $settings.density = density;
  });

  $effect(() => {
    $settings.showSettings = showSettings;
  });
</script>

<div class={["settings", { shown: showSettings }]}>
  <div class="form">
    {#if showSettings}
      <label>
        <span>Density:</span>
        <select bind:value={density}>
          <option value="large">Large</option>
          <option value="medium">Medium</option>
          <option value="compact">Compact</option>
        </select>
      </label>
      <label>
        <span>Labels:</span>
        <select bind:value={labelMode}>
          <option value="all">All</option>
          <option value="bookmarks">Bookmarks only</option>
          <option value="subfolders">Sub-folders only</option>
          <hr />
          <option value="hover">Only on hover</option>
          <hr />
          <option value="never">Never</option>
        </select>
      </label>
    {/if}
  </div>

  <button onclick={() => (showSettings = !showSettings)}>
    {#if showSettings}
      <img
        src={closeIcon}
        alt="Settings"
        class={{ dark: $colorScheme === "dark" }}
      />
    {:else}
      <img
        src={settingsIcon}
        alt="Settings"
        class={{ dark: $colorScheme === "dark" }}
      />
    {/if}
  </button>
</div>

<style>
  .settings {
    align-items: center;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    position: fixed;
    z-index: 10;

    right: 0;

    &.shown {
      background-color: var(--oub--background-color);
      border-top: 1px solid
        color-mix(in srgb, var(--oub--foreground-color) 20%, transparent);
      left: 0;
    }

    .form {
      align-items: center;
      display: flex;
      flex-grow: 1;
      font: caption;
      gap: 1rem;
      justify-content: center;

      label {
        align-items: center;
        cursor: pointer;
        display: flex;
        gap: 0.5rem;

        span::selection {
          background-color: transparent;
        }
      }
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      opacity: 0.4;
      padding: 0.5rem;

      &:hover {
        opacity: 1;
      }

      img {
        &.dark {
          filter: saturate(0) invert(1);
        }
      }
    }
  }
</style>
