<script module>
  import { type GroupAppearance } from "./settings";

  interface Props {
    title?: string;
    showBorder?: boolean;
    groupAppearance: GroupAppearance;
  }
</script>

<script lang="ts">
  let { title, groupAppearance }: Props = $props();
</script>

<div class={["title", groupAppearance]}>
  <div class={["line-gradient", "left", groupAppearance]}></div>
  {#if groupAppearance === "block" || (title !== undefined && title.trim().length > 0)}
    <div class={["badge", groupAppearance]}>
      {@html (title?.trim().length ?? 0) > 0 ? title : "&nbsp;"}
    </div>
  {/if}
  <div class={["line-gradient", "right", groupAppearance]}></div>
</div>

<style>
  .title {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0 0 4px;
    text-align: center;

    .line-gradient {
      border-radius: 6px;
      height: 1px;
      width: 100%;

      &.separator {
        &.left {
          background: linear-gradient(
            to right,
            transparent,
            var(--oub--border-color) 100%
          );
        }
        &.right {
          background: linear-gradient(
            to left,
            transparent,
            var(--oub--border-color) 100%
          );
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
      padding: 4px 12px 0;
      position: relative;
      white-space: nowrap;
      z-index: 1;

      &.separator {
        font: caption;
        font-weight: 500;
        padding: 4px 12px 0;
      }

      &.block {
        font-size: 16px;
        font-weight: 600;
        padding: 0 20px;
      }

      &.separator::before {
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
