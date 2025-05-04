<script module>
	import { setContext, type Snippet } from 'svelte';
	import closeIcon from '../assets/cross-20.svg';
	import { colorScheme } from './colors';

	interface Props {
		children?: Snippet;
	}
</script>

<script lang="ts">
	let { children }: Props = $props();

	setContext('inDialog', true);

	let dialog: HTMLDialogElement | null = null;
	let isOpened = $state(false);
	let showDialog = $state(false);

	const themeClasses = $derived({
		light: $colorScheme === 'light',
		dark: $colorScheme === 'dark',
	});

	export const open = (event: MouseEvent) => {
		dialog?.showModal();
		isOpened = true;
		event.stopPropagation();
	};

	export const close = () => {
		dialog?.close();
		isOpened = false;
	};

	$effect(() => {
		if (showDialog && dialog) {
			dialog.showModal();
		} else if (dialog) {
			dialog.close();
		}
	});
</script>

<dialog bind:this={dialog} class={themeClasses}>
	<div class="close-action">
		<button onclick={close}>
			<img src={closeIcon} alt="Close" class={themeClasses} />
		</button>
	</div>
	<div class="dialog-content">
		{@render children?.()}
	</div>
</dialog>

<style>
	dialog {
		--backdrop--background-color--dark: #0005;
		--backdrop--background-color--light: color-mix(
			in srgb,
			var(--newtab-bm--background-color) 50%,
			#0002
		);

		background-color: var(--newtab-bm--background-color);
		border: none;
		border-radius: 18px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		color: var(--text-color);
		max-width: 80vw;
		min-width: q max(50vw, 300px);
		padding: 0;
		position: relative;

		&[open] {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			overflow: hidden;
		}

		&::backdrop {
			backdrop-filter: blur(4px);
		}

		&.light {
			&::backdrop {
				background-color: var(--backdrop--background-color--light);
			}
		}
		&.dark {
			&::backdrop {
				background-color: var(--backdrop--background-color--dark);
			}
		}
		&:not(.light):not(.dark) {
			@media (prefers-color-scheme: light) {
				&::backdrop {
					background-color: var(--backdrop--background-color--light);
				}
			}
			@media (prefers-color-scheme: dark) {
				&::backdrop {
					background-color: var(--backdrop--background-color--dark);
				}
			}
		}

		&:focus-within {
			outline: none;
		}

		.close-action {
			position: absolute;
			right: 8px;
			top: 8px;
			z-index: 2;

			button {
				display: contents;

				img {
					cursor: pointer;
					opacity: 0.5;
					padding: 8px;

					&.dark {
						filter: saturate(0) invert(1);
					}
					&:not(.light):not(.dark) {
						@media (prefers-color-scheme: dark) {
							filter: saturate(0) invert(1);
						}
					}
				}

				&:hover img {
					opacity: 1;
				}
			}
		}

		.dialog-content {
			display: flex;
			flex-direction: column;
			overflow: auto;
		}
	}
</style>
