<script module>
	import { type Snippet } from 'svelte';
	import { colorScheme } from './colors';
	import { settings } from './settings';

	interface Props {
		label?: string;
		children?: Snippet;
	}
</script>

<script lang="ts">
	let { label, children }: Props = $props();

	const labelsSettings = $derived($settings.labels);
	const themeClasses = $derived({
		light: $colorScheme === 'light',
		dark: $colorScheme === 'dark',
	});
</script>

<dl
	class={[
		{
			'no-label': labelsSettings === 'never',
			'label-on-hover': labelsSettings === 'hover',
		},
		themeClasses,
	]}
	title={labelsSettings === 'never' ? label : undefined}
>
	<dt class={['tile', themeClasses]} aria-hidden="true">
		<div class="icon">{@render children?.()}</div>
	</dt>
	{#if labelsSettings !== 'never'}
		<dd>
			<div title={(label?.length ?? 0) > 30 ? label : undefined}>{label}</div>
		</dd>
	{/if}
</dl>

<style>
	dl {
		align-items: center;
		box-sizing: border-box;
		color: var(--newtab-bm--foreground-color);
		display: block;
		flex-direction: column;
		height: 128px;
		justify-content: center;
		outline: none;
		padding: 16px 16px 4px;
		text-decoration: none;
		transition:
			height 0.1s ease-in-out,
			padding 0.1s ease-in-out;
		width: 96px;

		&.no-label {
			height: 96px;
			padding: 16px;
		}

		&.label-on-hover {
			color: color-mix(
				in srgb,
				var(--newtab-bm--foreground-color) 0%,
				transparent
			);

			&:hover {
				color: var(--newtab-bm--foreground-color);
			}
		}

		dt {
			--tile--background-color--light: color-mix(
				in srgb,
				var(--newtab-bm--background-color) 0%,
				#fff
			);
			--tile--background-color--dark: color-mix(
				in srgb,
				var(--newtab-bm--foreground-color) 10%,
				transparent
			);
			--tile--icon-size: 32px;

			align-items: center;
			background-color: var(--newtab-bm--background-color);
			border-radius: calc(var(--tile--icon-size) / 2);
			box-shadow: 0 2px 6px #00000026;
			cursor: pointer;
			display: flex;
			font-size: var(--tile--icon-size);
			font-weight: 200;
			height: calc(var(--tile--icon-size) * 2);
			justify-content: center;
			margin: 0 auto;
			position: relative;
			text-transform: uppercase;
			width: calc(var(--tile--icon-size) * 2);

			&.light {
				background-color: var(--tile--background-color--light);
			}
			&.dark {
				background-color: var(--tile--background-color--dark);
			}
			&:not(.light):not(.dark) {
				@media (prefers-color-scheme: light) {
					background-color: var(--tile--background-color--light);
				}
				@media (prefers-color-scheme: dark) {
					background-color: var(--tile--background-color--dark);
				}
			}

			.icon {
				border-radius: calc(var(--tile--icon-size) / 8);
				height: var(--tile--icon-size);
				width: var(--tile--icon-size);
			}
		}

		dd {
			font: caption;
			padding-top: 8px;
			position: relative;
			text-align: center;

			div {
				box-sizing: border-box;
				display: block;
				font: caption;
				font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
				font-size: 12px;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				line-height: 1.3;
				margin: 0 calc(calc(100px - 64px) / -2);
				max-height: calc(24px * 1.3);
				min-height: 2lh;
				overflow: hidden;
				padding: 0 4px;
				text-align: center;
				text-overflow: ellipsis;
				white-space: wrap;
				width: 100px;
				word-break: break-word;
			}
		}
	}
</style>
