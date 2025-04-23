<script module>
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }
</script>

<script lang="ts">
  let { children }: Props = $props();
</script>

<div class="container">
  {@render children()}
</div>

<style>
  .container {
    --label-text-color: var(--oub--foreground-color);

    border-radius: 8px;
    display: inline-block;
    overflow: hidden;
    position: relative;

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
