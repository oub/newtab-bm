<script module>
  import { browser, type Theme } from "webextension-polyfill-ts";
  import Bookmarks from "./lib/Bookmarks.svelte";
  import LogoAndWordmark from "./lib/LogoAndWordmark.svelte";
  import Settings from "./lib/Settings.svelte";
  import { retrieveColors } from "./lib/colors";
</script>

<script lang="ts">
  let colors = $state({
    backgroundColor: "unset",
    borderColor: "unset",
    foregroundColor: "unset",
  });

  retrieveColors().then((c) => (colors = c));
  browser.theme.onUpdated.addListener((updateInfo: Theme.ThemeUpdateInfo) => {
    retrieveColors(updateInfo).then((c) => (colors = c));
  });
</script>

<main
  style:--oub--background-color={colors.backgroundColor}
  style:--oub--foreground-color={colors.foregroundColor}
  style:--oub--border-color={colors.borderColor}
>
  <LogoAndWordmark />
  <Bookmarks />
  <Settings />
</main>

<style>
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
