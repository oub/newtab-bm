<script module>
	import { type FaviconedBookmark } from './bookmarks';
	import Dialog from './Dialog.svelte';
	import Group from './Group.svelte';
	import Hoverable from './Hoverable.svelte';
	import Item from './Item.svelte';

	interface Props {
		bookmark: FaviconedBookmark & {
			type: 'folder';
		};
	}
</script>

<script lang="ts">
	let { bookmark }: Props = $props();

	let dialog: Dialog | null = $state(null);
</script>

<Hoverable>
	<button class="dialog-opener" onclick={(event) => dialog?.open(event)}>
		<Item label={bookmark.title}>
			<div class="badge">
				<span>{bookmark.children?.length}</span>
			</div>
		</Item>
	</button>
</Hoverable>

<Dialog bind:this={dialog}>
	<Group bookmarks={bookmark.children!} title={bookmark.title} />
</Dialog>

<style>
	button.dialog-opener {
		display: contents;
	}
	.badge {
		align-items: center;
		border: none;
		bottom: 0;
		color: var(--newtab-bm--foreground-color);
		display: flex;
		font-size: 24px;
		font-weight: 600;
		justify-content: center;
		left: 0;
		line-height: 0;
		outline: none;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
	}
</style>
