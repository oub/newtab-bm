<script module>
	import { getContext } from 'svelte';
	import Bookmark from './Bookmark.svelte';
	import { isBookmark, isFolder, type FaviconedBookmark } from './bookmarks';
	import Folder from './Folder.svelte';
	import GroupHeader from './GroupHeader.svelte';
	import Separator from './Separator.svelte';
	import { settings, type DensitySettings } from './settings';

	interface Props {
		bookmarks?: FaviconedBookmark[];
		title?: string;
	}
</script>

<script lang="ts">
	let { bookmarks = [], title }: Props = $props();

	const inDialog = getContext<boolean>('inDialog') ?? false;

	const density: DensitySettings = $derived(
		inDialog ? 'large' : $settings.density
	);
</script>

<section class={`density-${density}`}>
	{#if title !== undefined}
		<GroupHeader {title} />
	{/if}

	<ol>
		{#each bookmarks as bookmark, _ (bookmark.id)}
			{#if isFolder(bookmark)}
				<Folder {bookmark} />
			{:else if isBookmark(bookmark)}
				<Bookmark {bookmark} />
			{:else}
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
