<script module>
	import { onMount } from 'svelte';
	import { type FaviconedBookmark } from './bookmarks';
	import { colorScheme } from './colors';
	import { tryToGetFavicon } from './favicons';

	interface Props {
		bookmark: FaviconedBookmark;
	}

	const srcFallback = 'favicons/globe-24.svg';
</script>

<script lang="ts">
	let { bookmark }: Props = $props();

	let src: string = $state(bookmark.favicon ?? srcFallback);

	const themeClasses = $derived({
		light: $colorScheme === 'light',
		dark: $colorScheme === 'dark',
	});

	onMount(() => {
		if (bookmark.url && bookmark.favicon === null) {
			// No favicon, try to dynamically find an alternative
			tryToGetFavicon(bookmark.url).then((favicon) => {
				if (favicon) {
					src = favicon;
				}
			});
		}
	});
</script>

<div
	class={[
		'favicon',
		themeClasses,
		{
			fallback: src === srcFallback,
		},
	]}
	style:background-image="url({src})"
></div>

<style>
	.favicon {
		align-items: center;
		background-size: contain;
		border-radius: 3px;
		display: flex;
		height: 32px;
		justify-content: center;
		opacity: 1;
		text-align: center;
		width: 32px;

		&.fallback {
			opacity: 0.05;

			&.dark {
				filter: invert(1);
			}
			&:not(.light):not(.dark) {
				@media (prefers-color-scheme: dark) {
					filter: invert(1);
				}
			}
		}
	}
</style>
