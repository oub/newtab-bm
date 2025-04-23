<script module>
  import { type Bookmarks } from "webextension-polyfill-ts";
  import Hoverable from "./Hoverable.svelte";
  import Item from "./Item.svelte";
  import { settings } from "./settings";

  interface Props {
    bookmark: Bookmarks.BookmarkTreeNode & { favicon?: string };
  }
</script>

<script lang="ts">
  let { bookmark }: Props = $props();
  let errorOnFirstImgLoad = $state(false);
  let errorOnSecondImgLoad = $state(false);

  const labelMode = $derived.by(() => {
    switch ($settings.labelMode) {
      case "all":
      case "bookmarks":
        return "always";
      case "subfolders":
      case "hover":
        return "hover";
      default:
        return "never";
    }
  });

  const googMaps = $derived(
    bookmark.url?.startsWith("https://www.google.fr/maps/") ||
      bookmark.url?.startsWith("https://www.google.com/maps/")
      ? bookmark.url
      : undefined
  );
  const imgSrc = $derived(
    errorOnFirstImgLoad
      ? undefined
      : googMaps
        ? "https://www.google.com/s2/favicons?domain_url=maps.google.com&sz=32"
        : bookmark.favicon
  );
  const fallbackImageURL = $derived.by(() => {
    const hostname = new URL(bookmark.url ?? "").hostname;
    return `https://icon.horse/icon/${hostname}`;
    // https://www.google.com/s2/favicons?domain_url={hostname}&sz=32
  });
</script>

<Hoverable>
  <a href={bookmark.url}>
    <!-- <Item
      imgSrc={`${bookmark.url}favicon.ico`}
      label={bookmark.title}
      showLabelOnlyOnHover={!showBookmarkLabels}
    /> -->
    <Item
      {imgSrc}
      label={bookmark.title}
      {labelMode}
      children={errorOnFirstImgLoad ? fallbackImage : undefined}
    />
  </a>
</Hoverable>

<img
  src={bookmark.favicon}
  alt=""
  class="img-loader"
  onerror={() => (errorOnFirstImgLoad = true)}
/>

{#snippet fallbackImage()}
  {#if errorOnFirstImgLoad}
    <!-- {#if !errorOnSecondImgLoad}
      <img
        src={fallbackImageURL}
        alt=""
        style:border-radius="4px"
        onerror={() => (errorOnSecondImgLoad = true)}
      />
    {:else if errorOnSecondImgLoad} -->
    <img
      src="chrome://branding/content/about-logo.png"
      alt=""
      style="filter:grayscale(1) opacity(0.15)"
    />
    <!-- {/if} -->
  {/if}
{/snippet}

<style>
  a {
    display: contents;

    &:focus,
    &:active {
      :global(.tile) {
        outline: solid 2px dodgerblue;
      }
    }

    img {
      height: 32px;
      width: 32px;
    }
  }

  .img-loader {
    display: none;
  }
</style>
