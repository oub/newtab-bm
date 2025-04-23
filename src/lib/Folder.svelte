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
  <!-- <GroupTitle title={bookmark.title} showBorder={false} />
  <div class="bookmarks">
    {#each bookmark?.children ?? [] as childrenBookmark}
      <Bookmark bookmark={childrenBookmark} />
    {/each}
  </div> -->

  <Group
    bookmarks={bookmark?.children ?? []}
    title={bookmark.title}
    groupAppearance="block"
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

  /* .badge1 {
    --relative-position: -8px;
    align-items: center;
    background-color: var(--oub--background-color);
    border: solid 1.4px var(--oub--foreground-color);
    border-radius: 50%;
    bottom: var(--relative-position);
    font-size: 12px;
    font-weight: 600;
    color: var(--oub--foreground-color);
    display: flex;
    height: 20px;
    justify-content: center;
    position: absolute;
    right: var(--relative-position);
    width: 20px;
    z-index: 1;
  } */

  .bookmarks {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
