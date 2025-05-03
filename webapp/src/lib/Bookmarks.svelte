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

<div class={['bookmarks', density]}>
	<Group bookmarks={topGroup} {density} forceNoTitle />
	{#each otherGroups as group}
		<Group bookmarks={group.children} title={group.title} {density} />
	{/each}
</div>

<style>
	.bookmarks {
		align-items: center;
		background-color: var(--oub--background-color);
		color: var(--oub--foreground-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100vh;

		outline: solid 3px blue;
		overflow: auto;
		overflow: visible;
		position: relative;

		/** - -  */

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
