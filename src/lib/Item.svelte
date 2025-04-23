<script module>
  import type { Snippet } from "svelte";
  import { colorScheme } from "./colors";

  interface Props {
    label?: string;
    imgSrc?: string;
    labelMode?: "never" | "always" | "hover";
    children?: Snippet;
  }
</script>

<script lang="ts">
  let { label, imgSrc, labelMode = "always", children }: Props = $props();
</script>

<div
  class={[
    "item",
    {
      "no-label": labelMode === "never",
      "label-on-hover": labelMode === "hover",
      label: labelMode === "always",
    },
    { light: $colorScheme === "light", dark: $colorScheme === "dark" },
  ]}
  title={labelMode === "never" ? label : undefined}
>
  <div
    class={[
      "tile",
      { light: $colorScheme === "light", dark: $colorScheme === "dark" },
    ]}
    aria-hidden="true"
  >
    <div class="icon-wrapper">
      <div></div>
      <div class="site-icon default-icon rich-icon">
        <div
          class="icon"
          style:background-image={!children ? `url(${imgSrc})` : undefined}
        >
          {@render children?.()}
        </div>
      </div>
    </div>
  </div>
  {#if labelMode !== "never"}
    <div class="title">
      <div class="label" title={(label?.length ?? 0) > 30 ? label : undefined}>
        {label}
      </div>
    </div>
  {/if}
</div>

<style>
  .item {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 16px 4px;
    color: inherit;
    display: block;
    outline: none;
    text-decoration: none;
    width: 96px;
    height: 128px;

    &.no-label {
      padding: 16px;
      height: 96px;
    }

    &.label-on-hover {
      --label-text-color: color-mix(
        in srgb,
        var(--oub--foreground-color) 0%,
        transparent
      );
    }
    &:hover {
      --label-text-color: var(--oub--foreground-color) !important;
    }

    .tile {
      --size-item-large: 32px;
      border-radius: 8px;
      box-shadow: 0 2px 6px #00000026;
      background-color: var(--oub--background-color);
      justify-content: center;
      margin: 0 auto;
      height: 80px;
      width: 80px;
      cursor: pointer;
      position: relative;
      align-items: center;
      color: var(--newtab-contextual-text-secondary-color);
      display: flex;
      font-size: 32px;
      font-weight: 200;
      text-transform: uppercase;
      width: calc(var(--size-item-large) * 2);
      height: calc(var(--size-item-large) * 2);

      &.light {
        background-color: color-mix(
          in srgb,
          var(--oub--background-color) 0%,
          #fff
        );
      }
      &.dark {
        background-color: color-mix(
          in srgb,
          var(--oub--foreground-color) 10%,
          transparent
        );
      }

      .icon-wrapper {
        width: var(--size-item-large);
        height: var(--size-item-large);

        .default-icon {
          background-size: 32px;
          height: 32px;
          width: 32px;
          align-items: center;
          display: flex;
          font-size: 20px;
          justify-content: center;
        }

        .rich-icon {
          background-size: cover;
          height: 100%;
          inset-inline-start: 0;
          top: 0;
          width: 100%;
        }
        .site-icon {
          background-color: var(--newtab-background-color-secondary);
          background-position: center center;
          background-repeat: no-repeat;
          border-radius: 4px;
          position: absolute;
        }

        .icon {
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          border-radius: 4px;
          position: absolute;
          width: 32px;
          height: 32px;
        }
      }
    }

    .title {
      color: var(--oub--foreground-color);
      padding-top: 8px;
      font: caption;
      text-align: center;
      position: relative;

      .label {
        color: var(--label-text-color);
        font: caption;
        text-align: center;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        white-space: wrap;
        word-break: break-word;
        line-height: 1.3;
        min-height: 2lh;
        width: 100px;
        margin: 0 calc(calc(100px - 64px) / -2);
        padding: 0 4px;
        box-sizing: border-box;

        font-family: "Segoe UI", Arial, Helvetica, sans-serif;
        font-size: 12px;
        font: caption;
      }
    }
  }
</style>
