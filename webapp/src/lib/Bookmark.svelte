<script module>
	import { type FaviconedBookmark } from './bookmarks';
	import Favicon from './Favicon.svelte';
	import Hoverable from './Hoverable.svelte';
	import Item from './Item.svelte';

	interface Props {
		bookmark: FaviconedBookmark & {
			type: 'bookmark';
		};
	}
</script>

<script lang="ts">
	let { bookmark }: Props = $props();
</script>

<Hoverable>
	<a href={bookmark.url}>
		<Item label={bookmark.title}>
			<Favicon {bookmark} />
		</Item>
	</a>
</Hoverable>

<style>
	a {
		display: contents;

		&:focus,
		&:active {
			:global(.tile) {
				outline: solid 2px dodgerblue;
			}
		}
	}
</style>
