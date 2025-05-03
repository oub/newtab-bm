<script module>
	import { type Snippet } from 'svelte';
	import { settings } from './settings';

	interface Props {
		children: Snippet;
	}
</script>

<script lang="ts">
	let { children }: Props = $props();

	const noLabel = $derived($settings.labels === 'never');
</script>

<li class={{ 'no-label': noLabel }}>
	{@render children()}
</li>

<style>
	li {
		--label-text-color: var(--newtab-bm--foreground-color);

		border-radius: 26px 26px 20px 20px;
		display: inline-block;
		overflow: hidden;
		position: relative;

		&.no-label {
			border-radius: 26px;
		}

		&:hover {
			background-color: color-mix(
				in srgb,
				var(--newtab-bm--foreground-color) 5%,
				var(--newtab-bm--background-color)
			);
			@media (prefers-color-scheme: dark) {
				background-color: color-mix(
					in srgb,
					var(--newtab-bm--foreground-color) 20%,
					var(--newtab-bm--background-color) 20%
				);
			}
		}
	}
</style>
