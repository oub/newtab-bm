import { writable } from "svelte/store";
import {
  browser,
  type Bookmarks,
  type TopSites,
} from "webextension-polyfill-ts";

export type FaviconedBookmarks = Bookmarks.BookmarkTreeNode & {
  favicon?: string;
};

export let areBookmarksLoaded = writable(false);

const getBookmarks = async (): Promise<Bookmarks.BookmarkTreeNode[]> => {
  if (typeof browser.bookmarks !== "undefined") {
    try {
      const b = await browser.bookmarks.getSubTree("toolbar_____");
      return b[0].children ?? [];
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      return [];
    }
  }
  return Promise.resolve([]);
};

const assignFaviconsToBookmarks = (
  bookmarks: FaviconedBookmarks[],
  topSitesMap: Map<string, string>
): void =>
  bookmarks.forEach((bookmark) => {
    if (bookmark.children) {
      assignFaviconsToBookmarks(bookmark.children, topSitesMap);
    } else if (bookmark.type === "bookmark") {
      const bookmarkUrl = bookmark.url || "";
      const isGoogMaps = !!bookmark.url?.match(
        /^https\:\/\/www.google.[a-z]*\/maps/
      );
      const url = new URL(bookmarkUrl);
      if (isGoogMaps) {
        // If the URL is a Google Maps link, use a specific favicon
        bookmark.favicon = "sites/maps.google/favicon.png";
      } else if (topSitesMap.has(url.host)) {
        bookmark.favicon = topSitesMap.get(url.host);
      } else {
        // Try to get the favicon from the URL directly
        // This is a fallback if the favicon is not found in topSitesMap
        bookmark.favicon = url.protocol + "//" + url.host + "/favicon.ico";
      }
    }
  });

const getTopSites = (): Promise<TopSites.MostVisitedURL[]> => {
  if (typeof browser.topSites === "undefined") {
    return Promise.resolve([]);
  }
  return browser.topSites.get({
    limit: 100,
    includeFavicon: true,
  });
};

const convertToHostFaviconMap = (
  topSites: TopSites.MostVisitedURL[]
): Map<string, string> => {
  const hostFaviconMap = new Map<string, string>();
  topSites.forEach((site) => {
    hostFaviconMap.set(new URL(site.url || "").host, site.favicon || "");
  });
  return hostFaviconMap;
};

const retrieveFavicons: (
  bookmarks: FaviconedBookmarks[]
) => Promise<FaviconedBookmarks[]> = (bookmarks: FaviconedBookmarks[]) =>
  getTopSites()
    .then(convertToHostFaviconMap)
    .then(async (hostFaviconMap) =>
      assignFaviconsToBookmarks(bookmarks, hostFaviconMap)
    )
    .catch((error) => console.error("Error fetching top sites:", error))
    .then(() => bookmarks);

export const loadToolbarBookmarks: () => Promise<FaviconedBookmarks[]> = () =>
  getBookmarks().then(retrieveFavicons);
