<script module>
	import Bookmark from './Bookmark.svelte';
	import { type FaviconedBookmark } from './bookmarks';
	import Folder from './Folder.svelte';
	import GroupHeader from './GroupHeader.svelte';
	import Separator from './Separator.svelte';
	import { type DensitySettings } from './settings';

	interface Props {
		bookmarks?: FaviconedBookmark[];
		title?: string;
		density: DensitySettings;
		forceTitle?: boolean;
		forceNoTitle?: boolean;
	}
</script>

<script lang="ts">
	let {
		bookmarks = [],
		title,
		density,
		forceTitle = false,
		forceNoTitle = false,
	}: Props = $props();

	const notEmptyTitle = $derived(
		title !== undefined && title.trim().length > 0
	);
</script>

<section class={`density-${density}`}>
	{#if (forceTitle || notEmptyTitle || density === 'medium') && !forceNoTitle}
		<GroupHeader {title} {density} />
	{/if}

	<ol>
		{#each bookmarks as bookmark, _ (bookmark.id)}
			{#if bookmark.type === 'folder'}
				<Folder {bookmark} />
			{:else if bookmark.type === 'bookmark'}
				<Bookmark {bookmark} />
			{:else if bookmark.type === 'separator'}
				<Separator />
			{/if}
		{/each}
	</ol>
</section>

<style>
	section {
		border: solid 0 transparent;
		border-radius: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0;
		transition: all 0.1s ease-in-out;

		&.density-large {
			background-color: color-mix(
				in srgb,
				var(--newtab-bm--foreground-color) 2%,
				transparent
			);
			border: solid 1px
				color-mix(in srgb, var(--newtab-bm--foreground-color) 6%, transparent);
			border-radius: 18px;
			padding: 15px;
		}

		ol {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0;
			justify-content: center;
		}
	}
</style>
