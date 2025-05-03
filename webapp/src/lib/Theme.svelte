<script module>
	import { type Snippet } from 'svelte';
	import Browser, { type Theme } from 'webextension-polyfill';
	import {
		defaultDarkColor,
		defaultLightColor,
		getBorderColor,
	} from './colors';
	import { retrieveThemeColors } from './theme';

	interface Props {
		children: Snippet;
	}
</script>

<script lang="ts">
	let { children }: Props = $props();

	let colors: {
		backgroundColor: string | undefined;
		borderColor: string | undefined;
		foregroundColor: string | undefined;
	} = $state({
		backgroundColor: 'unset',
		borderColor: 'unset',
		foregroundColor: 'unset',
	});

	retrieveThemeColors().then((c) => (colors = c));
	Browser.theme?.onUpdated?.addListener((updateInfo: Theme.ThemeUpdateInfo) => {
		retrieveThemeColors(updateInfo).then((c) => (colors = c));
	});
</script>

<css
	style:--default--light--color={defaultLightColor}
	style:--default--dark--color={defaultDarkColor}
	style:--default--dark--border-color={getBorderColor(
		defaultDarkColor,
		defaultLightColor,
		'dark'
	)}
	style:--default--light--border-color={getBorderColor(
		defaultLightColor,
		defaultDarkColor,
		'light'
	)}
	style:--firefox--background-color={colors.backgroundColor}
	style:--firefox--foreground-color={colors.foregroundColor}
	style:--firefox--border-color={colors.borderColor}
>
	{@render children?.()}
</css>

<style>
	css {
		background-color: var(--newtab-bm--background-color);
		color: var(--newtab-bm--foreground-color);
		display: contents;

		@media (prefers-color-scheme: light) {
			--newtab-bm--background-color: var(
				--firefox--background-color,
				var(--default--light--color)
			);
			--newtab-bm--foreground-color: var(
				--firefox--foreground-color,
				var(--default--dark--color)
			);
			--newtab-bm--border-color: var(
				--firefox--border-color,
				var(--default--light--border-color)
			);
		}
		@media (prefers-color-scheme: dark) {
			--newtab-bm--background-color: var(
				--firefox--background-color,
				var(--default--dark--color)
			);
			--newtab-bm--foreground-color: var(
				--firefox--foreground-color,
				var(--default--light--color)
			);
			--newtab-bm--border-color: var(
				--firefox--border-color,
				var(--default--dark--border-color)
			);
		}
	}
</style>
