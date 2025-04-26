<script module>
  import { type Density } from "./settings";

  interface Props {
    title?: string;
    showBorder?: boolean;
    density: Density;
  }
</script>

<script lang="ts">
  let { title, density }: Props = $props();
</script>

<div class={["title", density]}>
  <div class={["line-gradient", "left", density]}></div>
  {#if density === "large" || (title !== undefined && title.trim().length > 0)}
    <div class={["badge", density]}>
      {@html (title?.trim().length ?? 0) > 0 ? title : "&nbsp;"}
    </div>
  {/if}
  <div class={["line-gradient", "right", density]}></div>
</div>

<style>
  .title {
    align-items: center;
    display: flex;
    justify-content: center;
    text-align: center;
    transition: margin 0.1s ease-in-out;

    &.large {
      margin: 0 0 8px;
    }
    &.medium {
      margin: 8px 0 4px;
    }
    &.compact {
      height: 0;
      margin: 0;
    }

    .line-gradient {
      border-radius: 6px;
      height: 1px;
      width: 100%;

      &.medium {
        &.left {
          background: linear-gradient(
            to right,
            transparent,
            var(--oub--border-color) 100%
          );
          margin-right: -1px;
        }
        &.right {
          background: linear-gradient(
            to left,
            transparent,
            var(--oub--border-color) 100%
          );
          margin-left: 1px;
        }
      }
    }

    .badge {
      color: color-mix(in srgb, var(--oub--foreground-color) 50%, transparent);
      color: var(--oub--foreground-color);
      font: caption;
      font-weight: 500;
      line-height: 1;
      margin-bottom: 4px;
      position: relative;
      transition: all 0.1s ease-in-out;
      white-space: nowrap;
      z-index: 1;

      &.large {
        font-size: 16px;
        font-weight: 600;
        padding: 0 20px;
      }

      &.medium {
        font: caption;
        font-weight: 500;
        padding: 4px 12px 0;
      }

      &.compact {
        font-size: 0;
        line-height: 0;
        margin: 0;
        padding: 0;
      }

      &.medium::before {
        border: solid 1px var(--oub--border-color);
        border-bottom: 0;
        border-radius: 6px 6px 0 0;
        border-radius: 10px 10px 0 0;
        content: "";
        height: calc(50% + 1px);
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: -1;
      }
    }
  }
</style>
