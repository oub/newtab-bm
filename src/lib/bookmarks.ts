import {
  browser,
  type Bookmarks,
  type TopSites,
} from "webextension-polyfill-ts";

export type FaviconedBookmarks = Bookmarks.BookmarkTreeNode & {
  favicon?: string;
};

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

const processBookmarks = (
  bs: FaviconedBookmarks[],
  topSitesMap: Map<string, string>
): void =>
  bs.forEach((b) => {
    if (b.children) {
      processBookmarks(b.children, topSitesMap);
    } else if (b.type === "bookmark") {
      const bookmarkUrl = b.url || "";
      const url = new URL(bookmarkUrl);
      if (topSitesMap.has(url.host)) {
        b.favicon = topSitesMap.get(url.host);
      } else {
        b.favicon = "chrome://branding/content/about-logo.png";
        b.favicon = url.protocol + "//" + url.host + "/favicon.ico";
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
    onePerDomain: true,
  });
};

const convertToHostFaviconMap = (
  topSites: TopSites.MostVisitedURL[]
): Map<string, string> => {
  const topSitesMap = new Map<string, string>();
  topSites.forEach((site) => {
    const faviconUrl = site.favicon || "";
    const siteUrl = site.url || "";
    const url = new URL(siteUrl);
    topSitesMap.set(url.host, faviconUrl);
  });
  return topSitesMap;
};

const retrieveFavicons: (
  bookmarks: FaviconedBookmarks[]
) => Promise<FaviconedBookmarks[]> = (bookmarks: FaviconedBookmarks[]) =>
  getTopSites()
    .then(convertToHostFaviconMap)
    .then(async (topSitesMap) => processBookmarks(bookmarks, topSitesMap))
    .catch((error) => console.error("Error fetching top sites:", error))
    .then(() => bookmarks);

export const loadToolbarBookmarks: () => Promise<FaviconedBookmarks[]> = () =>
  getBookmarks().then(retrieveFavicons);
