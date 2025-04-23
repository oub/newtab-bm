<script module>
  import { browser, type Theme } from "webextension-polyfill-ts";
  import Bookmarks from "./lib/Bookmarks.svelte";
  import LogoAndWordmark from "./lib/LogoAndWordmark.svelte";
  import Settings from "./lib/Settings.svelte";
  import {
    colorScheme,
    convertToComputedColor,
    getDarkestColor,
  } from "./lib/colors";
</script>

<script lang="ts">
  let mainElement: HTMLElement | null = $state(null);

  let scheme = $state("unset");
  let backgroundColor = $state("unset");
  let borderColor = $state("unset");
  let foregroundColor = $state("unset");

  const defaultBackgroundColor = "#fff";
  const defaultForegroundColor = "#000";

  const retrieveColors = (updateInfo?: Theme.ThemeUpdateInfo) => {
    browser.theme.getCurrent().then((theme) => {
      console.log("theme.getCurrent()", theme);
      console.log("updateInfo?.theme", updateInfo?.theme);
      scheme = theme.properties?.color_scheme;
      console.log(scheme);

      backgroundColor = theme.colors?.popup ?? defaultBackgroundColor;

      foregroundColor = theme.colors?.popup_text ?? defaultForegroundColor;

      // Convert colors to computed values
      foregroundColor = convertToComputedColor(foregroundColor);
      backgroundColor = convertToComputedColor(backgroundColor);

      borderColor = convertToComputedColor(
        // theme.colors?.toolbar_bottom_separator
        //   ? `${theme.colors?.toolbar_bottom_separator}`
        //   :
        `color-mix(in srgb, ${foregroundColor} 30%, ${backgroundColor})`
      );

      // if (borderColor === backgroundColor) {
      //   borderColor = convertToComputedColor(
      //     `color-mix(in srgb, ${foregroundColor} 20%, transparent)`
      //   );
      // }

      console.log("backgroundColor", backgroundColor);
      console.log("foregroundColor", foregroundColor);
      console.log("borderColor", borderColor);

      // Sometimes, theme.getCurrent() returns null, so we need to estimate the color scheme
      $colorScheme =
        getDarkestColor(backgroundColor, foregroundColor) === backgroundColor
          ? "dark"
          : "light";
      console.log("Updated scheme:", $colorScheme);

      if ($colorScheme === "light") {
        backgroundColor = getDarkestColor(backgroundColor, "#f9f9f9");
      }
    });
  };

  retrieveColors();
  browser.theme.onUpdated.addListener((updateInfo: Theme.ThemeUpdateInfo) => {
    retrieveColors(updateInfo);
  });
</script>

<main
  bind:this={mainElement}
  style:--oub--background-color={backgroundColor}
  style:--oub--foreground-color={foregroundColor}
  style:--oub--border-color={borderColor}
>
  <LogoAndWordmark />
  <Bookmarks />
  <Settings />
</main>

<style>
  :global {
    html,
    body {
      background-color: var(--oub--background-color);
      color: var(--oub--foreground-color);
    }
  }

  main {
    align-items: center;
    background-color: var(--oub--background-color);
    color: var(--oub--foreground-color);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    overflow: auto;
    overflow: visible;
    position: relative;

    outline: solid 3px blue;
  }
</style>
