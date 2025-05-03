<script module>
	import { onMount } from 'svelte';
	import closeIcon from '../assets/cross-16.svg';
	import settingsIcon from '../assets/settings-16.svg';
	import { colorScheme } from './colors';
	import {
		settings,
		type DensitySettings,
		type LabelsSettings,
	} from './settings';
</script>

<script lang="ts">
	let showSettings = $state(false);
	let density: DensitySettings = $state('medium');
	let labels: LabelsSettings = $state('always');

	const themeClasses = $derived({
		light: $colorScheme === 'light',
		dark: $colorScheme === 'dark',
	});

	onMount(() => ({ labels: labels, density, showSettings } = $settings));

	$effect(() => {
		$settings.labels = labels;
	});

	$effect(() => {
		$settings.density = density;
	});

	$effect(() => {
		$settings.showSettings = showSettings;
	});
</script>

<div class={['settings', { open: showSettings }]}>
	<div class="bar">
		<div class="form">
			<label>
				<span>Density:</span>
				<select bind:value={density} class={themeClasses}>
					<option value="large">Large</option>
					<option value="medium">Medium</option>
					<option value="compact">Compact</option>
				</select>
			</label>
			<label>
				<span>Labels:</span>
				<select bind:value={labels} class={themeClasses}>
					<option value="always">Show</option>
					<option value="hover">On hover</option>
					<option value="never">Hide</option>
				</select>
			</label>
		</div>

		<button class="action close" onclick={() => (showSettings = !showSettings)}>
			<img src={closeIcon} alt="Close" class={themeClasses} />
		</button>
	</div>
</div>

{#if !showSettings}
	<button class="action open" onclick={() => (showSettings = !showSettings)}>
		<img src={settingsIcon} alt="Settings" class={themeClasses} />
	</button>
{/if}

<style>
	.settings {
		bottom: 0;
		left: 0;
		position: fixed;
		right: 0;
		z-index: 10;

		.bar {
			--extra-spacing: 40px;

			align-items: center;
			background-color: var(--oub--background-color);
			border-top: 1px solid
				color-mix(
					in srgb,
					var(--oub--border-color) 50%,
					var(--oub--background-color)
				);
			bottom: 0;
			box-shadow: 0 0 0 0 #0000;
			display: flex;
			justify-content: space-between;
			left: calc(0px - var(--extra-spacing));
			padding: 0.5rem calc(0.5rem + var(--extra-spacing));
			position: absolute;
			right: calc(0px - var(--extra-spacing));
			transform: translateY(100%);
			transition:
				transform 250ms cubic-bezier(0.46, 0.03, 0.52, 0.96),
				box-shadow 250ms cubic-bezier(0.46, 0.03, 0.52, 0.96);

			.form {
				align-items: center;
				display: flex;
				flex-grow: 1;
				flex-wrap: wrap;
				gap: 0.5rem 2.5rem;
				justify-content: center;
				padding-left: calc(30px + 2.5rem);
				padding-right: calc(2.5rem);

				label {
					align-items: center;
					cursor: pointer;
					display: flex;
					font: caption;
					font-family: system-ui, sans-serif;
					font-size: 14px;
					font-size: 13.872px;
					gap: 1rem;

					span::selection {
						background-color: transparent;
					}

					select {
						background-color: var(--oub--background-color);
						border-radius: 4px;
						color: var(--oub--foreground-color);
						font: caption;
						font-size: 12px;
						font-size: 13.3333px;
						padding: 0.3rem;
						width: fit-content;

						&.light {
							border: 1px solid
								color-mix(in srgb, var(--oub--border-color) 80%, transparent);
						}
						&.dark {
							border: 1px solid
								color-mix(
									in srgb,
									var(--oub--foreground-color) 30%,
									transparent
								);
						}
						&:not(.light):not(.dark) {
							@media (prefers-color-scheme: light) {
								border: 1px solid
									color-mix(in srgb, var(--oub--border-color) 80%, transparent);
							}
							@media (prefers-color-scheme: dark) {
								border: 1px solid
									color-mix(
										in srgb,
										var(--oub--foreground-color) 30%,
										transparent
									);
							}
						}

						&:focus {
							box-shadow: 0 0 0 2px var(--oub--foreground-color);
							outline: none;
						}
					}
				}
			}
		}

		&.open .bar {
			box-shadow: 0 2px 14px 0 #0003;
			transform: translateY(0%);
		}
	}

	.action {
		align-items: center;
		background: none;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		display: flex;
		height: 30px;
		justify-content: center;
		padding: 0;
		width: 30px;
		z-index: 5;

		&.open {
			bottom: 15px;
			opacity: 0.4;
			position: fixed;
			right: 15px;
		}
		&.close {
			opacity: 0.8;
		}
		&:hover {
			background-color: color-mix(
				in srgb,
				var(--oub--border-color) 50%,
				var(--oub--background-color)
			);
			opacity: 1;
		}

		img {
			height: 16px;
			width: 16px;

			&.dark {
				filter: saturate(0) invert(1);
			}
			&:not(.light):not(.dark) {
				@media (prefers-color-scheme: dark) {
					filter: saturate(0) invert(1);
				}
			}
		}
	}
</style>
