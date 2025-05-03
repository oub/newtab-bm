<h1>NewTab Bookmarks</h1>
<b>BROWSER EXTENSION</b>
<p><i>A newtab page replacement that displays the toolbar bookmarks</i></p>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0.2-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/oub/newtab-bm/blob/main/LICENSE" target="_blank">
	<img alt="License: GPL--3.0--only" src="https://img.shields.io/badge/License-GPL--3.0--only-yellow.svg" />
  </a>
</p>

### Install

```
pnpm i
```

### Prepack

```
pnpm prepack
```

It generates prepacked stuff in `/package/<browser>` directories.

To see it in action in Firefox, go to `about:debugging#/runtime/this-firefox`, click "Load temporary Add-on..." and select `/package/firefox/manifest.json`.

### Package

To package the extension using web-ext, run:

```
pnpm package
```

It generates one file for each targeted browser:

- `/package/newtab_bookmarks-firefox.xpi`
- `/package/newtab_bookmarks-chrome.zip`

## About

**NewTab Bookmarks** is a browser extension that replaces the newtab page.
It displays in the newtab the toolbar bookmarks, using the same look and feel as the top-most sites of the native newtab page of Firefox.

No search field, no top-most sites, no sponsored links, only bookmarks. ☺️

![NewTab Bookmarks](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot.png)

### Toolbar Bookmarks

The bookmarks displayed in the page come from the toolbar:

![Toolbar bookmarks](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--bookmarks-toolbar.png)

Subfolders are displayed as popup:

![Subfolder](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--subfolder.png)

### Labels

Labels can be hidden:

![Hidden labels](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--without-label.png)

Or only visible on hover:

![Label on hover](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--label-on-hover.png)

### Layouts

Default layout uses tab-like group title.

An alternative layout is available. It uses blocks:

![Blocks layout](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--blocks-layout.png)

The blocks layout without labels:

![Blocks layout without labels](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--blocks-layout-without-label.png)

### Themes

The newtab page follows the chosen Firefox theme.

Dark mode is supported:

![Dark mode](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--dark-mode.png)

Themes are supported:

![Any theme](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--theme.png)
![Any theme](https://raw.githubusercontent.com/oub/newtab-bm/refs/heads/main/screenshots/screenshot--theme2.png)
