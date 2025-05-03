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
		--label-text-color: var(--oub--foreground-color);

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
				var(--oub--foreground-color) 5%,
				var(--oub--background-color)
			);
			@media (prefers-color-scheme: dark) {
				background-color: color-mix(
					in srgb,
					var(--oub--foreground-color) 20%,
					var(--oub--background-color) 20%
				);
			}
		}
	}
</style>
