<script module>
	import Browser from 'webextension-polyfill';
	import { loadToolbarBookmarks, type FaviconedBookmark } from './bookmarks';
	import Group from './Group.svelte';
	import { settings } from './settings';

	function countNbOfBookmarks(bookmarks: FaviconedBookmark[]) {
		let count = 0;
		for (const bookmark of bookmarks) {
			if (bookmark.type === 'folder' && bookmark.children) {
				count += countNbOfBookmarks(bookmark.children);
			} else if (bookmark.type === 'bookmark') {
				count++;
			}
		}
		return count;
	}

	interface Props {}
</script>

<script lang="ts">
	let {}: Props = $props();

	let bookmarks: FaviconedBookmark[] = $state([]);

	const { density } = $derived($settings);
	const densityCssClass = $derived(`density-${density}`);

	const topBookmarks = $derived(
		bookmarks.filter(
			(item) => item.type === 'bookmark' || item.type === 'separator'
		)
	);
	const groups = $derived(
		bookmarks.filter(
			(item) => item.type === 'folder' && (item.children?.length ?? 0) > 0
		)
	);

	const load = async () => {
		bookmarks = await loadToolbarBookmarks();
		const bookmarksCount = countNbOfBookmarks(bookmarks);
		console.info(
			`[NewTab Bookmarks extension] ${bookmarksCount} bookmark${bookmarksCount > 1 ? 's' : ''} loaded from the Bookmarks toolbar`
		);
	};

	load();

	Browser.bookmarks.onChanged.addListener(load);
	Browser.bookmarks.onCreated.addListener(load);
	Browser.bookmarks.onRemoved.addListener(load);
	Browser.bookmarks.onMoved.addListener(load);
</script>

<div class={['bookmarks', densityCssClass]}>
	{#if topBookmarks.length > 0}
		<Group bookmarks={topBookmarks} />
	{/if}
	{#each groups as group}
		<Group bookmarks={group.children} title={group.title} />
	{/each}
</div>

<style>
	.bookmarks {
		align-items: center;
		background-color: var(--newtab-bm--background-color);
		color: var(--newtab-bm--foreground-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0;
		min-height: 100vh;
		padding: 1rem;

		&.density-large {
			gap: 1rem;
		}
	}
</style>
