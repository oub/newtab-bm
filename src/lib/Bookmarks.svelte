<script module>
  import { browser } from "webextension-polyfill-ts";
  import Group from "./Group.svelte";
  import { loadToolbarBookmarks, type FaviconedBookmarks } from "./bookmarks";
  import { settings } from "./settings";

  interface Props {}
</script>

<script lang="ts">
  let {}: Props = $props();
  let toolbarBookmarks: FaviconedBookmarks[] = $state([]);
  const { groupAppearance } = $derived($settings);

  const topBookmarks = $derived(
    toolbarBookmarks.filter(
      (bookmark) =>
        bookmark.type === "bookmark" || bookmark.type === "separator"
    )
  );
  const bookmarkGroups = $derived(
    toolbarBookmarks.filter(
      (bookmark) =>
        bookmark.type === "folder" && (bookmark.children?.length ?? 0) > 0
    )
  );

  const load = () =>
    loadToolbarBookmarks().then((bookmarks) => {
      toolbarBookmarks = bookmarks;
    });

  load();

  browser.bookmarks.onChanged.addListener(load);
  browser.bookmarks.onCreated.addListener(load);
  browser.bookmarks.onRemoved.addListener(load);
  browser.bookmarks.onMoved.addListener(load);
</script>

<div class={["bookmarks", groupAppearance]}>
  <Group bookmarks={topBookmarks} {groupAppearance} forceNoTitle />
  {#each bookmarkGroups as bookmarkGroup}
    <Group
      bookmarks={bookmarkGroup.children}
      title={bookmarkGroup.title}
      {groupAppearance}
    />
  {/each}
</div>

<style>
  .bookmarks {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0 1rem 1rem;

    &.block {
      gap: 1rem;
    }
  }
</style>
