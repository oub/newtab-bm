<script module>
	import Browser from 'webextension-polyfill';
	import { loadToolbarBookmarks, type FaviconedBookmark } from './bookmarks';
	import Group from './Group.svelte';
	import { settings } from './settings';

	interface Props {}
</script>

<script lang="ts">
	let {}: Props = $props();

	let bookmarks: FaviconedBookmark[] = $state([]);

	const { density } = $derived($settings);

	const topGroup = $derived(
		bookmarks.filter((bookmark) => bookmark.type === 'bookmark' || bookmark.type === 'separator')
	);
	const otherGroups = $derived(
		bookmarks.filter((bookmark) => bookmark.type === 'folder' && (bookmark.children?.length ?? 0) > 0)
	);

	const load = async () => {
		bookmarks = await loadToolbarBookmarks();
		console.log(`${bookmarks.length} bookmark${bookmarks.length > 1 ? 's' : ''} loaded from the Bookmarks toolbar`);
	};

	load();

	Browser.bookmarks.onChanged.addListener(load);
	Browser.bookmarks.onCreated.addListener(load);
	Browser.bookmarks.onRemoved.addListener(load);
	Browser.bookmarks.onMoved.addListener(load);
</script>

<div class={['bookmarks', density]}>
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
