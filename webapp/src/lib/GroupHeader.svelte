<script module>
	import {
		settings,
		type DensitySettings,
		type LabelsSettings,
	} from './settings';

	interface Props {
		title?: string;
		density?: DensitySettings;
	}
</script>

<script lang="ts">
	let { title, density: densityProp }: Props = $props();

	const labels: LabelsSettings = $derived($settings.labels);
	const density: DensitySettings = $derived(densityProp ?? $settings.density);
</script>

<hgroup class={`density-${density}`}>
	{#if density === 'large' || (title !== undefined && title.trim().length > 0)}
		<h1
			class={{
				'no-label': labels === 'never',
				'label-on-hover': labels === 'hover',
			}}
		>
			<span>{@html (title?.trim().length ?? 0) > 0 ? title : '&nbsp;'}</span>
		</h1>
	{/if}
</hgroup>

<style>
	hgroup {
		align-items: center;
		display: flex;
		justify-content: center;
		transition: margin 0.1s ease-in-out;

		h1 {
			color: color-mix(in srgb, var(--oub--foreground-color) 50%, transparent);
			color: var(--oub--foreground-color);
			font: caption;
			font-weight: 500;
			line-height: 1;
			margin: 0 0 4px;
			padding: 0;
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
				width: 100%;
			}

			&::before {
				background: linear-gradient(
					to right,
					transparent,
					var(--oub--border-color) 100%
				);
				border-radius: 50% 0 1px 50%;
			}

			&::after {
				background: linear-gradient(
					to left,
					transparent,
					var(--oub--border-color) 100%
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

				&.no-label,
				&.label-on-hover {
					font-size: 12px;
					font-weight: 500;
				}

				span::before {
					border: solid 1px var(--oub--border-color);
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
