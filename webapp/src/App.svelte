<script module>
	import Browser, { type Theme } from 'webextension-polyfill';
	import Bookmarks from './lib/Bookmarks.svelte';
	import { defaultDarkColor, defaultLightColor, getBorderColor, retrieveColors } from './lib/colors';
	import Settings from './lib/Settings.svelte';
</script>

<script lang="ts">
	let colors: {
		backgroundColor: string | undefined;
		borderColor: string | undefined;
		foregroundColor: string | undefined;
	} = $state({
		backgroundColor: 'unset',
		borderColor: 'unset',
		foregroundColor: 'unset',
	});

	retrieveColors().then((c) => (colors = c));
	Browser.theme?.onUpdated?.addListener((updateInfo: Theme.ThemeUpdateInfo) => {
		retrieveColors(updateInfo).then((c) => (colors = c));
	});
</script>

<main
	style:--default--light--color={defaultLightColor}
	style:--default--dark--color={defaultDarkColor}
	style:--default--dark--border-color={getBorderColor(defaultDarkColor, defaultLightColor)}
	style:--default--light--border-color={getBorderColor(defaultLightColor, defaultDarkColor)}
	style:--firefox--background-color={colors.backgroundColor}
	style:--firefox--foreground-color={colors.foregroundColor}
	style:--firefox--border-color={colors.borderColor}
>
	<Bookmarks />
	<Settings />
</main>

<style>
	main {
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

		@media (prefers-color-scheme: light) {
			--oub--background-color: var(--firefox--background-color, var(--default--light--color));
			--oub--foreground-color: var(--firefox--foreground-color, var(--default--dark--color));
			--oub--border-color: var(--firefox--border-color, var(--default--light--border-color));
		}
		@media (prefers-color-scheme: dark) {
			--oub--background-color: var(--firefox--background-color, var(--default--dark--color));
			--oub--foreground-color: var(--firefox--foreground-color, var(--default--light--color));
			--oub--border-color: var(--firefox--border-color, var(--default--dark--border-color));
		}
	}
</style>
