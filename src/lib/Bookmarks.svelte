<script module>
  import { browser } from "webextension-polyfill-ts";
  import {
    areBookmarksLoaded,
    loadToolbarBookmarks,
    type FaviconedBookmarks,
  } from "./bookmarks";
  import Group from "./Group.svelte";
  import { settings } from "./settings";

  interface Props {}
</script>

<script lang="ts">
  let {}: Props = $props();

  let bookmarks: FaviconedBookmarks[] = $state([]);

  const { density } = $derived($settings);

  const topGroup = $derived(
    bookmarks.filter(
      (bookmark) =>
        bookmark.type === "bookmark" || bookmark.type === "separator"
    )
  );
  const otherGroups = $derived(
    bookmarks.filter(
      (bookmark) =>
        bookmark.type === "folder" && (bookmark.children?.length ?? 0) > 0
    )
  );

  const load = () =>
    loadToolbarBookmarks().then((bm) => {
      bookmarks = bm;
      $areBookmarksLoaded = true;
    });

  load();

  browser.bookmarks.onChanged.addListener(load);
  browser.bookmarks.onCreated.addListener(load);
  browser.bookmarks.onRemoved.addListener(load);
  browser.bookmarks.onMoved.addListener(load);
</script>

<div class={["bookmarks", density]}>
  <Group bookmarks={topGroup} {density} forceNoTitle />
  {#each otherGroups as group}
    <Group bookmarks={group.children} title={group.title} {density} />
  {/each}
</div>

<style>
  .bookmarks {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0 1rem 1rem;

    &.large {
      gap: 1rem;
    }
  }
</style>
