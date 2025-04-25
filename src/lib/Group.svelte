<script module>
  import { type Bookmarks } from "webextension-polyfill-ts";
  import Bookmark from "./Bookmark.svelte";
  import Folder from "./Folder.svelte";
  import GroupTitle from "./GroupTitle.svelte";
  import Separator from "./Separator.svelte";
  import { type GroupAppearance } from "./settings";

  interface Props {
    bookmarks?: (Bookmarks.BookmarkTreeNode & { favicon?: string })[];
    title?: string;
    groupAppearance: GroupAppearance;
    forceTitle?: boolean;
    forceNoTitle?: boolean;
  }
</script>

<script lang="ts">
  let {
    bookmarks = [],
    title,
    groupAppearance,
    forceTitle = false,
    forceNoTitle = false,
  }: Props = $props();

  const notEmptyTitle = $derived(
    title !== undefined && title.trim().length > 0
  );
</script>

<section class={groupAppearance}>
  {#if (forceTitle || notEmptyTitle || groupAppearance === "separator") && !forceNoTitle}
    <GroupTitle {title} {groupAppearance} />
  {/if}

  <div class="container">
    {#each bookmarks as bookmark, _ (bookmark.id)}
      {#if bookmark.type === "folder"}
        <Folder {bookmark} />
      {:else if bookmark.type === "bookmark"}
        <Bookmark {bookmark} />
      {:else if bookmark.type === "separator"}
        <Separator />
      {/if}
    {/each}
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.block {
      background-color: color-mix(
        in srgb,
        var(--oub--foreground-color) 2%,
        transparent
      );
      border: solid 1px
        color-mix(in srgb, var(--oub--foreground-color) 6%, transparent);
      border-radius: 18px;
      padding: 15px;
    }

    .container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0;
      justify-content: center;
    }
  }
</style>
