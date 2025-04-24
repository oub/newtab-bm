<script module>
  import { onMount } from "svelte";
  import type { Bookmarks } from "webextension-polyfill-ts";
  import { colorScheme } from "./colors";

  interface Props {
    bookmark: Bookmarks.BookmarkTreeNode & { favicon?: string };
  }
</script>

<script lang="ts">
  let { bookmark }: Props = $props();

  const srcFallback = "globe-24.svg";

  let src = $state(bookmark.favicon ?? srcFallback);

  onMount(() => {
    if (src !== srcFallback) {
      const img = new Image();
      img.src = src || "";
      img.onerror = () => {
        // If the image fails to load, set the src to the fallback favicon
        src = srcFallback;
      };
    }
  });
</script>

<div
  class={[
    "favicon",
    {
      fallback: src === srcFallback,
      light: $colorScheme === "light",
      dark: $colorScheme === "dark",
    },
  ]}
  style:background-image="url({src})"
></div>

<style>
  .favicon {
    align-items: center;
    background-size: contain;
    display: flex;
    justify-content: center;
    text-align: center;
    height: 32px;
    width: 32px;

    &.fallback {
      opacity: 0.2;

      &.dark {
        filter: invert(1);
      }
    }
  }
</style>
