import Browser, { type Bookmarks, type TopSites } from 'webextension-polyfill';
import { getBrowser } from './browser';

export type FaviconedBookmark = Bookmarks.BookmarkTreeNode & {
	favicon?: string | null;
};

const tryToGetTreeNode = async (
	id: string
): Promise<Bookmarks.BookmarkTreeNode | null> => {
	try {
		const toolbarSubTree = await Browser.bookmarks.getSubTree(id);
		if (!toolbarSubTree || !toolbarSubTree[0]) {
			return null;
		}
		return toolbarSubTree[0];
	} catch {
		return null;
	}
};

const normalizeBookmarks = (
	bookmarks: Bookmarks.BookmarkTreeNode[]
): Bookmarks.BookmarkTreeNode[] => {
	bookmarks.forEach((bookmark) => {
		if (bookmark.children) {
			bookmark.type = 'folder';
			normalizeBookmarks(bookmark.children);
		} else if (!bookmark.type) {
			bookmark.type = 'bookmark';
		}
	});
	return bookmarks;
};

const getBookmarks = async (): Promise<Bookmarks.BookmarkTreeNode[]> => {
	if (typeof Browser.bookmarks === 'undefined') {
		console.log('Bookmarks API is not available.');
		return Promise.resolve([]);
	}

	const firefoxToolbarBookmarkTreeNodeID = 'toolbar_____';
	const chromeToolbarBookmarkTreeNodeID = '1';

	const toolbarBookmarkTreeNode =
		(await tryToGetTreeNode(chromeToolbarBookmarkTreeNodeID)) ??
		(await tryToGetTreeNode(firefoxToolbarBookmarkTreeNodeID));

	const toolbarBookmarks = toolbarBookmarkTreeNode?.children ?? [];

	normalizeBookmarks(toolbarBookmarks);

	return toolbarBookmarks;
};

const isGoogMaps = (url?: string): boolean => {
	return !!url?.match(/^https\:\/\/www.google.[a-z]*\/maps/);
};
const googMapsFavicon = 'favicons/maps.google/favicon.png';

const getTopSites = async (): Promise<TopSites.MostVisitedURL[]> =>
	await Browser.topSites.get({
		includeFavicon: true,
		limit: 100,
	});

const faviconizeFromAPI = (
	bookmarks: Bookmarks.BookmarkTreeNode[]
): FaviconedBookmark[] =>
	bookmarks.map((bookmark: Bookmarks.BookmarkTreeNode) => {
		const faviconizedBookmark = bookmark as FaviconedBookmark;
		switch (bookmark.type) {
			case 'folder':
				faviconizedBookmark.children = faviconizeFromAPI(
					bookmark.children ?? []
				);
				break;
			case 'bookmark':
				if (isGoogMaps(bookmark.url)) {
					faviconizedBookmark.favicon = googMapsFavicon;
				} else {
					faviconizedBookmark.favicon = `chrome-extension://${Browser.runtime.id}/_favicon/?pageUrl=${bookmark.url}&size=32`;
				}
				break;
		}
		return faviconizedBookmark;
	});

const faviconizeWithTopSites = (
	bookmarks: Bookmarks.BookmarkTreeNode[],
	topSites: TopSites.MostVisitedURL[]
): FaviconedBookmark[] =>
	bookmarks.map((bookmark: Bookmarks.BookmarkTreeNode) => {
		const faviconizedBookmark = bookmark as FaviconedBookmark;
		switch (bookmark.type) {
			case 'folder':
				faviconizedBookmark.children = faviconizeWithTopSites(
					bookmark.children ?? [],
					topSites
				);
				break;
			case 'bookmark':
				if (isGoogMaps(bookmark.url)) {
					faviconizedBookmark.favicon = googMapsFavicon;
				} else {
					const url = new URL(bookmark.url || '');

					const urlFavicon = topSites.find(
						(site) => site.url === bookmark.url
					)?.favicon;
					if (urlFavicon) {
						faviconizedBookmark.favicon = urlFavicon;
					} else {
						const hostFavicon = topSites.find(
							(site) => new URL(site.url).host === url.host
						)?.favicon;

						if (hostFavicon) {
							faviconizedBookmark.favicon = hostFavicon;
						} else {
							const domain = url.host.split('.').slice(-2).join('.');
							const domainFavicon = topSites.find(
								(site) => new URL(site.url).host === domain
							)?.favicon;
							if (domainFavicon) {
								faviconizedBookmark.favicon = domainFavicon;
							} else {
								faviconizedBookmark.favicon = null;
							}
						}
					}
				}
		}
		return faviconizedBookmark;
	});

const faviconize = async (
	bookmarks: Bookmarks.BookmarkTreeNode[]
): Promise<FaviconedBookmark[]> =>
	getBrowser() === 'chrome'
		? faviconizeFromAPI(bookmarks)
		: faviconizeWithTopSites(bookmarks, await getTopSites());

export const loadToolbarBookmarks = (): Promise<FaviconedBookmark[]> =>
	getBookmarks().then(faviconize);
