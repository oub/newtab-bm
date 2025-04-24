<script module>
  import { areBookmarksLoaded } from "./bookmarks";
  import { colorScheme } from "./colors";
</script>

<script lang="ts">
  let bookmarksLoaded = $derived($areBookmarksLoaded);
</script>

<div class={["logo-and-wordmark", { show: bookmarksLoaded }]}>
  <div class="logo"></div>
  <div class="wordmark">
    <img
      src="chrome://branding/content/firefox-wordmark.svg"
      alt="Firefox"
      class={{ dark: $colorScheme === "dark" }}
    />
  </div>
</div>

<style>
  .logo-and-wordmark {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-block-end: 48px;
    margin-block-start: 30px;
    opacity: 0;

    &.show {
      opacity: 1;
    }

    .logo {
      display: inline-block;
      height: 64px;
      width: 64px;
      background: image-set(
          url("chrome://branding/content/about-logo.png"),
          url("chrome://branding/content/about-logo@2x.png") 2x
        )
        no-repeat center;
      background-size: auto;
      background-size: 64px;
    }

    .wordmark {
      background: url("chrome://branding/content/firefox-wordmark.svg")
        no-repeat center center;
      background-size: auto;
      background-size: 105px;
      display: inline-block;
      height: 64px;
      margin-inline-start: 16px;
      width: 105px;

      background-size: 100px;
      height: 64px;
      width: 100px;
      margin-inline-start: 12px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;

        &.dark {
          filter: saturate(0) invert(1);
        }
      }
    }
  }
</style>
