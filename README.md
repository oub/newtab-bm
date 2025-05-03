# Setup

## Installation

```
pnpm i
```

## Webapp

To build the Svelte webapp, run:

```
pnpm build --watch
```

It generates webapp code in `./dist` directory.

To see it in action, go to `about:debugging#/runtime/this-firefox`, click "Load temporary Add-on..." and select `./manifest.json`.

## Package

To package the extension using web-ext, run:

```
pnpm package
```

It generates a zip file in `./releases` directory containing the webapp copied from `./dist`, the `./manifest.json` file and some additional files, mostly icons.

# About

**NewTab Bookmarks** is Firefox extension is a replacement for the native newtab page.

It displays the toolbar bookmarks, using the same look and feel as the top-most sites of the native newtab page.

No search field, no top-most sites, only bookmarks.

![NewTab Bookmarks](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot.png)

## Toolbar Bookmarks

The bookmarks displayed in the page come from the toolbar:

![Toolbar bookmarks](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--bookmarks-toolbar.png)

Subfolders are displayed as popup:

![Subfolder](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--subfolder.png)

## Labels

Labels can be hidden:

![Hidden labels](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--without-label.png)

Or only visible on hover:

![Label on hover](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--label-on-hover.png)

## Layouts

Default layout uses tab-like group title.

An alternative layout is available. It uses blocks:

![Blocks layout](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--blocks-layout.png)

The blocks layout without labels:

![Blocks layout without labels](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--blocks-layout-without-label.png)

## Themes

The newtab page follows the chosen Firefox theme.

Dark mode is supported:

![Dark mode](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--dark-mode.png)

Themes are supported:

![Any theme](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--theme.png)
![Any theme](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--theme2.png)

```

```
