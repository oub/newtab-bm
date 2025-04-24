<script module>
  import type { Snippet } from "svelte";
  import closeIcon from "../assets/cross-20.svg";
  import { colorScheme } from "./colors";

  interface Props {
    children?: Snippet;
  }
</script>

<script lang="ts">
  let { children }: Props = $props();

  let dialog: HTMLDialogElement | null = null;
  let isOpened = $state(false);
  let showDialog = $state(false);

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

<dialog
  bind:this={dialog}
  class={{ light: $colorScheme === "light", dark: $colorScheme === "dark" }}
>
  <div class="close-action">
    <button onclick={close}>
      <img
        src={closeIcon}
        alt="Close"
        class={{
          light: $colorScheme === "light",
          dark: $colorScheme === "dark",
        }}
      />
    </button>
  </div>
  <div class="dialog-content">
    {@render children?.()}
  </div>
</dialog>

<style>
  dialog {
    background-color: var(--oub--background-color);
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

    &.dark {
      &::backdrop {
        background-color: #0005;
      }
    }
    &.light {
      &::backdrop {
        background-color: color-mix(
          in srgb,
          var(--oub--background-color) 50%,
          #0002
        );
      }
    }
    &:focus-within {
      outline: none;
    }

    .close-action {
      position: absolute;
      right: 8px;
      top: 8px;

      button {
        display: contents;

        img {
          cursor: pointer;
          opacity: 0.5;
          padding: 8px;

          &.dark {
            filter: saturate(0) invert(1);
          }
        }

        &:hover img {
          opacity: 1;
        }
      }
    }

    .dialog-content {
      flex-direction: column;
      display: flex;
      overflow: auto;
    }
  }
</style>
