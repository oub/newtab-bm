<script module>
	import { getContext } from 'svelte';
	import { settings, type DensitySettings } from './settings';

	interface Props {
		title: string;
	}
</script>

<script lang="ts">
	let { title: titleProp }: Props = $props();

	const inDialog = getContext<boolean>('inDialog') ?? false;

	// We force the title to be non-empty when in a dialog, so that the header is always shown
	const title = $derived(
		titleProp.trim() === '' && inDialog ? '&nbsp;' : titleProp.trim()
	);

	// We use the density from the settings, but if we are in a dialog, we force it to be large
	const density: DensitySettings = $derived(
		inDialog ? 'large' : $settings.density
	);

	// In medium density without bookmark label displayed, we use a slightly smaller font size
	const smaller = $derived(
		$settings.density === 'medium' && $settings.labels !== 'always'
	);
</script>

{#if title !== '' || density === 'medium'}
	<hgroup class={`density-${density}`}>
		<h1 class={{ empty: title === '' }}>
			{#if title !== ''}
				<span class={{ smaller }}>
					{@html title}
				</span>
			{/if}
		</h1>
	</hgroup>
{/if}

<style>
	hgroup {
		align-items: center;
		display: flex;
		justify-content: center;
		transition: margin 0.1s ease-in-out;

		h1 {
			color: var(--newtab-bm--foreground-color);
			font: caption;
			font-weight: 500;
			line-height: 1;
			margin: 0 0 4px;
			position: relative;
			transition: all 0.1s ease-in-out;
			white-space: nowrap;
			z-index: 1;
		}

		&.density-large {
			margin: 0 0 8px;

			h1 {
				font-family: system-ui;
				font-size: 16px;
				font-weight: 600;
				font-weight: 400;
				padding: 0 30px;
			}
		}

		&.density-medium {
			margin: 8px 0 4px;

			&::before,
			&::after {
				content: '';
				display: block;
				height: 1px;
				margin-top: -1px;
				min-width: 96px;
				width: 100%;
			}

			&::before {
				background: linear-gradient(
					to right,
					transparent,
					var(--newtab-bm--border-color) 100%
				);
				border-radius: 50% 0 1px 50%;
			}

			&::after {
				background: linear-gradient(
					to left,
					transparent,
					var(--newtab-bm--border-color) 100%
				);
				border-radius: 0 50% 50% 1px;
			}

			h1 {
				border-radius: 16px 16px 0 0;
				font: caption;
				font-family: system-ui, sans-serif;
				font-size: 13px;
				font-weight: 600;
				padding: 4px 12px 0;

				&.empty {
					height: 0;
					margin: 0;
					padding: 8px 0;
					width: 0;
					z-index: unset;
				}

				span {
					&.smaller {
						color: color-mix(
							in srgb,
							var(--newtab-bm--foreground-color) 50%,
							transparent
						);
						font-size: 12px;
						font-weight: 500;
					}

					&::before {
						border: solid 1px var(--newtab-bm--border-color);
						border-bottom: 0;
						border-radius: 16px 16px 0 0;
						content: '';
						height: calc(50% + 1px);
						left: -1px;
						position: absolute;
						right: -1px;
						top: 0;
						z-index: -2;
					}
				}
			}
		}

		&.density-compact {
			height: 0;
			margin: 0;

			h1 {
				font-size: 0;
				line-height: 0;
				margin: 0;
				padding: 0;
			}
		}
	}
</style>
