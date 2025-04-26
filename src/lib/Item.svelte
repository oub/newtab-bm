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
    align-items: center;
    box-sizing: border-box;
    color: var(--oub--foreground-color);
    display: block;
    flex-direction: column;
    height: 128px;
    justify-content: center;
    outline: none;
    padding: 20px 16px 4px;
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
      color: color-mix(in srgb, var(--oub--foreground-color) 0%, transparent);
    }
    &:hover {
      color: var(--oub--foreground-color) !important;
    }

    .tile {
      --size-item-large: 32px;
      align-items: center;
      background-color: var(--oub--background-color);
      border-radius: 8px;
      box-shadow: 0 2px 6px #00000026;
      cursor: pointer;
      display: flex;
      font-size: 32px;
      font-weight: 200;
      height: 80px;
      height: calc(var(--size-item-large) * 2);
      justify-content: center;
      margin: 0 auto;
      position: relative;
      text-transform: uppercase;
      width: 80px;
      width: calc(var(--size-item-large) * 2);

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
        height: var(--size-item-large);
        width: var(--size-item-large);

        .default-icon {
          align-items: center;
          background-size: 32px;
          display: flex;
          font-size: 20px;
          height: 32px;
          justify-content: center;
          width: 32px;
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
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          border-radius: 4px;
          height: 32px;
          position: absolute;
          width: 32px;
        }
      }
    }

    .title {
      font: caption;
      padding-top: 8px;
      position: relative;
      text-align: center;

      .label {
        box-sizing: border-box;
        display: block;
        font: caption;
        font-family: "Segoe UI", Arial, Helvetica, sans-serif;
        font-size: 12px;
        -webkit-line-clamp: 2;
        line-height: 1.3;
        margin: 0 calc(calc(100px - 64px) / -2);
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
