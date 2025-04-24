<script module>
  import { type Bookmarks } from "webextension-polyfill-ts";
  import Favicon from "./Favicon.svelte";
  import Hoverable from "./Hoverable.svelte";
  import Item from "./Item.svelte";
  import { settings } from "./settings";

  interface Props {
    bookmark: Bookmarks.BookmarkTreeNode & { favicon?: string };
  }
</script>

<script lang="ts">
  let { bookmark }: Props = $props();

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
</script>

<Hoverable>
  <a href={bookmark.url}>
    <Item label={bookmark.title} {labelMode}>
      <Favicon {bookmark} />
    </Item>
  </a>
</Hoverable>

<style>
  a {
    display: contents;

    &:focus,
    &:active {
      :global(.tile) {
        outline: solid 2px dodgerblue;
      }
    }
  }
</style>
