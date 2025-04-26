<script module>
  import { type Bookmarks } from "webextension-polyfill-ts";
  import Dialog from "./Dialog.svelte";
  import Group from "./Group.svelte";
  import Hoverable from "./Hoverable.svelte";
  import Item from "./Item.svelte";
  import { settings } from "./settings.js";

  interface Props {
    bookmark: Bookmarks.BookmarkTreeNode & { favicon?: string };
  }
</script>

<script lang="ts">
  let { bookmark }: Props = $props();

  let dialog: Dialog | null = $state(null);

  const labelMode = $derived.by(() => {
    switch ($settings.labelMode) {
      case "all":
      case "subfolders":
        return "always";
      case "bookmarks":
      case "hover":
        return "hover";
      default:
        return "never";
    }
  });
</script>

<Hoverable>
  <button class="dialog-opener" onclick={(event) => dialog?.open(event)}>
    <Item label={bookmark.title} {labelMode}>
      <div class="badge">
        <span>{bookmark.children?.length}</span>
      </div>
      <!-- <img class="folder" src={folder} alt="Folder" /> -->
    </Item>
  </button>
</Hoverable>

<Dialog bind:this={dialog}>
  <Group
    bookmarks={bookmark?.children ?? []}
    title={bookmark.title}
    density="large"
    forceTitle
  />
</Dialog>

<style>
  button.dialog-opener {
    display: contents;
  }
  .badge {
    align-items: center;
    border: none;
    bottom: 0;
    color: var(--oub--foreground-color);
    font-size: 24px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    left: 0;
    outline: none;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
</style>
