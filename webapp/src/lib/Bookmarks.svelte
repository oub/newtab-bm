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
	const densityCssClass = $derived(`density-${density}`);

	const topGroup = $derived(
		bookmarks.filter(
			(item) => item.type === 'bookmark' || item.type === 'separator'
		)
	);
	const otherGroups = $derived(
		bookmarks.filter(
			(item) => item.type === 'folder' && (item.children?.length ?? 0) > 0
		)
	);

	const load = async () => {
		bookmarks = await loadToolbarBookmarks();
		console.log(
			`[NewTab Bookmarks extension] ${bookmarks.length} bookmark${bookmarks.length > 1 ? 's' : ''} loaded from the Bookmarks toolbar`
		);
	};

	load();

	Browser.bookmarks.onChanged.addListener(load);
	Browser.bookmarks.onCreated.addListener(load);
	Browser.bookmarks.onRemoved.addListener(load);
	Browser.bookmarks.onMoved.addListener(load);
</script>

<div class={['bookmarks', densityCssClass]}>
	<Group bookmarks={topGroup} {density} forceNoTitle />
	{#each otherGroups as group}
		<Group bookmarks={group.children} title={group.title} {density} />
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
		padding: 1rem 1rem calc(1rem + 43px);

		&.density-large {
			gap: 1rem;
		}
	}
</style>
