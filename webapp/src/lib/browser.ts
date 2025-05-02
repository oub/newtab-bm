import Browser from 'webextension-polyfill';

export let getBrowser = () => {
	let browser: 'firefox' | 'chrome' | 'other' | undefined = undefined;

	if (typeof Browser.bookmarks === 'undefined') {
		browser = 'other';
	} else if (Browser.theme) {
		browser = 'firefox';
	} else {
		browser = 'chrome';
	}

	getBrowser = () => browser;

	return browser;
};
